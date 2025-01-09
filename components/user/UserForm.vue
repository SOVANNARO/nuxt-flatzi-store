<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <Input v-model="state.name" label="Name" name="name" />
    <Input v-model="state.email" label="Email" name="email" type="email" />
    <Input v-model="state.password" label="Password" name="password" type="password" />
    <Select
      label="Role"
      name="role"
      v-model="state.role"
      :options="['customer', 'admin']"
    />
    <Input v-model="state.avatar" label="Avatar" name="avatar" />
    <div class="flex justify-end">
      <Button @click="cancel" label="Cancel" color="gray" buttonClass="mr-2" />
      <Button type="submit" :label="props.user ? 'Update' : 'Create'" color="primary" />
    </div>
  </UForm>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import type { User } from "~/types/user";
import Select from "~/components/form/Select.vue";
import Input from "~/components/form/Input.vue";
import Button from "~/components/form/Button.vue";

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