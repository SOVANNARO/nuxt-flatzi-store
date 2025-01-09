<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <Input v-model="state.name" label="Name" name="name" />
    <Input v-model="state.image" label="Image URL" name="image" type="url" />
    <div class="flex justify-end">
      <Button @click="cancel" label="Cancel" color="gray" buttonClass="mr-2" />
      <Button type="submit" :label="props.category ? 'Update' : 'Create'" color="primary" />
    </div>
  </UForm>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';
import type { Category } from '~/types/category';
import Input from "~/components/form/Input.vue";
import Button from "~/components/form/Button.vue";

const props = defineProps<{
  category: Category | null;
  loading: boolean;
}>();

const emit = defineEmits(['submit', 'cancel']);

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  image: z.string().url('Invalid URL')
});

type Schema = z.output<typeof schema>;

const state = reactive<Schema>({
  name: '',
  image: ''
});

watch(() => props.category, (newCategory) => {
  if (newCategory) {
    Object.assign(state, newCategory);
  } else {
    Object.assign(state, {
      name: '',
      image: ''
    });
  }
}, { immediate: true });

async function onSubmit(event: FormSubmitEvent<Schema>) {
  emit('submit', event.data);
}

const cancel = () => {
  emit('cancel');
};
</script>
