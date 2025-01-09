<template>
  <div class="fixed top-0 left-1/2 transform -translate-x-1/2 p-4 space-y-2">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="`bg-${toast.color}-500 text-white p-3 rounded shadow`"
    >
      <strong>{{ toast.title }}</strong>
      <p>{{ toast.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMessage } from "~/composables/useMessage";

const { toasts } = useMessage();
</script>