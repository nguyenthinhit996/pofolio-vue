<template>
  <div id="app">
    <ckeditor :editor="editor" @ready="onReady" v-model="editorData" class="h-screen" />
  </div>
</template>

<script>
import Editor from 'ckeditor5-custom-build/build/ckeditor'

export default {
  name: 'app',
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
    }
  },
  watch: {
    editorData(news) {
      console.log(news)
    }
  }
}
</script>

<style>
/* This selector targets the editable element (excluding comments). */
.ck-editor__editable_inline:not(.ck-comment__input *) {
  height: 100vh;
  overflow-y: auto;
}
</style>
