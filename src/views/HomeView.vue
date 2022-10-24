<template>
  <app-menu @usuario="buscarUsuario($event)"></app-menu>
  <app-usuarios :findUser="findUser"/>
  <app-footer/>
</template>

<script>
import AppMenu from '@/components/AppMenu.vue';
import AppUsuarios from '@/components/AppUsuarios.vue';
import AppFooter from '@/components/AppFooter';
export default {
  name: 'HomeView',
  data() {
    return {
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
  mounted() {
  },
  components: {
    AppMenu,
    AppUsuarios,
    AppFooter,
  }
}
</script>

<style>
</style>
