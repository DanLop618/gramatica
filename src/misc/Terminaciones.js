/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Importaciones
const Terminacion = require( "./Terminacion.js" );

class Terminaciones {

  list = [];

  /**
   * Inicializa un nuevo conjunto de Terminaciones[Terminacion].
   */
  constructor() {}

  /**
   * Agrega una nueva terminación a la lista e terminaciones.
   * @param { string } terminacion La terminación a registrar.
   * @param { Genero } genero El tipo de género de la terminación.
   * @param { string[] } excepciones Las excepciones a la regla.
   */
  agregar( terminacion, genero, ...excepciones ) {
    this.list.push( new Terminacion( terminacion, genero, ...excepciones ) );
  }

  // Iterador
  [ Symbol.iterator ]() {
    let index = -1;
    let data  = this.list;
    return {
      next: () => ({
        value: data[ ++index ],
        done:  index === data.length
      })
    };
  }
}

module.exports = Terminaciones;
