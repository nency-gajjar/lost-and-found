<template>
  <div>
    <div class="mx-auto pt-32">
      <div class="text-center z-20">
        <h1 class="text-9xl sm:text-10xl font-medium mb-8 text-accent-200">{{ error.statusCode}}</h1>
        <p class="text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight text-gray-700">Page not found: {{$route.fullPath}}</p>
        <div class="w-full flex items-center justify-center">
            <NuxtLink to="/" class="relative border border-gray-700 text-md sm:text-xl py-2 px-4 text-gray-700 sm:py-3 sm:px-6 cursor-pointer">Go back home</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'error-layout',
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>