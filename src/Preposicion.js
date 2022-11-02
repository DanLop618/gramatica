/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Importaciones
const Palabra = require( "./Palabra.js" );
const InstanceError = require( "./misc/InstanceError.js" );
const ParamError    = require( "./misc/ParamError.js" );

class Preposicion {

  /**
   * Tipos de preposición.
   */
  #tipos = [
    "a", "allende", "ante", "aquende", "bajo", "cabe", "con", "contra", "de",
    "desde", "durante", "en", "entre", "excepto", "hacia", "hasta", "mediante",
    "para", "por", "pro", "según", "sin", "so", "sobre", "tras", "versus", "vía"
  ];
  #ordinal;
  #tipo;

  /**
   * Inicializa un objeto <Preposicion> que emula un <enum> de Java.
   * @param { string } tipo El tipo de preposición interno de la clase.
   * @throws { InstanceError } Si la preposición recibida no forma parte de la colección.
   */
  constructor( tipo ) {
    if ( !this.#tipos.includes( tipo ) ) throw new InstanceError( this.#tipos, tipo );
    this.#ordinal = this.#tipos.indexOf( tipo );
    this.#tipo = tipo;
  }

  /**
   * Indica si una palabra se trata de una preposición.
   * @param { Palabra } palabra La palabra a comparar.
   * @returns { boolean } Si la palabra es una preposición.
   * @throws { ParamError }
   */
  static es( palabra ) {
    if ( !( palabra instanceof Palabra ) ) throw new ParamError( "Palabra" );
    for ( const preposicion of this.#tipos )
      if ( preposicion === palabra.toString().toLowerCase() ) return true;
    return false;
  }

  /**
   * Obtiene tipo de preposicion en forma de string.
   * @returns { string } El tipo de preposición.
   */
  toString() {
    return this.#tipo;
  }

  /**
   * Obtiene el ordinal del tipo de preposición.
   * @returns { int } El ordinal del tipo de preposición.
   */
  ordinal() {
    return this.#ordinal;
  }
}

module.exports = Preposicion;
