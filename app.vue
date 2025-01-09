<script setup lang="ts">
import ListUsers from '~/components/user/ListUsers.vue'
import ListCategories from "~/components/category/ListCategories.vue";

const items = [
  { slot: 'users', label: 'Users' },
  { slot: 'categories', label: 'categories' }
]
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <UTabs :items="items" class="w-full">
      <template #users>
        <UCard>
          <ListUsers />
        </UCard>
      </template>
      <template #categories>
        <UCard>
          <ListCategories />
        </UCard>
      </template>
    </UTabs>
  </div>
</template>