import { Form, Field, defineRule, ErrorMessage, configure } from 'vee-validate'
<<<<<<< HEAD
import { required, email, min, max, confirmed, numeric } from '@vee-validate/rules'
=======
import { required, email, min, max, confirmed, numeric, alpha, url } from '@vee-validate/rules'
>>>>>>> 8e55c3e81062bffb8c80b8a412f371be758d3f23

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
<<<<<<< HEAD
=======
    defineRule('alpha', alpha)
    defineRule('url', url)
>>>>>>> 8e55c3e81062bffb8c80b8a412f371be758d3f23

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
