<template>
  <div class="ckeditor-container">
    <div class="toolbar-button">
      <ButtonAutoSave :saving="isSaving" />
      <router-link to="/review" rel="noopener">
        <Button label="Review" severity="info" />
      </router-link>
      <span></span>
    </div>

    <main-editor :handleAutoSaveCB="handleAutoSave" />
  </div>
</template>

<script>
import Button from 'primevue/button'
import MainEditor from '@/components/MainEditor.vue'
import ButtonAutoSave from '@/components/common/ButtonAutoSave.vue'

import { usePostStore } from '@/stores/post'

export default {
  components: {
    MainEditor,
    ButtonAutoSave
  },
  data() {
    return {
      isSaving: false,
      storePost: usePostStore()
    }
  },
  methods: {
    async dumpCallAPI(dataInput) {
      let newpro = new Promise((resolve) =>
        setTimeout(() => {
          console.log('Calling API ...')
          return resolve('{}')
        }, 3000)
      )
      console.log('mapWritableState', dataInput)
      this.storePost.updateData(dataInput)
      return newpro
    },
    async handleAutoSave(dataInput) {
      console.log(' handleAutoSave dumpCallAPI')
      this.isSaving = true
      let data = await this.dumpCallAPI(dataInput)
      console.log(data)
      console.log('Done Calling API')
      this.isSaving = false
    },
    handleSaveDone() {
      this.isSaving = false
    }
  }
}
</script>

<style lang="scss">
.ckeditor-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .toolbar-button {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 1rem;
    position: sticky;
    top: 10px;
  }
  & .ck.ck-toolbar {
    position: sticky;
  }
}
</style>
