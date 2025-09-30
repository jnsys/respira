<script setup>
import { useWindowScroll } from "@vueuse/core";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { useDisplay } from "vuetify";
import navImg from "@images/front-pages/misc/nav-item-col-img.png";
// Custom I18n component with enhanced icon
import { VNodeRenderer } from "@layouts/components/VNodeRenderer";
import { themeConfig } from "@themeConfig";

const props = defineProps({ activeId: String });

const display = useDisplay();
const { y } = useWindowScroll();
const route = useRoute();
const router = useRouter();
const sidebar = ref(false);
const { locale, t } = useI18n({ useScope: "global" });

// Function to get flag emoji based on language code
const getFlagEmoji = (langCode) => {
  const flagMap = {
    en: "🇬🇧", // United Kingdom flag for English
    ms: "🇲🇾", // Malaysia flag for Malay
    zh: "🇨🇳", // China flag for Chinese
  };
  return flagMap[langCode] || "🌍";
};

// Navigation items with translations and their corresponding hash IDs
const navigationItems = computed(() => [
  { label: t("Landing Page.navigation.home"), hash: "home" },
  { label: t("Landing Page.navigation.products"), hash: "products" },
  { label: t("Landing Page.navigation.whyChoose"), hash: "why-choose" },
  { label: t("Landing Page.navigation.aboutUs"), hash: "about-us" },
  {
    label: t("Landing Page.navigation.qrVerification"),
    hash: "qr-verification",
  },
  { label: t("Landing Page.navigation.contact"), hash: "contact-us" },
]);

watch(
  () => display,
  () => {
    return display.mdAndUp ? (sidebar.value = false) : sidebar.value;
  },
  { deep: true }
);

const isMenuOpen = ref(false);
const isMegaMenuOpen = ref(false);

const menuItems = [
  {
    listTitle: "Page",
    listIcon: "tabler-layout-grid",
    navItems: [
      {
        name: "Pricing",
        to: { name: "front-pages-pricing" },
      },
      {
        name: "Payment",
        to: { name: "front-pages-payment" },
      },
      {
        name: "Checkout",
        to: { name: "front-pages-checkout" },
      },
      {
        name: "Help Center",
        to: { name: "front-pages-help-center" },
      },
    ],
  },
  {
    listTitle: "Auth Demo",
    listIcon: "tabler-lock-open",
    navItems: [
      {
        name: "Login (Basic)",
        to: { name: "pages-authentication-login-v1" },
      },
      {
        name: "Login (Cover)",
        to: { name: "pages-authentication-login-v2" },
      },
      {
        name: "Register (Basic)",
        to: { name: "pages-authentication-register-v1" },
      },
      {
        name: "Register (Cover)",
        to: { name: "pages-authentication-register-v2" },
      },
      {
        name: "Register (Multi-steps)",
        to: { name: "pages-authentication-register-multi-steps" },
      },
      {
        name: "Forgot Password (Basic)",
        to: { name: "pages-authentication-forgot-password-v1" },
      },
      {
        name: "Forgot Password (Cover)",
        to: { name: "pages-authentication-forgot-password-v2" },
      },
      {
        name: "Reset Password (Basic)",
        to: { name: "pages-authentication-reset-password-v1" },
      },
      {
        name: "Reset Password (cover  )",
        to: { name: "pages-authentication-reset-password-v2" },
      },
    ],
  },
  {
    listTitle: "Other",
    listIcon: "tabler-photo",
    navItems: [
      {
        name: "Under Maintenance",
        to: { name: "pages-misc-under-maintenance" },
      },
      {
        name: "Coming Soon",
        to: { name: "pages-misc-coming-soon" },
      },
      {
        name: "Not Authorized",
        to: { path: "/not-authorized" },
      },
      {
        name: "Verify Email (Basic)",
        to: { name: "pages-authentication-verify-email-v1" },
      },
      {
        name: "Verify Email (Cover)",
        to: { name: "pages-authentication-verify-email-v2" },
      },
      {
        name: "Two Steps (Basic)",
        to: { name: "pages-authentication-two-steps-v1" },
      },
      {
        name: "Two Steps (Cover)",
        to: { name: "pages-authentication-two-steps-v2" },
      },
    ],
  },
];

const isCurrentRoute = (to) => {
  return route.matched.some((_route) =>
    _route.path.startsWith(router.resolve(to).path)
  );

  // ℹ️ Below is much accurate approach if you don't have any nested routes

  // return route.matched.some(_route => _route.path === router.resolve(to).path)
};

const isPageActive = computed(() =>
  menuItems.some((item) =>
    item.navItems.some((listItem) => isCurrentRoute(listItem.to))
  )
);
</script>

<template>
  <!-- 👉 Navigation drawer for mobile devices  -->
  <VNavigationDrawer v-model="sidebar" width="275" disable-resize-watcher>
    <PerfectScrollbar :options="{ wheelPropagation: false }" class="h-100">
      <!-- Nav items -->
      <div>
        <div class="d-flex flex-column gap-y-4 pa-4">
          <NuxtLink
            v-for="(item, index) in navigationItems"
            :key="index"
            :to="{
              name: 'index',
              hash: `#${item.hash}`,
            }"
            class="nav-link font-weight-medium"
            :class="[props.activeId === item.hash ? 'active-link' : '']"
          >
            {{ item.label }}
          </NuxtLink>

          <!-- Pages Menu -->
          <!-- <div class="font-weight-medium cursor-pointer">
            <div
              :class="[
                isMenuOpen ? 'mb-6 active-link' : '',
                isPageActive ? 'active-link' : '',
              ]"
              style="color: rgba(var(--v-theme-on-surface))"
              class="page-link"
              @click="isMenuOpen = !isMenuOpen"
            >
              Pages
              <VIcon
                :icon="isMenuOpen ? 'tabler-chevron-up' : 'tabler-chevron-down'"
              />
            </div>

            <div class="px-4" :class="isMenuOpen ? 'd-block' : 'd-none'">
              <div v-for="(item, index) in menuItems" :key="index">
                <div class="d-flex align-center gap-x-3 mb-4">
                  <VAvatar
                    variant="tonal"
                    color="primary"
                    rounded
                    :icon="item.listIcon"
                  />
                  <div
                    class="text-body-1 text-high-emphasis font-weight-medium"
                  >
                    {{ item.listTitle }}
                  </div>
                </div>
                <ul class="mb-6">
                  <li
                    v-for="listItem in item.navItems"
                    :key="listItem.name"
                    style="list-style: none"
                    class="text-body-1 mb-4 text-no-wrap"
                  >
                    <NuxtLink
                      :to="listItem.to"
                      :target="item.listTitle === 'Page' ? '_self' : '_blank'"
                      class="mega-menu-item"
                      :class="
                        isCurrentRoute(listItem.to)
                          ? 'active-link'
                          : 'text-high-emphasis'
                      "
                    >
                      <VIcon icon="tabler-circle" :size="10" class="me-2" />
                      <span> {{ listItem.name }}</span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </div> -->

          <!-- Admin Link -->
          <!-- <NuxtLink to="/" target="_blank" class="font-weight-medium nav-link">
            Admin
          </NuxtLink> -->
        </div>
      </div>

      <!-- Navigation drawer close icon -->
      <VIcon
        id="navigation-drawer-close-btn"
        icon="tabler-x"
        size="20"
        @click="sidebar = !sidebar"
      />
    </PerfectScrollbar>
  </VNavigationDrawer>

  <!-- 👉 Navbar for desktop devices  -->
  <div class="front-page-navbar">
    <div class="front-page-navbar">
      <VAppBar
        :color="
          $vuetify.theme.current.dark
            ? 'rgba(var(--v-theme-surface),0.38)'
            : 'rgba(var(--v-theme-surface), 0.38)'
        "
        :class="
          y > 10
            ? 'app-bar-scrolled'
            : [
                $vuetify.theme.current.dark ? 'app-bar-dark' : 'app-bar-light',
                'elevation-0',
              ]
        "
        class="navbar-blur"
      >
        <!-- toggle icon for mobile device -->
        <IconBtn
          id="vertical-nav-toggle-btn"
          class="ms-n3 me-2 d-inline-block d-md-none"
          @click="sidebar = !sidebar"
        >
          <VIcon
            size="26"
            icon="tabler-menu-2"
            color="rgba(var(--v-theme-on-surface))"
          />
        </IconBtn>
        <!-- Title and Landing page sections -->
        <div class="d-flex align-center">
          <VAppBarTitle class="me-6" v-if="$vuetify.display.mdAndUp">
            <NuxtLink to="/" class="d-flex gap-x-4">
              <div class="app-logo">
                <img
                  src="/images/respiralogoextrasmall.png"
                  alt="logo"
                  style="width: 80%; height: auto"
                />
                <!-- <VNodeRenderer :nodes="themeConfig.app.logo" /> -->
              </div>
            </NuxtLink>
          </VAppBarTitle>

          <!-- landing page sections -->
          <div class="text-base align-center d-none d-md-flex">
            <NuxtLink
              v-for="(item, index) in navigationItems"
              :key="index"
              :to="{
                name: 'index',
                hash: `#${item.hash}`,
              }"
              class="nav-link font-weight-medium py-2 px-2 px-lg-4"
              :class="[props.activeId === item.hash ? 'active-link' : '']"
            >
              {{ item.label }}
            </NuxtLink>

            <!-- Pages Menu -->
            <!-- <span
              class="font-weight-medium cursor-pointer px-2 px-lg-4 py-2"
              :class="isPageActive || isMegaMenuOpen ? 'active-link' : ''"
              style="color: rgba(var(--v-theme-on-surface))"
            >
              Pages
              <VIcon icon="tabler-chevron-down" size="16" class="ms-2" />
              <VMenu
                v-model="isMegaMenuOpen"
                open-on-hover
                activator="parent"
                transition="slide-y-transition"
                location="bottom center"
                offset="16"
                content-class="mega-menu"
                location-strategy="static"
                close-on-content-click
              >
                <VCard max-width="1000">
                  <VCardText class="pa-8">
                    <div class="nav-menu">
                      <div v-for="(item, index) in menuItems" :key="index">
                        <div class="d-flex align-center gap-x-3 mb-6">
                          <VAvatar
                            variant="tonal"
                            color="primary"
                            rounded
                            :icon="item.listIcon"
                          />
                          <div
                            class="text-body-1 text-high-emphasis font-weight-medium"
                          >
                            {{ item.listTitle }}
                          </div>
                        </div>
                        <ul>
                          <li
                            v-for="listItem in item.navItems"
                            :key="listItem.name"
                            style="list-style: none"
                            class="text-body-1 mb-4 text-no-wrap"
                          >
                            <NuxtLink
                              class="mega-menu-item"
                              :to="listItem.to"
                              :target="
                                item.listTitle === 'Page' ? '_self' : '_blank'
                              "
                              :class="
                                isCurrentRoute(listItem.to)
                                  ? 'active-link'
                                  : 'text-high-emphasis'
                              "
                            >
                              <div class="d-flex align-center">
                                <VIcon
                                  icon="tabler-circle"
                                  color="primary"
                                  :size="10"
                                  class="me-2"
                                />
                                <span>{{ listItem.name }}</span>
                              </div>
                            </NuxtLink>
                          </li>
                        </ul>
                      </div>
                      <img
                        :src="navImg"
                        alt="Navigation Image"
                        class="d-inline-block rounded-lg"
                        style="
                          border: 10px solid rgb(var(--v-theme-background));
                        "
                        :width="$vuetify.display.lgAndUp ? '330' : '250'"
                        :height="$vuetify.display.lgAndUp ? '330' : '250'"
                      />
                    </div>
                  </VCardText>
                </VCard>
              </VMenu>
            </span> -->

            <!-- Admin Link -->
            <!-- <NuxtLink
              to="/"
              target="_blank"
              class="font-weight-medium nav-link"
            >
              Admin
            </NuxtLink> -->
          </div>
        </div>

        <VSpacer />

        <!-- Navbar right section: i18n -->
        <div class="d-flex gap-x-2 align-center">
          <!-- Custom I18n Component with Sharp Icon -->
          <IconBtn
            v-if="
              themeConfig.app.i18n.enable &&
              themeConfig.app.i18n.langConfig?.length
            "
            class="i18n-btn"
          >
            <VIcon icon="tabler-world-www" size="20" class="i18n-icon" />

            <!-- Menu -->
            <VMenu
              activator="parent"
              location="bottom end"
              offset="12px"
              width="200"
            >
              <!-- List -->
              <VList :selected="[locale]" color="primary" class="i18n-menu">
                <!-- List item -->
                <VListItem
                  v-for="lang in themeConfig.app.i18n.langConfig"
                  :key="lang.i18nLang"
                  :value="lang.i18nLang"
                  @click="locale = lang.i18nLang"
                  class="i18n-item"
                >
                  <template #prepend>
                    <!-- Flag Emoji -->
                    <span class="flag-emoji me-3">
                      {{ getFlagEmoji(lang.i18nLang) }}
                    </span>
                  </template>

                  <!-- Language label -->
                  <VListItemTitle class="text-body-1 font-weight-medium">
                    {{ lang.label }}
                  </VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </IconBtn>
        </div>
      </VAppBar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-menu {
  display: flex;
  gap: 2rem;
}

.nav-link {
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;

  &:not(:hover) {
    color: rgb(var(--v-theme-on-surface));
  }

  &:hover {
    color: rgb(var(--v-theme-primary)) !important;
    background: rgba(var(--v-theme-primary-rgb), 0.1);
    transform: translateY(-2px);
  }
}

.page-link {
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: rgb(var(--v-theme-primary)) !important;
    background: rgba(var(--v-theme-primary-rgb), 0.1);
    transform: translateY(-2px);
  }
}

@media (max-width: 1280px) {
  .nav-menu {
    gap: 2.25rem;
  }
}

@media (min-width: 1920px) {
  .front-page-navbar {
    .v-toolbar {
      max-inline-size: calc(1440px - 32px);
    }
  }
}

@media (min-width: 1280px) and (max-width: 1919px) {
  .front-page-navbar {
    .v-toolbar {
      max-inline-size: calc(1200px - 32px);
    }
  }
}

@media (min-width: 960px) and (max-width: 1279px) {
  .front-page-navbar {
    .v-toolbar {
      max-inline-size: calc(900px - 32px);
    }
  }
}

@media (min-width: 600px) and (max-width: 959px) {
  .front-page-navbar {
    .v-toolbar {
      max-inline-size: calc(100% - 64px);
    }
  }
}

@media (max-width: 600px) {
  .front-page-navbar {
    .v-toolbar {
      max-inline-size: calc(100% - 32px);
    }
  }
}

.nav-item-img {
  border: 10px solid rgb(var(--v-theme-background));
  border-radius: 10px;
}

.active-link {
  color: rgb(var(--v-theme-primary)) !important;
}

.app-bar-light {
  border: 2px solid rgba(var(--v-theme-primary-rgb), 0.2);
  border-radius: 1rem;
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary-rgb), 0.1) 0%,
    rgba(var(--v-theme-secondary-rgb), 0.05) 50%,
    rgba(var(--v-theme-surface), 0.8) 100%
  );
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(var(--v-theme-primary-rgb), 0.1);
  transition: all 0.3s ease-in-out;
}

.app-bar-dark {
  border: 2px solid rgba(var(--v-theme-primary-rgb), 0.3);
  border-radius: 1rem;
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary-rgb), 0.15) 0%,
    rgba(var(--v-theme-secondary-rgb), 0.08) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(var(--v-theme-primary-rgb), 0.2);
  transition: all 0.3s ease-in-out;
}

.app-bar-scrolled {
  border: 2px solid rgba(var(--v-theme-primary-rgb), 0.3);
  border-radius: 1rem;
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-surface), 0.95) 0%,
    rgba(var(--v-theme-primary-rgb), 0.05) 50%,
    rgba(var(--v-theme-surface), 0.95) 100%
  ) !important;
  backdrop-filter: blur(20px);
  box-shadow: 0 12px 40px rgba(var(--v-theme-primary-rgb), 0.15);
  transition: all 0.3s ease-in-out;
}

.front-page-navbar::after {
  position: fixed;
  z-index: 2;
  backdrop-filter: saturate(120%) blur(12px);
  background: linear-gradient(
    180deg,
    rgba(var(--v-theme-background), 0.8) 0%,
    rgba(var(--v-theme-background), 0.4) 50%,
    rgba(var(--v-theme-background), 0.1) 100%
  );
  block-size: 5rem;
  content: "";
  inline-size: 100%;
  border-radius: 0 0 1rem 1rem;
}
</style>

<style lang="scss">
@use "@layouts/styles/mixins" as layoutMixins;

.mega-menu {
  position: fixed !important;
  inset-block-start: 5.4rem;
  inset-inline-start: 50%;
  transform: translateX(-50%);

  @include layoutMixins.rtl {
    transform: translateX(50%);
  }
}

.front-page-navbar {
  .v-toolbar__content {
    padding-inline: 30px !important;
  }

  .v-toolbar {
    inset-inline: 0 !important;
    margin-block-start: 1rem !important;
    margin-inline: auto !important;
  }
}

.mega-menu-item {
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: rgb(var(--v-theme-primary)) !important;
    background: rgba(var(--v-theme-primary-rgb), 0.1);
    transform: translateX(4px);
  }
}

#navigation-drawer-close-btn {
  position: absolute;
  cursor: pointer;
  inset-block-start: 0.5rem;
  inset-inline-end: 1rem;
}

.app-logo {
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }

  img {
    transition: all 0.3s ease;
    border-radius: 0.5rem;
  }
}

.i18n-btn {
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(var(--v-theme-primary-rgb), 0.1);
  }
}

.i18n-icon {
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));

  .i18n-btn:hover & {
    transform: rotate(15deg) scale(1.1);
    color: rgb(var(--v-theme-primary));
  }
}

.i18n-menu {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(20px);
  background: rgba(var(--v-theme-surface), 0.95);
}

.i18n-item {
  transition: all 0.2s ease;

  &:hover {
    background: rgba(var(--v-theme-primary-rgb), 0.1);
    transform: translateX(4px);
  }
}

.flag-emoji {
  font-size: 18px;
  display: inline-block;
  transition: all 0.2s ease;
  border-radius: 4px;

  .i18n-item:hover & {
    transform: scale(1.2);
    filter: brightness(1.1);
  }
}
</style>
