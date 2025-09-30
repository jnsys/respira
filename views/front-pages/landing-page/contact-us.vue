<script setup>
import ConnectImg from "@images/front-pages/landing-page/contact-customer-service.png";

const name = ref("");
const email = ref("");
const message = ref("");
</script>

<template>
  <VContainer id="contact-us">
    <!-- 👉 Headers  -->
    <div class="contact-us-section">
      <div class="headers d-flex justify-center flex-column align-center pb-16">
        <h4 class="d-flex align-center text-h4 mb-1 flex-wrap justify-center">
          <div class="position-relative me-2">
            <div class="section-title">let's work</div>
          </div>
          together
        </h4>
        <p
          class="text-body-1 mb-0"
          style="color: rgb(var(--v-theme-on-surface)); opacity: 0.8"
        >
          {{ $t("Landing Page.contact.subtitle") }}
        </p>
      </div>

      <!-- Contact Information Cards -->
      <div class="contact-cards-container">
        <VRow>
          <VCol
            v-for="(item, index) in [
              {
                title: 'WhatsApp',
                icon: 'tabler-brand-whatsapp',
                color: 'success',
                value: '+60 12-345 6789',
                link: 'https://wa.me/60123456789',
                description: 'Chat with us on WhatsApp',
              },
              {
                title: 'Phone',
                icon: 'tabler-phone-call',
                color: 'primary',
                value: '+60 3-1234 5678',
                link: 'tel:+60312345678',
                description: 'Call us directly',
              },
              {
                title: 'Email',
                icon: 'tabler-mail',
                color: 'info',
                value: 'info@respiraplus.my',
                link: 'mailto:info@respiraplus.my',
                description: 'Send us an email',
              },
              {
                title: 'Instagram',
                icon: 'tabler-brand-instagram',
                color: 'error',
                value: '@respiraplus.my',
                link: 'https://instagram.com/respiraplus.my',
                description: 'Follow us on Instagram',
              },
            ]"
            :key="index"
            cols="12"
            sm="6"
            lg="3"
          >
            <a :href="item.link" target="_blank" class="contact-card-link">
              <VCard
                class="contact-card-new"
                elevation="2"
                :style="{
                  borderColor: `rgba(var(--v-theme-${item.color}-rgb), 0.2)`,
                }"
              >
                <VCardText class="pa-6 text-center">
                  <VAvatar
                    size="80"
                    :color="item.color"
                    class="mb-4 elevation-4"
                  >
                    <VIcon :icon="item.icon" size="40" color="white" />
                  </VAvatar>

                  <h5
                    class="text-h5 mb-2"
                    style="color: rgb(var(--v-theme-on-surface))"
                  >
                    {{ item.title }}
                  </h5>

                  <p
                    class="text-subtitle-1 font-weight-medium mb-3"
                    :style="{ color: `rgb(var(--v-theme-${item.color}))` }"
                  >
                    {{ item.value }}
                  </p>

                  <p
                    class="text-body-2 mb-0"
                    style="color: rgb(var(--v-theme-on-surface)); opacity: 0.8"
                  >
                    {{ item.description }}
                  </p>
                </VCardText>
              </VCard>
            </a>
          </VCol>
        </VRow>
      </div>

      <!-- Additional Info Section -->
      <div class="additional-info mt-12">
        <VCard
          flat
          class="info-card pa-8"
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
            <VIcon icon="tabler-clock" size="48" color="primary" class="mb-4" />
            <h5 class="text-h5 mb-4" style="color: rgb(var(--v-theme-primary))">
              {{ $t("Landing Page.contact.businessHours") }}
            </h5>
            <div class="business-hours">
              <div class="mb-2">
                <span class="text-body-1 font-weight-medium"
                  >Monday - Friday:</span
                >
                <span class="text-body-1 ml-2">9:00 AM - 6:00 PM</span>
              </div>
              <div class="mb-2">
                <span class="text-body-1 font-weight-medium">Saturday:</span>
                <span class="text-body-1 ml-2">10:00 AM - 4:00 PM</span>
              </div>
              <div>
                <span class="text-body-1 font-weight-medium">Sunday:</span>
                <span class="text-body-1 ml-2">Closed</span>
              </div>
            </div>
            <p
              class="text-body-2 mt-4 mb-0"
              style="color: rgb(var(--v-theme-on-surface)); opacity: 0.8"
            >
              {{ $t("Landing Page.contact.timezone") }}
            </p>
          </div>
        </VCard>
      </div>
    </div>
  </VContainer>
</template>

<style lang="scss" scoped>
.contact-us-section {
  margin-block: 5.25rem;
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

.contact-cards-container {
  margin-bottom: 2rem;
}

.contact-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.contact-card-new {
  border-radius: 16px;
  transition: all 0.3s ease;
  height: 100%;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: rgba(var(--v-theme-primary-rgb), 0.3);
  }
}

.contact-card-link:hover {
  text-decoration: none;
  color: inherit;
}

.info-card {
  backdrop-filter: blur(10px);
  border-radius: 20px;
}

.business-hours {
  .text-body-1 {
    color: rgb(var(--v-theme-on-surface));
  }
}

// Responsive Design
@media (max-width: 768px) {
  .contact-cards-container {
    .v-col {
      margin-bottom: 1rem;
    }
  }

  .contact-card-new {
    .v-avatar {
      width: 60px !important;
      height: 60px !important;
    }

    .v-icon {
      font-size: 2rem !important;
    }
  }
}

@media (max-width: 480px) {
  .info-card {
    padding: 2rem 1.5rem !important;
  }

  .business-hours {
    .text-body-1 {
      display: block;
      margin-bottom: 0.5rem;
    }

    .ml-2 {
      margin-left: 0 !important;
    }
  }
}
</style>
