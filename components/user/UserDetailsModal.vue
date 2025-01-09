<template>
  <UModal
    :model-value="showModal"
    @update:model-value="handleUpdate"
  >
    <UCard v-if="user">
      <template #header>
        <h3 class="text-lg font-semibold">User Details</h3>
      </template>

      <div class="space-y-4">
        <img
          :src="user.avatar"
          :alt="user.name"
          class="w-32 h-32 rounded-full mx-auto"
        />
        <dl class="grid grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Name</dt>
            <dd class="text-lg">{{ user.name }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Email</dt>
            <dd class="text-lg">{{ user.email }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Role</dt>
            <dd class="text-lg">{{ user.role }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Created At</dt>
            <dd class="text-lg">{{ new Date(user.creationAt).toLocaleDateString() }}</dd>
          </div>
        </dl>
      </div>

      <template #footer>
        <UButton @click="closeModal">Close</UButton>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import type { User } from '~/types/user';

const props = defineProps<{
  user: User | null;
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

