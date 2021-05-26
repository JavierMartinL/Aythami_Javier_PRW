# Base de Datos

Para el proyecto estamos desarrollando un servicio web para el almacenamiento y organización de documentos. Diseñado para que el usuario pueda acceder rápidamente y desde cualquier lugar a su información.

- La web es multi-usuario y se almacenará de cada usuario un `id`, `correo`, `nombre` y `contraseña`.

- Cada usuario puede crear sus categorías para organizar los documentos. En las categorías almacenamos un `id` y `nombre`.

- Cada categoría es creada por un único usuario. Una categoría puede tener varias subcategorías.

- Los usuarios pueden subir archivos a la web. Cada archivo corresponde a un único usuario y se almacenará un `id`, `nombre`, `descripción`, `tipo de archivo`, `fecha del documento` y `fecha de subida`.

- Un documento puede estar relacionado con varias categorías.

## <a name="entidad_relacion">Modelo Entidad Relación</a>




![Modelo Entidad Relación de la base de datos](Imagenes/BBDD/modelo_entidad_relacion.png)


## <a name="relacional">Modelo Relacional</a>

Primer modelos propuesto antes de  aplicar la gestion de usuarios con passport y los distintos cambios requeridos por laravel para su buen funcionamiento.

![Modelo Relacional de la base de datos](Imagenes/BBDD/modelo_relacional.png)

Modelo definitivo despues de aplicar todos los cambios a la base de datos.

![Modelo Relacional de la base de datos](Imagenes/BBDD/BBDDFin.PNG)


## [Script](BBDD/BBDD_LARAVEL.sql)

## Consultas SQL

En este caso al usar las migraciones de Laravel no usamos consultas ya que etas las gestiona eloquent.


