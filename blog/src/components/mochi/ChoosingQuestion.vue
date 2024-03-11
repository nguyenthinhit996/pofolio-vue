<template>
  <div class="choosing-question">
    <div class="choosing-question-content">
      <h2>Chọn nghĩa của từ đuợc gạch chân</h2>
      <div class="border">
        <p :innerHTML="formattedSentence"></p>
      </div>

      <button v-for="(mean, index) in means" :key="index">{{ mean }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChoosingQuestion',
  props: {
    sentence: {
      type: String,
      // default: "He was sent to the scaffold dffsdf "
      default:
        'He was sent to the scaffold dffsdfasd  was sent to the scaffold dffsdf was sent to the scaffold dffsdf He was sent to the scaffold ' +
        'dffsdfasd He was sent to the scaffold dffsdfasd He was sent to the scaffold dffsdfasd'
    },
    wordUnderline: {
      type: String,
      default: 'scaffold'
    },
    means: {
      type: Array,
      default() {
        return ['Khung', 'Trái cây', 'Hoa', 'Thuyen']
      }
    }
  },
  methods: {},
  computed: {
    formattedSentence() {
      const underlinedWord = document.createElement('span')
      underlinedWord.textContent = this.wordUnderline
      underlinedWord.style.textDecoration = 'underline' // Apply underline directly
      return this.sentence.toLocaleLowerCase().replace(this.wordUnderline, underlinedWord.outerHTML)
    }
  }
}
</script>

<style lang="scss" scoped>
.choosing-question {
  height: 100%;
}

.choosing-question-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.choosing-question-content > * {
  margin-top: 20px;
}

.border {
  border: 1px solid yellow;
  border-radius: 15px;
  background-color: rgb(43, 35, 35);
  text-align: center;
  padding: 10px;
  width: 100%;
}

button {
  padding: 10px;
  background-color: rgb(43, 35, 35);
  border-radius: 10px;
  width: 80%;
  color: white;
}
</style>
