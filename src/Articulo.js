/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Importaciones.
const Palabra = require( "./Palabra.js" );
const Genero  = require( "./Genero.js" );
const Numero  = require( "./Numero.js" );

class Articulo {

  /**
   * Tipos de articulos gramaticales.
   */
  static #articulos = [
    [ // Definidos
      [ "lo", "los" ], // Neutro: singular y plural
      [ "el", "los" ], // Másculino: singular y plural
      [ "la", "las" ], // Femenino: singular y plural
    ],
    [ // Indefinidos
      [ "uno", "unos" ], // Neutro: singular y plural
      [ "un", "unos" ], // Másculino: singular y plural
      [ "una", "unas" ], // Femenino: singular y plural
    ],
  ];
  #tipos = [ "determinado", "indeterminado" ];
  #tipo;
  #ordinal;

  // Constructor
  constructor( tipo ) {
    // if ( !tipo in this.#tipos ) throw new Error( "¡Tipo de articulo gramatical inválido!" );
    this.#ordinal = this.#tipos.indexOf( tipo );
    this.#tipo = tipo;
  }

  /**
   * Indica si se trata de un artículo.
   * @param { Palabra } palabra La palabra a verificar.
   * @returns { boolean } Si la palabra se trata de un articulo.
   */
  static es( palabra ) {
    for ( const lista of Articulo.#articulos )
      for ( const sublista of lista )
        for ( const elemento of sublista )
          if ( palabra.es( elemento ) ) return true;
    return false;
  }

  /**
   * Indica si el artículo es determinado.
   * @returns { boolean } Si el articulo es determinado.
   */
  esDeterminado() {
    return this.#tipo === "determinado";
  }

  /**
   * Indica si el artículo es indeterminado.
   * @returns { boolean } Si el articulo es indeterminado.
   */
  esIndeterminado() {
    return this.#tipo === "indeterminado";
  }

  /**
   * Obiente el articulo según el género y número gramatical.
   * @param { Genero } genero El género de la palabra.
   * @param { Numero } numero El número gramatical de la palabra.
   * @returns { string } El articulo obtenido.
   */
  obtener( genero, numero ) {
    return Articulo.#articulos[ this.#ordinal ][ genero.ordinal() ][ numero.ordinal() ];
  }

  /**
   * Obiente el articulo según la palabra ingresada.
   * @param { Palabra } palabra La palabra a verificar.
   * @returns { string } El articulo obtenido.
   */
  segunPalabra( palabra ) {
    return this.obtener( palabra.generoAntepuesto(), palabra.numero() );
  }

  /**
   * Obiente el articulo según la palabra ingresada y devuelve el resultado concatenado.
   * @param { Palabra } palabra La palabra a verificar.
   * @returns { string } El articulo y la palabra concatenados.
   */
  agregarPalabra( palabra ) {
    return this.segunPalabra( palabra ) + " " + palabra;
  }
  /**
   * Indica si el articulo se conjunta con la preposición 'a' o 'de'.
   * @param { Palabra } palabra La palabra a verificar.
   * @returns { boolean } Si el articulo se conjunta.
   */
  casoArticuloContracto( palabra ) {
    return this.esDeterminado()
      && palabra.generoAntepuesto().esMasculino()
      && palabra.numero().esSingular();
  }

  /**
   * Obtiene el tipo de articulo en forma de string.
   * @returns { string } El tipo de articulo.
   */
  toString() {
    return this.#tipo;
  }

  /**
   * Obtiene el ordinal del tipo de articulo.
   * @returns { int } El ordinal del tipo de articulo.
   */
  ordinal() {
    return this.#ordinal;
  }
}

module.exports = Articulo;