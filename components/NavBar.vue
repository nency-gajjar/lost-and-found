<template>
  <div class="noPrint">
    <nav>
      <div class="appbar-container justify-between md:justify-start">
        <div class="menu flex justify-between w-full">
          <div class="menu-left flex items-center">
            <div class="logo-container">
              <NuxtLink to="/" class="logo">
                <img v-if="!mobileDevice" class="nav-logo" src="../assets/images/found-shelf-icon.svg" alt="Found Shelf">
                <img v-else class="nav-logo" src="../assets/images/mobile-logo.svg" alt="Found Shelf">
              </NuxtLink>
            </div>
            <div v-if="isAdminLogin" class="link-container">
              <NuxtLink to="/dashboard" class="menu">{{ $t('dashboard') }}</NuxtLink>
            </div>
            <div v-if="isAdminLogin" class="link-container">
              <NuxtLink to="/shipping-details" class="menu">{{ $t('shippingDetails') }}</NuxtLink>
            </div>
            <div v-if="isAdminLogin" class="link-container">
              <NuxtLink to="/surcharge" class="menu">{{ $t('surcharge') }}</NuxtLink>
            </div>
            <div v-if="isAdminLogin" class="link-container">
              <NuxtLink to="/item-description" class="menu">{{ $t('itemDescription') }}</NuxtLink>
            </div>
            <div v-if="isAdminLogin" class="link-container">
              <NuxtLink to="/users" class="menu">{{ $t('users') }}</NuxtLink>
            </div>
          </div>
          <div class="menu-right flex items-center">
            <div
              v-if="!isAdminLogin"
              @click="$router.push('/found')"
            >
              <BaseButton class="!text-xs !py-2 !px-6 addBtn"
                >{{ $t('addAFoundItem') }}
              </BaseButton>
            </div>
            <!-- <div v-if="isAdminLogin" class="link-container">
              <NuxtLink to="/register" class="menu"
                >Register New Admin</NuxtLink
              >
            </div> -->
            <div v-if="isAdminLogin" class="link-container cursor-pointer">
              <div class="menu" @click="logoutAdmin('desktop')">{{ $t('logout') }}</div>
            </div>
            <div v-if="isAdminLogin" class="drawer-container">
              <div class="icon-container" @click="toggleMenu">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="menuVisible" class="mobile-menu">
        <div v-if="isAdminLogin">
          <NuxtLink
            to="/dashboard"
            @click.native="toggleMenu"
            class="opacity-100"
            >{{ $t('dashboard') }}</NuxtLink
          >
        </div>
        <div v-if="isAdminLogin">
          <NuxtLink
            to="/shipping-details"
            @click.native="toggleMenu"
            class="opacity-100"
            >{{ $t('shippingDetails') }}</NuxtLink
          >
        </div>
        <div v-if="isAdminLogin">
          <NuxtLink
            to="/surcharge"
            @click.native="toggleMenu"
            class="opacity-100"
            >{{ $t('surcharge') }}</NuxtLink
          >
        </div>
        <div v-if="isAdminLogin">
          <NuxtLink
            to="/item-description"
            @click.native="toggleMenu"
            class="opacity-100"
            >{{ $t('itemDescription') }}</NuxtLink
          >
        </div>
        <div v-if="isAdminLogin">
          <NuxtLink
            to="/users"
            @click.native="toggleMenu"
            class="opacity-100"
            >{{ $t('users') }}</NuxtLink
          >
        </div>
        <template v-if="isAdminLogin">
          <!-- <div>
            <NuxtLink
              to="/register"
              @click.native="toggleMenu"
              class="opacity-100"
              >Register New Admin</NuxtLink
            >
          </div> -->
          <div>
            <div @click="logoutAdmin('mobile')" class="opacity-100">{{ $t('logout') }}</div>
          </div>
        </template>
      </div>
    </nav>
  </div>
</template>

<script>
import DetectBrowser from "~/mixins/detectBrowser";
export default {
  mixins: [DetectBrowser],
  data() {
    return {
      menuVisible: false,
      isLogin: false,
    };
  },

  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    async logoutAdmin(device) {
      await this.$auth.logout();
      if (device === "mobile") {
        this.toggleMenu();
      }
    },
  },
  computed: {
    isAdminLogin() {
      if (this.$auth.loggedIn) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-logo{
  width: 130px;
}

.appbar-container {
  z-index: 100;
  @apply flex items-center px-6 md:px-10 w-full bg-white shadow-lg;

  .logo-main-container {
    @apply flex items-center;
  }

  .logo-container {
    @apply flex items-center;
    .logo {
      @apply pr-4 font-bold;
    }
  }

  .menu {
    @apply md:px-4 md:py-4 py-2 text-gray-500 rounded-lg font-medium;

    &.nuxt-link-exact-active {
      @apply bg-accent-20 text-accent-200;
    }
  }
  .menu .menu-left div a:hover {
    @apply text-accent-200;
  }
}

.drawer-container {
  @apply hidden;
}

.icon-container {
  display: inline-block;
  cursor: pointer;
}

.bar1,
.bar2,
.bar3 {
  width: 35px;
  height: 5px;
  background-color: #333;
  margin: 6px 0;
}

.mobile-menu {
  @apply hidden;
}

@media screen and (max-width: 882px) {
  .logo {
    @apply py-2;
    .nav-logo {
      width: 120px;
    }
  }

  .link-container {
    @apply hidden;
  }

  .drawer-container {
    @apply block;
  }

  .mobile-menu {
    z-index: 99;
    @apply border-t;
    @apply block w-full bg-white shadow-lg;
  }
  .mobile-menu > div {
    @apply px-6 py-3;
  }
  .mobile-menu > div:not(:last-child) {
    border-bottom: 1px solid #ececee;
  }
  .addBtn {
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
}

@media screen and (max-width: 348px) {
  .logo {
    @apply py-2;
    .nav-logo {
      width: 100px;
    }
  }
}

@media screen and (max-width: 330px) {
  .logo {
    @apply py-2;
    .nav-logo {
      width: 70px;
    }
  }
}

@media screen and (max-width: 300px) {
  .addBtn {
    font-size: 10px !important;
  }
}

@media print {
  .noPrint{
    display: none;
  }
}
</style>