<script setup lang="ts">
import type { Category } from '~/types/category';

const props = defineProps<{
  category: Category | null;
  showModal: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:showModal', value: boolean): void;
}>();

const closeModal = () => {
  emit('update:showModal', false);
};

const handleUpdate = (value: boolean) => {
  emit('update:showModal', value);
};
</script>

<template>
  <UModal
    :model-value="showModal"
    @update:model-value="handleUpdate"
  >
    <UCard v-if="category">
      <template #header>
        <h3 class="text-lg font-semibold">Category Details</h3>
      </template>

      <div class="space-y-4">
        <img
          :src="category.image"
          :alt="category.name"
          class="w-32 h-32 rounded-full mx-auto"
        />
        <dl class="grid grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Name</dt>
            <dd class="text-lg">{{ category.name }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Created At</dt>
            <dd class="text-lg">{{ new Date(category.creationAt).toLocaleDateString() }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Updated At</dt>
            <dd class="text-lg">{{ new Date(category.updatedAt).toLocaleDateString() }}</dd>
          </div>
        </dl>
      </div>

      <template #footer>
        <UButton @click="closeModal">Close</UButton>
      </template>
    </UCard>
  </UModal>
</template>
