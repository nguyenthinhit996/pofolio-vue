<template>
  <div>
    <div class="popup">
      <p>This is a popup!</p>
      <button class="close-button">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupInformation'
}
</script>

<style lang="scss" scoped>
 
.popup {
  display: none; /* Initially hidden */
  position: fixed; /* Stay on top of content */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  width: 50%;
  height: 50%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  z-index: 9999;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  cursor: pointer;  
}
</style>
