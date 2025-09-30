<script setup>
// import { Html5QrcodeScanner } from "html5-qrcode";
const { t } = useI18n();

// QR verification states
const qrInput = ref("");
const verificationResult = ref(null);
const isLoading = ref(false);
const isScanning = ref(false);
const scanner = ref(null);
const scanContainer = ref(null);
const Html5QrcodeScanner = ref(null);
const availableCameras = ref([]);
const selectedCameraId = ref(null);
const cameraPermissionGranted = ref(false);

// Sample verification logic (replace with actual API call)
const verifyProduct = async () => {
  console.log("Verify product clicked, input:", qrInput.value);

  if (!qrInput.value.trim()) {
    verificationResult.value = {
      type: "error",
      message: t("Landing Page.qrVerification.errors.emptyInput"),
    };
    return;
  }

  isLoading.value = true;

  // Simulate API call delay
  setTimeout(() => {
    // Sample verification logic (replace with actual verification)
    // For testing, let's make it work with any input that has at least 3 characters
    const isValidSerial = qrInput.value.trim().length >= 3;

    if (isValidSerial) {
      verificationResult.value = {
        type: "success",
        message: t("Landing Page.qrVerification.messages.genuine"),
        productInfo: {
          serialNumber: qrInput.value,
          verifiedAt: new Date().toLocaleDateString(),
          productType: t("Landing Page.qrVerification.productType"),
          manufacturer: "RESPIRA+",
        },
      };
    } else {
      verificationResult.value = {
        type: "error",
        message: t("Landing Page.qrVerification.messages.fake"),
      };
    }

    isLoading.value = false;
  }, 2000);
};

const resetVerification = () => {
  qrInput.value = "";
  verificationResult.value = null;
  isLoading.value = false;
};

// Enumerate available cameras
const enumerateCameras = async () => {
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      return [];
    }

    // Request permission first to get device labels
    await navigator.mediaDevices.getUserMedia({ video: true });
    cameraPermissionGranted.value = true;

    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput"
    );

    availableCameras.value = videoDevices.map((device) => ({
      deviceId: device.deviceId,
      label: device.label || `Camera ${device.deviceId.slice(0, 8)}`,
      kind: device.kind,
    }));

    // Select the first available camera or prefer back camera
    const backCamera = videoDevices.find(
      (device) =>
        device.label.toLowerCase().includes("back") ||
        device.label.toLowerCase().includes("rear")
    );

    selectedCameraId.value = backCamera?.deviceId || videoDevices[0]?.deviceId;

    return availableCameras.value;
  } catch (error) {
    console.error("Error enumerating cameras:", error);
    cameraPermissionGranted.value = false;
    return [];
  }
};

const handleScan = async () => {
  if (isScanning.value) {
    stopScanning();
    return;
  }

  try {
    // Check if we're on client side
    if (process.client) {
      // Check if camera is supported and we're in a secure context
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert(t("Landing Page.qrVerification.messages.cameraNotSupported"));
        return;
      }

      // Check if we're in a secure context (HTTPS or localhost)
      if (!window.isSecureContext) {
        alert(t("Landing Page.qrVerification.messages.requiresHttps"));
        return;
      }

      // Enumerate available cameras first
      const cameras = await enumerateCameras();
      if (cameras.length === 0) {
        alert(t("Landing Page.qrVerification.messages.noCamerasFound"));
        return;
      }

      // Dynamically import the library only on client side
      if (!Html5QrcodeScanner.value) {
        const { Html5QrcodeScanner } = await import("html5-qrcode");
        Html5QrcodeScanner.value = Html5QrcodeScanner;
      }

      isScanning.value = true;

      // Wait for next tick to ensure DOM is ready
      await nextTick();

      // Create scanner instance with specific camera
      scanner.value = new Html5QrcodeScanner.value(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          showTorchButtonIfSupported: true,
          showZoomSliderIfSupported: true,
          supportedScanTypes: [
            Html5QrcodeScanner.value.ScanType.SCAN_TYPE_CAMERA,
          ],
        },
        false
      );

      // Start scanning with selected camera
      scanner.value.render(
        (decodedText) => {
          // QR code detected
          qrInput.value = decodedText;
          stopScanning();

          // Automatically verify the scanned code
          setTimeout(() => {
            verifyProduct();
          }, 500);
        },
        (error) => {
          // Scanning error (usually just no QR code detected)
          console.log("QR scan error:", error);
        }
      );
    } else {
      alert(t("Landing Page.qrVerification.messages.cameraNotSupported"));
    }
  } catch (error) {
    console.error("Camera access error:", error);
    isScanning.value = false;
    if (error.name === "NotAllowedError") {
      alert(t("Landing Page.qrVerification.messages.cameraAccessDenied"));
    } else if (error.name === "NotFoundError") {
      alert(t("Landing Page.qrVerification.messages.noCamerasFound"));
    } else {
      alert(t("Landing Page.qrVerification.messages.cameraError"));
    }
  }
};

const stopScanning = () => {
  if (scanner.value) {
    scanner.value.clear();
    scanner.value = null;
  }
  isScanning.value = false;
};

// Helper functions
const getSelectedCameraLabel = () => {
  const selectedCamera = availableCameras.value.find(
    (camera) => camera.deviceId === selectedCameraId.value
  );
  return (
    selectedCamera?.label || $t("Landing Page.qrVerification.unknownCamera")
  );
};

const onCameraChange = () => {
  if (isScanning.value) {
    stopScanning();
    // Restart scanning with new camera
    setTimeout(() => {
      handleScan();
    }, 500);
  }
};

// Initialize cameras on component mount
onMounted(async () => {
  if (process.client) {
    await enumerateCameras();
  }
});

// Cleanup on component unmount
onUnmounted(() => {
  stopScanning();
});
</script>

<template>
  <VContainer id="qr-verification">
    <div class="qr-verification-section pa-">
      <div class="headers d-flex justify-center flex-column align-center">
        <h4 class="d-flex align-center text-h4 mb-1 flex-wrap justify-center">
          <div class="position-relative me-2">
            <div class="section-title">
              {{ $t("Landing Page.qrVerification.title") }}
            </div>
          </div>
        </h4>

        <p
          class="text-center text-body-1 mb-0"
          style="color: rgb(var(--v-theme-on-surface)); opacity: 0.8"
        >
          {{ $t("Landing Page.qrVerification.subtitle") }}
        </p>
      </div>

      <!-- QR Verification Form -->
      <VRow class="mt-12 justify-center">
        <VCol cols="12" md="8" lg="6">
          <VCard
            flat
            class="verification-card pa-8"
            elevation="4"
            style="
              background: linear-gradient(
                135deg,
                rgba(var(--v-theme-primary-rgb), 0.1) 0%,
                rgba(var(--v-theme-primary-rgb), 0.05) 100%
              );
              border: 1px solid rgba(var(--v-theme-primary-rgb), 0.2);
              border-radius: 20px;
            "
          >
            <div class="text-center mb-6">
              <VIcon
                icon="tabler-qrcode"
                size="64"
                color="primary"
                class="mb-4"
              />
              <h5
                class="text-h5 mb-2"
                style="color: rgb(var(--v-theme-primary))"
              >
                {{ $t("Landing Page.qrVerification.formTitle") }}
              </h5>
              <p
                class="text-body-1"
                style="color: rgb(var(--v-theme-on-surface)); opacity: 0.8"
              >
                {{ $t("Landing Page.qrVerification.formDescription") }}
              </p>
            </div>

            <!-- Input Form -->
            <VForm @submit.prevent="verifyProduct">
              <VRow>
                <VCol cols="12">
                  <AppTextField
                    v-model="qrInput"
                    :label="$t('Landing Page.qrVerification.inputLabel')"
                    :placeholder="
                      $t('Landing Page.qrVerification.inputPlaceholder')
                    "
                    prepend-inner-icon="tabler-qrcode"
                    variant="outlined"
                    :disabled="isLoading"
                    class="mb-4"
                  />
                </VCol>

                <VCol cols="12" sm="6">
                  <VBtn
                    type="submit"
                    color="primary"
                    size="large"
                    block
                    :loading="isLoading"
                    :disabled="isLoading"
                  >
                    {{ $t("Landing Page.qrVerification.verifyButton") }}
                  </VBtn>
                </VCol>

                <VCol cols="12" sm="6">
                  <VBtn
                    :color="isScanning ? 'error' : 'secondary'"
                    variant="outlined"
                    size="large"
                    block
                    @click="handleScan"
                    :disabled="isLoading"
                  >
                    <VIcon :start="!isScanning" icon="tabler-camera" />
                    {{
                      isScanning
                        ? $t("Landing Page.qrVerification.stopScan")
                        : $t("Landing Page.qrVerification.scanButton")
                    }}
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>

            <!-- Camera Selection (shown when multiple cameras available) -->
            <div
              v-if="availableCameras.length > 1 && cameraPermissionGranted"
              class="camera-selection mt-4"
            >
              <VSelect
                v-model="selectedCameraId"
                :items="availableCameras"
                item-title="label"
                item-value="deviceId"
                :label="$t('Landing Page.qrVerification.selectCamera')"
                variant="outlined"
                density="comfortable"
                @update:model-value="onCameraChange"
              />
            </div>

            <!-- QR Scanner Container -->
            <div v-if="isScanning" class="qr-scanner-container mt-6">
              <div class="text-center mb-4">
                <h6
                  class="text-h6 mb-2"
                  style="color: rgb(var(--v-theme-primary))"
                >
                  {{ $t("Landing Page.qrVerification.scannerTitle") }}
                </h6>
                <p
                  class="text-body-2 mb-0"
                  style="color: rgb(var(--v-theme-on-surface)); opacity: 0.8"
                >
                  {{ $t("Landing Page.qrVerification.scannerInstructions") }}
                </p>
                <div v-if="availableCameras.length > 0" class="mt-2">
                  <VChip size="small" color="primary" variant="tonal">
                    <VIcon start icon="tabler-camera" size="16" />
                    {{ getSelectedCameraLabel() }}
                  </VChip>
                </div>
              </div>
              <div
                ref="scanContainer"
                id="qr-reader"
                style="
                  border-radius: 12px;
                  overflow: hidden;
                  background: rgba(var(--v-theme-surface));
                  border: 2px solid rgba(var(--v-theme-primary-rgb), 0.2);
                "
              ></div>
            </div>

            <!-- Verification Result -->
            <div v-if="verificationResult" class="verification-result mt-6">
              <!-- Success Result -->
              <div
                v-if="verificationResult.type === 'success'"
                class="success-card"
                style="
                  background: linear-gradient(
                    135deg,
                    rgba(40, 167, 69, 0.1) 0%,
                    rgba(76, 175, 80, 0.05) 100%
                  );
                  border: 2px solid rgba(40, 167, 69, 0.3);
                  border-radius: 20px;
                  padding: 24px;
                  position: relative;
                  overflow: hidden;
                "
              >
                <!-- Success Header -->
                <div class="d-flex align-center mb-4">
                  <div
                    class="success-icon mr-4"
                    style="
                      width: 64px;
                      height: 64px;
                      background: linear-gradient(135deg, #28a745, #20c997);
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      box-shadow: 0 8px 24px rgba(40, 167, 69, 0.3);
                      animation: pulse-success 2s infinite;
                    "
                  >
                    <VIcon icon="tabler-check" size="32" color="white" />
                  </div>
                  <div>
                    <h4
                      class="text-h4 mb-1"
                      style="color: #28a745; font-weight: 600"
                    >
                      {{ $t("Landing Page.qrVerification.successTitle") }}
                    </h4>
                    <p
                      class="text-body-1 mb-0"
                      style="
                        color: rgb(var(--v-theme-on-surface));
                        opacity: 0.8;
                      "
                    >
                      {{ verificationResult.message }}
                    </p>
                  </div>
                </div>

                <!-- Product Info Card -->
                <div
                  v-if="verificationResult.productInfo"
                  class="product-info-card mt-4"
                  style="
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 16px;
                    padding: 20px;
                    border: 1px solid rgba(40, 167, 69, 0.2);
                  "
                >
                  <div class="d-flex align-center mb-3">
                    <VIcon
                      icon="tabler-info-circle"
                      size="24"
                      color="#28a745"
                      class="mr-2"
                    />
                    <h5
                      class="text-h5 mb-0"
                      style="
                        color: rgb(var(--v-theme-primary));
                        font-weight: 600;
                      "
                    >
                      {{ $t("Landing Page.qrVerification.productInfo") }}
                    </h5>
                  </div>

                  <VRow>
                    <VCol cols="12" sm="6">
                      <div class="info-item mb-3">
                        <div
                          class="text-caption font-weight-medium mb-1"
                          style="
                            color: rgb(var(--v-theme-on-surface));
                            opacity: 0.7;
                          "
                        >
                          {{ $t("Landing Page.qrVerification.serialNumber") }}
                        </div>
                        <div
                          class="text-body-1 font-weight-medium"
                          style="color: rgb(var(--v-theme-on-surface))"
                        >
                          {{ verificationResult.productInfo.serialNumber }}
                        </div>
                      </div>
                    </VCol>
                    <VCol cols="12" sm="6">
                      <div class="info-item mb-3">
                        <div
                          class="text-caption font-weight-medium mb-1"
                          style="
                            color: rgb(var(--v-theme-on-surface));
                            opacity: 0.7;
                          "
                        >
                          {{ $t("Landing Page.qrVerification.productType") }}
                        </div>
                        <div
                          class="text-body-1 font-weight-medium"
                          style="color: rgb(var(--v-theme-on-surface))"
                        >
                          {{ verificationResult.productInfo.productType }}
                        </div>
                      </div>
                    </VCol>
                    <VCol cols="12" sm="6">
                      <div class="info-item mb-3">
                        <div
                          class="text-caption font-weight-medium mb-1"
                          style="
                            color: rgb(var(--v-theme-on-surface));
                            opacity: 0.7;
                          "
                        >
                          {{ $t("Landing Page.qrVerification.manufacturer") }}
                        </div>
                        <div
                          class="text-body-1 font-weight-medium"
                          style="color: rgb(var(--v-theme-on-surface))"
                        >
                          {{ verificationResult.productInfo.manufacturer }}
                        </div>
                      </div>
                    </VCol>
                    <VCol cols="12" sm="6">
                      <div class="info-item mb-3">
                        <div
                          class="text-caption font-weight-medium mb-1"
                          style="
                            color: rgb(var(--v-theme-on-surface));
                            opacity: 0.7;
                          "
                        >
                          {{ $t("Landing Page.qrVerification.verifiedAt") }}
                        </div>
                        <div
                          class="text-body-1 font-weight-medium"
                          style="color: rgb(var(--v-theme-on-surface))"
                        >
                          {{ verificationResult.productInfo.verifiedAt }}
                        </div>
                      </div>
                    </VCol>
                  </VRow>
                </div>

                <!-- Action Buttons -->
                <div class="d-flex gap-3 mt-4">
                  <VBtn
                    color="success"
                    variant="elevated"
                    size="large"
                    @click="resetVerification"
                    class="flex-grow-1"
                  >
                    <VIcon start icon="tabler-refresh" />
                    {{ $t("Landing Page.qrVerification.verifyAnother") }}
                  </VBtn>
                </div>
              </div>

              <!-- Error Result -->
              <div
                v-else
                class="error-card"
                style="
                  background: linear-gradient(
                    135deg,
                    rgba(220, 53, 69, 0.1) 0%,
                    rgba(244, 67, 54, 0.05) 100%
                  );
                  border: 2px solid rgba(220, 53, 69, 0.3);
                  border-radius: 20px;
                  padding: 24px;
                  position: relative;
                  overflow: hidden;
                "
              >
                <div class="d-flex align-center mb-4">
                  <div
                    class="error-icon mr-4"
                    style="
                      width: 64px;
                      height: 64px;
                      background: linear-gradient(135deg, #dc3545, #fd7e14);
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      box-shadow: 0 8px 24px rgba(220, 53, 69, 0.3);
                    "
                  >
                    <VIcon icon="tabler-x" size="32" color="white" />
                  </div>
                  <div>
                    <h4
                      class="text-h4 mb-1"
                      style="color: #dc3545; font-weight: 600"
                    >
                      {{ $t("Landing Page.qrVerification.errorTitle") }}
                    </h4>
                    <p
                      class="text-body-1 mb-0"
                      style="
                        color: rgb(var(--v-theme-on-surface));
                        opacity: 0.8;
                      "
                    >
                      {{ verificationResult.message }}
                    </p>
                  </div>
                </div>

                <VBtn
                  color="error"
                  variant="elevated"
                  size="large"
                  block
                  @click="resetVerification"
                >
                  <VIcon start icon="tabler-refresh" />
                  {{ $t("Landing Page.qrVerification.tryAgain") }}
                </VBtn>
              </div>
            </div>
          </VCard>
        </VCol>
      </VRow>

      <!-- Security Features -->
      <VRow class="mt-12">
        <VCol cols="12">
          <h5
            class="text-h5 text-center mb-6"
            style="color: rgb(var(--v-theme-primary))"
          >
            {{ $t("Landing Page.qrVerification.securityFeatures.title") }}
          </h5>
        </VCol>

        <VCol
          v-for="(feature, index) in securityFeatures"
          :key="index"
          cols="12"
          lg="4"
          md="6"
          sm="12"
        >
          <VCard
            flat
            class="security-feature-card mb-6"
            elevation="2"
            :style="{
              backgroundColor: feature.bgColor,
              border: `2px solid ${feature.borderColor}`,
              borderRadius: '16px',
            }"
          >
            <VCardText class="text-center pa-6">
              <VIcon
                :icon="feature.icon"
                size="48"
                :color="feature.color"
                class="mb-4"
              />
              <h6 class="text-h6 mb-2">{{ feature.title }}</h6>
              <p
                class="text-body-2 mb-0"
                style="color: rgb(var(--v-theme-on-surface)); opacity: 0.8"
              >
                {{ feature.description }}
              </p>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </div>
  </VContainer>
</template>

<script>
export default {
  computed: {
    securityFeatures() {
      const { t } = useI18n();
      return [
        {
          icon: "tabler-shield-check",
          title: t(
            "Landing Page.qrVerification.securityFeatures.antiCounterfeit.title"
          ),
          description: t(
            "Landing Page.qrVerification.securityFeatures.antiCounterfeit.description"
          ),
          color: "#28a745",
          bgColor: "rgba(40, 167, 69, 0.1)",
          borderColor: "rgba(40, 167, 69, 0.2)",
        },
        {
          icon: "tabler-database",
          title: t(
            "Landing Page.qrVerification.securityFeatures.secureDatabase.title"
          ),
          description: t(
            "Landing Page.qrVerification.securityFeatures.secureDatabase.description"
          ),
          color: "#17a2b8",
          bgColor: "rgba(23, 162, 184, 0.1)",
          borderColor: "rgba(23, 162, 184, 0.2)",
        },
        {
          icon: "tabler-clock",
          title: t(
            "Landing Page.qrVerification.securityFeatures.realTime.title"
          ),
          description: t(
            "Landing Page.qrVerification.securityFeatures.realTime.description"
          ),
          color: "#6f42c1",
          bgColor: "rgba(111, 66, 193, 0.1)",
          borderColor: "rgba(111, 66, 193, 0.2)",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.qr-verification-section {
  padding: 6rem 0;
}

.verification-card {
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(var(--v-theme-primary-rgb), 0.15);
  }
}

.security-feature-card {
  transition: all 0.3s ease;
  border-radius: 16px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
}

.section-title {
  background: linear-gradient(
    135deg,
    rgb(var(--v-theme-primary)),
    rgb(var(--v-theme-secondary))
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  font-size: 2.5rem;
  line-height: 1.2;
}

.product-info {
  background: rgba(var(--v-theme-surface), 0.5);
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1rem;
}

@media (max-width: 960px) {
  .qr-verification-section {
    padding: 4rem 0;
  }

  .section-title {
    font-size: 2rem;
  }
}

/* Success Animation */
@keyframes pulse-success {
  0% {
    transform: scale(1);
    box-shadow: 0 8px 24px rgba(40, 167, 69, 0.3);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 12px 32px rgba(40, 167, 69, 0.4);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 8px 24px rgba(40, 167, 69, 0.3);
  }
}

/* Verification Result Animations */
.verification-result {
  animation: slideInUp 0.5s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-card,
.error-card {
  animation: fadeInScale 0.6s ease-out;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Product Info Card Hover Effect */
.product-info-card {
  transition: all 0.3s ease;
}

.product-info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(40, 167, 69, 0.15);
}

/* Info Item Styling */
.info-item {
  transition: all 0.2s ease;
}

.info-item:hover {
  background: rgba(40, 167, 69, 0.05);
  border-radius: 8px;
  padding: 8px;
  margin: -8px;
}
</style>
