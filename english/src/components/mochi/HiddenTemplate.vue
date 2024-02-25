<template #body="slotProps">
  <div @click="$emit('event-update-show')">
    <p v-if="show">
      <slot>{{ data }}</slot>
    </p>
    <p v-else>
      {{ Array.from({ length: data.length }).reduce((acc) => acc + 'x', '') }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'HidenTeamplate',
  props: {
    data: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
