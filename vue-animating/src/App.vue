<script>
import DynamicComponentVue from './components/DynamicComponent.vue';
export default {
   name: "App",
   components: { DynamicComponentVue }
}
</script>

<template>
   <div>

      <h1> Hello World </h1>
      <DynamicComponentVue />

   </div>
</template>
