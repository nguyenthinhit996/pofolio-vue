<template>
  <ThePopupChooseImage
    :visiblePopUp="visiblePopUpAddChooseImage"
    :closePopupCB="handleThePopupChooseImage"
    :query="formData.word"
  />
  <vee-form
    ref="registerForm"
    :initial-values="formData"
    v-if="tab === 'register'"
    :validation-schema="schema"
    @submit="handleSubmit"
    v-slot="{ errors, handleReset, values, setFieldValue, setValues }"
    class="flex flex-col gap-5"
  >
    {{ console.log('vee-form', values) }}
    <!-- Image URL -->
    <div class="mb-3 flex flex-col items-center gap-2">
      <div class="w-full">
        <label class="inline-block mb-2">Image URL</label>
        <vee-field
          type="text"
          name="image"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Image URL"
        />
        <error-message class="text-red-700" name="image" />
      </div>

      <Image width="250" height="250" :src="values.image" alt="Image" preview />
      <Button
        style="padding: 10px 10px"
        label="Choose Other Image"
        @click="visiblePopUpAddChooseImage = true"
      />
    </div>

    <div class="flex flex-row justify-start gap-2">
      <!-- Type -->
      <div class="mb-3 w-5 grow-[1]">
        <label class="block mb-2">Type</label>
        <Dropdown
          :modelValue="values?.type?.toLowerCase()"
          :options="statuses"
          optionLabel="label"
          optionValue="value"
          @update:model-value="(value) => setFieldValue('type', value)"
          :pt="{
            input: { class: 'py-3' }
          }"
        >
          <template #option="slotProps">
            {{ console.log(slotProps) }}
            <Tag
              :value="slotProps.option.value"
              :severity="getOrderSeverity(slotProps.option.value.toLowerCase())"
            />
          </template>
        </Dropdown>

        <error-message class="text-red-700" name="type" />
      </div>

      <!-- Word -->
      <div class="mb-3 grow-[3]">
        <label class="inline-block mb-2">Word</label>
        <vee-field
          type="text"
          name="word"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Word"
        />
        <error-message class="text-red-700" name="word" />
      </div>
    </div>

    <!-- Description -->
    <div class="mb-3">
      <label class="inline-block mb-2">Description</label>
      <vee-field
        type="text"
        name="describe"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Description"
      />
      <error-message class="text-red-700" name="describe" />
    </div>

    <div class="flex flex-row justify-start gap-2">
      <!-- Meaning (VN) -->
      <div class="mb-3">
        <label class="inline-block mb-2">Meaning (VN)</label>
        <vee-field
          type="text"
          name="meaningVN"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Meaning (VN)"
        />
        <error-message class="text-red-700" name="meaningVN" />
      </div>

      <!-- Frequency -->
      <div class="mb-3">
        <label class="inline-block mb-2">Frequency</label>
        <vee-field
          type="text"
          name="frequency"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Frequency"
        />
        <error-message class="text-red-700" name="frequency" />
      </div>
    </div>

    <!-- Example -->
    <div class="mb-3">
      <label class="inline-block mb-2">Example</label>
      <vee-field
        type="text"
        name="example"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Example"
      />
      <error-message class="text-red-700" name="example" />
    </div>

    <!-- Synonyms -->
    <div class="mb-3">
      <label class="inline-block mb-2">Synonyms</label>
      <vee-field
        type="text"
        name="synonyms"
        placeholder="Synonyms"
        v-slot="{ field, handleChange }"
      >
        <input
          @input="(event) => handleChangeFieldArrayText(event, handleChange)"
          :value="field.value?.map((item) => ' ' + item)"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        />
      </vee-field>
      <error-message class="text-red-700" name="synonyms" />
    </div>

    <!-- Antonyms -->
    <div>
      <label class="inline-block mb-2">Antonyms</label>
      <vee-field
        type="text"
        name="antonyms"
        placeholder="antonyms"
        v-slot="{ field, handleChange }"
      >
        <input
          @input="(event) => handleChangeFieldArrayText(event, handleChange)"
          :value="field.value?.map((item) => ' ' + item)"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        />
      </vee-field>
      <error-message class="text-red-700" name="synonyms" />
    </div>

    <div class="flex flex-col gap-2">
      <div class="flex flex-row justify-between items-center">
        <label class="inline-block">OtherForms</label>
        <Button
          size="small"
          icon="pi pi-plus"
          rounded
          outlined
          @click="handAddOrtherForm(values, setValues)"
        />
      </div>

      <Accordion>
        <AccordionTab
          name="otherForms"
          v-for="(form, index) in values.otherForms"
          :key="Date.now()"
        >
          <template #header>
            <div class="w-full flex flex-row justify-between items-center relative z-1">
              <p>{{ form?.type + ' - ' + form.word }}</p>
              <Button
                icon="pi pi-trash"
                rounded
                outlined
                severity="danger"
                @click="handRemoveFormDependOnIndex(index, values, setValues)"
              />
            </div>
          </template>
          <div class="flex flex-row justify-between gap-2">
            <!-- Word -->
            <div class="mb-3">
              <label class="inline-block mb-2">Word</label>
              <vee-field
                type="text"
                :name="'otherForms[' + index + '].word'"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Word"
              />
              <error-message class="text-red-700" name="word" />
            </div>

            <!-- Meaning (VN) -->
            <div class="mb-3">
              <label class="inline-block mb-2">Meaning (VN)</label>
              <vee-field
                type="text"
                :name="'otherForms[' + index + '].meaningVN'"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Meaning (VN)"
              />
              <error-message class="text-red-700" :name="'otherForms[' + index + '].meaningVN'" />
            </div>

            <!-- Type -->
            <div class="mb-3">
              <label class="block mb-2">Type</label>
              <Dropdown
                :modelValue="form.type?.toLowerCase()"
                :options="statuses"
                optionLabel="label"
                optionValue="value"
                @update:model-value="(value) => setFieldValue(`otherForms[${index}].type`, value)"
                :pt="{
                  input: { class: 'py-3' }
                }"
              >
                <template #option="slotProps">
                  {{ console.log(slotProps) }}
                  <Tag
                    :value="slotProps.option.value"
                    :severity="getOrderSeverity(slotProps.option.value.toLowerCase())"
                  />
                </template>
              </Dropdown>

              <error-message class="text-red-700" name="type" />
            </div>
          </div>

          <!-- describe -->
          <div class="mb-3">
            <label class="inline-block mb-2">Describe</label>
            <vee-field
              type="text"
              :name="'otherForms[' + index + '].describe'"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Enter Meaning (VN)"
            />
            <error-message class="text-red-700" :name="'otherForms[' + index + '].describe'" />
          </div>

          <!-- Example -->
          <div class="mb-3">
            <label class="inline-block mb-2">Example</label>
            <vee-field
              type="text"
              :name="'otherForms[' + index + '].example'"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Enter Meaning (VN)"
            />
            <error-message class="text-red-700" :name="'otherForms[' + index + '].example'" />
          </div>
        </AccordionTab>
      </Accordion>
    </div>

    <!-- RelatedWords -->
    <div class="mb-3">
      <label class="inline-block mb-2">RelatedWords</label>
      <vee-field
        type="text"
        name="relatedWords"
        placeholder="antonyms"
        v-slot="{ field, handleChange }"
      >
        <input
          @input="(event) => handleChangeFieldArrayText(event, handleChange)"
          :value="field.value?.map((item) => ' ' + item)"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        />
      </vee-field>
      <error-message class="text-red-700" name="relatedWords" />
    </div>

    <div class="flex flex-row justify-end gap-4">
      <Button style="padding: 10px 10px" label="Reset changes" @click="handleReset" />
      <Button
        type="submit"
        style="padding: 10px 10px"
        label="Adding this data"
        :disabled="!isEmptyCheck(errors)"
      />
    </div>
  </vee-form>
</template>

<script>
import { cloneDeep, isEmpty } from 'lodash'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/service/Firebase'

export default {
  name: 'NewForm',
  data() {
    return {
      tab: 'register',
      abc: 'noun',
      schema: {
        image: 'required|url',
        type: 'required',
        word: 'required',
        meaningVN: 'required',
        describe: 'required',
        frequency: 'required',
        example: 'required'
      },
      statuses: [
        { label: 'Noun', value: 'noun' },
        { label: 'Verb', value: 'verb' },
        { label: 'Adjective', value: 'adjective' }
      ],
      visiblePopUpAddChooseImage: false
    }
  },
  methods: {
    isEmptyCheck(data) {
      return isEmpty(data)
    },
    handAddOrtherForm(values = {}, setFieldValueCB) {
      const newRecord = {
        type: 'Noun',
        word: '',
        meaningVN: '',
        describe: '',
        frequency: '',
        example: ''
      }

      let value = cloneDeep({ ...values })
      let form = value.otherForms || []
      console.log(form)
      form.unshift(newRecord)
      console.log(form)

      setFieldValueCB({ ...value, otherForms: form })
    },
    handRemoveFormDependOnIndex(index, values = [], setFieldValueCB) {
      let value = cloneDeep({ ...values })
      let form = value.otherForms || []

      console.log(form)
      form.splice(index, 1)
      console.log(form)

      setFieldValueCB({ ...value, otherForms: form })
    },
    handleChangeFieldArrayText(event, handleChanegCB) {
      console.log('handleChangeFieldArrayText ', event?.target?.value)
      handleChanegCB(event?.target?.value?.split(',')?.map((word) => word.trim()))
    },
    async handleSubmit(data) {
      console.log('handleSubmit')
      const isValid = await this.$refs.registerForm.validate()
      if (!isValid) return

      console.log(data)
      this.handleAddDataFromChatGPTCB(data)

      // Create a new document in Firestore with the ID
      const { id } = data || {}
      const dataResolve = await setDoc(doc(db, 'vocabularies', id), {
        ...data
      })
      console.log('Firestore setDoc', dataResolve)
    },
    getOrderSeverity(status) {
      switch (status) {
        case 'noun':
          return 'primary'

        case 'verb':
          return 'warning'

        case 'adjective':
          return 'constract'

        case 'adverb':
          return 'info'

        default:
          return null
      }
    },
    handleThePopupChooseImage(url) {
      this.visiblePopUpAddChooseImage = false
      console.log(url)
      console.log(this.$refs.registerForm)
      if (url) {
        this.$refs?.registerForm?.setFieldValue('image', url)
      }
    }
  },
  props: {
    formData: {
      type: Object,
      default: () => ({
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUyAfXfniYfSTZ7Z2HjW2COSyC8WTH3TgkGw&usqp=CAU',
        type: 'Verb',
        word: 'Follow',
        meaningVN: 'Theo dõi',
        describe: 'To come after (something) in time or order; to pursue as a guide',
        frequency: '6/10',
        example: 'Please follow the instructions carefully.',
        synonyms: ['grab', 'seize', 'get hold of', 'acquire'],
        antonyms: ['give', 'release', 'surrender', 'relinquish'],
        otherForms: [
          {
            type: 'Noun',
            word: 'Taker',
            meaningVN: 'Người lấy',
            describe: 'A person who takes or receives something',
            frequency: '5/10',
            example: 'He is a ruthless taker and will do anything to gain power.'
          },
          {
            type: 'Noun',
            word: 'Taker',
            meaningVN: 'Người lấy',
            describe: 'A person who takes or receives something',
            frequency: '5/10',
            example: 'He is a ruthless taker and will do anything to gain power.'
          }
        ],
        relatedWords: ['taking', 'taken', 'taker', 'takeoff', 'takeout']
      })
    },

    handleAddDataFromChatGPTCB: { type: Function, required: true }
  }
}
</script>

<style scoped>
label {
  font-weight: 700;
}
</style>
