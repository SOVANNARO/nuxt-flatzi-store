<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useCategoryStore } from '~/stores/category';
import { useMessage } from "~/composables/useMessage";
import { formatDate } from "~/utils/helper";
import type { Category } from '~/types/category';
import SearchInput from "~/components/form/SearchInput.vue";
import Table from "~/components/shared/Table.vue";
import ToastContainer from "~/components/shared/ToastContainer.vue";
import DeleteConfirmationModal from "~/components/shared/DeleteConfirmationModal.vue";
import CategoryForm from "~/components/category/CategoryForm.vue";
import CategoryDetailsModal from "~/components/category/CategoryDetailsModal.vue";
import Button from "~/components/form/Button.vue";

const categoryStore = useCategoryStore();
const page = ref(1);
const pageCount = 5;
const loading = ref(true);
const showCreateModal = ref(false);
const showViewModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const selectedCategory = ref<Category | null>(null);
const searchQuery = ref('');

const { add: addToast } = useMessage();

const filteredRows = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return categoryStore.categories
    .filter(category =>
      category.name.toLowerCase().includes(query)
    )
    .slice((page.value - 1) * pageCount, page.value * pageCount)
    .map(category => ({
      id: category.id,
      name: category.name,
      image: category.image,
      creationAt: formatDate(category.creationAt),
      updatedAt: formatDate(category.updatedAt)
    }));
});

const columns = [
  { key: 'id', label: 'ID', width: '50px' },
  { key: 'name', label: 'Name', width: '150px' },
  { key: 'image', label: 'Image', width: '200px' },
  { key: 'creationAt', label: 'Created At', width: '150px' },
  { key: 'updatedAt', label: 'Updated At', width: '150px' },
  { key: 'actions', label: 'Actions', width: '50px' }
];

const items = (row: Category) => [
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
];

const closeModal = (): void => {
  showCreateModal.value = false;
  showEditModal.value = false;
  selectedCategory.value = null;
};

const handleView = async (category: Category) => {
  await categoryStore.fetchCategoryById(category.id);
  selectedCategory.value = categoryStore.category;
  showViewModal.value = true;
};

const handleEdit = async (category: Category) => {
  await categoryStore.fetchCategoryById(category.id);
  selectedCategory.value = categoryStore.category;
  showEditModal.value = true;
};

const handleDelete = async (category: Category) => {
  selectedCategory.value = category;
  showDeleteModal.value = true;
};

const confirmDelete = async () => {
  if (selectedCategory.value) {
    try {
      await categoryStore.deleteCategory(selectedCategory.value.id);
      addToast({
        title: 'Success',
        description: 'Category deleted successfully',
        color: 'green'
      });
    } catch (error) {
      addToast({
        title: 'Error',
        description: (error as Error).message,
        color: 'red'
      });
    }
    selectedCategory.value = null;
    showDeleteModal.value = false;
  }
};

const handleSubmit = async (formData: Partial<Category>) => {
  try {
    if (selectedCategory.value) {
      await categoryStore.updateCategory(selectedCategory.value.id, formData);
    } else {
      const newCategory = {
        name: formData.name || '',
        image: formData.image || ''
      };
      await categoryStore.createCategory(newCategory);
    }
    closeModal();
    addToast({
      title: 'Success',
      description: `Category ${selectedCategory.value ? 'updated' : 'created'} successfully`,
      color: 'green'
    });
    await categoryStore.fetchCategories();
  } catch (error) {
    addToast({
      title: 'Error',
      description: (error as Error).message,
      color: 'red'
    });
  }
};

onMounted(async () => {
  await categoryStore.fetchCategories();
  loading.value = false;
});
</script>

<template>
  <UContainer>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">Categories Management</h1>
        <Button @click="showCreateModal = true" label="Create Category" color="primary" />
      </div>

      <SearchInput
        v-model="searchQuery"
        placeholder="Search categories..."
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
        :total="categoryStore.categories.length"
      />
    </div>
  </UContainer>

  <UModal v-model="showCreateModal">
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">Create Category</h3>
      </template>

      <CategoryForm
        :category="null"
        :loading="loading"
        @submit="handleSubmit"
        @cancel="closeModal"
      />
    </UCard>
  </UModal>

  <UModal v-model="showEditModal">
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">Edit Category</h3>
      </template>

      <CategoryForm
        :category="selectedCategory"
        :loading="loading"
        @submit="handleSubmit"
        @cancel="closeModal"
      />
    </UCard>
  </UModal>

  <CategoryDetailsModal
    :category="selectedCategory"
    v-model:showModal="showViewModal"
  />

  <DeleteConfirmationModal
    :showModal="showDeleteModal"
    @update:showModal="showDeleteModal = $event"
    @confirm="confirmDelete"
  />

  <ToastContainer />
</template>
