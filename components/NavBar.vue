<template>
  <div>
    <nav>
      <div class="appbar-container justify-between md:justify-start">
        <div class="logo-main-container">
          <div class="logo-container">
            <NuxtLink to="/" class="logo">Lost & Found</NuxtLink>
          </div>
        </div>
        <div class="link-container">
          <NuxtLink to="/found-items" class="btn">Found Items</NuxtLink>
        </div>
        <div class="link-container">
          <NuxtLink to="/login" class="btn">Login</NuxtLink>
        </div>
        <div class="drawer-container">
          <div class="icon-container" @click="toggleMenu">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
          </div>
        </div>
      </div>
      <div v-show="menuVisible" class="mobile-menu">
        <div>
          <NuxtLink to="/found-items" class="opacity-100">Found Items</NuxtLink>
        </div>
        <div>
          <NuxtLink to="/login" class="opacity-100">Login</NuxtLink>
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
    };
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
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

  .btn {
    @apply px-4 py-2 text-gray-500 rounded-lg font-medium;

    &.nuxt-link-exact-active {
      @apply bg-orange-100 text-orange-700;
    }
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
    @apply block py-3 fixed w-full bg-white shadow-lg px-6;
  }
}
</style>