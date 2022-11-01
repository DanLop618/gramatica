/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

class Abecedario {

  /**
  * ENUM de frecuencias del abecedario
  * <a href="http://es.wikipedia.org/wiki/Ortograf%C3%ADa_del_espa%C3%B1ol">Ortografía del español</a>
  */
  static #frecuencias = [
    11.96, 0.92, 2.92, // abc
    6.87, 16.78, 0.52, // def
    0.73, 0.89, 4.15, // ghi
    0.30, 0.01, 8.37, // jkl
    2.12, 7.01, 0.29, // mnñ
    8.69, 2.77, 1.53, // opq
    4.94, 7.88, 3.31, // rst
    4.80, 0.39, 0.01, // uvw
    0.06, 1.54, 0.15  // xyz
  ];
  #letras = "abcdefghijklmnñopqrstuvwxyz";
  #ordinal;
  #letra;

  // Constructor
  constructor( letra ) {
    if ( !letra in this.#letras ) throw "¡Letra inválida!";
    this.#ordinal = letras.indexOf( letra );
    this.#letra = letra;
  }

  /**
   * Devuelve la frecuencia de uso de la letra creada.
   * @returns { double } La frecuencia de la letra verificada.
   */
  frecuenciaUso() {
    return this.#frecuencias[ this.#ordinal ];
  }

  /**
   * Obtiene el la letra en forma de caracter.
   * @returns { string } La letra.
   */
  toString() {
    return this.#letra;
  }

  /**
   * Obtiene el ordinal de la letra.
   * @returns { int } El ordinal de la letra.
   */
  ordinal() {
    return this.#ordinal;
  }
}

module.exports = Abecedario;
