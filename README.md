Gramática: número, género y acentuación
=======================================

Librería de *JavaScript* que implementa las reglas gramaticales. Las clases y funciones disponibles sirven para pasar una palabra a plural, descomponer una palabra en sílabas, indicar si una palabra es aguda, llana, esdrújula o sobreesdrújula, entre otras cosas.

### Importante:
No soy el autor original de ésta librería. Éste es solamente un port de la librería original [Leus: Gramática](https://github.com/leus/gramatica) que hice para *JavaScript*. La librería está pensada para seguir completándose, hacerse más robusta y poder ser implementada en cualquier proyecto en la que sea útil.

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

Enlaces de referencia
---------------------

-   [La acentuación](http://f01.middlebury.edu/SP210A/gramatica/acentu-index.html) - Roberto Véguez y Isabel Estrada
-   [Formación del plural en español](http://es.wikipedia.org/wiki/Formaci%C3%B3n_del_plural_en_espa%C3%B1ol) - La Wikipedia
-   [Español/Morfología/La palabra/El sustantivo/El género](http://es.wikibooks.org/wiki/Espa%C3%B1ol/Morfolog%C3%ADa/La_palabra/El_sustantivo/El_g%C3%A9nero) - Wikilibros

Colaboraciones
--------------
Todas las colaboraciones, ideas e implementaciones son totalmente bienvenidas. Si tienes algo qué implementar en el proyecto solo haz un *fork* del mismo, realiza los cambios que desees y envía un *pull-request* desde tu repositorio. Si el código/implementación cumple con lo necesario será implementado con brevedad.

Autor Original (Java)
---------------------
Francisco Cascales - https://proinf.net/

Licencia
--------

Este proyecto es distribuido usando la [Licencia Mozilla 2.0](http://mozilla.org/MPL/2.0/).
