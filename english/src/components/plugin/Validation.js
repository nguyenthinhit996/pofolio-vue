import { Form, Field, defineRule, ErrorMessage, configure } from 'vee-validate'
import { required, email, min, max, confirmed, numeric } from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', Form)
    app.component('VeeField', Field)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('email', email)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('email', email)
    defineRule('confirmed', confirmed)
    defineRule('numeric', numeric)

    configure({
      generateMessage(ctx) {
        const messages = {
          required: `The field ${ctx.field} is required`,
          min: `The field ${ctx.field} is not less than ${ctx.rule.params} numberic`,
          max: `The field ${ctx.field} is not greater than ${ctx.rule.params} numberic`
          //...
        }
        // console.log('ctx', ctx)
        return messages[ctx.rule.name] || `The field ${ctx.field} is invalid`
      },
      validateOnInput: false, // change value in input field will change data.
      validateOnBlur: true
    })
  }
}
