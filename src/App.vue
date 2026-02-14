
<template>
  <HeaderImages/>
  <BodyImagen
    v-for="imagen in imagenes.album"
  />
</template>



<script setup lang="ts">
import HeaderImages from './components/HeaderImages.vue';
import { updateImages } from './stores/counter';
import { onMounted, ref } from 'vue';

const imagenes = updateImages()

onMounted(() => {
  imagenes.updatedata()
})


</script>
