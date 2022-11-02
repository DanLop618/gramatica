/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Importaciones
const Enum    = require( "./misc/Enum.js" );
const Palabra = require( "./Palabra.js" );
const ParamError = require( "./misc/ParamError.js" );

class Numero extends Enum {

  /**
   * Constructores de número gramatical
   */
  static singular = new Numero( "singular", 0 );
  static plural   = new Numero( "plural", 0 );

  /**
  * Excepciones a la regla.
  */
  static excepcionesPlurales   = [];
  static excepcionesSingulares = [

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

  /**
   * Inicializa un objeto <Numero> que emula un ENUM.
   * @param { string } value El número gramatical interno de la clase.
   * @param { int } ordinal El número posicional del número gramatical.
   * @returns { Numero }
   */
  constructor( value, ordinal ) {
    super( value, ordinal );
  }

  /**
   * Obtiene la numeración gramatical de la palabra ingresada.
   * @param { Palabra } palabra La palabra a verificar.
   * @returns { this } La numeración gramatical obtenida.
   * @throws { ParamError }
   */
  static segunPalabra( palabra ) {
    if ( !( palabra instanceof Palabra ) ) throw new ParamError( "Palabra" );
    const singulares = this.excepcionesSingulares;
    const plurales   = this.excepcionesPlurales;
    if ( palabra.estaVacia() ) return Numero.singular;
    if ( palabra.es( ...singulares ) ) return Numero.singular;
    if ( palabra.es( ...plurales ) ) return Numero.plural;
    if ( palabra.acabaEn( "nés" ) ) return Numero.singular;
    if ( palabra.ultimaLetra().es( 's' ) ) return Numero.plural;
    return Numero.singular;
  }

  /**
   * Devuelve si la numeración gramatical es singular.
   * @returns { boolean } Si es singular.
   */
  esSingular() {
    return this.value === "singular";
  }

  /**
   * Devuelve si la numeración gramatical es plural.
   * @returns { boolean } Si es plural.
   */
  esPlural() {
    return this.value === "plural";
  }
}

module.exports = Numero;
