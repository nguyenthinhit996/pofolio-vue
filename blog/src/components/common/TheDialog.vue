<template>
  <div class="flex justify-center">
    <Dialog
      :visible="visible"
      modal
      :header="header"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      @update:visible="$emit('close-dialog')"
    >
      <slot name="body"></slot>
      <slot></slot>
      <slot name="footer"></slot>
    </Dialog>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    header: {
      type: String,
      default: 'Header'
    }
  }
}
</script>
