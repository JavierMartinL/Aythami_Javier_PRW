# Instalación de Ionic
## Instalar Ionic CLI
Para poder instalar [Ionic CLI](https://ionicframework.com/) debemos comprobar que tenemos instalado [Node.js](https://nodejs.org/es/). Una vez comprobado instalamos **Ionic cli** con `npm`:

~~~
npm install -g @ionic/cli
~~~

![Instalar Ionic CLI](Imagenes/Fronten/install_ionic.png)

Si tenemos una instalación previa, deberá desinstalarse debido a un cambio en el nombre del paquete.

~~~
npm uninstall -g ionic
npm install -g @ionic/cli
~~~

## Crear una aplicación
Para crear una aplicación en ionic utilizaremos la plantilla en blanco `blank`. También existen plantillas prefabricadas con un menú lateral `sidemenu` o con un iniciador de pestañas `tabs`. Para la creación utilizaremos `ionic start`.

~~~
ionic start web blank
~~~

![Crear aplicación](Imagenes/Fronten/start_ionic.png)

Una vez lanzado el comando nos mostrará una lista de frameworks para utilizar con **Ionic**. En nuestro caso utilizaremos **Angular**.

Otra pregunta en la instalación es si queremos integrar `Capacitor`, que es un puente de **Ionic** hacia lo nativo, permitiendo acceder a los recursos nativos de los dispositivos, permitiendo una comunicación sencilla.

![Preguntas en la creación de la aplicación](Imagenes/Fronten/angular_ionic.png)

## Lanzar aplicación
Para lanzar la aplicación de **Ionic** debemos situarnos en la raíz de la aplicación y ejecutar el comando `ionic serve`.

~~~
cd web
ionic serve
~~~

![Ejecutar ionic serve](Imagenes/Fronten/serve_ionic.png)

![Primera vista de la Aplicación](Imagenes/Fronten/creacion_app_ionic.png)

# Problemas
## Implementación de la plantilla Metronic Demo1

Tanto mi compañero como yo nos habíamos puesto de acuerdo y decidimos que íbamos a implementar la plantilla [Metronic Demo1 de Angular](https://preview.keenthemes.com/metronic/angular/demo1/dashboard) que nos parecía muy adecuada con el diseño que habíamos presentado en el anteproyecto. 

A la hora de empezar a implementarla me comenzó a aparecer muchos errores en distintos sitios y a su misma vez quería también añadir algunas funciones que a la hora de intentar añadirlas en el proyecto me daba muchos conflictos con las dependencias de la propia plantilla.

Por todo estos errores y problemas que me han surgido y que hemos intentado arreglar, he perdido 3 semanas, viendo que se aproximaba la fecha de entrega y que no habíamos terminado de arreglar los fallos que se producían, hemos decidido empezar a utilizar **Ionic** para poder seguir con el desarrollo del proyecto.