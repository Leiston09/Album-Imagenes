<template>
    <section class="headings">
        <div>
            <h1>{{ t('ProductPanel') }}</h1>
            <button @click="newLanguage">{{ language === 'es' ? 'ESPAÑOL' : 'ENGLISH'  }}</button>
        </div>
        <div>
            <p><strong>{{ t('searchByTlitle') }}</strong></p>
            <input class=" bg-green-200" type="text" v-model="searchByTlitle" :placeholder="t('enterName')">
        </div>
    </section>
    <section class="products">
        <div class=" bg-amber-50 m-5 border-3 border-blue-500" v-for="product in searchProduct" 
        :key="product.id">
            {{ product.title }}
            <hr>
            <p><strong>{{ t('price') }} : </strong>{{ product.price }}</p>
            <p><strong>{{ t('category') }} : </strong>{{ product.category }}</p>
            <p><strong>{{ t('rating') }} : </strong>{{ product.rating }}</p>
            <p><strong>{{ t('available') }} : </strong>{{ product.available }}</p>
            <p><strong>{{ t('stockStatus') }} : </strong>{{ product.stockStatus }}</p>
        </div>
    </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';

const products = ref([])
const language = ref('es')

const searchByTlitle = ref('')

const searchProduct = computed(() => {
    return products.value.filter(p => p.title.toLowerCase().includes(searchByTlitle.value.toLowerCase()))  
})
 

const selectedLanguage = {
    es : {
        ProductPanel : 'Panel de productos',
        searchByTlitle : 'Buscar por título',
        enterName : 'Introducir nombre',
        price: 'Precio',
        category : 'Categoría',
        rating : 'Calificación ',
        available: 'Disponibilidad',
        stockStatus : 'Estado del stock',
        Low : 'Bajo',
        Medium: 'Medio',
        High: 'Alto'


    },
    en: {
        ProductPanel : 'Product Panel',
        searchByTlitle : 'search by title',
        enterName : 'Enter name',
        price: 'Price',
        category : 'Category',
        rating : 'Rating',
        available: 'Available',
        stockStatus : 'Stock Status',
        Low : 'Low',
        Medium: 'Medium',
        High: 'High'



    }
}    








function t(texto){
    return selectedLanguage[language.value][texto]
}
function newLanguage(){
    language.value = language.value === 'es' ?  'en' : 'es'
}
const data = async () => {
    const result = await fetch('https://dummyjson.com/products')
    const data = await result.json()
    const productsData = data.products

    let process = productsData.slice(0,12)
    
    process = process.map(p => { return{
        ...p,
        available : p.stock > 0 ? true : false,
        favorite : true,
        stockStatus: p.stock < 10 ? t('Low') : p.stock >= 10 && p.stock <= 50 ? t('Medium') : t('High')
    }})

    products.value = process
    console.log(products.value)
}
onMounted(
    data
)



</script>

<style>

</style>