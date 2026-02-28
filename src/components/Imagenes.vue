<template>

  <div>
    <div>
      <H4 v-if="calcularPromedioPuntuacion">Calcule el promedio de puntuación : {{ calcularPromedioPuntuacion }}</H4>
      <h4>Usuarios visibles : {{ usuariosVisibles }}</h4>
      <h4>Usuarios Admin : {{ totalAdmin }}</h4>
      <h4>Usuarios Activos : {{ totalActivos }}</h4>

      <h3>Seleciona la forma de localizar</h3>

      <select v-model="filtros.seleccion">
        <option value="">Please select one</option>
        <option>Nombre</option>
        <option>Roles</option>
        <option>Activos</option>
      </select>
      
    </div>




    <div>
      <div v-if="filtros.BusquedaRoles">
        <h3>Filtrar Por Roles: {{ filtros.tipos.tipoRoles }} </h3>
        <select v-model="filtros.tipos.tipoRoles">
          <option value="">Please select one</option>
          <option v-for="roles in usuarios" :value="roles.rol">
                  {{ roles.rol }}
          </option>
        </select>
      </div>

      <div v-else-if="filtros.BusquedaNombre">
        <h3>Buscar Usuario: <span><input type="text" v-model="filtros.tipos.buscarUsuarioNombre" placeholder="Nombre Usuario"></span></h3>
      </div>    
      
      <div v-else-if="filtros.MostrarActivos">
        <h3>Quieres ver solo los activos? <span><button @click="filtros.tipos.estadoUsuarios = !filtros.tipos.estadoUsuarios">{{ filtros.tipos.estadoUsuarios ? 'Deseas ver el listado completo?' : 'Deseas ver solo los activos?' }}</button></span></h3>
        <h4>Estas viedno : <span>{{ filtros.tipos.estadoUsuarios ? 'Usuarios activos' : 'listado Completo'  }}</span></h4>
        <input type="checkbox" v-model="filtros.tipos.estadoUsuarios">{{ (filtros.tipos.estadoUsuarios) }}
      </div>
    </div>

  </div>







  <div v-if="encontrarUsuario.length > 0">
      <div>HABILIDADES: <button @click="verHabilidades = !verHabilidades">{{ verHabilidades ? 'Ocultar Habilidades' : 'Mostrar Habilidades' }}</button></div>
      <div v-for="usuario in encontrarUsuario"
      :key="usuario.id">
        <h3>Analisis del Usuario</h3>
        <div>Nombre : {{ usuario.nombre }}</div>
        <div>Rol : {{ usuario.rol }}</div>
        <div>Ciudad :{{ usuario.direccion.ciudad }}</div>
        <div>Estado : {{ usuario.estado }}</div>
        <div v-show="verHabilidades">
            <div v-for="(habilidades , clave)  in usuario">
                <h1 v-if="clave === 'habilidades'">
                    <li v-for="habilidad in habilidades">
                      {{ hab  ilidad }}
                    </li>
                </h1>
            </div>
        </div>  
      </div>
  </div>

  <div v-else>
    <h3>Usuario no Encontrado</h3>
  </div>







</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue';

const usuarios = reactive([
  {
    id: 1,
    nombre: "Alejandro Ruiz",
    edad: 28,
    estado: true,
    rol: "admin",
    puntuacion: 95,
    direccion: { 
      pais: "España", 
      ciudad: "Madrid", 
      codigoPostal: "28001" 
    },
    habilidades: ["JavaScript", "React", "Node.js"],
    historial: [
      { fecha: "2025-02-10", accion: "Login", puntosGanados: 5 },
      { fecha: "2025-02-12", accion: "Update post", puntosGanados: 10 }
    ]
  },
  {
    id: 2,
    nombre: "Mariana Costa",
    edad: 34,
    estado: true,
    rol: "editor",
    puntuacion: 82,
    direccion: { 
      pais: "Argentina", 
      ciudad: "Buenos Aires", 
      codigoPostal: "C1001" 
    },
    habilidades: ["SEO", "Copywriting", "HTML"],
    historial: [
      { fecha: "2025-02-15", accion: "Create post", puntosGanados: 20 }
    ]
  },
  {
    id: 3,
    nombre: "Julian Smith",
    edad: 22,
    estado: false,
    rol: "viewer",
    puntuacion: 45,
    direccion: { pais: "EEUU", ciudad: "Miami", codigoPostal: "33101" },
    habilidades: ["Análisis de datos"],
    historial: []
  },
  {
    id: 4,
    nombre: "Lucía Méndez",
    edad: 29,
    estado: true,
    rol: "editor",
    puntuacion: 78,
    direccion: { 
      pais: "México", 
      ciudad: "CDMX", 
      codigoPostal: "01000" 
    },
    habilidades: ["Photoshop", "UI/UX"],
    historial: [
      { fecha: "2025-01-20", accion: "Edit image", puntosGanados: 15 }
    ]
  },
  {
    id: 5,
    nombre: "Erik Nielsen",
    edad: 41,
    estado: true,
    rol: "admin",
    puntuacion: 110,
    direccion: { 
      pais: "Dinamarca", 
      ciudad: "Copenhague", 
      codigoPostal: "1000" 
    },
    habilidades: ["C++", "Python", "Cloud"],
    historial: [
      { fecha: "2025-02-01", accion: "Server maintenance", puntosGanados: 50 }
    ]
  }
]);

const verHabilidades = ref(false) 

const filtros = reactive({
  seleccion : '',
  BusquedaNombre : false,
  BusquedaRoles : false,
  MostrarActivos : false,
  tipos : {
    buscarUsuarioNombre: '',
    tipoRoles: '',
    estadoUsuarios : false
  }

})


const encontrarUsuario = computed(() => {
  if(filtros.BusquedaRoles){
    filtros.tipos.buscarUsuarioNombre = ''
    let resultado = filtros.tipos.tipoRoles
    return usuarios.filter(u => u.rol === resultado)
  }

  else if (filtros.BusquedaNombre){
    filtros.tipos.tipoRoles = ''
    return usuarios.filter(u => u.nombre.toLowerCase().includes(filtros.tipos.buscarUsuarioNombre.toLowerCase()))
  }


  else if (filtros.MostrarActivos){
    if(filtros.tipos.estadoUsuarios){
      return usuarios.filter(u => u.estado)
    }
    return usuarios
  }

  else{
    return usuarios
  }

})

const calcularPromedioPuntuacion = computed(() => {
  let suma = 0
  encontrarUsuario.value.forEach(p =>{ 
    suma += p.puntuacion} )
  return suma / encontrarUsuario.value.length
})

const usuariosVisibles = computed(() => {
   return encontrarUsuario.value.map(u => u.id).length
   
})

const totalAdmin = computed(() => {
 return encontrarUsuario.value.filter(u => u.rol === 'admin').length

})

const totalActivos = computed(() => {

  return encontrarUsuario.value.filter(u => u.estado === true).length
})




watch( () => filtros.seleccion , (accion , _) => {
  if(accion === 'Activos'){
    filtros.BusquedaNombre = false
    filtros.BusquedaRoles = false
    filtros.MostrarActivos = true
  }
  if (accion === 'Nombre') {
    filtros.BusquedaNombre = true
    filtros.BusquedaRoles = false
    filtros.MostrarActivos = false
  }
  else if(accion === 'Roles'){
    filtros.BusquedaNombre = false
    filtros.BusquedaRoles = true
    filtros.MostrarActivos = false
  }

})




</script>



<style >

</style>