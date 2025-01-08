<template>
  <div>
    <UTable
      :rows="rows"
      :loading="loading"
      :loading-state="loadingState"
      :progress="progress"
      class="w-full"
      :columns="columns"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  rows: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    required: true
  },
  loadingState: {
    type: Object,
    default: () => ({ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' })
  },
  progress: {
    type: Object,
    default: () => ({ color: 'primary', animation: 'carousel' })
  },
  columns: {
    type: Array,
    required: true
  }
})
</script>