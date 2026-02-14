import { apiImages } from '@/api/dataImages'
import { ref } from 'vue'
import { defineStore } from 'pinia'

type

export const updateImages = defineStore('images', () => {

  const album = ref()

  const updatedata = async () => {
    album.value = await apiImages()
  }
  
  return { album, updatedata }
})
