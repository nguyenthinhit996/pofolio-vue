<template>
    <div class="type-question">
        <h2>You should fill of all empty</h2>
        <h3>{{ meanVietnamese }}</h3>

        <div class="boder">
            <word v-for="(word, index) in words" :word="word" :key="index" />
        </div>

    </div>
</template>

<script>
import Word from "./Word.vue"
export default {
    name: "TypingQuestion",
    components: {
        Word,
    },
    props: {
        words: {
            type: Array,
            default() {
                return ['a', 'Hello', "world 12334", "world 12334", "world 12334", "world 12334"]
            }    
        },
        meanVietnamese: {
            type: String,
            default: "ý nghĩa việt nam"
        }
    }
}
</script>

<style lang="scss" scoped>
.type-question {
    padding: 30px;
    height: 100%;
}

div.boder {
    padding: 20px;
    margin: 20px;
    border: 1px solid yellow;
    border-radius: 15px;
    background-color: rgb(43, 35, 35);

    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    flex-wrap: wrap;
}

h2 {
    font-size: 30px;
    margin-bottom: 20px;
}

h2 {
    font-size: 20px;
}

h2,
h3 {
    text-align: center;
}
</style>