<template>
    <div class="word-card">
        <input class="letter" type="input" v-for="(letter, index) in word" 
        :key="index" 
        maxlength="1" 
        @keyup="actionTab" />
    </div>
</template>

<script>
export default {
    name: "WordComponent",
    props: {
        word: {
            type: String,
            default: ''
        }
    },
    methods: {
        actionTab(event) {

            if (event?.target?.nextElementSibling) {
                event?.target?.nextElementSibling?.focus()
            } else {
                if (event?.target?.parentElement?.nextElementSibling?.firstElementChild) {
                    event?.target?.parentElement?.nextElementSibling?.firstElementChild.focus();
                } else {
                    document.querySelector("#checking")?.focus();
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
input.letter {
    width: 30px;
    height: 30px;
    border-bottom: 3px solid white;
    border-top: 0px;
    border-right: 0px;
    border-left: 0px;
    margin-right: 2px;
    color: white;
    background-color: rgb(43, 35, 35);

    font-size: large;
    text-align: center;
    border-radius: 0px;
}

.word-card {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
</style>