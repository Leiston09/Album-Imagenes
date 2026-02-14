import axios from "axios";

export const apiImages = async () => {
    try{
        const data = await axios.get('https://jsonplaceholder.typicode.com/photos')
        //console.log(data.data)
        return data.data 
    } catch (error) {
        console.log(`Error en la API ${error}`)
        return []
    }

}