<template>
    <footer class="bg-gray-900 w-full text-gray-300 py-12 m-auto">
      <div class="container mx-auto px-6 text-center md:flex md:justify-between md:items-center">
        <div class="mb-6 md:mb-0">
          <p class="text-sm">&copy; {{ new Date().getFullYear() }} Wati. All rights reserved.</p>
        </div>
        <div class="flex justify-center space-x-8 text-sm font-medium">
          <a href="#" class="hover:text-white transition">Privacy Policy</a>
          <a href="#" class="hover:text-white transition">Terms of Service</a>
          <a href="#" class="hover:text-white transition">Contact Us</a>
        </div>
      </div>
    </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>