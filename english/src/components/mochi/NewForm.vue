<template>
  <vee-form
    :initial-values="formData"
    v-if="tab === 'register'"
    :validation-schema="schema"
    @submit.prevent="handleSubmit"
    v-slot="{ errors, handleReset, values, setFieldValue }"
  >
    <!-- Image URL -->
    <div class="mb-3 flex flex-col gap-2">
      <label class="inline-block mb-2">Image URL</label>
      <vee-field
        type="text"
        name="image"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Image URL"
      />
      <error-message class="text-red-700" name="image" />
      <Image width="250" height="250" :src="values.image" alt="Image" preview />
    </div>

    <div class="flex flex-row justify-start gap-2">
      <!-- Type -->
      <div class="mb-3 w-5 grow-[1]">
        <label class="block mb-2">Type</label>
        <Dropdown
          :modelValue="values.type.toLowerCase()"
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

        <!-- <error-message class="text-red-700" name="type" /> -->
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
    <Button style="padding: 10px 10px" label="reset" @click="handleReset" />
  </vee-form>
</template>

<script>
export default {
  name: 'NewForm',
  data() {
    return {
      tab: 'register',
      formData: {
        image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
        type: 'Verb',
        word: 'Follow',
        meaningVN: 'Theo dõi',
        describe: 'To come after (something) in time or order; to pursue as a guide',
        frequency: '6/10',
        example: 'Please follow the instructions carefully.'
      },
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
      ]
    }
  },
  methods: {
    async handleSubmit() {
      const isValid = await this.$refs.registerForm.validate()
      if (!isValid) return

      // Handle form submission logic here
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
    }
  }
}
</script>
