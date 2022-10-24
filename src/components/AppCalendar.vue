<template>
    <span @click="$router.back()"><h4><i class="fa fa-step-backward"/> Volver a menu principal</h4></span> <span class="center"><h3>{{usuario.nombre}}</h3></span>
    <FullCalendar :options="calendarOptions" />
    <button class="invisible" data-toggle="modal" data-target="#modalCreateTask" ref="openModalCreate"></button>
    <div class="modal fade" id="modalCreateTask" role="dialog" tabindex="-1"  aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleDeleteTitle">Agregar nueva tarea</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="contact-form" class="tm-contact-form mx-auto" @submit.prevent="guardarDatos()">
                        <div class="form-group">
                            <input type="text" v-model="datosEvento.descripcion" class="form-control rounded-0" placeholder="Descripción tarea" required />
                        </div>
                        <div class="form-group">
                            <select class="form-control" id="task-select" name="inquiry" v-model="datosEvento.prioridad">
                                <option v-for="item in listaPrioridad" :key="item.key" :value="item.key">{{item.value}}</option>
                            </select>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal" ref="closeModal">Cerrar</button>
                            <button type="submit" class="btn btn-light">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default {
    name: 'appCalendar',
    data() {
        return {
            calendarOptions: {
                plugins: [ dayGridPlugin, interactionPlugin ],
                initialView: 'dayGridMonth',
                select: this.selectedDate,
                eventClick: this.eventSelected,
                editable: true,
                selectable: true,
                events: [],
            },
            datosEvento: this.resetTask(),
            listaPrioridad: [
                {
                    key: 'baja',
                    value: 'Prioridad baja',
                },
                {
                    key: 'media',
                    value: 'Prioridad media',
                },
                {
                    key: 'alta',
                    value: 'Prioridad alta',
                },
            ],
            colorPrioridad: {
                'baja': 'blue',
                'media': 'orange',
                'alta': 'red',
            },
            apiEvent: null,
        }
    },
    props: ["usuario", "tareas"],
    watch: {
        tareas (newValue, oldValue) {
            this.calendarOptions.events = newValue.map((tarea) => ({
                id: tarea.id,
                title: tarea.descripcion,
                start: tarea.fecha,
                backgroundColor: this.colorPrioridad[tarea.prioridad],
            }));
        }
    },
    mounted () {
    },
    methods: {
        resetTask() {
            return {
                id: null,
                descripcion: null,
                fecha: null,
                prioridad: null,
                fk_usuario: 0
            };
        },
        selectedDate(evento) {
            if (!this.tareas) this.tareas = [];
            this.datosEvento.fecha = evento.startStr;
            this.datosEvento.fk_usuario = this.usuario.id || 0;
            this.apiEvent = evento.view.calendar;
            this.$refs.openModalCreate.click();

        },
        async eventSelected(evento) {
            const idTarea = evento.event.id;
            const descripcion = evento.event.title;
            if (confirm(`Esta seguro de eliminar la tarea: '${descripcion}'`)) {
                try {
                    const result = await axios.delete(`${process.env.VUE_APP_API_BACKEND}/tareas/${idTarea}`);
                    if (![200, 201].includes(result.status)) {
                        return alert('error en registro de datos!');
                    }
                    console.log('tareas ---', this.tareas);
                    // this.tareas = this.tareas.filter((tarea) => tarea.id != idTarea);
                    evento.event.remove()
                } catch(error) {
                    console.error('Error guardando usuarios: ', error.message);
                    alert(error.message);
                }
            }
        },
        async guardarDatos() {
            try {
                if (!this.datosEvento.prioridad) {
                    return alert('Debe seleccionar una prioridad!');
                }
                const result = await axios.post(`${process.env.VUE_APP_API_BACKEND}/tareas`, this.datosEvento);
                if (![200, 201].includes(result.status)) {
                    return alert('error en registro de datos!');
                }
                this.$refs.closeModal.click();
                this.tareas.push(this.datosEvento);
                if (this.apiEvent) {
                    this.apiEvent.unselect();
                    this.apiEvent.addEvent({
                        id: result.data.id,
                        title: this.datosEvento.descripcion,
                        start: this.datosEvento.fecha,
                        backgroundColor: this.colorPrioridad[this.datosEvento.prioridad]
                    });
                }
                this.datosEvento = this.resetTask();
                
            } catch(error) {
                console.error('Error guardando usuarios: ', error.message);
            }
        }
    },
    computed: {
    },
    components: {
        FullCalendar,
    }
}
</script>

<style>

</style>