<template>
    <div>
        <h4>Imagenes:</h4>
    </div>
</template>

<script setup>
import { updateImages } from '@/stores/counter';
import { onMounted } from 'vue';

const dataImagen = updateImages()


onMounted(() => {
    dataImagen.updatedata()
})

</script>




<style lang="scss" scoped>


</style>