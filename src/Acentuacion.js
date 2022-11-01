/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

class Acentuacion {

  /**
   * Acentos gramaticales.
   */
  #acentos = [ "aguda", "llana", "esdrújula", "sobreesdrújula" ];
  #ordinal;
  #acento;

  // Constructor
  constructor( acento ) {
    // if ( !acento in this.#acentos ) throw new Error( "¡Tipo de acentuación inválida!" );
    this.#ordinal = this.#acentos.indexOf( acento );
    this.#acento = acento;
  }

  /**
   * Verifica si el acento es agudo.
   * @returns { boolean } Si el acento es agudo
   */
  esAguda() {
    return this.#acento === "aguda";
  }

  /**
   * Verifica si el acento es llano.
   * @returns { boolean } Si el acento es llano
   */
  esLlana() {
    return this.#acento === "llana";
  }

  /**
   * Verifica si el acento es esdrújulo.
   * @returns { boolean } Si el acento es esdrújulo
   */
  esEsdrujula() {
    return this.#acento === "esdrújula";
  }

  /**
   * Verifica si el acento es sobreesdrújulo.
   * @returns { boolean } Si el acento es sobreesdrújulo
   */
  esSobreesdrujula() {
    return this.#acento === "sobreesdrújula";
  }

  /**
   * Obtiene el tipo de acento en forma de string.
   * @returns { string } El tipo de acento.
   */
  toString() {
    return this.#acento;
  }

  /**
   * Obtiene el ordinal del tipo de acento.
   * @returns { int } El ordinal del tipo de acento.
   */
  ordinal() {
    return this.#ordinal;
  }
}

module.exports = Acentuacion;
