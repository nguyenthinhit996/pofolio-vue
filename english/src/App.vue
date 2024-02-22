<template>
  <div>
    <the-header abc="hihihi" />
    <router-view></router-view>
    <the-auth />
  </div>
</template>

<script>
import TheHeader from '@/components/common/TheHeader.vue'
import TheAuth from '@/components/common/TheAuth.vue'

export default {
  name: 'AppMain',
  components: {
    TheHeader,
    TheAuth
  }
}
</script>

<style lang="scss" scoped></style>
