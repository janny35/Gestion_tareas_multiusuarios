<template>
  <app-menu @usuario="buscarUsuario($event)"></app-menu>
  <app-calendar :usuario="usuario" :tareas="tareas"></app-calendar>
  <app-footer/>
</template>

<script>
import AppMenu from '@/components/AppMenu.vue';
import AppCalendar from '@/components/AppCalendar.vue';
import AppFooter from '@/components/AppFooter';
export default {
  name: 'TaskView',
  data() {
    return {
      usuario: this.resetDatosUsuario(),
      tareas: [],
    }
  },
  methods: {
    resetDatosUsuario () {
      return {
          id: null,
          correo: null,
          nombre: null,
          direccion: null,
          telefono: null,
          edad: null,
      };
    },
    buscarUsuario(item) {
      this.findUser = item;
    }
  },
  computed: {
  },
  async mounted() {
    const idUsuario = this.$route.params.id || 0;
    try {
      const usuario = await axios.get(`${process.env.VUE_APP_API_BACKEND}/usuarios/${idUsuario}`);
      if (usuario.status === 200) {
        this.usuario = usuario.data;
      } else {
        console.log('No se pudo obtener datos de usuario');
      }
    } catch (error) {
      console.error('Error obteniendo usuario: ', error.message);
    }
    if (this.usuario.id) {
      try {
        const tareas = await axios.get(`${process.env.VUE_APP_API_BACKEND}/tareas`);
        if (tareas.status === 200) {
          this.tareas = tareas.data.filter((tarea) => tarea.fk_usuario === this.usuario.id);
        } else {
          console.log('No se pudo obtener datos de tareas');
        }
      } catch (error) {
        console.error('Error obteniendo tareas: ', error.message);
      }
    }
  },
  components: {
    AppMenu,
    AppCalendar,
    AppFooter,
  }
}
</script>

<style>
</style>
