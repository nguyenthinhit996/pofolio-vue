<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <a class="text-white font-bold uppercase text-2xl mr-4" href="#">Music</a>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <a class="px-2 text-white" @click.prevent="toggleAuth">Login / Register</a>
          </li>
          <li>
            <router-link class="px-2 text-white" to="/manage">Manage</router-link>
          </li>
          <li>
            <router-link class="px-2 text-white" to="/mochi">Go to Mochi</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapWritableState } from 'pinia'
import { useModalStore } from '@/stores/modal'
// import { ManagermentBoard } from '@/components/mochi/Management.vue'

export default {
  name: 'TheHeader',
  computed: {
    ...mapWritableState(useModalStore, {
      isOpenModalAuth: 'isOpen'
    })
  },
  methods: {
    toggleAuth() {
      this.isOpenModalAuth = !this.isOpenModalAuth
    }
  },
  components: {
    // ManagermentBoard
  },
  props: {
    abc: String
  },
  mounted() {
    console.log('props', this.abc)
  }
}
</script>

<style lang="scss" scoped></style>
