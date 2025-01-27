<template>
  <div class="flex flex-col py-20 lg:py-40 justify-center items-center mx-6 lg:mx-16">
    <h1 class="text-2xl lg:text-4xl font-bold text-center mb-12">📸 ScrapeShot</h1>
    
    <div class="w-full max-w-7xl">
      <div class="w-full pt-4 space-y-10">
        <div class="grid grid-cols-2 w-full gap-6">
          <!-- URL Input -->
          <div class="col-span-2">
            <label for="page_url" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Page URL</label>
            <input 
              v-model="form.pageUrl"
              type="url"
              id="page_url"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="https://google.com/"
              required
            />
          </div>

          <!-- Width Input -->
          <div>
            <label for="image_width" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Width</label>
            <input 
              v-model.number="form.width"
              type="number"
              id="image_width"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1920"
              required
            />
          </div>

          <!-- Height Input -->
          <div>
            <label for="image_height" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Height</label>
            <input 
              v-model.number="form.height"
              type="number"
              id="image_height"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1080"
              required
            />
          </div>

          <!-- Fullscreen Toggle -->
          <label class="inline-flex items-center cursor-pointer w-fit">
            <input 
              v-model="form.fullPage"
              type="checkbox" 
              class="sr-only peer"
            >
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 select-none">Fullscreen</span>
          </label>
        </div>

        <!-- Submit Button -->
        <button 
          @click="getPageScreenshot"
          :disabled="form.pageUrl === '' || isLoading"
          type="submit"
          class="text-white disabled:bg-blue-800/70 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {{isLoading ? 'Loading...' : 'Get Screenshot'}}
        </button>

        <!-- Preview -->
        <img 
          v-if="screenshotUrl"
          class="mt-2 w-full object-cover border border-dashed border-gray-400 rounded-lg" 
          :src="screenshotUrl"
        >

        <div v-if="!screenshotUrl" class="w-full justify-center flex flex-col h-64 border border-dashed border-gray-400 rounded-lg">
          <span class="text-gray-400 text-center">{{isLoading ? 'Getting Screenshot...' : 'No screenshot yet'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'


useHead({
  title: 'ScrapeShot'
})

const form = reactive({
  pageUrl: '',
  width: 1920,
  height: 1080,
  fullPage: false
})

const screenshotUrl = ref('')
const isLoading = ref(false)

const getPageScreenshot = async () => {
  try {
    screenshotUrl.value = ''
    isLoading.value = true
    const response = await $fetch('/api/analyse/screenshot', {
      method: 'POST',
      body: form,
      headers: {
        'Content-Type': 'application/json'
      },
    })

    screenshotUrl.value = response.screenshotBase64
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    console.error(error)
  }
}
</script>
