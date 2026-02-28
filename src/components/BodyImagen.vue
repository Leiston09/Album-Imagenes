<template>

  <section class="cabecera">
    <h1><strong>Usuarios Competitivos </strong></h1>
    <input type="text" v-model="buscarUsuarioPorName">
  </section>
  <section class="users">
    <div v-for="users  in buscarUsuario">
      <p><strong>id : </strong> {{ users.id }}</p>
      <p><strong>Nombre Completo :</strong> {{ users.firstName }} {{ users. lastName }}</p>
      <p><strong>Edad : </strong> {{ users.age }}</p>


    </div>
  </section>


</template>

<script setup>

import { computed, onMounted, ref, watch } from 'vue';



const usuarios = ref([])
const buscarUsuarioPorName = ref('')

onMounted(
    async () => {
      try {
        const API = 'https://dummyjson.com/users'
        const respuesta = await fetch(API)
        const datos = await respuesta.json()
        usuarios.value = datos.users
      } catch (error) {
        console.log(`LA SOLICITUD A LA API DIO ERROR : ${error}`)
      }
    }
)

const buscarUsuario = computed(() => {
  let users = usuarios.value
  if (buscarUsuarioPorName.value)  users = users.filter(u => (
    u.lastName && u.firstName).toLowerCase().includes(buscarUsuarioPorName.value.toLowerCase())  ) 
  return users
})


const paisesTotales = computed(() => {
  let paises = usuarios.value
  let paisesTotal = paises.map(p => p.address.country)
  return [...new Set(paisesTotal)]
})


watch(usuarios , (users) => {
  users ? console.log(users) : console.log('API MAL')
})

</script>

<style lang="scss" scoped>

</style>