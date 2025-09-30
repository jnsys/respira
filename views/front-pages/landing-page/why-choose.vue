<script setup>
const { t } = useI18n();

const whyChooseData = computed(() => [
  {
    icon: "tabler-shield-check",
    title: "0% Nicotine, 0% Tar",
    subtitle: t("Landing Page.whyChoose.features.noNicotine"),
    description: t("Landing Page.whyChoose.descriptions.noNicotine"),
    color: "#28a745",
    bgColor: "rgba(40, 167, 69, 0.1)",
    borderColor: "rgba(40, 167, 69, 0.2)",
  },
  {
    icon: "tabler-leaf",
    title: "100% Natural",
    subtitle: t("Landing Page.whyChoose.features.natural"),
    description: t("Landing Page.whyChoose.descriptions.natural"),
    color: "#6f42c1",
    bgColor: "rgba(111, 66, 193, 0.1)",
    borderColor: "rgba(111, 66, 193, 0.2)",
  },
  {
    icon: "tabler-device-mobile",
    title: "Portable & Easy",
    subtitle: t("Landing Page.whyChoose.features.portable"),
    description: t("Landing Page.whyChoose.descriptions.portable"),
    color: "#17a2b8",
    bgColor: "rgba(23, 162, 184, 0.1)",
    borderColor: "rgba(23, 162, 184, 0.2)",
  },
  {
    icon: "tabler-heart",
    title: "Safe, Clean",
    subtitle: t("Landing Page.whyChoose.features.safe"),
    description: t("Landing Page.whyChoose.descriptions.safe"),
    color: "#dc3545",
    bgColor: "rgba(220, 53, 69, 0.1)",
    borderColor: "rgba(220, 53, 69, 0.2)",
  },
]);

// Shop Now handler
const scrollToProducts = () => {
  // Scroll to products section
  const productsSection = document.getElementById("products");
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <VContainer id="why-choose">
    <div class="why-choose-section pa-">
      <div class="headers d-flex justify-center flex-column align-center">
        <h4 class="d-flex align-center text-h4 mb-1 flex-wrap justify-center">
          <div class="position-relative me-2">
            <div class="section-title">Why Choose</div>
          </div>
          RESPIRA+
        </h4>

        <p
          class="text-center text-body-1 mb-0"
          style="color: rgb(var(--v-theme-on-surface)); opacity: 0.8"
        >
          {{ $t("Landing Page.whyChoose.subtitle") }}
        </p>
      </div>

      <VRow class="mt-8">
        <VCol
          v-for="(data, index) in whyChooseData"
          :key="index"
          cols="12"
          lg="6"
          md="6"
          sm="12"
        >
          <VCard
            flat
            class="why-choose-card mb-6"
            elevation="2"
            :style="{
              backgroundColor: data.bgColor,
              border: `2px solid ${data.borderColor}`,
            }"
          >
            <VCardText class="pa-6">
              <div class="d-flex align-start">
                <!-- Icon -->
                <div class="icon-wrapper me-4">
                  <VAvatar :color="data.color" size="60" class="elevation-4">
                    <VIcon :icon="data.icon" size="32" color="white" />
                  </VAvatar>
                </div>

                <!-- Content -->
                <div class="content-wrapper flex-grow-1">
                  <h5
                    class="text-h5 mb-2"
                    style="color: rgb(var(--v-theme-on-surface))"
                  >
                    {{ data.title }}
                  </h5>
                  <p
                    class="text-subtitle-1 font-weight-medium mb-3"
                    :style="{ color: data.color }"
                  >
                    {{ data.subtitle }}
                  </p>
                  <p
                    class="text-body-2 mb-0"
                    style="color: rgb(var(--v-theme-on-surface)); opacity: 0.8"
                  >
                    {{ data.description }}
                  </p>
                </div>
              </div>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>

      <!-- Bottom CTA Section -->
      <div class="cta-section mt-12 text-center">
        <VCard
          flat
          class="cta-card pa-8"
          elevation="4"
          style="
            background: linear-gradient(
              135deg,
              rgba(var(--v-theme-primary-rgb), 0.1) 0%,
              rgba(var(--v-theme-primary-rgb), 0.05) 100%
            );
            border: 1px solid rgba(var(--v-theme-primary-rgb), 0.2);
          "
        >
          <h5 class="text-h5 mb-4" style="color: rgb(var(--v-theme-primary))">
            Ready to Experience Pure Refreshment?
          </h5>
          <p
            class="text-body-1 mb-6"
            style="color: rgb(var(--v-theme-on-surface)); opacity: 0.8"
          >
            {{ $t("Landing Page.whyChoose.cta") }}
          </p>
          <VBtn
            color="primary"
            size="large"
            class="cta-btn"
            @click="scrollToProducts"
            elevation="4"
          >
            Shop Our Products
            <VIcon end icon="tabler-arrow-right" />
          </VBtn>
        </VCard>
      </div>
    </div>
  </VContainer>
</template>

<style lang="scss" scoped>
.headers {
  margin-block-end: 7.4375rem;
}

.why-choose-section {
  margin-block: 5.25rem;
}

@media (max-width: 1264px) {
  .why-choose-section {
    margin-block-end: 1rem;
  }
}

.why-choose-card {
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
}

.icon-wrapper {
  flex-shrink: 0;
}

.content-wrapper {
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.section-title {
  font-size: 24px;
  font-weight: 800;
  line-height: 36px;
}

.section-title::after {
  position: absolute;
  background: url("../../../assets/images/front-pages/icons/section-title-icon.png")
    no-repeat left bottom;
  background-size: contain;
  block-size: 100%;
  content: "";
  font-weight: 800;
  inline-size: 120%;
  inset-block-end: 12%;
  inset-inline-start: -12%;
}

.cta-section {
  .cta-card {
    border-radius: 20px;
    backdrop-filter: blur(10px);
  }

  .cta-btn {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    text-transform: none;
    border-radius: 50px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(var(--v-theme-primary-rgb), 0.3);
    }
  }
}

// Responsive Design
@media (max-width: 768px) {
  .why-choose-card {
    .d-flex {
      flex-direction: column;
      text-align: center;
    }

    .icon-wrapper {
      margin-bottom: 1rem;
      margin-right: 0 !important;
    }

    .content-wrapper {
      min-height: auto;
    }
  }

  .headers {
    margin-block-end: 4rem;
  }

  .why-choose-section {
    margin-block: 3rem;
  }
}

@media (max-width: 480px) {
  .cta-section {
    .cta-card {
      padding: 2rem 1.5rem !important;
    }
  }
}
</style>
