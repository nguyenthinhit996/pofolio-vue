<template>
    <div>
        <select v-model="componentName">
            <option value="User">user</option>
            <option value="Admin">admin</option>
        </select>

        <keep-alive>
            <component :is="componentName" ></component>
        </keep-alive>
      
    </div>
</template>

<script>
import Admin from "./dynamic/Admin.vue";
import User from "./dynamic/User.vue";

export default {
    name: "DynamicComponent",
    components: {
        Admin,
        User
    },
    data() {
        return {
            componentName: 'User'
        }
    }
}
</script>

<style lang="scss" scoped></style>