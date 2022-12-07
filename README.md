Gramática: número, género y acentuación
=======================================

Librería de *JavaScript* que implementa las reglas gramaticales. Las clases y funciones disponibles sirven para verificar la existencia de una palabra, obtener las posibles correcciones de la misma, pluralizarla, descomponerla en sílabas, indicar si su acento es agudo, llano, esdrújulo o sobreesdrújulo, entre otras cosas.

### Importante:
Ésta librería esta fuertemente inspirada por [Leus: Gramática](https://github.com/leus/gramatica). La misma, está pensada para seguir completándose, hacerse más robusta y poder ser implementada en cualquier proyecto en la que sea útil.

Ejemplos de uso:

```js
const { Gramatica } = require("gramatica");
console.log( Gramatica.plural("camión") );       // camiones
console.log( Gramatica.silabas("paella") );      // pa-e-lla
console.log( Gramatica.acentuacion("águila") );  // esdrújula
console.log( Gramatica.genero("verdad") );       // femenino
```

Código JavaScript
-----------

-   Clases :
    -   Métodos estáticos genéricos: [Gramatica](https://github.com/DanLop618/gramatica/blob/main/src/Gramatica.js)
    -   Las enumeraciones: [Genero](https://github.com/DanLop618/gramatica/blob/main/src/Genero.js), [Acentuacion](https://github.com/DanLop618/gramatica/blob/main/src/Acentuacion.js), [Numero](https://github.com/DanLop618/gramatica/blob/main/src/Numero.js), [Articulo](https://github.com/DanLop618/gramatica/blob/main/src/Articulo.js)
    -   Letras de una sílaba o palabra: [Letra](https://github.com/DanLop618/gramatica/blob/main/src/Letra.js) y [Letras](https://github.com/DanLop618/gramatica/blob/main/src/Letras.js)
    -   División silábica de una palabra: [Silabas](https://github.com/DanLop618/gramatica/blob/main/src/Silabas.js)
    -   Número y género de las palabras: [Palabra](https://github.com/DanLop618/gramatica/blob/main/src/Palabra.js)
    -   Lista de palabras: [Palabras](https://github.com/DanLop618/gramatica/blob/main/src/Palabras.js)

Implementaciones Futuras
------------------------
- Verificación de verbos.
- Detección de tipos de verbos. *(regulares e irregulares)*
- Conversión de verbos a diferentes tiempos verbales. *(presente, pasado, futuro, etc...)*
- Validación de existencia de palabras mediante la RAE. *(async|Promise)*
- Implementaciones de la comunidad.

Colaboraciones
--------------
Todas las colaboraciones, ideas e implementaciones son totalmente bienvenidas. Si tienes algo qué implementar en el proyecto solo haz un *fork* del mismo, realiza los cambios que desees y envía un *pull-request* desde tu repositorio. Si el código/implementación cumple con lo necesario será implementado con brevedad.

Información Extra
-----------------
- Autor Original: [Francisco Cascales](https://proinf.net/)
- Este proyecto es distribuido usando la [Licencia Mozilla 2.0](http://mozilla.org/MPL/2.0/).
