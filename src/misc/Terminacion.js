/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Importaciones.
const InstanceError = require( "./InstanceError.js" );
const ParamError    = require( "./ParamError.js" );
const Palabra = require( "../Palabra.js" );

class Terminacion {

  excepciones = [];
  terminacion;
  genero;

  /**
   * Inicializa un objeto <Terminacion>.
   * @param { string } terminacion La terminación a registrar.
   * @param { Genero } genero El tipo de género de la terminación.
   * @param { string[] } excepciones Las excepciones a la regla.
   */
  constructor( terminacion, genero, ...excepciones ) {
    this.excepciones = excepciones;
    this.terminacion = terminacion;
    this.genero = genero;
  }

  /**
   * Indica si la palabra recibida es una excepción a la regla.
   * @param { Palabra } palabra La palabra a validar.
   * @returns { boolean } Si es una excepción.
   * @throws { ParamError }
   */
  esExcepcion( palabra ) {
    if ( !( palabra instanceof Palabra ) ) throw new ParamError( "Palabra" );
    for ( const excepcion of this.excepciones ) if ( palabra.es( excepcion ) ) return true;
    return false;
  }

  /**
   * Sin datos.
   * @param { Palabra } palabra
   * @returns { boolean }
   * @throws { ParamError }
   */
  de( palabra ) {
    if ( !( palabra instanceof Palabra ) ) throw new ParamError( "Palabra" );
    return this.terminacion != null && palabra.acabaEn( this.terminacion );
  }
}

module.exports = Terminacion;
