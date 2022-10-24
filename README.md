# Proyecto Final en Vue3

Proyecto que registra usuarios y tareas por usuario segun fecha y prioridad.

## Características
El proyecto cuenta con 2 entidades: usuarios y tareas
usuarios:
  - id, tipo number, unique.
  - correo, tipo string (email), required, unique.
  - nombre, tipo string, opcional.
  - direccion, tipo string, opcional.
  - telefono, tipo string, opcional.
  - edad, tipo number, opcional.

tareas:
  - id, tipo number, unique.
  - descripcion, tipo string, required.
  - fecha, tipo date, required.
  - prioridad, tipo string, required, posibles valores: ['baja', 'media', 'alta'].
  - fk_usuario, tipo number, foreign key.

## Vistas
- HomeView: Página inicial, permite gestión de usuarios e incluye buscador.
- TaskView: Se accede a esta página pulsando el ícono 'calendario' en cada mosaico de usuario. Permite la gestión de tareas para el usuario seleccionado.
  -  Crear tareas nuevas: se debe pulsar en cualquier dia del mes seleccionado, luego llenar el formulario con los datos necesarios.
  -  Eliminar tareas: se debe pulsar en la tarea deseada, se debe confirmar la acción.

## Prerequisitos
Install and run json-server with provided database in 'basedatos' folder
```
npm install -g json-server
json-server --watch basedatos/db.json
```

## Instalación de dependencias
```
npm install
```

### Compilado y hot-reload para entorno de desarrollo
```
npm run serve
```

### Compilado y minificación para producción
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
