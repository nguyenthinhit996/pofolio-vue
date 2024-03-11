<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" :class="{ hidden: !isOpenModalAuth }" id="modal">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click.prevent="toggleOffModal">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a
                @click="tab = 'login'"
                :class="{ 'hover:text-white text-white bg-blue-600': tab === 'login' }"
                class="block rounded py-3 px-4 transition"
                href="#"
                >Login</a
              >
            </li>
            <li
              class="flex-auto text-center"
              @click="tab = 'register'"
              :class="{ 'hover:text-white text-white bg-blue-600': tab === 'register' }"
            >
              <a class="block rounded py-3 px-4 transition" href="#">Register</a>
            </li>
          </ul>

          <p
            class="text-center"
            :class="{
              'text-blue-500': stateForm.isLoading,
              'text-red-500': !stateForm.isLoading && !stateForm.isSuccess,
              'text-green-500': !stateForm.isLoading && stateForm.isSuccess
            }"
          >
            {{ stateForm.msg }}
          </p>

          <!-- Login Form -->
          <vee-form
            ref="loginFrom"
            v-if="tab === 'login'"
            @submit="loginUser"
            :validation-schema="schemaLoginForm"
            v-slot="{ ...rest }"
          >
            {{ console.log(rest) }}
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <vee-field
                name="email"
                type="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email"
              />
              <error-message class="text-red-700" name="email"></error-message>
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <vee-field
                name="password"
                type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Password"
              />
              <error-message class="text-red-700" name="password"></error-message>
            </div>
            <button
              type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
            >
              Submit
            </button>
          </vee-form>
          <!-- Registration Form -->
          <vee-form
            ref="registerForm"
            v-if="tab === 'register'"
            :validation-schema="schema"
            @submit="handlSubmit"
            v-slot="{ ...rest }"
          >
            <!-- Name -->
            <pre>{{ console.log(rest) }}</pre>

            <div class="mb-3">
              <label class="inline-block mb-2">Name</label>
              <vee-field
                type="text"
                name="name"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Name"
              />
              <error-message class="text-red-700" name="name"></error-message>
            </div>
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <vee-field
                type="email"
                name="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email"
              />
              <error-message class="text-red-700" name="email"></error-message>
            </div>
            <!-- Age -->
            <div class="mb-3">
              <label class="inline-block mb-2">Age</label>
              <vee-field
                name="age"
                type="number"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              />
              <error-message class="text-red-700" name="age"></error-message>
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <vee-field name="password" v-slot="{ field, errors }" :bails="false">
                <input
                  type="password"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                  placeholder="Password"
                  v-bind="field"
                />
                <div class="text-red-700" v-for="error in errors" :key="error">error</div>
              </vee-field>

              <!-- <error-message class="text-red-700" name="password"></error-message> -->
            </div>
            <!-- Confirm Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Confirm Password</label>
              <vee-field
                :validateOnInput="false"
                name="confirm_password"
                type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Confirm Password"
              />
              <error-message class="text-red-700" name="confirm_password"></error-message>
            </div>
            <!-- Country -->
            <div class="mb-3">
              <label class="inline-block mb-2">Country</label>
              <vee-field
                as="select"
                name="country"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              >
                <option value="USA">USA</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
              </vee-field>
              <error-message class="text-red-700" name="country"></error-message>
            </div>
            <!-- TOS -->
            <div class="mb-3 pl-6">
              <vee-field
                value="true"
                name="tos"
                type="checkbox"
                class="w-4 h-4 float-left -ml-6 mt-1 rounded"
              />
              <label class="inline-block custom-background">Accept terms of service</label>
              <error-message class="text-red-700" name="tos"></error-message>
            </div>
            <button
              type="submit"
              :disabled="isDisableButtonSubmit()"
              class="read-only block w-full py-1.5 px-3 rounded transition"
              :class="[
                isDisableButtonSubmit()
                  ? 'bg-gray-300 text-gray-500 px-4 py-2 rounded-md cursor-not-allowed'
                  : 'bg-purple-600 text-white '
              ]"
            >
              Submit
            </button>
          </vee-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapWritableState } from 'pinia'
import { useModalStore } from '@/stores/modal'
import { isEmpty } from 'lodash'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'
import { auth, db } from '@/service/Firebase'
import { doc, setDoc } from 'firebase/firestore'

export default {
  name: 'TheAuth',
  data() {
    return {
      tab: 'login',
      schema: {
        name: 'required',
        email: 'required|email',
        age: 'required|numeric',
        password: 'required|min:4',
        confirm_password: 'required|confirmed:@password',
        country: 'required',
        tos: 'required'
      },
      schemaLoginForm: {
        email: 'required|email',
        password: 'required|min:4'
      },
      initialValue: {
        country: 'USA'
      },
      stateForm: {
        msg: '',
        isLoading: false,
        isSuccess: false
      }
    }
  },
  computed: {
    ...mapWritableState(useModalStore, {
      isOpenModalAuth: 'isOpen'
    })
  },
  methods: {
    async loginUser(values) {
      console.log('loginUser', values)
      const { email, password } = values || {}
      try {
        let user = await signInWithEmailAndPassword(auth, email, password)
        console.log('user', user)
        console.log('auth.currentUser', auth.currentUser)

        this.$toast.add({
          severity: 'success',
          summary: 'User Login Success',
          life: 3000
        })
        this.isOpenModalAuth = false
      } catch (e) {
        console.log(e)
        this.stateForm.msg = e
        this.stateForm.isSuccess = false
      }
    },
    toggleOffModal() {
      this.isOpenModalAuth = false
    },
    handleClickOutside() {
      this.isOpenModalAuth = false
    },
    callAPI(deplay, isSuccess) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (isSuccess) {
            resolve([1, 2, 34, 3])
          } else {
            reject('Error')
          }
        }, deplay)
      })
    },
    async handlSubmit(values) {
      console.log(values)
      const { name, email, password, age, country, tos } = values || {}
      this.stateForm.isLoading = true
      this.stateForm.msg = 'API Calling ...'
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

        const user = userCredential.user
        const uid = user.uid
        // Create a new document in Firestore with the user ID
        await setDoc(doc(db, 'users', uid), {
          name,
          email,
          age,
          country,
          tos
        })

        //const data = await this.callAPI(4000, true)

        this.stateForm.isSuccess = true
        this.stateForm.msg = 'Success created user'
      } catch (e) {
        console.log(e)
        this.stateForm.msg = e
        this.stateForm.isSuccess = false
      }
      this.stateForm.isLoading = false
    },
    isDisableButtonSubmit() {
      const result =
        !isEmpty(this.$refs?.registerForm?.getErrors()) ||
        this.stateForm.isLoading ||
        !this.$refs?.registerForm?.getMeta().dirty
      return result
    }
  },
  watch: {
    isOpenModalAuth(newsValue) {
      if (newsValue) {
        console.log(this.$refs?.loginFrom)
        this.$refs?.loginFrom?.resetForm()
        this.$refs?.registerForm?.resetForm()
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
