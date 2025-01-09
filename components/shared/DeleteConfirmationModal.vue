<template>
  <UModal :model-value="showModal" @update:model-value="updateShowModal">
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">Confirm Deletion</h3>
      </template>

      <div class="p-4">
        <p>Are you sure you want to delete this user? This action cannot be undone.</p>
      </div>

      <template #footer>
      <div class="flex justify-end space-x-2">
        <UButton color="gray" @click="cancel">Cancel</UButton>
        <UButton color="red" @click="confirm">Delete</UButton>
      </div>
</template>
</UCard>
</UModal>
</template>

<script setup lang="ts">
const props = defineProps({
  showModal: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:showModal', 'confirm'])

const updateShowModal = (value: boolean) => {
  emit('update:showModal', value)
}

const cancel = () => {
  emit('update:showModal', false)
}

const confirm = () => {
  emit('confirm')
  emit('update:showModal', false)
}
</script>