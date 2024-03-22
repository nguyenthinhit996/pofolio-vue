<template>
  <div>
    <p>ReviewPost {{ show() }}</p>
    <div v-html="data"></div>
  </div>
</template>

<script>
import { usePostStore } from '@/stores/post'

export default {
  name: 'ReviewPost',
  data() {
    return {
      data: usePostStore().showData
    }
  },
  methods: {
    show() {
      console.log('data', this.data)
    }
  }
}
</script>

<style lang="scss" scoped></style>
