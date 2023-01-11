<template>
  <div>
    <div
      @click="socialShare('twitter')"
      class="
        w-36
        cursor-pointer
        hover:bg-gray-200
        py-3
        px-3
        flex
        gap-2
        items-center
      "
    >
      <img src="../../assets/images/twitter-logo.png" class="w-7" alt="twitter">
      <p class="uppercase text-xs text-gray-700">Twitter</p>
    </div>
    <div
      @click="socialShare('facebook')"
      class="
        w-36
        cursor-pointer
        hover:bg-gray-200
        py-3
        px-3
        flex
        gap-2
        items-center
      "
    >
      <img
        src="../../assets/images/facebook-logo.png"
        class="w-7"
        alt="facebook"
      >
      <p class="uppercase text-xs text-gray-700">Facebook</p>
    </div>
    <div
      @click="socialShare('email')"
      class="
        w-36
        cursor-pointer
        hover:bg-gray-200
        py-3
        px-3
        flex
        gap-2
        items-center
      "
    >
      <BaseIcon icon="envelope" class="w-7" color="black" />
      <p class="uppercase text-xs text-gray-700">Email</p>
    </div>
    <div
      @click="socialShare('copy')"
      class="
        w-36
        cursor-pointer
        hover:bg-gray-200
        py-3
        px-3
        flex
        gap-2
        items-center
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="black"
        class="w-7 bi bi-link"
        viewBox="0 0 16 16"
      >
        <path
          d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"
        />
        <path
          d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"
        />
      </svg>
      <p class="uppercase text-xs text-gray-700">Copy</p>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        socialShare(platform) {
            this.$emit("social-share", platform);
        }
    }
}
</script>