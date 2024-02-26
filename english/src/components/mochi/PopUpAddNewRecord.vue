<template>
  <div>
    <the-dialog
      :visible="visiblePopUpAddNewRecord"
      @close-dialog="closePopupCB"
      header="Search Word You Need !"
    >
      <template #body>
        <vee-form
          @submit="handleSearchChatGPT"
          :validation-schema="formSchemaValidation"
          v-slot="{ isSubmitting, errors }"
          class="flex-col"
        >
          <div class="flex items-stretch gap-2">
            <vee-field
              :validateOnInput="true"
              type="text"
              name="seachText"
              class="grow-[8] block py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Word"
              :disabled="isSubmitting"
            />
            <Button
              class="grow-[2]"
              style="padding: 0px 10px"
              type="submit"
              label="Search ChatGPT"
              :icon="isSubmitting ? 'pi pi-spin pi-spinner' : 'pi pi-search'"
              :disabled="isSubmitting || !isEmpty(errors)"
            />
          </div>
          <error-message class="text-red-700" name="seachText"></error-message>
        </vee-form>
      </template>

      <Divider />

      <div v-if="UIState.isSubmitting == true">
        <Skeleton class="mb-2"></Skeleton>
        <Skeleton width="10rem" class="mb-2"></Skeleton>
        <Skeleton width="5rem" class="mb-2"></Skeleton>
        <Skeleton height="2rem" class="mb-2"></Skeleton>
        <Skeleton width="10rem" height="4rem"></Skeleton>
      </div>
      <div v-if="UIState.isSubmitting == false">
        <div v-if="UIState.isGoodResult == false" class="flex justify-center items-center flex-col">
          <p class="text-lg mb-2">Invalid, Please Douple Check Word</p>
          <Image
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0f8abae8-8c04-4e2e-bb1e-dab3ae975041/df54elb-759bb990-864b-4a70-833d-3b1d0fbf4d45.png/v1/fill/w_430,h_587,q_80,strp/_screenshot__peter_griffin_crying__s09e04__by_shiyamasaleem_df54elb-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTg3IiwicGF0aCI6IlwvZlwvMGY4YWJhZTgtOGMwNC00ZTJlLWJiMWUtZGFiM2FlOTc1MDQxXC9kZjU0ZWxiLTc1OWJiOTkwLTg2NGItNGE3MC04MzNkLTNiMWQwZmJmNGQ0NS5wbmciLCJ3aWR0aCI6Ijw9NDMwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.bb8Hm0Ks9qGdxEPZxmz4O_FCAdIX23afp5PjMRZhf6k"
            alt="Image"
            width="200"
          />
        </div>
        <div v-else>
          <new-form
            :handleAddDataFromChatGPTCB="handleAddDataFromChatGPT"
            :formData="dataRetrieveFromGPT"
          ></new-form>
        </div>
      </div>
    </the-dialog>
  </div>
</template>

<script>
import { mockCallAPI } from '@/util/mathematic.js'
import isEmpty from 'lodash/isEmpty'

import axios from 'axios'
import NewForm from '@/components/mochi/NewForm.vue'

export default {
  name: 'PopUpAddRecord',
  data() {
    return {
      formSchemaValidation: {
        seachText: 'required|max:155|alpha'
      },
      UIState: {
        isSubmitting: undefined,
        isGoodResult: undefined
      },
      dataRetrieveFromGPT: {}
    }
  },
  props: {
    visiblePopUpAddNewRecord: Boolean,
    closePopupCB: {
      type: Function,
      default() {
        return () => {}
      }
    }
  },
  components: {
    NewForm
  },
  methods: {
    async handleSearchChatGPT(dataInput = 'hello') {
      const seachText = dataInput?.seachText || 'invalidword'
      this.UIState = { ...this.UIState, isSubmitting: true }
      try {
        let promt = `I'm learning English, when I enter an English word, please help me to find the words of other types (Verb, Noun, Adjective, Adverb, ...) of it,
                please help me to find the word "${seachText}" and give me a format JSON form like below, please set id as milisecond timesteamp current:
                "
                {
                    "id": "5555553233",
                    "image": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
                    "type": "Verb",
                    "word": "Follow",
                    "meaningVN": "Theo dõi",
                    "describe": "To come after (something) in time or order; to pursue as a guide",
                    "frequency": "6/10",
                    "example": "Please follow the instructions carefully.",
                    "synonyms": ["pursue", "chase", "trail", "shadow"],
                    "antonyms": ["lead", "precede", "guide", "direct"],
                    "otherForms": [
                    {
                        "type": "Noun",
                        "word": "Follower",
                        "meaningVN": "Người theo dõi",
                        "describe": "A person who follows another in regard to his or her ideas or belief",
                        "frequency": "4/10",
                        "example": "He has a large number of followers on social media."
                    }
                    ],
                    "relatedWords": ["following", "follow-up", "follow through", "follower", "follow-on"]
                }
                ". 
                if the word "${seachText}" is typo or anything else result please return back follow format JSON like:
                "{
                	"result": false,
                	"suggestionWord": [ this word you suggest ]
                }"`
        const data = await this.callChatGPTAPI(promt)
        // await mockCallAPI(dataInput)
        // const data = {
        //   id: '1635948662348',
        //   image: 'https://cdn.pixabay.com/photo/2017/05/23/17/12/kingfisher-2332318_1280.jpg',
        //   type: 'Verb',
        //   word: 'Organize',
        //   meaningVN: 'Tổ chức',
        //   describe:
        //     'To arrange or order things systematically; to coordinate the elements of (a situation) to produce a desired effect',
        //   frequency: '8/10',
        //   example: 'She organized her schedule for the upcoming week.',
        //   synonyms: ['arrange', 'systematize', 'coordinate', 'manage'],
        //   antonyms: ['disorganize', 'disarrange', 'disturb', 'mess up'],
        //   otherForms: [
        //     {
        //       type: 'Noun',
        //       word: 'Organization',
        //       meaningVN: 'Tổ chức',
        //       describe:
        //         'An organized group of people with a common purpose, such as a business or government department',
        //       frequency: '7/10',
        //       example: 'The non-profit organization helps underprivileged children.'
        //     },
        //     {
        //       type: 'Adjective',
        //       word: 'Organized',
        //       meaningVN: 'Được tổ chức',
        //       describe: 'Arranged systematically; orderly',
        //       frequency: '9/10',
        //       example: 'Her organized workspace allows her to be more productive.'
        //     }
        //   ],
        //   relatedWords: [
        //     'organization',
        //     'organizer',
        //     'disorganize',
        //     'reorganize',
        //     'disorganization'
        //   ]
        // }

        if (data.includes('"result": false,\n')) {
          this.UIState = {
            ...this.UIState,
            isSubmitting: false,
            isGoodResult: false
          }
        } else {
          this.UIState = {
            ...this.UIState,
            isSubmitting: false,
            isGoodResult: true
          }
          this.dataRetrieveFromGPT = JSON.parse(data)
        }
      } catch (e) {
        console.log(e)
        this.UIState = { ...this.UIState, isGoodResult: false }
      } finally {
        this.UIState = { ...this.UIState, isSubmitting: false }
      }
    },
    isEmpty(value) {
      return isEmpty(value)
    },
    async callChatGPTAPI(promt) {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions', // URL API của OpenAI
          {
            messages: [{ role: 'user', content: promt }],
            model: 'gpt-3.5-turbo'
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_APP_KEY_CHATGPT}` // Thay YOUR_API_KEY bằng mã thông báo xác thực của bạn
            }
          }
        )
        const message = response.data.choices[0].message.content
        console.log(message)
        return message
      } catch (error) {
        console.error('Đã xảy ra lỗi:', error)
      }
    },
    handleAddDataFromChatGPT(data) {
      console.log('handleAddDataFromChatGPT', data)
      this.$emit('event-add-record', data)
      this.closePopupCB()
      this.$toast.add({
        severity: 'success',
        summary: 'Add record successfully',
        life: 3000
      })
    }
  }
}
</script>
