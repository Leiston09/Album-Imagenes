
<template>
  <HeaderImages/>

  <BodyImagen
    v-for="imagen in imagenes.album"
    :key="imagen.id"
    :imagen="imagen"
  />
</template>



<script setup lang="ts">
import HeaderImages from '@/components/HeaderImages.vue';
import BodyImagen from './components/BodyImagen.vue';
import { updateImages } from './stores/counter';
import { onMounted } from 'vue';

const imagenes = updateImages()


onMounted(async () => {
  await imagenes.updatedata()
})


</script>
