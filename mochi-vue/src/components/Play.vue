<template>
  <div class="play-wrap">
    <!-- <input type="range" name="processlearning" /> -->
    <input type="range" min="0" max="100" value="0" id="processlearning" />

    <!-- <keep-alive> -->
      <component
        :is="typeOfQuestion"
        :sentence="dataraw.sentence"
        :wordUnderline="dataraw.wordUnderline"
        :means="dataraw.means"
        :words="dataraw.name"
        :meanVietnamese="dataraw.meaningVN"
      ></component>
    <!-- </keep-alive> -->

    <button id="checking" @click="handleOnCheck">Check</button>
    <a href="#"> I forgot this one </a>

    <PopupInformation />
  </div>
</template>

<script>
import TypingQuestion from './TypingQuestion.vue'
import ChoosingQuestion from './ChoosingQuestion.vue'
import { factoryValue } from '../util/mathematic'
import PopupInformation from './PopResult.vue'

const responseData = factoryValue()
console.log(responseData)

export default {
  name: 'PlayContent',
  components: {
    TypingQuestion,
    ChoosingQuestion,
    PopupInformation
  },
  data() {
    return {
      typeOfQuestion: responseData?.type || 'TypingQuestion',
      dataraw: responseData.data
    }
  },
  methods: {
    handleOnCheck() {
      const responseData = factoryValue()
      ;(this.typeOfQuestion = responseData?.type || 'TypingQuestion'),
        (this.dataraw = responseData.data)
    }
  },
  mounted() {
    const sliderEl3 = document.querySelector('#processlearning')

    sliderEl3.addEventListener('input', (event) => {
      const tempSliderValue = Number(event.target.value)
      const progress = (tempSliderValue / sliderEl3.max) * 100
      console.log(progress);
          sliderEl3.style.background = `linear-gradient(to right, yellow ${progress}%, #ccc ${progress}%)`
    });
  }
}
</script>

<style lang="scss" scoped>
.play-wrap {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  height: 100%;
}

#processlearning {
  -webkit-appearance: none;
  appearance: none;
  width: 80%;
  cursor: pointer;
  outline: none;
  border-radius: 15px;
  height: 20px;
  background: #ccc;
}

#processlearning::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 30px;
  width: 30px;
  background: transparent;
  background-image: url('../assets/peter.png');
  background-size: cover;
  border-radius: 50%;
}

/* Thumb: Firefox */
#processlearning::-moz-range-thumb {
  height: 30px;
  width: 30px;
  background: transparent;
  background-image: url('../assets/peter.png');
  background-size: cover;
  border: none;
  border-radius: 50%;
}

button {
  width: 10rem;
  height: 3rem;
  border-radius: 2rem;
  font-size: 1rem;
  // margin-bottom: 30px;
}

a {
  text-decoration: underline;
}
</style>
