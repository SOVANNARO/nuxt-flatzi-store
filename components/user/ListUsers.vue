<template>
  <div>
    <UContainer>
      <div class="space-y-6">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold">User Management</h1>
          <Button @click="showCreateModal = true" label="Create User" color="primary" />
        </div>

        <SearchInput
          v-model="searchQuery"
          placeholder="Search users..."
          inputClass="w-1/4"
          icon="i-heroicons-magnifying-glass-20-solid"
        />

        <Table
          :rows="filteredRows"
          :loading="loading"
          :columns="columns"
          :items="items"
          v-model:page="page"
          :page-count="pageCount"
          :total="userStore.users.length"
        />
      </div>
    </UContainer>

    <UModal v-model="showCreateModal">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Create User</h3>
        </template>

        <UserForm
          :user="null"
          :loading="loading"
          @submit="handleSubmit"
          @cancel="closeModal"
        />
      </UCard>
    </UModal>

    <UModal v-model="showEditModal">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Edit User</h3>
        </template>

        <UserForm
          :user="selectedUser"
          :loading="loading"
          @submit="handleSubmit"
          @cancel="closeModal"
        />
      </UCard>
    </UModal>

    <UserDetailsModal
      :user="selectedUser"
      v-model:showModal="showViewModal"
    />

    <DeleteConfirmationModal
      :showModal="showDeleteModal"
      @update:showModal="showDeleteModal = $event"
      @confirm="confirmDelete"
    />

    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { onMounted, ref, computed } from 'vue'
import { formatDate } from "~/utils/helper";
import type { User } from '~/types/user'
import { useMessage } from "~/composables/useMessage";
import ToastContainer from "~/components/shared/ToastContainer.vue";
import UserDetailsModal from "~/components/user/UserDetailsModal.vue";
import DeleteConfirmationModal from "~/components/shared/DeleteConfirmationModal.vue";
import SearchInput from "~/components/form/SearchInput.vue";
import Table from "~/components/shared/Table.vue";
import Button from "~/components/form/Button.vue";

const userStore = useUserStore()
const page = ref(1)
const pageCount = 5
const loading = ref(true)
const showCreateModal = ref(false)
const showViewModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedUser = ref<User | null>(null)
const searchQuery = ref('')

const { add: addToast } = useMessage()

const filteredRows = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return userStore.users
    .filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    )
    .slice((page.value - 1) * pageCount, page.value * pageCount)
    .map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      creationAt: formatDate(user.creationAt),
      updatedAt: formatDate(user.updatedAt)
    }))
})

const columns = [
  { key: 'id', label: 'ID', width: '50px' },
  { key: 'name', label: 'Name', width: '150px' },
  { key: 'email', label: 'Email', width: '200px' },
  { key: 'role', label: 'Role', width: '100px' },
  { key: 'creationAt', label: 'Created At', width: '150px' },
  { key: 'updatedAt', label: 'Updated At', width: '150px' },
  { key: 'actions', label: 'Actions', width: '50px' }
]

const items = (row: User) => [
  [
    {
      label: 'View Detail',
      icon: 'i-heroicons-eye-20-solid',
      click: () => handleView(row)
    }
  ],
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => handleEdit(row)
    }
  ],
  [
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click: () => handleDelete(row)
    }
  ]
]

const closeModal = (): void => {
  showCreateModal.value = false
  showEditModal.value = false
  selectedUser.value = null
}

const handleView = async (user: User) => {
  await userStore.fetchUserById(user.id)
  selectedUser.value = userStore.user
  showViewModal.value = true
}

const handleEdit = async (user: User) => {
  await userStore.fetchUserById(user.id)
  selectedUser.value = userStore.user
  showEditModal.value = true
}

const handleDelete = async (user: User) => {
  selectedUser.value = user
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (selectedUser.value) {
    try {
      await userStore.deleteUser(selectedUser.value.id)
      addToast({
        title: 'Success',
        description: 'User deleted successfully',
        color: 'green'
      })
    } catch (error) {
      addToast({
        title: 'Error',
        description: (error as Error).message,
        color: 'red'
      })
    }
    selectedUser.value = null
    showDeleteModal.value = false
  }
}

const handleSubmit = async (formData: Partial<User>) => {
  try {
    if (selectedUser.value) {
      await userStore.updateUser(selectedUser.value.id, formData)
    } else {
      const newUser = {
        email: formData.email || '',
        password: formData.password || '',
        name: formData.name || '',
        role: formData.role || '',
        avatar: formData.avatar || ''
      }
      await userStore.createUser(newUser)
    }
    closeModal()
    addToast({
      title: 'Success',
      description: `User ${selectedUser.value ? 'updated' : 'created'} successfully`,
      color: 'green'
    })
    await userStore.fetchUsers()
  } catch (error) {
    addToast({
      title: 'Error',
      description: (error as Error).message,
      color: 'red'
    })
  }
}

onMounted(async () => {
  await userStore.fetchUsers()
  loading.value = false
})
</script>
