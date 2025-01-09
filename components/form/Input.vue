<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  label: string,
  name: string,
  modelValue: string,
  type?: string
}>()

const emit = defineEmits(['update:modelValue'])

const inputAttrs = {
  type: props.type || 'text'
}

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <UFormGroup :label="label" :name="name">
    <UInput
      :id="name"
      :value="modelValue"
      @input="updateValue"
      v-bind="inputAttrs"
      @update:modelValue="updateValue"
    />
  </UFormGroup>
</template>

<style scoped>
</style>