<template>

    <section class="Users-Filters">
        <div class="m-10 flex flex-col">
            <div class="flex justify-end">
                <button class=" bg-red-400 p-1" @click="viewToggleUsers">
                    <strong>
                    {{ toggleView ? 'Business Cards' : 'Table Visualization' }}                    
                    </strong>
                </button>
            </div>
            <div>
                <strong> Buscar Usuario</strong>
            </div>

            <input class=" bg-emerald-100 p-1 border-2 border-blue-400 mb-5" type="text" v-model="searchUsername" placeholder="Enter full name">
            <div class=" flex">
                <div>
                    <strong>Buscar por País : </strong>
                    <select class="border-2 border-blue-400 bg-amber-50" v-model="searchUserCountry">
                        <option value="">Select on opction</option>
                        <option v-for="countries in availableCountries"
                        :key="countries"
                        :value="countries">
                            {{ countries }}
                        </option>
                    </select>                
                </div>
                <div class=" ms-4">
                    <strong>Buscar por State : </strong>
                    <select class="border-2 border-blue-400 bg-amber-50" v-model="searchUsersState">
                        <option value="">Select on opction</option>
                        <option v-for="state in availableState"
                        :key="state"
                        :value="state">
                            {{ state }}
                        </option>
                    </select>                
                </div>                
            </div>
            <div class="flex items-center justify-center">
                <button  class=" bg-green-200 m-5 p-2" @click="currentOrder(null)">Standard filter</button>
                <button  class=" bg-green-200 m-5 p-2" @click="currentOrder('ASC')">Upstream filter (ASC)</button>
                <button  class=" bg-green-200 m-5 p-2" @click="currentOrder('DESC')">Down-filter (DESC)</button>
            </div>


        </div>
    </section>

    <section class="UsersCalculation">
        <p><strong>Promedio puntuacion : </strong>{{ usersCalculation }}</p>
        <p><strong>Users Asset : </strong>{{ userStateCalculation.Asset }}</p>
        <p><strong>Users Idle : </strong>{{ userStateCalculation.idle }}</p>
        <p><strong>user with the highest score: </strong> 
            <span v-for="users in usersScore" :key="users.id"> 
                User : <strong>{{ users.firstName }} </strong> points: <strong>{{ users.points }}</strong>
            </span>
        </p>


    </section>
    <section class="users">
        <div v-if="usersFiltersCurrentOrder.length === 0">
            <p><strong>Users not found</strong></p>
        </div>
        <div v-else>
            <div v-if="toggleView">
                <div class=" bg-cyan-100 m-5 p-5 " v-for="user in usersFiltersCurrentOrder"
                :key="user.id">
                    <p><strong>{{ user.firstName }} {{ user.lastName }}</strong></p>
                    <hr>
                    <div class="flex p-3">
                        <div >
                            <p><strong>Edad : </strong>{{ user.age }}</p>
                            <p><strong>Ciudad : </strong>{{ user.address.country }}</p>
                            <p><strong>Email : </strong>{{ user.email }}</p>
                            <p><strong>Phone : </strong>{{ user.phone }}</p>
                        </div>
                        <div class="ms-5">
                            <p><strong>Role : </strong>{{ user.role }}</p>
                            <p><strong>Points : </strong>{{ user.points }}</p>
                            <p><strong >State : </strong> <strong :class="(user.state === 'Asset' ? ' text-green-700' : ' text-red-700')">{{ user.state }}</strong></p>
                        </div>                
                    </div>
                </div>            
            </div>
            <div v-else>
                <table>
                    <thead>
                        <tr>                            
                            <th><strong>Nombre Completo: </strong></th>
                            <th><strong>Edad: </strong></th>
                            <th><strong>Ciudad: </strong></th>
                            <th><strong>Email: </strong></th>
                            <th><strong>Phone: </strong></th>
                            <th><strong>Role: </strong></th>
                            <th><strong>Points: </strong></th>
                            <th><strong >State: </strong></th>
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



</script>

<style >

</style>