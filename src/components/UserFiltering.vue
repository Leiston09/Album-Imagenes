<template>
    <div class=" flex justify-center ">
        <button class="bg-amber-300 p-2 m-5" @click="toggleLanguage">
        {{ language === 'es' ? 'English' : 'Español' }}
        </button>        
    </div>

    <section class="Users-Filters">
        <div class="m-10 flex flex-col">
            <div class="flex justify-end">
                <button class=" bg-red-400 p-1" @click="viewToggleUsers">
                    <strong>
                    {{ toggleView ? text('BusinessCards'): text('TableVisualization') }}                    
                    </strong>
                </button>
            </div>
            <div>
                <strong>{{ text('searchUser') }}</strong>
            </div>

            <input class=" bg-emerald-100 p-1 border-2 border-blue-400 mb-5" type="text" v-model="searchUsername" :placeholder="text('inputSearchUser')">
            <div class=" flex">
                <div>
                    <strong>{{text('searchCountry')}} </strong>
                    <select class="border-2 border-blue-400 bg-amber-50" v-model="searchUserCountry">
                        <option value="">{{ text('selectOption') }}</option>
                        <option v-for="countries in availableCountries"
                        :key="countries"
                        :value="countries">
                            {{ countries }}
                        </option>
                    </select>                
                </div>
                <div class=" ms-4">
                    <strong>{{ text('searchState') }}</strong>
                    <select class="border-2 border-blue-400 bg-amber-50" v-model="searchUsersState">
                        <option value="">{{ text('selectOption') }}</option>
                        <option v-for="state in availableState"
                        :key="state"
                        :value="state">
                            {{ state }}
                        </option>
                    </select>                
                </div>                
            </div>
            <div class="flex items-center justify-center">
                <button  class=" bg-green-200 m-5 p-2" @click="currentOrder(null)">{{ text('standardFilter') }}</button>
                <button  class=" bg-green-200 m-5 p-2" @click="currentOrder('ASC')">{{ text('ascFilter') }}</button>
                <button  class=" bg-green-200 m-5 p-2" @click="currentOrder('DESC')">{{ text('descFilter') }}</button>
            </div>


        </div>
    </section>

    <section class="UsersCalculation">
        <p><strong>{{ text('avgScore') }} : </strong>{{ usersCalculation }}</p>
        <p><strong>{{ text('usersAsset') }} : </strong>{{ userStateCalculation.Asset }}</p>
        <p><strong>{{ text('usersIdle') }} : </strong>{{ userStateCalculation.idle }}</p>
        <p><strong>{{ text('highestScore') }} : </strong> 
            <span v-for="users in usersScore" :key="users.id"> 
                {{ text('User') }} : <strong>{{ users.firstName }} </strong> {{ text('points') }} : <strong>{{ users.points }}</strong>
            </span>
        </p>


    </section>
    <section class="users">
        <div v-if="usersFiltersCurrentOrder.length === 0">
            <p><strong>{{ text('usersNotFound') }}</strong></p>
        </div>
        <div v-else>
            <div v-if="toggleView">
                <div class=" bg-cyan-100 m-5 p-5 " v-for="user in usersFiltersCurrentOrder"
                :key="user.id">
                    <p><strong> {{ text('fullName') }} :  {{ user.firstName }} {{ user.lastName }}</strong></p>
                    <hr>
                    <div class="flex p-3">
                        <div >
                            <p><strong>{{ text('age') }} : </strong>{{ user.age }}</p>
                            <p><strong>{{ text('city') }} : </strong>{{ user.address.country }}</p>
                            <p><strong>{{ text('email') }} : </strong>{{ user.email }}</p>
                            <p><strong>{{ text('phone') }} : </strong>{{ user.phone }}</p>
                        </div>
                        <div class="ms-5">
                            <p><strong>{{ text('role') }} : </strong>{{ user.role }}</p>
                            <p><strong>{{ text('points') }} : </strong>{{ user.points }}</p>
                            <p><strong >{{ text('state') }} : </strong> <strong :class="(user.state === 'Asset' ? ' text-green-700' : ' text-red-700')">{{ user.state }}</strong></p>
                        </div>                
                    </div>
                </div>            
            </div>
            <div v-else>
                <table>
                    <thead>
                        <tr>                            
                            <th><strong>{{ text('fullName') }} : </strong></th>
                            <th><strong>{{ text('age') }} : </strong></th>
                            <th><strong>{{ text('city') }} : </strong></th>
                            <th><strong>{{ text('email') }} : </strong></th>
                            <th><strong>{{ text('phone') }} : </strong></th>
                            <th><strong>{{ text('role') }} : </strong></th>
                            <th><strong>{{ text('points') }} : </strong></th>
                            <th><strong>{{ text('state') }} : </strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in usersFiltersCurrentOrder"
                                :key="user.id">
                            <td><strong>{{ user.firstName }} {{ user.lastName }}</strong></td>
                            <td><strong>{{ user.age }}</strong></td>
                            <td><strong>{{ user.address.country }}</strong></td>
                            <td><strong>{{ user.email }}</strong></td>
                            <td><strong>{{ user.phone }}</strong></td>
                            <td><strong>{{ user.role }}</strong></td>
                            <td><strong>{{ user.points }}</strong></td>
                            <td><strong :class="(user.state === 'Asset' ? ' text-green-700' : ' text-red-700')">{{ user.state }}</strong></td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>

    </section>

</template>


<script setup>
import { computed, onMounted, ref, watch } from 'vue';

const users = ref([])

const searchUsername = ref('')
const searchUserCountry = ref('')
const searchUsersState = ref('')

const currentOrderUsers = ref(null)
const toggleView = ref(true)

const usersFilters = computed(() => {
    let userfilters = users.value
    if(searchUsername.value){
        userfilters = userfilters.filter(u => u.firstName.toLowerCase().includes(searchUsername.value.toLowerCase()) || u.lastName.toLowerCase().includes(searchUsername.value.toLowerCase())) 
    }
    if(searchUserCountry.value){
        userfilters = userfilters.filter(u => u.address.country === searchUserCountry.value)
    }
    if(searchUsersState.value){
        userfilters = userfilters.filter(u => u.state === searchUsersState.value)
    }
    return userfilters
})

const usersFiltersCurrentOrder = computed(() => {
    let order = [...usersFilters.value]
    if(currentOrderUsers.value === 'ASC'){
        order = order.sort((a , b) => a.firstName.localeCompare(b.firstName))
        return order
    }

    if(currentOrderUsers.value === 'DESC'){
        order = (order.sort((a , b) => b.firstName.localeCompare(a.firstName)))
        return order
    }
    else{
        return order
    }
})

function currentOrder(SelectedOrder) {
    currentOrderUsers.value = SelectedOrder
}

const availableCountries = computed(() => {
    let countries = users.value
    countries = countries.map(c => c.address.country)
    countries = [...new Set(countries)]
    return countries
})

const availableState = computed(() => {
    let state = users.value
    state = state.map(s => s.state)
    state = [...new Set(state)]
    return state
})

const viewToggleUsers = () => {
    toggleView.value = !toggleView.value
}

const usersCalculation = computed(() => {
    let calculation = usersFilters.value
    let resultCalculation = (calculation.map(u => u.points)).reduce((acumulador , actual) => acumulador + actual, 0 )
    //console.log(calculation.reduce((acumulador , actual) => acumulador + actual, 0 ))
    resultCalculation = Number((resultCalculation / calculation.length).toFixed(2))
    return resultCalculation
})

const userStateCalculation = computed(() => {
    let state = usersFilters.value
    let Asset = (state.filter(u => u.state === 'Asset')).length
    //let idle = state.length - Asset
    let idle = (state.filter(u => u.state === 'Idle')).length
    return {Asset, idle}
})

const usersScore = computed(() => {
    let score = usersFilters.value
    let numeros = Math.max(...(score.map(u => u.points)))
    score = score.filter(u => u.points === numeros)
    return score
})

const callAPI =  async () => {
    const result = await fetch('https://dummyjson.com/users') 
    let data = await result.json()
    data = await data.users
    let dataUsers = data.slice(0,10)
    const UsersComplete = dataUsers.map(u => { return {
        ...u , 
        state: u.age > 30 ? 'Asset' : 'Idle' , 
        points: (Math.floor(Math.random() * 100))}})
    //dataUsers.map(u => { if(u.age > 30) { u.state = 'Asset'} else { u.state = 'idle'} u.points = Math.floor(Math.random() * 100)})
    users.value = UsersComplete
}

onMounted(() => {
    callAPI()
})

watch(usersCalculation , (average) => {
    if(average < 50){
        console.warn('low average')
    }
})

watch(usersFilters, (users) =>{
    if(users.length < 3){
        console.warn('Few users')
    }
})

watch(toggleView, (view) => {
    if(view){
        console.warn('card views')
    }
    else{
        console.warn('views in tables')
    }
})


const language = ref('es')

const analysis  = {
  es: {
    TableVisualization: "Visualización en tablas",
    BusinessCards: "presentación en Tarjetas ",
    User: "Usuario",
    points: "Puntos",
    selectOption: "Seleccionar opción",
    searchUser: "Buscar usuario",
    inputSearchUser : "Ingrese el nombre completo",
    searchCountry: "Buscar por País",
    searchState: "Buscar por Estado",
    standardFilter: "Filtro estándar",
    ascFilter: "Orden Ascendente",
    descFilter: "Orden Descendente",
    avgScore: "Promedio puntuación",
    usersAsset: "Usuarios Activos",
    usersIdle: "Usuarios Inactivos",
    highestScore: "Usuario con mayor puntuación",
    usersNotFound: "Usuarios no encontrados",
    fullName: "Nombre Completo",
    age: "Edad",
    city: "Ciudad",
    email: "Email",
    phone: "Teléfono",
    role: "Rol",
    points: "Puntos",
    state: "Estado"
  },

  en: {
    TableVisualization: "Table Visualization",
    BusinessCards: "Business Cards ",
    User: "User",
    points: "points",
    searchUser: "Search user",
    selectOption: "Select option",
    inputSearchUser : "Enter full name",
    searchCountry: "Search by country",
    searchState: "Search by state",
    standardFilter: "Standard filter",
    ascFilter: "Ascending order",
    descFilter: "Descending order",
    avgScore: "Average score",
    usersAsset: "Active users",
    usersIdle: "Inactive users",
    highestScore: "User with highest score",
    usersNotFound: "Users not found",
    fullName: "Full Name",
    age: "Age",
    city: "City",
    email: "Email",
    phone: "Phone",
    role: "Role",
    points: "Points",
    state: "State"
  }
}

function text(dato){
  return analysis[language.value][dato]
}

function toggleLanguage(){
  language.value = language.value === 'es' ? 'en' : 'es'
}

</script>

<style >

</style>