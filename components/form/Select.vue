<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  label: string,
  name: string,
  modelValue: string,
  options: string[],
}>()

const emit = defineEmits(['update:modelValue'])

const updateValue = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <UFormGroup :label="label" :name="name">
    <USelect
      :id="name"
      variant="outline"
      :options="options"
      :value="modelValue"
      @update:modelValue="updateValue"
    />
  </UFormGroup>
</template>
