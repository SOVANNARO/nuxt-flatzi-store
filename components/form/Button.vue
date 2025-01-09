<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'primary'
  },
  buttonClass: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <UButton type="button" @click="handleClick" :color="color" :class="buttonClass">
    {{ label }}
  </UButton>
</template>

