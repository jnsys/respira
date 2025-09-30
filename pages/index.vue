<script setup>
import Footer from "@/views/front-pages/front-page-footer.vue";
import Navbar from "@/views/front-pages/front-page-navbar.vue";
import Banner from "@/views/front-pages/landing-page/banner.vue";
import ContactUs from "@/views/front-pages/landing-page/contact-us.vue";
import CustomersReview from "@/views/front-pages/landing-page/customers-review.vue";
import FaqSection from "@/views/front-pages/landing-page/faq-section.vue";
import Features from "@/views/front-pages/landing-page/features.vue";
import HeroSection from "@/views/front-pages/landing-page/hero-section.vue";
import OurTeam from "@/views/front-pages/landing-page/our-team.vue";
import OurProduct from "@/views/front-pages/landing-page/our-product.vue";
import PricingPlans from "@/views/front-pages/landing-page/pricing-plans.vue";
import ProductStats from "@/views/front-pages/landing-page/product-stats.vue";
import WhyChoose from "@/views/front-pages/landing-page/why-choose.vue";
import AboutUs from "@/views/front-pages/landing-page/about-us.vue";
import QrVerification from "@/views/front-pages/landing-page/qr-verification.vue";
import { useConfigStore } from "@core/stores/config";

const store = useConfigStore();

store.skin = "default";
definePageMeta({
  layout: "blank",
  public: true,
});

const activeSectionId = ref();
const refHome = ref();
const refFeatures = ref();
const refTeam = ref();
const refContact = ref();
const refFaq = ref();
const refProduct = ref();
const refQrVerification = ref();

useIntersectionObserver(
  [
    refHome,
    refFeatures,
    refTeam,
    refContact,
    refFaq,
    refProduct,
    refQrVerification,
  ],
  ([{ isIntersecting, target }]) => {
    if (isIntersecting) activeSectionId.value = target.id;
  },
  { threshold: 0.25 }
);
</script>

<template>
  <div class="landing-page-wrapper">
    <Navbar :active-id="activeSectionId" />

    <!-- 👉 Hero Section  -->
    <HeroSection ref="refHome" />

    <!-- 👉 Our Product -->
    <div :style="{ 'background-color': 'rgb(var(--v-theme-surface))' }">
      <OurProduct ref="refProduct" />
    </div>

    <!-- 👉 Why Choose RESPIRA+ -->
    <div :style="{ 'background-color': 'rgb(var(--v-theme-surface))' }">
      <WhyChoose />
    </div>

    <!-- 👉 About Us -->
    <div :style="{ 'background-color': 'rgb(var(--v-theme-surface))' }">
      <AboutUs />
    </div>

    <!-- 👉 QR Verification -->
    <div :style="{ 'background-color': 'rgb(var(--v-theme-surface))' }">
      <QrVerification ref="refQrVerification" />
    </div>

    <!-- 👉 Useful features  -->
    <!-- <div :style="{ 'background-color': 'rgb(var(--v-theme-surface))' }">
      <Features ref="refFeatures" />
    </div> -->

    <!-- 👉 Customer Review -->
    <!-- <div :style="{ 'background-color': 'rgb(var(--v-theme-surface))' }">
      <CustomersReview />
    </div> -->

    <!-- 👉 Our Team -->
    <!-- <div :style="{ 'background-color': 'rgb(var(--v-theme-surface))' }">
      <OurTeam ref="refTeam" />
    </div> -->

    <!-- 👉 Pricing Plans -->
    <!-- <div :style="{ 'background-color': 'rgb(var(--v-theme-surface))' }">
      <PricingPlans />
    </div> -->

    <!-- 👉 Product stats -->
    <!-- <ProductStats /> -->

    <!-- 👉 FAQ Section -->
    <!-- <div :style="{ 'background-color': 'rgb(var(--v-theme-surface))' }">
      <FaqSection ref="refFaq" />
    </div> -->

    <!-- 👉 Banner  -->
    <!-- <Banner /> -->

    <!-- 👉 Contact Us  -->
    <ContactUs ref="refContact" />

    <!-- 👉 Footer -->
    <!-- <Footer /> -->
  </div>
</template>

<style lang="scss">
@media (max-width: 960px) and (min-width: 600px) {
  .landing-page-wrapper {
    .v-container {
      padding-inline: 2rem !important;
    }
  }
}
</style>
