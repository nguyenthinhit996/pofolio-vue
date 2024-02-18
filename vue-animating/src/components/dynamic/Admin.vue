<template>
    <div>
        <h1> This is administrator</h1>
    </div>
</template>

<script>
    export default {
        unmounted() {
            console.log("component destroying ...")
        },
        activated() {
            console.log("component actived ...")
        },
        deactivated() {
            console.log("component deactivated ...")
        }
        
    }
</script>

<style lang="scss" scoped>

</style>