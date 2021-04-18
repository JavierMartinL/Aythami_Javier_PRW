instalamos composer



# Instalación de Laravel 
Una vez isntalado composer, ya podemos crear nuestro back con el siguiente comando composer `create-project laravel/laravel servidor` esto instalará el proyecto.
Cuando acabe  la instalación entramos en la carpeta donde esté instalado el servidor y lo lanzamos con el comando `php artisan serve`.
## Instalacion de la extensión passport

Instalaremos también la extensión que nos permitirá gestionar las autentificación, para apis en laravel llamada passport con el comando composer `require laravel/passport` esperamos a que acabe la instalación, y ya podemos empezar a hacer la configuración esenciales para nuestro proyecto. 
Lo primero es agregar nuestra base de datos en el proyecto para ello buscamos el archivo .env y agregamos el nombre de nuestra base de datos en caso de haber creado un usuario y contraseña tambien se lo ponemos.
![Env](Imagenes/Backend/env.PNG)

Ya con nuestra base de datos vinculada crearemos usaremos el siguiente coamando para que laravel cree la tablas en la base de datos `php artisan migrate` ya con la base de datos lista podemos hacer `php artisan passport:install` para que nos genere las dos claves de nuestra api.
![passportInstall](Imagenes/Backend/passportInstall.PNG).

Empesamos con las configuraciones para passport primero nos vamos al nuestro modelo de users y agregamos las siguientes lineas `use Laravel\passport\HasApiTokens;` y `use HasApiTokens,HasFactory, Notifiable;`. 
![users](Imagenes/Backend/users.PNG).

Ahora usamos nos vamos al archivo AuthServiceProvider y ponemos las siguientes lineas `use Laravel\passport\Passport;` `Passport::routes();`

![users](Imagenes/Backend/authservice.PNG).

Tabien llevaremos un versionado de las disintas apis segun vamos trabajando en ello, ya que esta es una vuena practica para la industria, llevaremos el siguiente formato, tambien se ira actualizando la siguiente tabla.

| Version | Funciones | Fecha | 
| -- | -- | -- | 
| V1 | Creacion de la api y login de usuarios con passport | En proceso| 
| V2 | Gestion de documentos con cada usaurio y categorias principales  | Planteado|

para llevar este versionado a cambo modificaremos los siguientes archivos del RouterServiceProvider y ponemos la siguiente configuracion.

![users](Imagenes/Backend/router.PNG).

y creamos esa estructura de carpetas en routes.

![users](Imagenes/Backend/routes1.PNG).

# Generamos las rutas de los usuarios
Para ello lo primero que vamos hace es ir a la carpeta `v1/api.php` que comentavamos  antes. y agregamos comentamos la lina que contiene `Route::middleware` y procedemos a crear un prefijo para nuestros comandos de login. Y agreamos nuestra primera routa a `/login` en nuestro controlador.

![users](Imagenes/Backend/routes2.PNG).

Ahora precemos a crear nuestro contralor de con el siguiente comando `php artisan make:controller LoginController`.

![users](Imagenes/Backend/loginController.PNG).

En ese controlador primero importamos  `use Illuminate\Http\Request;` y `use Illuminate\Support\Facades\Auth;` 
Aprovechamos el Auth que nos proporciona laravel para comprobar si es correcto el login.
![users](Imagenes/Backend/loginController1.PNG).

Devemos devolver un 422 o 401 que nos informa de que no esta authentificaco.

![users](Imagenes/Backend/loginController2.PNG).

En caso de que pase el primer if creamos un token de acceso y se lo enviamos a como respuesta.
Para ello usamos otra clase de Auth que es user->createToken.

Con esto realizado volveremos a api para agregar un poquito mas de seguirdad a nuestro controlador para ello generaremos un middleware dentro del grupo de `/user` que use `auth:api` para proteger toda las routas dentro del controlador que no tengan el token registrado.

![users](Imagenes/Backend/routes3.PNG).

Como medida de seguridad extra vamos a darle un tiempo de vida util a nuestro token de acceso para ello nos vamos nuvamente a AuthServiceProvider y agregamos la siguiente funcion de passport
`Passport::personalAccessTokenExpireIn(now()->addHours(tiempo en horas));` en mi caso y para provar le he agregado 24 horas de valides al token.

![users](Imagenes/Backend/token.PNG).