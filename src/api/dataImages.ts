import axios from "axios"

export const apiImages = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=20')
    return response.data
  } catch (error) {
    console.log(`Error en la API ${error}`)
    return []
  }
}