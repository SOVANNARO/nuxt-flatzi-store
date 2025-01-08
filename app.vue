<template>
  <div>
    <UTable
      :rows="rows"
      :loading="loading"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
      :progress="{ color: 'primary', animation: 'carousel' }"
      class="w-full"
      :columns="[
        { key: 'id', label: 'ID', width: '50px' },
        { key: 'name', label: 'Name', width: '150px' },
        { key: 'email', label: 'Email', width: '200px' },
        { key: 'role', label: 'Role', width: '100px' },
        { key: 'creationAt', label: 'Creation At', width: '150px' },
        { key: 'updatedAt', label: 'Updated At', width: '150px' },
        { key: 'actions', label: 'Actions', width: '100px' }
      ]"
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
      <UPagination v-model="page" :page-count="pageCount" :total="userStore.users.length" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { onMounted, ref, computed } from 'vue'
import {
  EllipsisVerticalIcon
} from '@heroicons/vue/20/solid'
import { formatDate } from "~/utils/helper";

const userStore = useUserStore()
const page = ref(1)
const pageCount = 5
const loading = ref(true)

const rows = computed(() => {
  return userStore.users.slice((page.value - 1) * pageCount, page.value * pageCount).map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    creationAt: formatDate(user.creationAt),
    updatedAt: formatDate(user.updatedAt)
  }))
})

const items = (row: any) => [
  [
    {
      label: 'View Detail',
      icon: 'i-heroicons-eye-20-solid',
      click: () => {
        console.log('View Detail', row.id)
      }
    }
  ],
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => {
        console.log('Edit', row.id)
      }
    }
  ],
  [
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click: () => {
        console.log('Delete', row.id)
      }
    }
  ]
]

onMounted(async () => {
  await userStore.fetchUsers()
  loading.value = false
})
</script>

<style scoped>
/* Add your styles here */
</style>