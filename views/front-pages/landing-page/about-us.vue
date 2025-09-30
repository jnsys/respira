<script setup>
const { t } = useI18n();

const aboutData = computed(() => [
  {
    icon: "tabler-cpu",
    title: t("Landing Page.about.features.technology.title"),
    subtitle: t("Landing Page.about.features.technology.subtitle"),
    description: t("Landing Page.about.features.technology.description"),
    color: "#6f42c1",
    bgColor: "rgba(111, 66, 193, 0.1)",
    borderColor: "rgba(111, 66, 193, 0.2)",
  },
  {
    icon: "tabler-snowflake",
    title: t("Landing Page.about.features.extraction.title"),
    subtitle: t("Landing Page.about.features.extraction.subtitle"),
    description: t("Landing Page.about.features.extraction.description"),
    color: "#17a2b8",
    bgColor: "rgba(23, 162, 184, 0.1)",
    borderColor: "rgba(23, 162, 184, 0.2)",
  },
  {
    icon: "tabler-leaf",
    title: t("Landing Page.about.features.natural.title"),
    subtitle: t("Landing Page.about.features.natural.subtitle"),
    description: t("Landing Page.about.features.natural.description"),
    color: "#28a745",
    bgColor: "rgba(40, 167, 69, 0.1)",
    borderColor: "rgba(40, 167, 69, 0.2)",
  },
]);

const missionStatement = computed(() => ({
  title: t("Landing Page.about.mission.title"),
  content: t("Landing Page.about.mission.content"),
}));

const companyValues = computed(() => [
  {
    title: t("Landing Page.about.values.innovation.title"),
    description: t("Landing Page.about.values.innovation.description"),
  },
  {
    title: t("Landing Page.about.values.purity.title"),
    description: t("Landing Page.about.values.purity.description"),
  },
  {
    title: t("Landing Page.about.values.safety.title"),
    description: t("Landing Page.about.values.safety.description"),
  },
  {
    title: t("Landing Page.about.values.sustainability.title"),
    description: t("Landing Page.about.values.sustainability.description"),
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
  <VContainer id="about-us">
    <div class="about-us-section pa-">
      <div class="headers d-flex justify-center flex-column align-center">
        <h4 class="d-flex align-center text-h4 mb-1 flex-wrap justify-center">
          <div class="position-relative me-2">
            <div class="section-title">About</div>
          </div>
          RESPIRA+
        </h4>

        <p
          class="text-center text-body-1 mb-0"
          style="color: rgb(var(--v-theme-on-surface)); opacity: 0.8"
        >
          {{ $t("Landing Page.about.subtitle") }}
        </p>
      </div>

      <!-- Mission Statement -->
      <div class="mission-section mt-12">
        <VCard
          flat
          class="mission-card pa-8"
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
          <div class="text-center">
            <VIcon
              icon="tabler-target"
              size="48"
              color="primary"
              class="mb-4"
            />
            <h5 class="text-h5 mb-4" style="color: rgb(var(--v-theme-primary))">
              {{ missionStatement.title }}
            </h5>
            <p
              class="text-body-1 mission-text"
              style="color: rgb(var(--v-theme-on-surface)); opacity: 0.8"
            >
              {{ missionStatement.content }}
            </p>
          </div>
        </VCard>
      </div>

      <!-- Key Features -->
      <VRow class="mt-12">
        <VCol
          v-for="(data, index) in aboutData"
          :key="index"
          cols="12"
          lg="4"
          md="6"
          sm="12"
        >
          <VCard
            flat
            class="about-card mb-6"
            elevation="2"
            :style="{
              backgroundColor: data.bgColor,
              border: `2px solid ${data.borderColor}`,
            }"
          >
            <VCardText class="pa-6 text-center">
              <div class="icon-wrapper mb-4">
                <VAvatar :color="data.color" size="80" class="elevation-4">
                  <VIcon :icon="data.icon" size="40" color="white" />
                </VAvatar>
              </div>

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
            </VCardText>
          </VCard>
        </VCol>
      </VRow>

      <!-- Company Values -->
      <div class="values-section mt-12">
        <div class="text-center mb-8">
          <h5
            class="text-h5 mb-2"
            style="color: rgb(var(--v-theme-on-surface))"
          >
            Our Values
          </h5>
          <p
            class="text-body-1"
            style="color: rgb(var(--v-theme-on-surface)); opacity: 0.8"
          >
            The principles that guide everything we do
          </p>
        </div>

        <VRow>
          <VCol
            v-for="(value, index) in companyValues"
            :key="index"
            cols="12"
            lg="3"
            md="6"
            sm="6"
          >
            <VCard
              flat
              class="value-card text-center pa-6"
              elevation="1"
              style="border-radius: 16px"
            >
              <VIcon
                icon="tabler-check-circle"
                size="32"
                color="success"
                class="mb-3"
              />
              <h6
                class="text-h6 mb-2"
                style="color: rgb(var(--v-theme-on-surface))"
              >
                {{ value.title }}
              </h6>
              <p
                class="text-body-2 mb-0"
                style="color: rgb(var(--v-theme-on-surface)); opacity: 0.8"
              >
                {{ value.description }}
              </p>
            </VCard>
          </VCol>
        </VRow>
      </div>

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
            border-radius: 20px;
          "
        >
          <h5 class="text-h5 mb-4" style="color: rgb(var(--v-theme-primary))">
            Ready to Experience the Difference?
          </h5>
          <p
            class="text-body-1 mb-6"
            style="color: rgb(var(--v-theme-on-surface)); opacity: 0.8"
          >
            {{ $t("Landing Page.about.cta") }}
          </p>
          <VBtn
            color="primary"
            size="large"
            class="cta-btn"
            @click="scrollToProducts"
            elevation="4"
          >
            Explore Our Products
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

.about-us-section {
  margin-block: 5.25rem;
}

@media (max-width: 1264px) {
  .about-us-section {
    margin-block-end: 1rem;
  }
}

.mission-section {
  .mission-card {
    backdrop-filter: blur(10px);
  }

  .mission-text {
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.8;
  }
}

.about-card {
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
}

.value-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
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
  .headers {
    margin-block-end: 4rem;
  }

  .about-us-section {
    margin-block: 3rem;
  }

  .mission-section {
    .mission-card {
      padding: 2rem 1.5rem !important;
    }
  }

  .about-card {
    .icon-wrapper {
      .v-avatar {
        width: 60px !important;
        height: 60px !important;
      }

      .v-icon {
        font-size: 2rem !important;
      }
    }
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
