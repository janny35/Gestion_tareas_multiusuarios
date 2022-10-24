<template>
  <app-menu @usuario="buscarUsuario($event)"></app-menu>
  <app-footer/>
</template>

<script>
import AppMenu from '@/components/AppMenu.vue';
import AppFooter from '@/components/AppFooter';
export default {
  name: 'TaskView',
  data() {
    return {
      usuarios: [],
      tareas: [],
      findUser: null,
    }
  },
  methods: {
    buscarUsuario(item) {
      this.findUser = item;
    }
  },
  computed: {
  },
  async mounted() {
    try {
      const usuarios = await axios.get(`${process.env.VUE_APP_API_BACKEND}/usuarios`);
      if (usuarios.status === 200) {
        this.usuarios = usuarios.data;
      } else {
        console.log('No se pudo obtener datos de usuarios');
      }
    } catch (error) {
      console.error('Error obteniendo usuarios: ', error.message);
    }
    try {
      const tareas = await axios.get(`${process.env.VUE_APP_API_BACKEND}/tareas`);
      if (tareas.status === 200) {
        this.tareas = tareas.data;
      } else {
        console.log('No se pudo obtener datos de tareas');
      }
    } catch (error) {
      console.error('Error obteniendo tareas: ', error.message);
    }
  },
  components: {
    AppMenu,
    AppFooter,
  }
}
</script>

<style>
</style>
