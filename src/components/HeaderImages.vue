<template>
  <div class="container">

    <section>
      <h3>Resumen</h3>
      <p><strong>Promedio puntuación:</strong> {{ promedioPuntuacion }}</p>
      <p><strong>Total usuarios visibles:</strong> {{ resumen.total }}</p>
      <p><strong>Total admins:</strong> {{ resumen.admins }}</p>
      <p><strong>Total activos:</strong> {{ resumen.activos }}</p>
    </section>

    <section >
      <h3>Filtros</h3>

      <input
        type="text"
        v-model="filtroNombre"
        placeholder="Buscar por nombre"
      />

      <select v-model="filtroRol">
        <option value="">Todos los roles</option>
        <option v-for="rol in rolesUnicos" :key="rol" :value="rol">
          {{ rol }}
        </option>
      </select>

      <label>
        <input type="checkbox" v-model="soloActivos" />
        Mostrar solo activos
      </label>
    </section>

    <section>
      <h3>Usuarios</h3>

      <div v-if="usuariosFiltrados.length === 0">
        No hay usuarios que coincidan con los filtros.
      </div>

      <div
        v-for="usuario in usuariosFiltrados"
        :key="usuario.id"
        class="card"
      >
        <h4>{{ usuario.nombre }}</h4>
        <p><strong>Rol:</strong> {{ usuario.rol }}</p>
        <p><strong>Ciudad:</strong> {{ usuario.direccion.ciudad }}</p>
        <p>
          <strong>Estado:</strong>
          {{ usuario.estado ? "Activo" : "Inactivo" }}
        </p>

        <p><strong>Puntuación:</strong> {{ usuario.puntuacion }}</p>

        <h5>Habilidades:</h5>
        <ul>
          <li v-for="habilidad in usuario.habilidades" :key="habilidad">
            {{ habilidad }}
          </li>
        </ul>

        <button @click="toggleHistorial(usuario.id)">
          {{ historialAbierto === usuario.id ? "Ocultar historial" : "Ver historial" }}
        </button>

        <div v-if="historialAbierto === usuario.id">
          <div v-if="usuario.historial.length === 0">
            Sin historial.
          </div>
          <ul v-else>
            <li
              v-for="registro in usuario.historial"
              :key="registro.fecha + registro.accion"
            >
              {{ registro.fecha }} - {{ registro.accion }} (+{{ registro.puntosGanados }})
            </li>
          </ul>
        </div>

        <button @click="incrementarPuntuacion(usuario.id)">
          Incrementar puntuación
        </button>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue"


const usuarios = ref([
  {
    id: 1,
    nombre: "Alejandro Ruiz",
    edad: 28,
    estado: true,
    rol: "admin",
    puntuacion: 95,
    direccion: { pais: "España", ciudad: "Madrid", codigoPostal: "28001" },
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
    direccion: { pais: "Argentina", ciudad: "Buenos Aires", codigoPostal: "C1001" },
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
  }
])


const filtroNombre = ref("")
const filtroRol = ref("")
const soloActivos = ref(false)

const historialAbierto = ref(null)


const rolesUnicos = computed(() => {
  const roles = usuarios.value.map(u => u.rol)
  
  const a = new Set(roles)
  const aa = [...a]  
  return aa // return [...new Set(roles)]
})

const usuariosFiltrados = computed(() => {
  let resultado = usuarios.value

  if (filtroNombre.value) {
    resultado = resultado.filter(u =>
      u.nombre.toLowerCase().includes(filtroNombre.value.toLowerCase())
    )
  }

  if (filtroRol.value) {
    resultado = resultado.filter(u => u.rol === filtroRol.value)
  }

  if (soloActivos.value) {
    resultado = resultado.filter(u => u.estado)
  }

  return resultado
})

const promedioPuntuacion = computed(() => {
  if (usuariosFiltrados.value.length === 0) return 0

  const suma = usuariosFiltrados.value.reduce(
    (acc, u) => acc + u.puntuacion,
    0
  )
  return (suma / usuariosFiltrados.value.length).toFixed(2)
})

const resumen = computed(() => {
  const lista = usuariosFiltrados.value

  return {
    total: lista.length,
    admins: lista.filter(u => u.rol === "admin").length,
    activos: lista.filter(u => u.estado).length
  }
})


function toggleHistorial(id) {
  historialAbierto.value =
    historialAbierto.value === id ? null : id
}

function incrementarPuntuacion(id) {
  const usuario = usuarios.value.find(u => u.id === id)
  if (usuario) usuario.puntuacion += 1
}


watch(filtroNombre, (nuevoValor) => {
  if (nuevoValor.length > 10) {
    console.warn("El nombre supera los 10 caracteres.")
  }
})

watch(promedioPuntuacion, (nuevoPromedio) => {
  if (nuevoPromedio < 50) {
    console.warn("El promedio es bajo.")
  }
})
</script>

<style>
.container {
  max-width: 800px;
  margin: auto;
  font-family: Arial, sans-serif;
}

.card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 6px;
}
</style>