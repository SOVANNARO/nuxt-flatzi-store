<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" type="email" />
    </UFormGroup>
    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>
    <Select
      label="Role"
      name="role"
      v-model="state.role"
      :options="['customer', 'admin']"
    />
    <UFormGroup label="Avatar" name="avatar">
      <UInput v-model="state.avatar" />
    </UFormGroup>
    <div class="flex justify-end">
      <UButton type="button" @click="cancel" color="gray" class="mr-2">Cancel</UButton>
      <UButton type="submit" color="primary">{{ props.user ? 'Update' : 'Create' }}</UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import type { User } from "~/types/user";
import Select from "~/components/form/Select.vue";

const props = defineProps<{
  user: User | null,
  loading: boolean
}>()

const emit = defineEmits(['submit', 'cancel'])

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(5, 'Must be at least 5 characters'),
  role: z.string().min(1, 'Role is required'),
  avatar: z.string().url('Invalid URL')
})

type Schema = z.output<typeof schema>

const state = reactive<Schema>({
  name: '',
  email: '',
  password: '',
  role: '',
  avatar: ''
})

watch(() => props.user, (newUser) => {
  if (newUser) {
    Object.assign(state, newUser)
  } else {
    Object.assign(state, {
      name: '',
      email: '',
      password: '',
      role: '',
      avatar: ''
    })
  }
}, { immediate: true })

async function onSubmit(event: FormSubmitEvent<Schema>) {
  emit('submit', event.data)
}

const cancel = () => {
  emit('cancel')
}
</script>