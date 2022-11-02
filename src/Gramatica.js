/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Importaciones.
const Articulo = require( "./Articulo.js" );
const Palabras = require( "./Palabras.js" );
const Palabra  = require( "./Palabra.js" );
const Silabas  = require( "./Silabas.js" );
const InstanceError = require( "./misc/InstanceError.js" );
const ParamError    = require( "./misc/ParamError.js" );

class Gramatica {

  /**
   * Devuelve el plural de la palabra ingresada.
   * @param { string } palabra La palabra a pluralizar.
   * @returns { string } La palabra en plural.
   * @throws { ParamError }
   */
  static plural( palabra ) {
    if ( typeof palabra != "string" ) throw new ParamError( "String" );
    return new Palabra( palabra ).enPlural().toString();
  }

  /**
   * Devuelve las sílabas de la palabra ingresada.
   * @param { string } palabra La palabra a verificar.
   * @returns { string } Las sílabas de la palabra.
   * @throws { ParamError }
   */
  static silabas( palabra ) {
    if ( typeof palabra != "string" ) throw new ParamError( "String" );
    return new Silabas( new Palabra( palabra ) ).toString();
  }

  /**
   * Devuelve la acentuación de la palabra ingresada.
   * @param { string } palabra La palabra a verificar.
   * @returns { string } La acentuación de la palabra.
   * @throws { ParamError }
   */
  static acentuacion( palabra ) {
    if ( typeof palabra != "string" ) throw new ParamError( "String" );
    return new Silabas( new Palabra( palabra ) ).acentuacion().toString();
  }

  /**
   * Devuelve el género de la palabra ingresada.
   * @param { string } palabra La palabra a verificar.
   * @returns { string } El género de la palabra.
   * @throws { ParamError }
   */
  static genero( palabra ) {
    if ( typeof palabra != "string" ) throw new ParamError( "String" );
    return new Palabra( palabra ).genero().toString();
  }

  /**
   * Devuelve el número gramatical de la palabra ingresada.
   * @param { string } palabra La palabra a verificar.
   * @returns { string } El número gramatical de la palabra.
   * @throws { ParamError }
   */
  static numero( palabra ) {
    if ( typeof palabra != "string" ) throw new ParamError( "String" );
    return new Palabra( palabra ).numero().toString();
  }

  /**
   * Cuantifica la palabra recibida de acuerdo al número de elementos ingresado.
   * @param { int } numeroElementos El número de elementos que cuantificarán la palabra.
   * @param { string } palabra La palabra a cuantificar.
   * @returns { string } La palabra cuantificada.
   * @throws { ParamError }
   */
  static cuantificar( numeroElementos, palabra ) {
    if ( typeof numeroElementos != "number" ) throw new ParamError( "Number" );
    if ( typeof palabra != "string" ) throw new ParamError( "String" );
    return new Palabra( palabra ).cuantificar( numeroElementos );
  }

  /**
   * Convierte la primera letra de un texto en mayúscula.
   * @param { string } texto El texto a capitalizar.
   * @returns { string } El texto capitalizado.
   * @throws { ParamError }
   */
  static capitalizar( texto ) {
    if ( typeof texto != "string" ) throw new ParamError( "String" );
    if ( texto.length <= 1 ) return texto.toUpperCase();
    return texto[ 0 ].toUpperCase() + texto.substring( 1 );
  }

  /**
   * Enumera las palabras recibidas de acuerdo el articulo gramatical ingresado.
   * @param { Articulo } articulo El articulo gramatical a utilizar.
   * @param { string[] } palabras Las palabras a enumerar.
   * @returns { string } Las palabras enumeradas.
   * @throws { ParamError }
   */
  static enumerar( articulo, ...palabras ) {
    if ( !( articulo instanceof Articulo ) ) throw new ParamError( "Articulo" );
    return new Palabras( palabras ).enumerar( articulo );
  }

  /**
   * Enumera las palabras recibidas de acuerdo concepto ingresado.
   * @param { string } concepto El concepto a utilizar.
   * @param { string[] } palabras Las palabras a enumerar.
   * @returns { string } Las palabras enumeradas.
   * @throws { ParamError }
   */
  static enumerarConcepto( concepto, ...palabras ) {
    if ( typeof concepto != "string" ) throw new ParamError( "String" );
    return new Palabras( palabras ).enumerarConcepto( new Palabra( concepto ) );
  }

  /**
   * Concatena la palabra ingresada con su articulo gramatical.
   * @param { string } palabra La plabra a utilizar.
   * @param { string } [ articulo = "determinado" ] El tipo articulo gramatical a utilizar.
   * @returns { string } Las palabra y su articulo gramatical concatenados.
   * @throws { ParamError }
   */
  static articulo( palabra, articulo = "determinado" ) {
    if ( typeof palabra != "string" ) throw new ParamError( "String" );
    if ( typeof articulo != "string" ) throw new ParamError( "String" );
    return new Articulo( articulo ).agregarPalabra( new Palabra( palabra ) );
  }

  /**
   * Une los plurales de las palabras ingresadas capitalizando cada una de ellas (CamelCase).
   * @param { string[] } palabras Las palabras a pluralizar y unir.
   * @returns { string } Las palabras pluralizadas y unidas.
   * @throws { ParamError }
   */
  static unirPluralesCapitalizando( ...palabras ) {
    return new Palabras( palabras ).unirPluralesCapitalizando();
  }

  /**
   * Une los plurales de las palabras ingresadas mediante guiones (snake_case).
   * @param { string[] } palabras Las palabras a pluralizar y unir.
   * @returns { string } Las palabras pluralizadas y unidas.
   * @throws { ParamError }
   */
  static unirPluralesGuionando( ...palabras ) {
    return new Palabras( palabras ).unirPluralesGuionando();
  }
}

module.exports = Gramatica;
