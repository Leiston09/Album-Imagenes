<template>
    <div>
        <h4>{{ imagen.title }}</h4>

        <img :src="imagen.thumbnailUrl" alt="aaaa">
    </div>
</template>

<script setup lang="ts">

defineProps<{
    imagen: {
        albumId: number,
        id : number,
        thumbnailUrl: string,
        title : string,
        url : string
    }
}>()

</script>




<style lang="scss" scoped>


</style>