<template>
  <div>
    <Button v-if="!saving" label="Saved" icon="pi pi-check" />
    <Button v-else label="AutoSave" :loading="true" />
  </div>
</template>

<script>
import Button from 'primevue/button'
export default {
  name: 'ButtonAutoSave',
  props: {
    saving: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
