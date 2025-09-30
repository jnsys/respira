<script setup>
const { t } = useI18n();

const productFlavors = computed(() => [
  {
    name: t("Landing Page.products.items.goldenSweet.name"),
    flavor: t("Landing Page.products.items.goldenSweet.flavor"),
    tagline: t("Landing Page.products.items.goldenSweet.tagline"),
    features: [
      t("Landing Page.products.features.pureExtract"),
      t("Landing Page.products.features.coldExtract"),
      t("Landing Page.products.features.noNicotine"),
    ],
    backgroundColor: "rgba(255, 193, 7, 0.16)",
    borderColor: "rgba(255, 193, 7, 0.16)",
    icon: "tabler-sun",
    iconColor: "#FFC107",
    bgPhoto: "/images/bg-melon.jpg",
    productPhoto: "/images/golden_sweet_hami_melon.png",
  },
  {
    name: t("Landing Page.products.items.easyBreathe.name"),
    flavor: t("Landing Page.products.items.easyBreathe.flavor"),
    tagline: t("Landing Page.products.items.easyBreathe.tagline"),
    features: [
      t("Landing Page.products.features.noNicotine"),
      t("Landing Page.products.features.herbalExtract"),
    ],
    backgroundColor: "rgba(40, 167, 69, 0.16)",
    borderColor: "rgba(40, 167, 69, 0.16)",
    icon: "tabler-leaf",
    iconColor: "#28a745",
    bgPhoto: "/images/bg-mint.jpg",
    productPhoto: "/images/easy_breathe_mint.png",
  },
  {
    name: t("Landing Page.products.items.summerBreeze.name"),
    flavor: t("Landing Page.products.items.summerBreeze.flavor"),
    tagline: t("Landing Page.products.items.summerBreeze.tagline"),
    features: [
      t("Landing Page.products.features.noNicotine"),
      t("Landing Page.products.features.herbalExtract"),
    ],
    backgroundColor: "rgba(220, 53, 69, 0.16)",
    borderColor: "rgba(220, 53, 69, 0.16)",
    icon: "tabler-droplet",
    iconColor: "#dc3545",
    bgPhoto: "/images/bg-watermelon.jpg",
    productPhoto: "/images/summer_breeze_watermelon.png",
  },
  {
    name: t("Landing Page.products.items.calmDream.name"),
    flavor: t("Landing Page.products.items.calmDream.flavor"),
    tagline: t("Landing Page.products.items.calmDream.tagline"),
    features: [
      t("Landing Page.products.features.noNicotine"),
      t("Landing Page.products.features.herbalExtract"),
    ],
    backgroundColor: "rgba(111, 66, 193, 0.16)",
    borderColor: "rgba(111, 66, 193, 0.16)",
    icon: "tabler-flower",
    iconColor: "#6f42c1",
    bgPhoto: "/images/bg-lavender.jpg",
    productPhoto: "/images/calm_dream_lavender.png",
  },
  {
    name: t("Landing Page.products.items.zestySpark.name"),
    flavor: t("Landing Page.products.items.zestySpark.flavor"),
    tagline: t("Landing Page.products.items.zestySpark.tagline"),
    features: [
      t("Landing Page.products.features.noNicotine"),
      t("Landing Page.products.features.herbalExtract"),
    ],
    backgroundColor: "rgba(255, 193, 7, 0.16)",
    borderColor: "rgba(255, 193, 7, 0.16)",
    icon: "tabler-lemon",
    iconColor: "#ffc107",
    bgPhoto: "/images/bg-lemon.jpg",
    productPhoto: "/images/zesty_spark_lemon.png",
  },
  {
    name: t("Landing Page.products.items.pureFresh.name"),
    flavor: t("Landing Page.products.items.pureFresh.flavor"),
    tagline: t("Landing Page.products.items.pureFresh.tagline"),
    features: [
      t("Landing Page.products.features.noNicotine"),
      t("Landing Page.products.features.herbalExtract"),
    ],
    backgroundColor: "rgba(40, 167, 69, 0.16)",
    borderColor: "rgba(40, 167, 69, 0.16)",
    icon: "tabler-apple",
    iconColor: "#28a745",
    bgPhoto: "/images/bg-grape.jpg",
    productPhoto: "/images/pure_fresh_green_grape.png",
  },
]);

// Handle product card clicks
const handleProductClick = (product, event) => {
  // Prevent any default navigation behavior
  event.preventDefault();
  event.stopPropagation();

  console.log("Product clicked:", product.name);
  // You can add more functionality here like:
  // - Navigate to product detail page
  // - Open a modal with product information
  // - Add to cart functionality
  // - Show product details

  // Example: Show an alert for now
  alert(`Selected: ${product.name} (${product.flavor})\n\n${product.tagline}`);
};
</script>

<template>
  <VContainer id="products">
    <div class="our-products pa-">
      <div class="headers d-flex justify-center flex-column align-center">
        <h4 class="d-flex align-center text-h4 mb-1 flex-wrap justify-center">
          <div class="position-relative me-2">
            <div class="section-title">Premium</div>
          </div>
          Flavors
        </h4>

        <p
          class="text-center text-body-1 mb-0"
          style="color: rgb(var(--v-theme-on-surface)); opacity: 0.8"
        >
          {{ $t("Landing Page.products.description") }}
        </p>
      </div>

      <VRow>
        <VCol
          v-for="(data, index) in productFlavors"
          :key="index"
          cols="12"
          lg="4"
          md="6"
          sm="6"
        >
          <VCard
            flat
            min-width="280"
            class="position-relative overflow-visible product-card mb-lg-0 mb-12"
            elevation="2"
            @click="handleProductClick(data, $event)"
            style="cursor: pointer"
          >
            <div
              :style="{
                minHeight: '120px',
                borderRadius: '12px 12px 0 0',
                background: `url(${data.bgPhoto}), ${data.backgroundColor}`,
                backgroundSize: 'cover, auto',
                backgroundPosition: 'center, center',
                backgroundRepeat: 'no-repeat, no-repeat',
                border: `1px solid ${data.borderColor}`,
                borderBottom: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }"
            >
              <!-- Overlay for better icon visibility -->
              <div
                style="
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background: rgba(255, 255, 255, 0.8);
                  border-radius: 12px 12px 0 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <VIcon :icon="data.icon" size="48" :color="data.iconColor" />
              </div>
            </div>
            <VCardText
              class="pa-6"
              :style="{
                border: `1px solid ${data.borderColor}`,
                borderBlockStart: 'none',
                borderRadius: '0 0 12px 12px',
                boxSizing: 'border-box',
                position: 'relative',
              }"
            >
              <div class="d-flex align-center">
                <!-- Left side - Product Info -->
                <div class="flex-grow-1 pr-4">
                  <h5 class="text-h5 mb-2 text-left">
                    {{ data.name }}
                  </h5>
                  <p
                    class="text-subtitle-1 font-weight-medium mb-3 text-left"
                    style="color: rgb(var(--v-theme-primary))"
                  >
                    {{ data.flavor }}
                  </p>
                  <p
                    class="text-body-2 mb-4 text-left"
                    style="color: rgb(var(--v-theme-on-surface)); opacity: 0.8"
                  >
                    {{ data.tagline }}
                  </p>
                  <div class="features-list">
                    <VList density="compact" class="text-left">
                      <VListItem
                        v-for="feature in data.features"
                        :key="feature"
                        class="px-0"
                      >
                        <template #prepend>
                          <VIcon
                            icon="tabler-check"
                            size="16"
                            color="success"
                          />
                        </template>
                        <VListItemTitle class="text-body-2">
                          {{ feature }}
                        </VListItemTitle>
                      </VListItem>
                    </VList>
                  </div>
                </div>

                <!-- Right side - Product Image -->
                <div class="product-image-container">
                  <img
                    :src="data.productPhoto"
                    alt="Product Image"
                    style="
                      max-width: 120px;
                      max-height: 200px;
                      object-fit: contain;
                      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
                    "
                  />
                </div>
              </div>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </div>
  </VContainer>
</template>

<style lang="scss" scoped>
.headers {
  margin-block-end: 7.4375rem;
}

.our-products {
  margin-block: 5.25rem;
}

@media (max-width: 1264px) {
  .our-products {
    margin-block-end: 1rem;
  }
}

.product-card {
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(-2px);
  }
}

.features-list {
  .v-list-item {
    min-height: 32px;
    padding: 4px 0;
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
</style>
