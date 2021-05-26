# Instalación
 
Esta instalación no es recomendable para un usuario común ya que esta aplicación está orientada para instalarse en un servidor.
 
Para hacer uso del backen se deberá tener instalado php, mysql y composer,como se explica en la documentación de Backend.
 
Con esto solo tenemos que ejecutar el comando `composer install` dentro de la carpeta de servidor luego `php artisan passport:install` para que se creen las claves del passport.
 
Luego agregamos el environment que va a tener nuestras variables de acceso a la base de datos y servidor de correos.
 
Crearemos la tabla en la base de datos en este caso la llamamos organizador pero se puede cambiar en el .env. En este caso se ofrece el envairoment para el proyecto pero la contraseña del servidor de correo será eliminada despues de las notas.
 ![Env](Documentacion/imagenes/env.PNG)
 
 ![Env](Documentacion/imagenes/instalacion.PNG)
 
Una vez esté listo ejecutamos el comando `php artisan migrate` que nos generará la base de datos en mysql y para lanzar el servidor `php artisan serve`.
 
 ![Env](Documentacion/imagenes/migrate.PNG)
 
Para la instalación de Fronten se requiere tener instalados nodejs y npm , angular y ionic.
Entramos en la carpeta de web hacemos `npm install` y `ionic serve`.
 
 
