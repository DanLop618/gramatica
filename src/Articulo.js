/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Importaciones.
const ParamError = require( "./misc/ParamError.js" );
const Enum    = require( "./misc/Enum.js" );
const Palabra = require( "./Palabra.js" );
const Genero  = require( "./Genero.js" );
const Numero  = require( "./Numero.js" );

class Articulo extends Enum {

  /**
   * Constructores de articulos gramaticales.
   */
  static determinado   = new Articulo( "determinado", 0 );
  static indeterminado = new Articulo( "indeterminado", 1 );

  /**
   * Tipos de articulos gramaticales.
   */
  static articulos = [
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

  /**
   * Inicializa un objeto <Articulo> que emula un ENUM.
   * @param { string } value El articulo interno de la clase.
   * @param { int } ordinal El número posicional del articulo.
   * @returns { Articulo }
   */
  constructor( value, ordinal ) {
    super( value, ordinal );
  }

  /**
   * Indica si se trata de un artículo.
   * @param { Palabra } palabra La palabra a verificar.
   * @returns { boolean } Si la palabra se trata de un articulo.
   * @throws { ParamError }
   */
  static es( palabra ) {
    if ( !( palabra instanceof Palabra ) ) throw new ParamError( "Palabra" );
    for ( const lista of Articulo.articulos )
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
    return this.value === "determinado";
  }

  /**
   * Indica si el artículo es indeterminado.
   * @returns { boolean } Si el articulo es indeterminado.
   */
  esIndeterminado() {
    return this.value === "indeterminado";
  }

  /**
   * Obiente el articulo según el género y número gramatical.
   * @param { Genero } genero El género de la palabra.
   * @param { Numero } numero El número gramatical de la palabra.
   * @returns { string } El articulo obtenido.
   * @throws { ParamError }
   */
  obtener( genero, numero ) {
    if ( !( genero instanceof Genero ) ) throw new ParamError( "Genero" );
    if ( !( numero instanceof Numero ) ) throw new ParamError( "Numero" );
    return Articulo.articulos[ this.ordinal ][ genero.ordinal ][ numero.ordinal ];
  }

  /**
   * Obiente el articulo según la palabra ingresada.
   * @param { Palabra } palabra La palabra a verificar.
   * @returns { string } El articulo obtenido.
   * @throws { ParamError }
   */
  segunPalabra( palabra ) {
    if ( !( palabra instanceof Palabra ) ) throw new ParamError( "Palabra" );
    return this.obtener( palabra.generoAntepuesto(), palabra.numero() );
  }

  /**
   * Obiente el articulo según la palabra ingresada y devuelve el resultado concatenado.
   * @param { Palabra } palabra La palabra a verificar.
   * @returns { string } El articulo y la palabra concatenados.
   * @throws { ParamError }
   */
  agregarPalabra( palabra ) {
    if ( !( palabra instanceof Palabra ) ) throw new ParamError( "Palabra" );
    return this.segunPalabra( palabra ) + " " + palabra;
  }

  /**
   * Indica si el articulo se conjunta con la preposición 'a' o 'de'.
   * @param { Palabra } palabra La palabra a verificar.
   * @returns { boolean } Si el articulo se conjunta.
   * @throws { ParamError }
   */
  casoArticuloContracto( palabra ) {
    if ( !( palabra instanceof Palabra ) ) throw new ParamError( "Palabra" );
    return this.esDeterminado()
      && palabra.generoAntepuesto().esMasculino()
      && palabra.numero().esSingular();
  }
}

module.exports = Articulo;
