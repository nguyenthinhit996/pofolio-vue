import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', {
  state: () => {
    return {
      data: ''
    }
  },
  getters: {
    showData() {
      return this.data
    }
  },
  actions: {
    updateData(newData) {
      this.data = newData
    }
  }
})
