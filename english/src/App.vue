<template>
  <div class="container" :class="{ 'has-pseudo': false}">
    <Play />
  </div>
</template>

<script>
import Play from './components/mochi/Play.vue';
export default {
  name: "App",
  components: {
    Play,
  }
}
</script>

<style lang="scss" scoped>
div.container {
  height: 100%;
  width: 100%;
  color: white;
}

.has-pseudo::before {
  content: "";
  background-color: rgba(0, 0, 0, 0.5);  
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: all;
}

@media (max-width: 768px) { //phone
  div.container {
    background-color: purple;
     padding: 30px 0px;
  }
}

@media (min-width: 768px) and (max-width: 1024px) { // ipad
  div.container {
    background-color: red;
    padding: 30px 0px;
  }
}

@media (min-width: 1024px) { // computer
  div.container {
    max-width: 1280px;
    background-color: green;
    padding: 30px 0px;
  }
}


</style>