/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Importaciones
const Letras = require( "./Letras.js" );

class Letra {

  /**
   * Vocales
   */
  static VOCALES_ACENTUADAS = "áéíóú";
  static VOCALES_DIERESIS = "äëïöü";
  static VOCALES = "aeiou" + "áéíóú" + "aeoíúáéó";
  static VOCALES_FUERTES = "aeoíúáéó";
  static VOCALES_DEBILES = "iu";

  #posicion;
  #letras;

  // Constructor
  constructor( letras, posicion ) {
    this.#posicion = posicion;
    this.#letras = letras;
  }

  /**
   * Obtiene el caracter en la posición configurada.
   * @returns { char } El caracter obtenido.
   */
  getChar() {
    return this.#letras.bafer.charAt( this.#posicion );
  }

  /**
   * Cambia el caracter en la posición configurada por el caracter recibido.
   * @param { char } ch El caracter que reemplazará al anterior.
   */
  setChar( ch ) {
    let bafer = this.#letras.bafer;
    this.#letras.bafer = bafer.substring( 0, this.#posicion ) + ch + bafer.substring( this.#posicion + ch.length );
  }

  /**
   * Indica si la letra es consonante.
   * @returns { boolean } Si la letra es consonante.
   */
  esConsonante() {
    return !this.esVocal();
  }

  /**
   * Indica si la letra es vocal.
   * @returns { boolean } Si la letra es vocal.
   */
  esVocal() {
    return Letra.VOCALES.indexOf( this.getChar() ) >= 0;
  }

  /**
   * Indica si la letra es vocal fuerte.
   * @returns { boolean } Si la letra es vocal fuerte.
   */
  esVocalFuerte() {
    return Letra.VOCALES_FUERTES.indexOf( this.getChar() ) >= 0;
  }

  /**
   * Indica si la letra es vocal débil.
   * @returns { boolean } Si la letra es vocal débil.
   */
  esVocalDebil() {
    return Letra.VOCALES_DEBILES.indexOf( this.getChar() ) >= 0;
  }

  /**
   * Indica si la letra es vocal acentuada.
   * @returns { boolean } Si la letra es vocal acentuada.
   */
  estaAcentuada() {
    return Letra.VOCALES_ACENTUADAS.indexOf( this.getChar() ) >= 0;
  }

  /**
   * Indica si la letra es un dígito.
   * @returns { boolean } Si la letra es un digito.
   */
  esDigito() {
    return !Number.isNaN( this.getChar() );
  }

  /**
   * Indica si la letra está en mayúsculas.
   * @returns { boolean } Si la letra está en mayúsculas.
   */
  esMayusculas() {
    return this.getChar() === this.getChar().toUpperCase();
  }

  /**
   * Indica si la letra está en minúsculas.
   * @returns { boolean } Si la letra está en minúsculas.
   */
  esMinusculas() {
    return this.getChar() === this.getChar().toLowerCase();
  }

  /**
   * Convierte la letra actual a mayúsculas.
   */
  aMayusculas() {
    this.setChar( this.getChar().toUpperCase() );
  }

  /**
   * Convierte la letra actual a sí misma con acento. Devuelve verdadero si el acento se añade correctamente.
   * @returns { boolean } Si el acento es añadido correctamente.
   */
  ponerAcento() {
    const indiceVocal = Letra.VOCALES.indexOf( this.getChar() );
    if ( indiceVocal < 0 || indiceVocal >= 5 ) return false;
    const ch = Letra.VOCALES.charAt( 5 + indiceVocal % 5 );
    this.setChar( ch );
    return true;
  }

  /**
   * Convierte la letra actual a sí misma sin acento. Devuelve verdadero si el acento se elimina correctamente.
   * @returns { boolean } Si el acento es eliminado correctamente.
   */
  quitarAcento() {
    const indiceVocal = Letra.VOCALES.indexOf( this.getChar() );
    if ( indiceVocal < 5 ) return false;
    const ch = Letra.VOCALES.charAt( indiceVocal % 5 );
    this.setChar( ch );
    return true;
  }

  /**
   * Cambia el caracter en la posición configurada por el caracter recibido.
   * @param { char } ch El caracter que reemplazará al anterior.
   */
  cambiar( ch ) {
    this.setChar( ch );
  }

  /**
   * Verifica si la letra en la posición actual es igual a al menos una de las indicadas.
   * @param { * } argumentos La letras a comparar.
   * @returns { boolean } Si al menos una letra es igual a la letra actual.
   */
  es( ...[ argumentos ] ) {
    for ( const caracter of argumentos ) {
      if ( typeof caracter === "string" ) {
        if ( this.getChar() === caracter ) return true;
      } else if ( typeof caracter === "Letra" ) {
        if ( this.getChar() === caracter.getChar() ) return true;
      }
    }
    return false;
  }
}

module.exports = Letra;
