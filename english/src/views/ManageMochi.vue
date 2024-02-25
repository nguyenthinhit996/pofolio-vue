<template>
  <div class="bg-slate-100 flex-col justify-center">
    <management-sumary />
    <managerment-board />
  </div>
</template>

<script>
import ManagermentBoard from '@/components/mochi/Management.vue'
import ManagementSumary from '@/components/mochi/ManagementSumary.vue'

export default {
  name: 'MochiView',
  components: {
    ManagermentBoard,
    ManagementSumary
  }
}
</script>

<style lang="scss" scoped></style>
