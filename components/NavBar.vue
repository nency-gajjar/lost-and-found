<template>
  <div>
    <nav>
      <div class="appbar-container justify-between md:justify-start">
        <div class="menu flex justify-between w-full">
          <div class="menu-left flex items-center">
            <div class="logo-container">
              <NuxtLink to="/" class="logo">Lost & Found</NuxtLink>
            </div>
            <div v-if="isAdminLogin" class="link-container">
              <NuxtLink to="/dashboard" class="menu">Dashboard</NuxtLink>
            </div>
            <div v-else class="link-container">
              <NuxtLink to="/found-items" class="menu">Found Items</NuxtLink>
            </div>
          </div>
          <div class="menu-right flex items-center">
            <div v-show="isAdminLogin" class="link-container">
              <NuxtLink to="/register" class="menu">Register</NuxtLink>
            </div>
            <div v-show="isAdminLogin" class="link-container cursor-pointer">
              <div class="menu" @click="logoutAdmin('desktop')">Logout</div>
            </div>
            <div class="drawer-container">
              <div class="icon-container" @click="toggleMenu">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="menuVisible" class="mobile-menu">
        <div v-if="isAdminLogin">
          <NuxtLink
            to="/dashboard"
            @click.native="toggleMenu"
            class="opacity-100"
            >Dashboard</NuxtLink
          >
        </div>
        <div v-else>
          <NuxtLink
            to="/found-items"
            @click.native="toggleMenu"
            class="opacity-100"
            >Found Items</NuxtLink
          >
        </div>
        <div v-show="isAdminLogin">
          <NuxtLink
            to="/register"
            @click.native="toggleMenu"
            class="opacity-100"
            >Register</NuxtLink
          >
        </div>
        <div v-show="isAdminLogin">
          <div @click="logoutAdmin('mobile')" class="opacity-100">Logout</div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
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
.appbar-container {
  z-index: 100;
  @apply flex items-center py-2 px-6 md:px-10 w-full bg-white shadow-lg;

  .logo-main-container {
    @apply flex items-center;
  }

  .logo-container {
    @apply py-4;

    .logo {
      @apply pr-4 py-2 font-bold;
    }
  }

  .menu {
    @apply px-4 py-2 text-gray-500 rounded-lg font-medium;

    &.nuxt-link-exact-active {
      @apply bg-orange-100 text-orange-700;
    }
  }
  .menu:hover {
    @apply text-orange-700;
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

@media screen and (max-width: 767px) {
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
}
</style>