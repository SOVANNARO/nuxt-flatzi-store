<template>
  <UFormGroup :label="label" :name="name">
    <UInput v-model="localValue" :type="type" @input="updateValue" />
  </UFormGroup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  }
})

const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)

const updateValue = (event: Event) => {
  localValue.value = (event.target as HTMLInputElement).value
  emit('update:modelValue', localValue.value)
}

watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue
})
</script>
