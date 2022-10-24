<template>
    <div class="tm-hero d-flex justify-content-center align-items-center" data-parallax="scroll" data-image-src="img/hero.jpg">
        <form class="d-flex tm-search-form">
            <input class="form-control tm-search-input" type="search" v-model="usuario" placeholder="Buscar usuario..." aria-label="Search">
            <button class="btn btn-outline-success tm-search-btn" type="button" @click="buscarUsuario">
                <i class="fas fa-search"></i>
            </button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'appMenu',
    data(){
        return {
            usuario: null,
        }
    },
    methods: {
        buscarUsuario() {
            this.$emit('usuario', this.usuario);
        }
    },
    computed: {
    },
}
</script>

<style>

</style>