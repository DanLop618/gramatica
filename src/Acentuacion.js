/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Importaciones
const Enum = require( "./misc/Enum.js" );

class Acentuacion extends Enum {

  /**
   * Constructores de acentos gramaticales.
   */
  static aguda          = new Acentuacion( "aguda", 0 );
  static llana          = new Acentuacion( "llana", 1 );
  static esdrújula      = new Acentuacion( "esdrújula", 2 );
  static sobreesdrújula = new Acentuacion( "sobreesdrújula", 3 );

  /**
   * Inicializa un objeto <Acentiacion> que emula un ENUM.
   * @param { string } value La acentuación interna de la clase.
   * @param { int } ordinal El número posicional de la acentuación.
   * @returns { Acentuacion }
   */
  constructor( value, ordinal ) {
    super( value, ordinal );
  }

  /**
   * Verifica si el acento es agudo.
   * @returns { boolean } Si el acento es agudo
   */
  esAguda() {
    return this.value === "aguda";
  }

  /**
   * Verifica si el acento es llano.
   * @returns { boolean } Si el acento es llano
   */
  esLlana() {
    return this.value === "llana";
  }

  /**
   * Verifica si el acento es esdrújulo.
   * @returns { boolean } Si el acento es esdrújulo
   */
  esEsdrujula() {
    return this.value === "esdrújula";
  }

  /**
   * Verifica si el acento es sobreesdrújulo.
   * @returns { boolean } Si el acento es sobreesdrújulo
   */
  esSobreesdrujula() {
    return this.value === "sobreesdrújula";
  }
}

module.exports = Acentuacion;
