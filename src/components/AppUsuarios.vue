<template>
    <div class="container-fluid tm-container-content tm-mt-60">
        <div class="row mb-4">
            <h2 class="col-6 tm-text-primary">
                Usuarios Registrados: {{usuarios.length}}
            </h2>
            <div class="col-6 d-flex justify-content-center align-items-center">
                <button class="btn btn-primary tm-btn-prev mb-2" data-toggle="modal" data-target="#modalFormUser" ref="openModal"><i class="fa fa-plus"></i> Agregar usuario</button>
            </div>
        </div>
        <div class="row tm-mb-90 tm-gallery">
            <div class="col-lg-3 col-md-6 col-sm-6 col-12 mb-5" v-for="usuario in listaUsuarios" :key="usuario.id">
                <img src="img/user.jpg" alt="Image" width="250" class="mb-4 img-fluid">
                <h2 class="tm-text-primary mb-4">{{usuario.nombre}}</h2>
                <h3 class="tm-text-secondary h5 mb-4">{{usuario.correo}}</h3>
                <p class="mb-4">
                    <div v-if="usuario.telefono"><strong>Telefono:</strong> <span>{{usuario.telefono}}</span></div>
                    <div v-if="usuario.direccion"><strong>Dirección:</strong> <span>{{usuario.direccion}}</span></div>
                    <div v-if="usuario.edad"><strong>Edad:</strong> <span>{{usuario.edad}}</span></div>
                </p>
                <ul class="tm-social pl-0 mb-0">
                    <li><a href="#"><i @click="editarUsuario(usuario)" class="fa fa-user-edit" data-toggle="tooltip" data-placement="bottom" title="Editar datos de usuario"></i></a></li>
                    <li><a href="#"><i @click="abrirModalEliminacion(usuario.id)" class="fa fa-trash" data-toggle="tooltip" data-placement="bottom" title="Eliminar usuario"></i></a></li>
                    <li><a href="#"><i @click="abrirTareas(usuario.id)" class="far fa-calendar-alt" data-toggle="tooltip" data-placement="bottom" title="Revisar tareas registradas"></i></a></li>
                </ul>
            </div>
        </div>
    </div>

    <!-- Modal Edicion-->
    <div class="modal fade" id="modalFormUser" role="dialog" tabindex="-1"  aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">{{!edicionDatos ? 'Agregar Usuario' : 'Editar Usuario'}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="contact-form" class="tm-contact-form mx-auto" @submit.prevent="guardarDatos()">
                        <div class="form-group">
                            <input type="email" v-model="datosUsuario.correo" class="form-control rounded-0" placeholder="Correo" required />
                        </div>
                        <div class="form-group">
                            <input type="text" v-model="datosUsuario.nombre" class="form-control rounded-0" placeholder="Nombre" required />
                        </div>
                        <div class="form-group">
                            <textarea rows="8" v-model="datosUsuario.direccion" class="form-control rounded-0" placeholder="Dirección"></textarea>
                        </div>
                        <div class="form-group">
                            <input type="text" v-model="datosUsuario.telefono" class="form-control rounded-0" placeholder="Teléfono"/>
                        </div>
                        <div class="form-group">
                            <input type="number" v-model="datosUsuario.edad" class="form-control rounded-0" placeholder="Edad"/>
                        </div>
                        <!-- <div class="form-group">
                            <select class="form-control" id="contact-select" name="inquiry">
                                <option value="-">Subject</option>
                                <option value="sales">Sales &amp; Marketing</option>
                                <option value="creative">Creative Design</option>
                                <option value="uiux">UI / UX</option>
                            </select>
                        </div> -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal" ref="closeModal">Cerrar</button>
                            <button type="submit" class="btn btn-light">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal eliminacion -->
    <button class="invisible" data-toggle="modal" data-target="#modalDeleteUser" ref="openModalDelete"></button>
    <div class="modal fade" id="modalDeleteUser" role="dialog" tabindex="-1"  aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleDeleteTitle">Eliminación de usuario</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h5>Esta seguro de eliminar el usuario?</h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal" ref="closeModalDelete">Cancelar</button>
                    <button type="button" class="btn btn-light" @click="eliminarUsuario()">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'appUsuarios',
    data() {
        return {
            listaUsuarios: [],
            usuarios: [],
            datosUsuario: this.resetDatosUsuario(),
            edicionDatos: false,
        }
    },
    props: ["findUser"],
    methods: {
        async getData() {
            try {
                const usuarios = await axios.get(`${process.env.VUE_APP_API_BACKEND}/usuarios`);
                if (usuarios.status === 200) {
                    this.usuarios = usuarios.data;
                    this.listaUsuarios = this.usuarios;
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
        validarCorreo(correo) {
            const existeCorreo = this.usuarios.filter((usuario) => usuario.correo === correo);
            console.log('existe correo -- ', existeCorreo);
            return existeCorreo.length === 0;
        },
        async guardarDatos () {
            try {
                let result;
                if (this.datosUsuario.correo && !this.validarCorreo(this.datosUsuario.correo)) {
                    return alert('El correo ya está registrado a otro usuario!');
                }
                if (!this.edicionDatos) {
                    result = await axios.post(`${process.env.VUE_APP_API_BACKEND}/usuarios`, this.datosUsuario);
                } else {
                    result = await axios.put(`${process.env.VUE_APP_API_BACKEND}/usuarios/${this.datosUsuario.id}`, this.datosUsuario);
                }
                if (![200, 201].includes(result.status)) {
                    alert('error en registro de datos!');
                }
                this.$refs.closeModal.click();
                this.datosUsuario = this.resetDatosUsuario();
                this.getData();
                this.edicionDatos = false;
            } catch(error) {
                console.error('Error guardando usuarios: ', error.message);
            }
        },
        editarUsuario(usuario) {
            this.edicionDatos = true;
            this.datosUsuario = JSON.parse(JSON.stringify(usuario));
            this.$refs.openModal.click();
        },
        abrirModalEliminacion(idUsuario) {
            this.datosUsuario.id = idUsuario;
            this.$refs.openModalDelete.click();
        },
        async eliminarUsuario() {
            const result = await axios.delete(`${process.env.VUE_APP_API_BACKEND}/usuarios/${this.datosUsuario.id}`);
            if (result.status != 200) {
                alert('error en eliminación de datos!');
            }
            this.$refs.closeModalDelete.click();
            this.datosUsuario = this.resetDatosUsuario();
            this.getData();
        },
        abrirTareas(idUsuario) {
            this.$router.push({name: 'tareas', params: { id: idUsuario }});
        }
    },
    mounted () {
        this.getData();
    },
    computed: {
    },
    watch: {
        async findUser(newValue, oldValue) {
            if (newValue.length > 0) {
                try {
                    const busqueda = await axios.get(`${process.env.VUE_APP_API_BACKEND}/usuarios?q=${newValue}`);
                    if (busqueda.status === 200) {
                        this.listaUsuarios = busqueda.data;
                    }
                } catch (error) {
                    console.error('Error busqueda de filtros: ', error.message);
                }
            } else {
                this.listaUsuarios = this.usuarios;
            }
        }
    },
}
</script>

<style>

</style>