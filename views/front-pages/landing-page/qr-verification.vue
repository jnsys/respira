<script setup>
const { t } = useI18n();

// QR verification states
const qrInput = ref("");
const verificationResult = ref(null);
const isLoading = ref(false);
const isScanning = ref(false);
const showScanner = ref(false);
const qrStream = ref(null);

// Error state management (following the documentation pattern)
const state = reactive({
  errorMsg: "",
  error: false,
});

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

// Handle QR detection (following the documentation pattern)
const onDetect = (detectedCodes) => {
  if (detectedCodes.length > 0) {
    const code = detectedCodes[0]; // Get the first detected code
    console.log("QR Code detected:", code.rawValue);

    qrInput.value = code.rawValue;
    isScanning.value = false;
    showScanner.value = false;

    // Automatically verify the scanned code
    setTimeout(() => {
      verifyProduct();
    }, 500);
  }
};

// Handle error (following the documentation pattern)
const onError = (err) => {
  console.error("QR scan error:", err);
  state.error = true;
  state.errorMsg = `[${err.name}]: ${err.message}`;
  isScanning.value = false;
  showScanner.value = false;
};

// Reset error state
const resetError = () => {
  state.error = false;
  state.errorMsg = "";
  showScanner.value = true;
  isScanning.value = true;
};

const handleScan = async () => {
  if (isScanning.value) {
    stopScanning();
    return;
  }

  // Simple camera access check
  if (process.client) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Camera access not supported on this device.");
      return;
    }

    if (!window.isSecureContext) {
      alert(
        "Camera access requires a secure connection (HTTPS). Please use HTTPS or localhost."
      );
      return;
    }

    isScanning.value = true;
    showScanner.value = true;
    state.error = false;
    state.errorMsg = "";

    // Start the QR stream after the component is mounted
    await nextTick();
  } else {
    alert("Camera access not supported on this device.");
  }
};

const stopScanning = () => {
  isScanning.value = false;
  showScanner.value = false;
  state.error = false;
  state.errorMsg = "";
};

const securityFeatures = computed(() => [
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
    title: t("Landing Page.qrVerification.securityFeatures.realTime.title"),
    description: t(
      "Landing Page.qrVerification.securityFeatures.realTime.description"
    ),
    color: "#6f42c1",
    bgColor: "rgba(111, 66, 193, 0.1)",
    borderColor: "rgba(111, 66, 193, 0.2)",
  },
]);
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

            <!-- QR Scanner -->
            <div v-if="showScanner" class="qr-scanner-container mt-6">
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
              </div>

              <!-- Nuxt QRCode Stream -->
              <ClientOnly>
                <QrcodeStream
                  v-if="!state.error"
                  ref="qrStream"
                  @error="onError"
                  @detect="onDetect"
                  style="
                    border-radius: 12px;
                    overflow: hidden;
                    background: rgba(var(--v-theme-surface));
                    border: 2px solid rgba(var(--v-theme-primary-rgb), 0.2);
                    max-width: 400px;
                    margin: 0 auto;
                  "
                />
                <div v-else class="error-state text-center pa-4">
                  <VIcon
                    icon="tabler-alert-circle"
                    size="48"
                    color="error"
                    class="mb-4"
                  />
                  <h3
                    class="text-h6 mb-4"
                    style="color: rgb(var(--v-theme-error))"
                  >
                    {{ state.errorMsg }}
                  </h3>
                  <VBtn color="primary" @click="resetError">
                    Reset Camera
                  </VBtn>
                </div>
              </ClientOnly>
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

      <!-- Security Features Section -->
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
            class="feature-card mb-6"
            elevation="2"
            :style="{
              backgroundColor: feature.bgColor,
              border: `2px solid ${feature.borderColor}`,
              borderRadius: '16px',
              transition: 'all 0.3s ease-in-out',
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

<style lang="scss" scoped>
.qr-verification-section {
  padding: 5rem 0;

  .headers {
    margin-bottom: 3rem;
  }

  .section-title {
    font-size: 2.5rem;
    font-weight: 600;
    background: linear-gradient(
      135deg,
      rgb(var(--v-theme-primary)) 0%,
      rgb(var(--v-theme-secondary)) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .verification-card {
    transition: all 0.3s ease;
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(var(--v-theme-primary-rgb), 0.15);
    }
  }

  .feature-card {
    transition: all 0.3s ease;
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
  }
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

/* QR Scanner Styling */
.qr-scanner-container {
  .nuxt-qrcode {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
}
</style>
