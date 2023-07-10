<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon-'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '1em'
  },
  height: {
    type: String,
    default: '1em'
  }
})
</script>

<template>
  <svg class="icon" :style="{ width, height }" aria-hidden="true">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<style scoped lang="scss">
.icon {
  vertical-align: -0.15em;
  overflow: hidden;
}
</style>
