<template>
  <div>
    <nav>
      <div class="appbar-container">
        <div class="logo-main-container">
          <div class="logo-container">
            <NuxtLink to="/" class="logo">Lost & Found</NuxtLink>
          </div>
        </div>
        <div class="link-container">
          <NuxtLink to="/found-items" class="btn">Found Items</NuxtLink>
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
  @apply flex  items-center py-2 px-10 fixed w-full bg-white shadow-lg;
  .logo-main-container {
    @apply flex items-center;
  }
  .logo-container {
    @apply p-4;
    .logo {
      @apply px-4 py-2 font-bold;
    }
  }
  .btn {
    @apply px-4 py-2 text-gray-500 rounded-lg hover:bg-indigo-100 hover:text-indigo-700;
    &.nuxt-link-exact-active {
      @apply bg-indigo-100 text-indigo-700;
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

@media screen and (max-width: 726px) {
  .link-container {
    @apply hidden;
  }
  .drawer-container {
    @apply block;
  }
  .mobile-menu {
    z-index: 99;
    @apply block pt-24 pb-3 fixed w-full bg-white shadow-lg px-16;
  }
}
</style>