<template>
  <div class="bg-white footer-container">
    <div class="flex px-6 pt-8 md:px-10 items-center justify-between">
      <div>
        <img
          class="nav-logo"
          src="../assets/images/found-shelf-icon.svg"
          alt="Found Shelf"
        />
      </div>
      <div>
        <div class="flex space-x-4">
          <a
            class="
              w-10
              h-10
              bg-gray-600 bg-opacity-10
              hover:bg-opacity-20
              transition-all
              flex
              items-center
              justify-center
              rounded-full
              focus:outline-none
              focus:ring-offset-gray-60
              focus:ring-2
              focus:ring-offset-1
              focus:ring-gray-600
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="purple" class="bi bi-twitter" viewBox="0 0 16 16"> <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/> </svg>
          </a>
          <a
            class="
              w-10
              h-10
              bg-gray-600 bg-opacity-10
              hover:bg-opacity-20
              transition-all
              flex
              items-center
              justify-center
              rounded-full
              focus:outline-none
              focus:ring-offset-gray-60
              focus:ring-2
              focus:ring-offset-1
              focus:ring-gray-600
            "
          >
            <svg viewBox="0 0 512 512" width="16" height="16" fill="purple"><path d="M211.9 197.4h-36.7v59.9h36.7V433.1h70.5V256.5h49.2l5.2-59.1h-54.4c0 0 0-22.1 0-33.7 0-13.9 2.8-19.5 16.3-19.5 10.9 0 38.2 0 38.2 0V82.9c0 0-40.2 0-48.8 0 -52.5 0-76.1 23.1-76.1 67.3C211.9 188.8 211.9 197.4 211.9 197.4z"/></svg>
          </a>
        </div>
      </div>
    </div>
    <div class="mt-5 flex px-6 py-5 text-white font-bold md:px-10 bg-accent-100 items-center justify-between">
      <div class="flex sm:flex-row flex-col gap-4">
        <p class="cursor-pointer">About Us</p>
        <p class="cursor-pointer">Contact Us</p>
      </div>
      <div class="flex sm:flex-row flex-col gap-4">
        <p class="cursor-pointer">Terms of service</p>
        <p class="cursor-pointer">Privacy policy</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer-container {
  -webkit-box-shadow: 0px 0px 39px -15px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 39px -15px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 39px -15px rgba(0, 0, 0, 0.75);
}

.nav-logo {
  width: 80px;
}

@media screen and (max-width: 810px) {
  .nav-logo {
    width: 70px;
  }
}
</style>