/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Importaciones.
const Articulo = require( "./Articulo.js" );
const Palabras  = require( "./Palabras.js" );
const Palabra  = require( "./Palabra.js" );
const Silabas  = require( "./Silabas.js" );

class Gramatica {

  // Constructor
  constructor() {}

  /**
   * Devuelve el plural de la palabra ingresada.
   * @param { string } palabra La palabra a pluralizar.
   * @returns { string } La palabra en plural.
   */
  static plural( palabra ) {
    return new Palabra( palabra ).enPlural().toString();
  }

  /**
   * Devuelve las sílabas de la palabra ingresada.
   * @param { string } palabra La palabra a verificar.
   * @returns { Silabas } Las sílabas de la palabra.
   */
  static silabas( palabra ) {
    return new Silabas( new Palabra( palabra ) ).toString();
  }

  /**
   * Devuelve la acentuación de la palabra ingresada.
   * @param { string } palabra La palabra a verificar.
   * @returns { string } La acentuación de la palabra.
   */
  static acentuacion( palabra ) {
    return new Silabas( new Palabra( palabra ) ).acentuacion().toString();
  }

  /**
   * Devuelve el género de la palabra ingresada.
   * @param { string } palabra La palabra a verificar.
   * @returns { string } El género de la palabra.
   */
  static genero( palabra ) {
    return new Palabra( palabra ).genero().toString();
  }

  /**
   * Devuelve el número gramatical de la palabra ingresada.
   * @param { string } palabra La palabra a verificar.
   * @returns { string } El número gramatical de la palabra.
   */
  static numero( palabra ) {
    return new Palabra( palabra ).numero().toString();
  }

  /**
   * Cuantifica la palabra recibida de acuerdo al número de elementos ingresado.
   * @param { int } numeroElementos El número de elementos que cuantificarán la palabra.
   * @param { string } palabra La palabra a cuantificar.
   * @returns { string } La palabra cuantificada.
   */
  static cuantificar( numeroElementos, palabra ) {
    return new Palabra( palabra ).cuantificar( numeroElementos );
  }

  /**
   * Convierte la primera letra de un texto en mayúscula.
   * @param { string } texto El texto a capitalizar.
   * @returns { string } El texto capitalizado.
   */
  static capitalizar( texto ) {
    if ( texto.length <= 1 ) return texto.toUpperCase();
    return texto[ 0 ].toUpperCase() + texto.substring( 1 );
  }

  /**
   * Enumera las palabras recibidas de acuerdo el articulo gramatical ingresado.
   * @param { Articulo } articulo El articulo gramatical a utilizar.
   * @param { string[] } palabras Las palabras a enumerar.
   * @returns { string } Las palabras enumeradas.
   */
  static enumerar( articulo, ...palabras ) {
    return new Palabras( palabras ).enumerar( articulo );
  }

  /**
   * Enumera las palabras recibidas de acuerdo concepto ingresado.
   * @param { string } concepto El concepto a utilizar.
   * @param { string[] } palabras Las palabras a enumerar.
   * @returns { string } Las palabras enumeradas.
   */
  static enumerarConcepto( concepto, ...palabras ) {
    return new Palabras( palabras ).enumerarConcepto( new Palabra( concepto ) );
  }

  /**
   * Concatena la palabra ingresada con su articulo gramatical.
   * @param { string } palabra La plabra a utilizar.
   * @param { string } [ articulo = "determinado" ] El tipo articulo gramatical a utilizar.
   * @returns { string } Las palabra y su articulo gramatical concatenados.
   */
  static articulo( palabra, articulo = "determinado" ) {
    return new Articulo( articulo ).agregarPalabra( new Palabra( palabra ) );
  }

  /**
   * Une los plurales de las palabras ingresadas capitalizando cada una de ellas (CamelCase).
   * @param { string[] } palabras Las palabras a pluralizar y unir.
   * @returns { string } Las palabras pluralizadas y unidas.
   */
  static unirPluralesCapitalizando( ...palabras ) {
    return new Palabras( palabras ).unirPluralesCapitalizando();
  }

  /**
   * Une los plurales de las palabras ingresadas mediante guiones (snake_case).
   * @param { string[] } palabras Las palabras a pluralizar y unir.
   * @returns { string } Las palabras pluralizadas y unidas.
   */
  static unirPluralesGuionando( ...palabras ) {
    return new Palabras( palabras ).unirPluralesGuionando();
  }
}

module.exports = Gramatica;
