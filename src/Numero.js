/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Importaciones
const Palabra = require( "./Palabra.js" );

class Numero {

  /**
   * Tipos de numeración gramatical.
   */
  #tipos = [ "singular", "plural" ];
  #tipo;
  #ordinal;
  static #excepcionesPlurales = [];
  static #excepcionesSingulares = [

    // Números:
    "dos", "tres", "seis", "dieciséis",

    // Palabras simples:
    "acrópolis", "adiós", "albatros", "alias", "análisis", "anís", "antivirus",
    "arnés", "atlas", "autobús", "barrabás",
    "bilis", "brindis", "burdeos", "burqués", "bus", "campus", "caos", "chasis",
    "ciempiés", "ciprés", "compás", "cosmos", "crisis", "croquis",
    "cutis", "diabetes", "dios", "dosis", "entremés", "equis",
    "estrés", "frontis", "gris", "iris", "gas", "génesis", "guaperas",
    "interés", "lapsus", "lis",
    "más", "marqués", "mecenas", "mes", "mímesis",
    "oasis", "obús", "ósmosis", "país", "parchís", "paréntesis", "pelanas",
    "pelvis", "plus", "prótesis", "psicosis", "pubis", "pus",
    "ras", "res", "sintaxis", "síntesis", "tenis", "tesis", "tos", "revés",
    "vals", "virus",

    // Días de la semana:
    "lunes", "martes", "miércoles", "jueves", "viernes",

    // Palabras compuestas:
    "abrelatas", "cascanueces", "guardabosques", "limpiaparabrisas",
    "parabrisas", "parachoques", "paraguas", "pasamontañas",
    "rascacielos"
  ];

  // Constructor
  constructor( tipo ) {
    // if ( !tipo in this.#tipos ) throw new Error( "¡Tipo de numeración inválida!" );
    this.#ordinal = this.#tipos.indexOf( tipo );
    this.#tipo = tipo;
  }

  /**
   * Obtiene la numeración gramatical de la palabra ingresada.
   * @param { Palabra } palabra La palabra a verificar.
   * @returns { this } La numeración gramatical obtenida.
   */
  static segunPalabra( palabra ) {
    if ( palabra.estaVacia() ) return new Numero( "singular" );
    if ( palabra.es( this.#excepcionesSingulares ) ) return new Numero( "singular" );
    if ( palabra.es( this.#excepcionesPlurales ) ) return new Numero( "plural" );
    if ( palabra.acabaEn( "nés" ) ) return new Numero( "singular" );
    if ( palabra.ultimaLetra().es( 's' ) ) return new Numero( "plural" );
    return new Numero( "singular" );
  }

  /**
   * Devuelve si la numeración gramatical es singular.
   * @returns { boolean } Si es singular.
   */
  esSingular() {
    return this.#tipo === "singular";
  }

  /**
   * Devuelve si la numeración gramatical es plural.
   * @returns { boolean } Si es plural.
   */
  esPlural() {
    return this.#tipo === "plural";
  }

  /**
   * Obtiene el tipo de numeracion en forma de string.
   * @returns { string } El tipo de numeracion.
   */
  toString() {
    return this.#tipo;
  }

  /**
   * Obtiene el ordinal del tipo de numeración gramatical.
   * @returns { int } El ordinal del tipo de numeración.
   */
  ordinal() {
    return this.#ordinal;
  }
}

module.exports = Numero;