import { apiImages } from '@/api/dataImages'
import { ref } from 'vue'
import { defineStore } from 'pinia'

type typedata = {
  albumId: number,
  id : number,
  thumbnailUrl: string,
  title : string,
  url : string
}

export const updateImages = defineStore('images', () => {

  const album = ref<typedata[]>([])

  const updatedata = async () => {
    const data = await apiImages()
    console.log("DATA:", data.length)
    album.value = data
    console.log("ALBUM:", album.value.length)
  }
  
  return { album, updatedata }
})
