<script setup>
import { useTheme } from "vuetify";

const theme = useTheme();

// Product rotation data
const { t } = useI18n();

const products = computed(() => [
  {
    name: t("Landing Page.products.items.goldenSweet.name"),
    flavor: t("Landing Page.products.items.goldenSweet.flavor"),
    icon: "tabler-sun",
    color: "#FFC107",
    bgColor: "rgba(255, 193, 7, 0.1)",
    bgImage:
      "linear-gradient(135deg, rgba(255, 193, 7, 0.3) 0%, rgba(255, 152, 0, 0.2) 100%)",
    pattern:
      "radial-gradient(circle at 20% 80%, rgba(255, 193, 7, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 152, 0, 0.2) 0%, transparent 50%)",
    bgPhoto: "/images/bg-melon.jpg",
    productPhoto: "/images/golden_sweet_hami_melon.png",
  },
  {
    name: t("Landing Page.products.items.easyBreathe.name"),
    flavor: t("Landing Page.products.items.easyBreathe.flavor"),
    icon: "tabler-leaf",
    color: "#28a745",
    bgColor: "rgba(40, 167, 69, 0.1)",
    bgImage:
      "linear-gradient(135deg, rgba(40, 167, 69, 0.3) 0%, rgba(76, 175, 80, 0.2) 100%)",
    pattern:
      "radial-gradient(circle at 30% 70%, rgba(40, 167, 69, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(76, 175, 80, 0.2) 0%, transparent 50%)",
    bgPhoto: "/images/bg-mint.jpg",
    productPhoto: "/images/easy_breathe_mint.png",
  },
  {
    name: t("Landing Page.products.items.summerBreeze.name"),
    flavor: t("Landing Page.products.items.summerBreeze.flavor"),
    icon: "tabler-droplet",
    color: "#dc3545",
    bgColor: "rgba(220, 53, 69, 0.1)",
    bgImage:
      "linear-gradient(135deg, rgba(220, 53, 69, 0.3) 0%, rgba(244, 67, 54, 0.2) 100%)",
    pattern:
      "radial-gradient(circle at 25% 75%, rgba(220, 53, 69, 0.2) 0%, transparent 50%), radial-gradient(circle at 75% 25%, rgba(244, 67, 54, 0.2) 0%, transparent 50%)",
    bgPhoto: "/images/bg-watermelon.jpg",
    productPhoto: "/images/summer_breeze_watermelon.png",
  },
  {
    name: t("Landing Page.products.items.calmDream.name"),
    flavor: t("Landing Page.products.items.calmDream.flavor"),
    icon: "tabler-flower",
    color: "#6f42c1",
    bgColor: "rgba(111, 66, 193, 0.1)",
    bgImage:
      "linear-gradient(135deg, rgba(111, 66, 193, 0.3) 0%, rgba(156, 39, 176, 0.2) 100%)",
    pattern:
      "radial-gradient(circle at 40% 60%, rgba(111, 66, 193, 0.2) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(156, 39, 176, 0.2) 0%, transparent 50%)",
    bgPhoto: "/images/bg-lavender.jpg",
    productPhoto: "/images/calm_dream_lavender.png",
  },
  {
    name: t("Landing Page.products.items.zestySpark.name"),
    flavor: t("Landing Page.products.items.zestySpark.flavor"),
    icon: "tabler-lemon",
    color: "#ffc107",
    bgColor: "rgba(255, 193, 7, 0.1)",
    bgImage:
      "linear-gradient(135deg, rgba(255, 193, 7, 0.3) 0%, rgba(255, 235, 59, 0.2) 100%)",
    pattern:
      "radial-gradient(circle at 35% 65%, rgba(255, 193, 7, 0.2) 0%, transparent 50%), radial-gradient(circle at 65% 35%, rgba(255, 235, 59, 0.2) 0%, transparent 50%)",
    bgPhoto: "/images/bg-lemon.jpg",
    productPhoto: "/images/zesty_spark_lemon.png",
  },
  {
    name: t("Landing Page.products.items.pureFresh.name"),
    flavor: t("Landing Page.products.items.pureFresh.flavor"),
    icon: "tabler-apple",
    color: "#28a745",
    bgColor: "rgba(40, 167, 69, 0.1)",
    bgImage:
      "linear-gradient(135deg, rgba(40, 167, 69, 0.3) 0%, rgba(102, 187, 106, 0.2) 100%)",
    pattern:
      "radial-gradient(circle at 30% 70%, rgba(40, 167, 69, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(102, 187, 106, 0.2) 0%, transparent 50%)",
    bgPhoto: "/images/bg-grape.jpg",
    productPhoto: "/images/pure_fresh_green_grape.png",
  },
]);

const currentProductIndex = ref(0);
const currentProduct = computed(
  () => products.value[currentProductIndex.value]
);

// Rotate products every 3 seconds
onMounted(() => {
  setInterval(() => {
    currentProductIndex.value =
      (currentProductIndex.value + 1) % products.value.length;
  }, 3000);
});

// Shop Now handler
const handleShopNow = () => {
  // Scroll to products section
  const productsSection = document.getElementById("products");
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <div
    id="home"
    class="hero-section"
    :style="{
      background: `url(${currentProduct.bgPhoto}), ${currentProduct.bgImage}, ${currentProduct.pattern}`,
      backgroundSize: 'cover, cover, 100% 100%',
      backgroundPosition: 'center, center, center',
      backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
      transition: 'all 0.8s ease-in-out',
    }"
  >
    <div class="hero-overlay"></div>
    <VContainer class="hero-container">
      <div class="hero-content">
        <!-- Hero Text Content -->
        <div class="hero-text">
          <div class="tagline-wrapper">
            <span class="leaf-icon">🌿</span>
            <h1 class="hero-title">{{ $t("Landing Page.hero.tagline") }}</h1>
          </div>

          <p class="hero-subtitle">
            {{ $t("Landing Page.hero.subtitle") }}
          </p>

          <VBtn
            color="primary"
            size="x-large"
            class="shop-now-btn"
            @click="handleShopNow"
            elevation="4"
          >
            {{ $t("Landing Page.hero.shopNow") }}
            <VIcon end icon="tabler-arrow-right" />
          </VBtn>
        </div>

        <!-- Rotating Product Display -->
        <div class="product-display">
          <div
            class="product-card"
            :style="{
              background: `linear-gradient(145deg, ${currentProduct.bgColor}, rgba(255, 255, 255, 0.1))`,
              borderColor: currentProduct.color,
              borderWidth: '2px',
              borderStyle: 'solid',
              backdropFilter: 'blur(15px)',
            }"
          >
            <div
              class="product-photo-wrapper"
              v-if="currentProduct.productPhoto"
            >
              <img
                :src="currentProduct.productPhoto"
                alt="Product Photo"
                class="product-photo"
                style="
                  max-width: 200px;
                  max-height: 200px;
                  margin: 0 auto;
                  display: block;
                "
              />
            </div>
            <div class="product-info">
              <h3 class="product-name">{{ currentProduct.name }}</h3>
              <p class="product-flavor">{{ currentProduct.flavor }}</p>
            </div>
          </div>

          <!-- Product Indicators -->
          <div class="product-indicators">
            <VBtn
              v-for="(product, index) in products"
              :key="index"
              :class="[
                'indicator-btn',
                index === currentProductIndex ? 'active' : '',
              ]"
              :style="{
                backgroundColor:
                  index === currentProductIndex
                    ? product.color
                    : 'rgba(255, 255, 255, 0.3)',
                borderColor: product.color,
                borderWidth: '2px',
                borderStyle: 'solid',
              }"
              variant="flat"
              size="small"
              @click="currentProductIndex = index"
            />
          </div>
        </div>
      </div>
    </VContainer>
  </div>
</template>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  padding: 6rem 0;
  min-height: 80vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.7) 50%,
    rgba(255, 255, 255, 0.9) 100%
  );
  backdrop-filter: blur(1px);
  z-index: 1;
}

.hero-container {
  position: relative;
  z-index: 2;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-text {
  padding-right: 2rem;
}

.tagline-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.leaf-icon {
  font-size: 3rem;
  animation: float 3s ease-in-out infinite;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: rgb(var(--v-theme-on-surface));
  margin: 0;
  background: linear-gradient(
    135deg,
    rgb(var(--v-theme-primary)) 0%,
    rgb(var(--v-theme-secondary)) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.8;
  margin: 1.5rem 0 2.5rem 0;
  line-height: 1.6;
  font-weight: 500;
}

.shop-now-btn {
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

.product-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.product-card {
  border-radius: 24px;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.5s ease;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  min-width: 320px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
    border-radius: 24px;
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
  }
}

.product-icon-wrapper {
  margin-bottom: 1.5rem;
  animation: pulse 2s ease-in-out infinite;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: rgb(var(--v-theme-on-surface));
}

.product-flavor {
  font-size: 1rem;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.7;
  margin: 0;
  font-weight: 500;
}

.product-indicators {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.indicator-btn {
  min-width: 16px;
  height: 16px;
  border-radius: 50%;
  padding: 0;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &.active {
    transform: scale(1.3);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    transform: scale(1.4);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
}

// Animations
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes backgroundShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.hero-section {
  animation: backgroundShift 20s ease-in-out infinite;
}

// Responsive Design
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  .hero-text {
    padding-right: 0;
  }

  .hero-title {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 4rem 0;
    min-height: 70vh;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .product-card {
    padding: 2rem 1.5rem;
    min-width: 280px;
  }

  .product-icon-wrapper {
    .v-icon {
      font-size: 4rem !important;
    }
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .tagline-wrapper {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .leaf-icon {
    font-size: 2.5rem;
  }
}
</style>
