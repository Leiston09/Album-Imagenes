<template>
  <section class="cabecera">
    <h1><strong>Usuarios Competitivos </strong></h1>    
    <div>
      <button @click="activateFilter = !activateFilter">{{activateFilter ? 'Deactive filter' : 'Activate filter [ASC / DESC]'}}</button>

      <div v-if="activateFilter">
        <input type="checkbox"
        v-model="filterUsersAscendants"
        :true-value="true"
        :false-value="false">
        {{'FILTER ORDER ASC' }}
        
        <input type="checkbox"
        v-model="filterUsersAscendants"
        :true-value="false"
        :false-value="true">
        {{ 'FILTER ORDER DESC'  }}
      </div>

      <hr>
      <li>Filter Users Name:</li>
      <input type="text" v-model="buscarUsuarioPorName" placeholder="Search by name">
      
    </div>

    <div>
      filter Users Country: 
      <select v-model="filtrerUsersAddressCountry">

        <option value="">Select an option</option>
        <option v-for="pais in paisesTotales" 
        :key="pais"
        :value="pais">
          {{ pais }}
        </option>
      </select>

      filter Users Role:
      <select v-model="filterUsersRole">
        <option value="">Select an option</option>
        <option v-for="role in usersRolesUnique" 
        :key="role"
        :value="role">
          {{ role }}
        </option>
      </select>

    </div>



  </section>

  <section class="datosUsers">
    <div>
      <p><strong>Usuarios Activos :</strong> {{ counterUsers.Asset }}</p>
      <p><strong>Usuarios Inactivos :</strong> {{ counterUsers.Idle }}</p>
      <p><strong>Promedio Usuarios :</strong> {{ counterUsers.rankingUnique }}</p>

      <p><strong>Usuarios Mayor Promedio  :</strong> <span v-for="users in counterUsers.highestScore "> {{ users.firstName }}. Con un promedio de : {{ users.rankingUnique }}</span></p>

    </div>

  </section>

  <section >
    <div v-if="filtrarUsers === 0">
      <p><strong>Cargando Usuarios</strong></p>
    </div>

    <div v-else>
      <div class="users" v-for="users  in filtrarUsers"
      :key="users.id">

        <div style="display: flex;">
              <div>
                <p><strong>id : </strong> {{ users.id }}</p>
                <p><strong>Nombre Completo :</strong> {{ users.firstName }} {{ users. lastName }}</p>
                <p><strong>Pais : </strong>{{ users.address.country }}</p>      
                <p><strong>Edad : </strong> {{ users.age }}</p>
                <p><strong>Punruacion : {{ (users.id * rankingUsers) }}</strong></p>
                <p><strong>Rol : </strong>{{ users.role }}</p>        
              </div>
              <div style="margin-left: 10%;">
                <p><strong>Estado : </strong>{{ users.state }}</p>
              </div>  
              
        </div>
      </div>
    </div>

  </section>


</template>

<script setup>

import { computed, onMounted, ref, watch } from 'vue';



const usuarios = ref([])
const buscarUsuarioPorName = ref('')
const filtrerUsersAddressCountry = ref('')
const filterUsersRole = ref('')
const activateFilter = ref(false)
const filterUsersAscendants = ref(true)
const stateUsersAsset = ref(null)
const stateUsersIdle = ref(null)


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

const filtrarUsers = computed(() => {
  let users = usuarios.value

  if (buscarUsuarioPorName.value)  users = users.filter(u => ((
    u.lastName).toLowerCase().includes(buscarUsuarioPorName.value.toLowerCase()) || ((
      u.firstName).toLowerCase().includes(buscarUsuarioPorName.value.toLowerCase())  ) ))  

  if (filtrerUsersAddressCountry.value) users = users.filter(country => country.address.country === filtrerUsersAddressCountry.value)

  if (filterUsersRole.value) users = users.filter(r => r.role === filterUsersRole.value)

  if (activateFilter.value) { 
    filterUsersAscendants.value 
    ? users = users.sort((a,b) => a.firstName.localeCompare(b.firstName)) 
    : users = (users.sort((a,b) => a.firstName.localeCompare(b.firstName))).toReversed()
  }

  users = users.map(u => {
    if (u.age > 30) {
      return { ...u, state: "Asset" }
    } else {
      return { ...u, state: "Idle" }
    }
  })

  users = users.map(p => {return { ...p, rankingUnique: p.id * Math.floor((Math.random() * 10))}})
    
  return users
})

const paisesTotales = computed(() => {
  let paises = usuarios.value
  paises = paises.map(p => p.address.country)
  return [...new Set(paises)]
})

const usersRolesUnique = computed(() => {
  let role = usuarios.value
  role = role.map(r => r.role)
  return [...new Set(role)]
})

const rankingUsers = computed(() => {
  return Math.floor(Math.random() * 10)
})

const counterUsers = computed(() => {
  let counter = filtrarUsers.value
  let Asset = (counter.filter(u => u.state === 'Asset' )).length
  let Idle = (counter.filter(u => u.state === 'Idle' )).length
  let rankingUnique = (counter.map(n => n.rankingUnique))

  let highestScore = counter.filter(p => p.rankingUnique === (Math.max(...rankingUnique)))

  rankingUnique = ((rankingUnique.reduce((acumulador , actual) => acumulador + actual, 0)) / rankingUnique.length).toFixed(2)

  return {Asset , Idle , rankingUnique , highestScore}

})



watch(filtrarUsers , (users) => {
  //users ? console.log(users) : console.log('API MAL')
  if(users){
    //console.log(users.map(u => u.firstName))
    //let prueba = users.map(u => u.firstName)
    //console.log(prueba.sort())
    //console.log(users.sort(u => u.firstName === prueba.value))
    //console.log( typeof (users.sort((a, b) => a.firstName.localeCompare(b.firstName))))
    //let dato = users.sort((a, b) => a.firstName.localeCompare(b.firstName))
    //let arrays = [dato]
    //console.log(typeof arrays)
    //console.log(Math.floor(Math.random() * 10)); 
    //let validation = users.filter(u => u.age > 30)
    //console.log(validation)
    //let usersid = filtrarUsers.value
    //let activos = usersid.filter(u => u.age > 30)
    //if(activos){
    // usersid = (usersid = {state : 'Asset' , ...usersid})}  
    //if (usersid !== activos){
    //  usersid = (usersid = {state : 'Idle' , ...usersid})}
  }

  if(users.length < 3){
    console.warn('HAY MENOS DE 3 USUARIOS')
  }

})

watch( counterUsers , (actual) => {
  if(actual.rankingUnique < 50){
    console.log('Ranquin Bajo')
  }
})

</script>

<style>

.usersx{
  margin: 5px;
  padding: 10px;
  background: #08aabf29;
  border: 1px solid;
  border-color: rgb(255, 0, 0);
  justify-content: center;
}

.cabecerax{
  display: flex;
  flex-direction: column;
}
</style>