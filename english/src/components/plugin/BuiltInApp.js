import TheDialogVue from '../common/TheDialog.vue'
import ThePopupUpload from '../common/ThePopupUpload.vue'

export default {
  install(app) {
    app.component('TheDialog', TheDialogVue)
    app.component('ThePopupChooseImage', ThePopupUpload)
  }
}
