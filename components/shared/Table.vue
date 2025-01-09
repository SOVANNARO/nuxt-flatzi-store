<template>
  <div>
    <UTable
      :rows="rows"
      :loading="loading"
      :loading-state="loadingState"
      :progress="progress"
      class="w-full"
      :columns="columns"
    >
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)" :popper="{ placement: 'bottom-start' }">
          <UButton color="gray" variant="ghost">
            <EllipsisVerticalIcon class="w-5 h-5" />
          </UButton>
        </UDropdown>
      </template>
    </UTable>

    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <UPagination
        :model-value="page"
        :page-count="pageCount"
        :total="total"
        @update:model-value="handlePageUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  rows: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
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
  },
  items: {
    type: Function,
    required: true
  },
  page: {
    type: Number,
    default: 1
  },
  pageCount: {
    type: Number,
    default: 5
  },
  total: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:page'])

const handlePageUpdate = (newValue: number) => {
  emit('update:page', newValue)
}

watch(() => props.page, (newValue) => {
  emit('update:page', newValue)
})
</script>
