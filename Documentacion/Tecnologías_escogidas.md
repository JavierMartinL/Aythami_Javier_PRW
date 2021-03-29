# Explicación de las tecnologías
## Git
Gracias a git contamos con las siguientes características que nos ayudan a mejorar nuestro forma de programar.Para ello nos ofrece las siguientes ventajas:
- Sistema de versiones, que nos permite llevar un gestión de los cambios realizados en nuestros códigos.
- Nos permite trabajar en equipo de manera sencilla. Gracias a un sistema de Merges.
- También nos permite volver a las versiones anteriores de nuestro código.
    
## Git-Flow
En cuanto a git flow es un agregado extra a las funciones git , nos mejora el flujo de trabajo.Para ello creamos una serie de ramas extras que nos permitirán mejorar la gestión de nuestros proyectos y no pisarnos el trabajo entre varias personas.Para ello cogemos la siguiente forma de actuar:
- Master y develop son intocables.
3 ramas nuevas de trabajo feature , hotfix y release.    
- Explicaré el funcionamiento de estas ramas.
- Feature es una copia de develop, cómo no se trabaja directamente con esta da mas estabilidad a nuestro código. Cuando se termina una feature esta ser mergea al develop. Pudiendo volver a una versión anterior de manera mucho más sencilla.
- Release es la copia de develop que se va a pasar a producción donde se pueden testear posibles fallos de las mismas. y es el que lleva con sigo los cambios de versiones.
- Hotfix es una copia de master que sirve para arreglar los herrores.

# Base de datos usada
# Framework
