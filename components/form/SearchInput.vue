<template>
  <div class="mb-4">
    <UInput
      v-model="localValue"
      type="text"
      :placeholder="placeholder"
      :class="inputClass"
      :icon="icon"
      @input="updateValue"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Search...'
  },
  inputClass: {
    type: String,
    default: 'w-1/4'
  },
  icon: {
    type: String,
    default: 'i-heroicons-magnifying-glass-20-solid'
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
