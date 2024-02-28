<template>
  <div>
    <the-dialog :visible="visiblePopUp" @close-dialog="closePopupCB" header="Choose Image!">
      <div>
        <ul v-if="images.length" class="flex flex-row flex-wrap">
          <li v-for="image in images" :key="image.id" class="w-4/12 p-2">
            <!-- <img :src="image.urls.regular" alt="Unsplash Image" /> -->
            <Image
              :src="image.urls.regular"
              alt="Image"
              @click="handleChooseImage(image.urls.regular)"
            />
          </li>
        </ul>
        <p v-else-if="isLoading" class="flex justify-center"><ProgressSpinner /></p>
        <p v-else="isLoading">No found images</p>
      </div>
    </the-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PopUpData',
  data() {
    return {
      unsplashAPI: 'https://api.unsplash.com/search/photos',
      accessKey: 'Vc7kwEN8WZKSms2BIdqPOIJUY4ZIWT7KLbvIpca7ZHE', // Replace with your Unsplash Access Key
      images: [],
      isLoading: false
    }
  },
  props: {
    visiblePopUp: Boolean,
    closePopupCB: {
      type: Function,
      default() {
        return () => {}
      }
    },
    query: {
      type: String,
      default: 'nature'
    }
  },
  methods: {
    async fetchImages() {
      this.isLoading = true
      const url = `${this.unsplashAPI}?query=${this.query}&client_id=${this.accessKey}&per_page=30`

      try {
        const response = await axios.get(url)
        this.images = response.data.results
      } catch (error) {
        console.error('Error fetching images:', error)
      }
      this.isLoading = false
    },
    handleChooseImage(url) {
      console.log(url)
      this.closePopupCB(url)
    }
  },
  watch: {
    async visiblePopUp(news) {
      console.log(news)
      if (news) {
        this.images = [] // Clear existing images
        await this.fetchImages()
      }
    }
  }
}
</script>

<style scoped></style>
