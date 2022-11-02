/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Importaciones
const Enum    = require( "./misc/Enum.js" );
const Palabra = require( "./Palabra.js" );
const ParamError = require( "./misc/ParamError.js" );

class Preposicion extends Enum {

  /**
   * Constructores de preposiciones gramaticales.
   */
  static a = new Preposicion( "a", 0 );             static allende = new Preposicion( "allende", 1 );    static ante = new Preposicion( "ante", 2 );
  static aquende = new Preposicion( "aquende", 3 ); static bajo = new Preposicion( "bajo", 4 );          static cabe = new Preposicion( "cabe", 5 );
  static con = new Preposicion( "con", 6 );         static contra = new Preposicion( "contra", 7 );      static de = new Preposicion( "de", 8 );
  static desde = new Preposicion( "desde", 9 );     static durante = new Preposicion( "durante", 10 );   static en = new Preposicion( "en", 11 );
  static entre = new Preposicion( "entre", 12 );    static excepto = new Preposicion( "excepto", 13 );   static hacia = new Preposicion( "hacia", 14 );
  static hasta = new Preposicion( "hasta", 15 );    static mediante = new Preposicion( "mediante", 16 ); static para = new Preposicion( "para", 17 );
  static por = new Preposicion( "por", 18 );        static pro = new Preposicion( "pro", 19 );           static según = new Preposicion( "según", 20 );
  static sin = new Preposicion( "sin", 21 );        static so = new Preposicion( "so", 22 );             static sobre = new Preposicion( "sobre", 23 );
  static tras = new Preposicion( "tras", 24 );      static versus = new Preposicion( "versus", 25 );     static vía = new Preposicion( "vía", 26 );

  /**
   * Inicializa un objeto <Preposicion> que emula un ENUM.
   * @param { string } value La preposición interno de la clase.
   * @param { int } ordinal El número posicional de la preposición.
   * @returns { Numero }
   */
  constructor( value, ordinal ) {
    super( value, ordinal );
  }

  /**
   * Indica si una palabra se trata de una preposición.
   * @param { Palabra } palabra La palabra a comparar.
   * @returns { boolean } Si la palabra es una preposición.
   * @throws { ParamError }
   */
  static es( palabra ) {
    if ( !( palabra instanceof Palabra ) ) throw new ParamError( "Palabra" );
    for ( const preposicion of Object.keys( Preposicion ) )
      if ( preposicion === palabra.toString().toLowerCase() ) return true;
    return false;
  }
}

module.exports = Preposicion;
