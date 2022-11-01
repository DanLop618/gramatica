/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Importaciones
const Articulo = require( "./Articulo.js" );
const Genero   = require( "./Genero.js" );
const Letras   = require( "./Letras.js" );
const Numero   = require( "./Numero.js" );
const Silabas  = require( "./Silabas.js" );

class Palabra extends Letras {

  #original;
  #silabas;
  #genero;
  #numero;

  // Constructor
  constructor( palabra = "" ) {
    // if ( !( palabra instanceof String ) ) throw new Error( "TypeError: Expected type string but " + typeof palabra + " was received" );
    super( palabra.toLowerCase() );
    this.#original = palabra;
    this.#silabas = null;
    this.#genero = null;
    this.#numero = null;
  }

  /**
   * Devuelve la palabra en forma de cadena de texto.
   * @returns { string } La palabra en forma de cadena de texto.
   */
  toString() {
    if ( this.bafer.toString() === this.#original ) return this.#original;
    return this.enMayusculasSegunPatron( this.#original );
  }

  /**
   * Verifica si la palabra es igual al objeto ingresado.
   * @param { Object } objeto El objeto a comparar.
   * @returns { boolean } Si la palabra es idéntica al objeto.
   */
  equals( objeto ) {
    return object ? object.toString() === this.toString() : false;
  }

  /**
   * Crea un duplicado de la palabra. Si un texto es recibido, éste se cambiará.
   * @param { string } [ texto = null ] El nuevo texto
   * @returns { this } La palabra duplicada.
   */
  clonar( texto = null ) {
    if ( !texto ) texto = this.bafer;
    // if ( !( texto instanceof String ) ) throw new Error( "TypeError: Expected type string but " + typeof texto + " was received" );
    const palabra = new Palabra( texto );
    palabra.#genero = this.#genero;
    palabra.#numero = this.#numero;
    return palabra;
  }

  /**
   * Convierte la palabra actual a su forma plural.
   * @returns { string } La palabra en su forma plural.
   */
  procesarPlural() {
    this.#numero = new Numero( "plural" );
    if ( this.estaVacia() || !this.hayVocales() ) return this;
    if ( this.ultimaLetra().esConsonante() ) {
      if ( this.ultimaLetra().es( 'z' ) ) {
        return this.quitarUltimaLetra().agregar( "ces" );
      } else if ( this.ultimaVocal().estaAcentuada() ) {
        this.ultimaVocal().quitarAcento();
        return this.agregar( "es" );
      } else if ( this.ultimaLetra().es( 'n' ) ) {
        if ( this.es( "espécimen" ) ) return this.cambiarPor( "especímenes" );
        if ( this.silabas().acentuacion().esLLana() ) this.silabas().penultimaSilaba().acentuar();
        return this.agregar( "es" );
      } else if ( this.ultimaLetra().es( 's' ) ) {
        if ( this.silabas().numeroSilabas() == 1 ) return this.agregar( "es" );
        return this;
      } else if ( this.ultimaLetra().es( 'x' ) ) {
        if ( this.es( "fax" ) ) return this.agregar( "es" );
      } else if ( this.ultimaLetra().es( 'c' ) ) {
        return this.agregar( 's' );
      } else if ( this.ultimaLetra().es( 'g' ) ) {
        return this.agregar( 's' );
      } else return this.agregar( "es" );
    } else if ( this.ultimaLetra().esVocal() ) {
      if ( this.ultimaLetra().es( 'í', 'ú' ) ) {
        return this.agregar( "es" );
      } else if ( this.silabas().numeroSilabas() === 1 && !this.ultimaLetra().es( 'e' ) ) {
        return this.agregar( "es" );
      } else if ( !this.ultimaLetra().estaAcentuada() || this.ultimaLetra().es( 'á', 'é', 'ó' ) ) {
        return this.agregar( 's' );
      }
    }
    return this;
  }

  /**
   * Cambia el género gramatical de la palabra por el indicado.
   * @param { Genero } genero El nuevo género gramatical.
   */
  cambiarGenero( genero ) {
    // if ( !( genero instanceof Genero ) ) throw new Error( "TypeError: Expected type Genero but " + typeof genero + " was received." );
    this.#genero = genero;
  }

  /**
   * Cambia la numeración gramatical de la palabra por el indicado.
   * @param { Numero } numero La nueva numeración gramatical.
   */
  cambiarNumero( numero ) {
    // if ( !( numero instanceof Numero ) ) throw new Error( "TypeError: Expected type Numero but " + typeof numero + " was received." );
    this.#numero = numero;
  }

  /**
   * Devuelve el articulo gramatical de la palabra.
   * @param { string } [ tipo = "determinado" ] El tipo de articulo gramatical.
   * @returns { Articulo } El articulo gramatical.
   */
  articulo( tipo = "determinado" ) {
    return new Articulo( tipo ).segunPalabra( this );
  }

  /**
   * Obtiene el género gramatical de la palabra.
   * @returns { Genero } El género gramatical.
   */
  genero() {
    if ( !this.#genero ) this.#genero = Genero.segunPalabra( this );
    return this.#genero;
  }

  /**
   * Obtiene la numeracion gramatical de la palabra.
   * @returns { Numero } La numeración gramatical.
   */
  numero() {
    if ( !this.#numero ) this.#numero = Numero.segunPalabra( this );
    return this.#numero;
  }

  /**
   * Obtiene el género gramatical antepuesto de la palabra.
   * @returns { Genero } La género gramatical.
   */
  generoAntepuesto() {
    return Genero.antepuestoSegunPalabra( this );
  }

  /**
   * Obtiene las sílabas de la palabra.
   * @returns { Silabas } Las sílabas.
   */
  silabas() {
    if ( !this.#silabas ) this.#silabas = new Silabas( this );
    return this.#silabas;
  }

  /**
   * Obtiene la acentuación de la palabra.
   * @returns { Acentuacion } La acentuación.
   */
  acentuacion() {
    return this.silabas().acentuacion();
  }

  /**
   * Devuelve la palabra en su forma plurar.
   * @returns { Palabra } La palabra pluralizada.
   */
  enPlural() {
    return this.clonar().procesarPlural();
  }

  /**
   * Devuelve la palabra en minúsculas.
   * @returns { Palabra } La palabra en minúsculas.
   */
  enMinusculas() {
    return this.clonar( this.bafer.toLowerCase() );
  }

  /**
   * Devuelve la palabra en mayúsculas.
   * @returns { Palabra } La palabra en mayúsculas.
   */
  enMayusculas() {
    return this.clonar( this.bafer.toUpperCase() );
  }

  /**
   * Devuelve la palabra con la primera letra mayúscula.
   * @returns { Palabra } La palabra resultante.
   */
  enCapital() {
    if ( this.bafer.length <= 1 ) return this.clonar( this.bafer.toUpperCase() );
    return this.clonar( this.bafer[ 0 ].toUpperCase() + this.bafer.substring( 1 ).toLowerCase() );
  }

  /**
   * Devuelve la palabra sin acentuaciones.
   * @returns { Palabra } La palabra resultante.
   */
  sinAcentos() {
    const palabra = this.clonar();
    for ( const letra of palabra ) letra.quitarAcento();
    return palabra;
  }

  /**
   * Cuantifica la palabra dependiendo del número de elementos indicado.
   * @param { int } numeroElementos El número de elementos.
   * @returns { string } La cadena de texto resultante.
   */
  cuantificar( numeroElementos ) {
    // if ( !( numeroElementos instanceof Int32 ) ) throw new Error( "TypeError: Expected type int but " + typeof numeroElementos + " was received" );
    if ( numeroElementos === Number.MAX_VALUE ) {
      if ( this.generoAntepuesto().esFemenino() ) return "todas las " + this.enPlural();
      return "todos los " + this.enPlural();
    } else if ( numeroElementos === 1 ) {
      if ( this.generoAntepuesto().esFemenino() ) return "una " + this;
      return "un " + this;
    } else if ( numeroElementos > 1 ) {
      return numeroElementos + " " + this.enPlural();
    } else if ( numeroElementos === 0 ) {
      if ( this.generoAntepuesto().esFemenino() ) return "ninguna " + this.enPlural();
      return "ningún " + this.enPlural();
    } else if ( numeroElementos === Number.MIN_VALUE ) {
      if ( this.generoAntepuesto().esFemenino() ) return "faltan todas las " + this.enPlural();
      return "faltan todos los " + this.enPlural();
    } else if ( numeroElementos === -1 ) {
      if ( this.generoAntepuesto().esFemenino() ) return "falta una " + this.enPlural();
      return "falta un " + this.enPlural();
    } else return "faltan " + ( numeroElementos * -1 ) + this.enPlural();
  }

  /**
   * Devuelve la palabra con el articulo gramatical correspondiente antepuesto.
   * @param { Articulo } articulo El articulo gramatical
   * @returns { string } La cadena de texto resultante.
   */
  anteponerArticulo( articulo ) {
    // if ( !( articulo instanceof Articulo ) ) throw new Error( "TypeError: Expected type Articulo but " + typeof articulo + " was received." );
    return articulo.agregarPalabra( this );
  }

  /**
   * Devuelve la palabra con el articulo gramatical correspondiente antepuesto junto con "de".
   * @param { Articulo } articulo El articulo gramatical
   * @returns { string } La cadena de texto resultante.
   */
  anteponerDe( articulo ) {
    // if ( !( articulo instanceof Articulo ) ) throw new Error( "TypeError: Expected type Articulo but " + typeof articulo + " was received." );
    if ( articulo.casoArticuloContracto( this ) ) return "del " + this;
    return "de " + articulo.agregarPalabra( this );
  }

  /**
   * Devuelve la palabra con el articulo gramatical correspondiente antepuesto junto con "a".
   * @param { Articulo } articulo El articulo gramatical
   * @returns { string } La cadena de texto resultante.
   */
  anteponerA( articulo ) {
    // if ( !( articulo instanceof Articulo ) ) throw new Error( "TypeError: Expected type Articulo but " + typeof articulo + " was received." );
    if ( articulo.casoArticuloContracto( this ) ) return "al " + this;
    return "a " + articulo.agregarPalabra( this );
  }

  /**
   * Devuelve la palabra en mayúsculas según el patrón recibido.
   * @param { string } patron El patrón de conversión.
   * @returns { string } La cadena de texto resultante.
   */
  enMayusculasSegunPatron( patron ) {
    // if ( !( patron instanceof String ) ) throw new Error( "TypeError: Expected type string but " + typeof patron + " was received" );
    let destino = this.bafer;
    let enMayusculas = false;
    for ( let indice = 0; indice < destino.length; ++indice ) {
      if ( indice < patron.length ) enMayusculas = patron[ indice ] === patron[ indice ].toUpperCase();
      if ( enMayusculas ) destino = destino.substring( 0, indice ) + destino[ indice ].toUpperCase() + destino.substring( indice + 1 );
    }
    return destino;
  }
}

module.exports = Palabra;
