<template>
  <div id="app">
    <ckeditor :editor="editor" @ready="onReady" v-model="editorData" class="h-screen" />
  </div>
</template>

<script>
import Editor from 'ckeditor5-custom-build/build/ckeditor'

export default {
  name: 'MainEditor',
  data() {
    return {
      editor: Editor,
      editorData: ``
    }
  },
  methods: {
    onReady(editor) {
      // Insert the toolbar before the editable area.
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement())
    },
    handleAutoSaveCallCB(data) {
      this.handleAutoSaveCB(data)
    }
  },
  computed: {},
  watch: {
    editorData(news) {
      console.log(news)
    }
  },
  props: {
    handleAutoSaveCB: {
      type: Function,
      default: () => {}
    }
  },
  beforeMount() {
    let funcHandleAutoSaveCallCB = this.handleAutoSaveCallCB
    Editor.defaultConfig = {
      ...Editor.defaultConfig,
      autosave: {
        waitingTime: 5000,
        save(editor) {
          // The saveData() function must return a promise
          // which should be resolved when the data is successfully saved.
          console.log('editor.getData', editor.getData())
          console.log('this', this)
          funcHandleAutoSaveCallCB(editor.getData())
        }
      },
      toolbar: {
        viewportTopOffset: 50,
        items: [
          'heading',
          '|',
          'fontSize',
          'fontFamily',
          '|',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          '|',
          'alignment',
          '|',
          'numberedList',
          'bulletedList',
          '|',
          'outdent',
          'indent',
          '|',
          'todoList',
          'link',
          'blockQuote',
          'imageUpload',
          'insertTable',
          'mediaEmbed',
          '|',
          'undo',
          'redo',
          'code',
          'codeBlock',
          '|',
          'restrictedEditingException',
          'style',
          'subscript',
          'superscript',
          '|',
          'textPartLanguage',
          'findAndReplace',
          'highlight',
          'htmlEmbed',
          'imageInsert',
          '|',
          'pageBreak',
          'removeFormat',
          'selectAll',
          '|',
          'showBlocks',
          'specialCharacters',
          'sourceEditing'
        ],
        shouldNotGroupWhenFull: true
      }
    }
  }
}
</script>

<style>
/* This selector targets the editable element (excluding comments). */
.ck-editor__editable_inline:not(.ck-comment__input *) {
  /* height: 100vh; */
  overflow-y: auto;
  height: 500px;
}
</style>
