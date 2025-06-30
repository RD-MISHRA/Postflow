<template>
  <div class="flex">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 w-64 h-screen bg-white text-gray-800 shadow-xl rounded-r-2xl p-6 z-50 flex flex-col lg:relative lg:translate-x-0 lg:rounded-none">
      <div class="flex items-center pb-6 mb-6 border-b border-gray-200">
        <h2 class="text-3xl font-extrabold text-blue-400 tracking-tight flex items-center">
          <img
            src="https://res.cloudinary.com/dbzwx9a7b/image/upload/v1750580149/Screenshot_2025-06-22_134532_cmnzyn.png"
            alt="PostFlow Logo"
            class="h-9 w-auto mr-3 drop-shadow-sm"
          />
          PostFlow
        </h2>
      </div>

      <nav class="flex-grow">
        <ul class="space-y-3">
          <li>
            <router-link
              to="/dashboard/create-post"
              class="flex items-center p-3 text-lg font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <img src="https://cdn-icons-png.flaticon.com/128/3161/3161837.png" class="w-6 h-6 mr-4" />
              Create Post
            </router-link>
          </li>

          <li>
            <a href="#" class="flex items-center p-3 text-lg font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
              <font-awesome-icon :icon="['fas', 'bookmark']" class="mr-4 text-xl" /> Saved Posts
            </a>
          </li>

          <li>
            <a href="#" class="flex items-center p-3 text-lg font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
              <font-awesome-icon :icon="['fas', 'upload']" class="mr-4 text-xl" /> Published Posts
            </a>
          </li>

          <li>
            <a href="#" class="flex items-center p-3 text-lg font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
              <font-awesome-icon :icon="['fas', 'link']" class="mr-4 text-xl" /> Connect <img src="https://cdn-icons-png.flaticon.com/128/5968/5968830.png" alt="Connect Icon" class="w-6 h-6 ml-2"><img src="https://cdn-icons-png.flaticon.com/128/3536/3536505.png" alt="Connect Icon" class="w-6 h-6 ml-2"><img src="https://cdn-icons-png.flaticon.com/128/14463/14463575.png" alt="Connect Icon" class="w-6 h-6 ml-2">
            </a>
          </li>

          <li>
            <a href="#" class="flex items-center p-3 text-lg font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
              <font-awesome-icon :icon="['fas', 'clock']" class="mr-4 text-xl" /> Scheduled Posts
            </a>
          </li>

          <li>
            <a href="#" class="flex items-center p-3 text-lg font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
              <img src="https://cdn-icons-png.flaticon.com/128/747/747310.png" alt="Analytics Icon" class="w-6 h-6 mr-4">
              <font-awesome-icon :icon="['fas', 'calendar-alt']" class="mr-4 text-xl" /> Calendar
            </a>
          </li>
        </ul>
      </nav>

      <div class="mt-auto pt-6 border-t border-gray-200">
        <a href="#" class="flex items-center p-2 rounded-lg hover:bg-blue-50 transition duration-300 ease-in-out">
          <img src="https://placehold.co/40x40/60a5fa/ffffff?text=J" alt="User Avatar" class="w-12 h-12 rounded-full mr-4 border-2 border-blue-400 shadow-md">
          <div>
            <p class="font-extrabold text-xl text-gray-900">John Doe</p>
            <p class="text-sm text-blue-500">Admin</p>
          </div>
        </a>
      </div>
    </div>

    <!-- Main content area -->
    <main class="flex-1  overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script>

export default {
  name: "DashBoard",
};
</script>
