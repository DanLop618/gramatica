/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Importaciones
const Articulo = require( "./Articulo.js" );
const Palabra  = require( "./Palabra.js" );
const InstanceError = require( "./misc/InstanceError.js" );
const ParamError    = require( "./misc/ParamError.js" );

class Palabras {

  /**
   * Lista de palabras
   */
  #list = [];

  /**
   * Inicializa un nuevo conjunto de Palabras[Palabra].
   * @param { string[] | Palabras[] } palabras Las palabras del conjunto.
   * @throws { InstanceError } Si uno de los elementos recibidos no es del tipo <String | Palabra>.
   */
  constructor( ...[ palabras ] ) {
    for ( let palabra of palabras ) {
      if ( typeof palabra === "string" ) this.agregarPalabra( new Palabra( palabra ) );
      else if ( palabra instanceof Palabra ) this.agregarPalabra( palabra );
      else throw new InstanceError( null, null, "String | Palabra" );
    }
  }

  /**
   * Devuelve la cantidad de palabras contenidas.
   * @returns { int } Las palabras contenidas.
   */
  numeroPalabras() {
    return this.#list.length;
  }

  /**
   * Indica si hay al menos una palabra.
   * @returns { boolean } Si hay alguna palabra.
   */
  hayPalabras() {
    return this.#list.length > 0;
  }

  /**
   * Devuelve la primera palabra contenida.
   * @returns { Palabra } La primer palabra.
   */
  primeraPalabra() {
    return this.#list[ 0 ] ?? null;
  }

  /**
   * Devuelve la última palabra contenida.
   * @returns { Palabra } La última palabra.
   */
  ultimaPalabra() {
    return this.#list[ -1 ] ?? null;
  }

  /**
   * Devuelve la palabra en la posición indicada.
   * @param { int } posicion La posición a evaluar.
   * @returns { Palabra } La palabra obtenida.
   * @throws { ParamError }
   */
  palabra( posicion ) {
    if ( typeof posicion != "number" ) throw new ParamError( "Number" );
    return this.#list[ posicion ];
  }

  /**
   * Agrega una palabra nueva al conjunto de palabras.
   * @param { Palabra } palabra La palabra a añadir.
   * @throws { ParamError }
   */
  agregarPalabra( palabra ) {
    if ( !( palabra instanceof Palabra ) ) throw new ParamError( "Palabra" );
    if ( !palabra.estaVacia() ) this.#list.push( palabra );
  }

  /**
   * Agrega una palabra nueva al conjunto de palabras al frente.
   * @param { Palabra } palabra La palabra a añadir.
   * @throws { ParamError }
   */
  anteponerPalabra( palabra ) {
    if ( !( palabra instanceof Palabra ) ) throw new ParamError( "Palabra" );
    if ( !palabra.estaVacia() ) this.#list.splice( 0, 0, palabra );
  }

  /**
   * Elimina la palabra del conjunto de palabras si es que existe.
   * @param { Palabra } palabra La palabra a eliminar.
   * @returns { boolean } Si la palabra se eliminó correctamente.
   * @throws { ParamError }
   */
  borrarPalabra( palabra ) {
    if ( !( palabra instanceof Palabra ) ) throw new ParamError( "Palabra" );
    palabra = this.buscarPalabra( palabra );
    if ( palabra.estaVacia() ) return false;
    this.#list = this.#list.filter( p => p.toString() != palabra.toString() );
    return true;
  }

  /**
   * Agrega una palabra sin duplicarla.
   * @param { Palabra } palabra La palabra a añadir.
   * @returns { boolean } Si la palabra se añadió correctamente.
   * @throws { ParamError }
   */
  agregarPalabraSinDuplicar( palabra ) {
    if ( !( palabra instanceof Palabra ) ) throw new ParamError( "Palabra" );
    if ( this.existePalabra( palabra ) ) return false;
    this.agregarPalabra( palabra );
    return true;
  }

  /**
   * Busca una palabra en el conjunto de palabras. Devuelve una palabra vacía si no se encuentra.
   * @param { Palabra } palabra La palabra a buscar.
   * @returns { Palabra } La palabra obtenida.
   * @throws { ParamError }
   */
  buscarPalabra( palabra ) {
    if ( !( palabra instanceof Palabra ) ) throw new ParamError( "Palabra" );
    for ( const p of this ) if ( p.es( palabra ) ) return p;
    return new Palabra();
  }

  /**
   * Busca una palabra en el conjunto de palabras para verificar su existencia.
   * @param { Palabra } palabra La palabra a buscar.
   * @returns { boolean } Si la palabra existe o no.
   * @throws { ParamError }
   */
  existePalabra( palabra ) {
    if ( !( palabra instanceof Palabra ) ) throw new ParamError( "Palabra" );
    return !this.buscarPalabra( palabra ).estaVacia();
  }

  /**
   * Obtiene las palabras separadas por espacios o por su capitalización para añadirlas al conjunto.
   * @param { string } palabras La cadena de texto a procesar.
   * @throws { ParamError }
   */
  procesarPalabras( palabras ) {
    if ( typeof palabras != "string" ) throw new ParamError( "String" );
    palabras = palabras.trim().replace( '_', ' ' );
    for ( let posicionInicial = 0, posicionEspacio; posicionInicial < palabras.length; posicionInicial = posicionEspacio + 1 ) {
      posicionEspacio = palabras.indexOf( ' ', posicionInicial );
      if ( posicionEspacio < 0 ) posicionEspacio = palabras.length;
      const palabra = palabras.substring( posicionInicial, posicionEspacio );
      if ( !palabra === "" ) this.procesarPalabrasCapirales( palabra );
    }
  }

  /**
   * Obtiene las palabras separadas por su capitalización para añadirlas al conjunto.
   * @param { string } palabra La cadena de texto a procesar.
   * @throws { ParamError }
   */
  procesarPalabrasCapitales( palabra ) {
    if ( typeof palabra != "number" ) throw new ParamError( "String" );
    let bafer = "";
    let ultimaFueMinuscula = palabra[ 0 ] === palabra[ 0 ].toLowerCase();
    for ( let i = 0; i < palabra.length; ++i ) {
      const letra = palabra[ i ];
      if ( letra === letra.toUpperCase() ) {
        this.#list.push( new Palabra( bafer ) );
        bafer = "";
      }
      bafer += letra;
      ultimaFueMinuscula = letra === letra.toLowerCase();
    }
    this.#list.push( new Palabra( bafer ) );
  }

  /**
   * Enumera las palabras con concepto indicado.
   * @param { Palabra } concepto El concepto a utilizar.
   * @returns { string } La cadena de texto resultante.
   * @throws { ParamError }
   */
  enumerarConcepto( concepto ) {
    if ( !( concepto instanceof Palabra ) ) throw new ParamError( "Palabra" );
    let bafer = "";
    if ( !this.numeroPalabras() ) {
      if ( concepto.generoAntepuesto().esFemenino() ) bafer += `ninguna ${ concepto }`;
      else bafer += `ningún ${ concepto }`;
    } else {
      if ( this.numeroPalabras() != 1 ) concepto = concepto.enPlural();
      bafer += concepto.anteponerArticulo( new Articulo( "determinado" ) );
      if ( this.numeroPalabras() >= 3 ) bafer += ":";
      bafer += ` ${ this.enumerar( null ) }`;
    }
    return bafer;
  }

  /**
   * Enumera las palabras separándolas con comas, excepto entre las dos últimas palabras que se separan con la conjunción "y".
   * @param { Articulo } [ articulo = null ] El articulo a utilizar.
   * @returns { string } La cadena de texto resultante.
   * @throws { ParamError }
   */
  enumerar( articulo = null ) {
    if ( !( articulo instanceof Articulo ) ) throw new ParamError( "Articulo" );
    let stringBuilder = "";
    for ( const palabra of this ) {
      if ( palabra != this.primeraPalabra() ) {
        if ( palabra == this.ultimaPalabra() ) stringBuilder += " y ";
        else stringBuilder += ", ";
      }
      if ( !articulo ) stringBuilder += palabra;
      else stringBuilder += palabra.anteponerArticulo( articulo );
    }
    return stringBuilder;
  }

  /**
   * Devuelve la lista de palabras separadas por espacios.
   * @returns { string } La lista de palabras.
   */
  toString() {
    return this.unir( " " );
  }

  /**
   * Une los plurales de las palabras con la primera letra de cada palabra en mayúscula.
   * @returns { string } La cadena resultante.
   */
  unirPluralesCapitalizando() {
    return this.unir( "", ( palabras, palabra ) => { return palabra.enPlural().sinAcentos().enCapital().toString() } );
  }

  /**
   * Une los plurales de las palabras con un guión bajo.
   * @returns { string } La cadena resultante.
   */
  unirPluralesGuionando() {
    return this.unir( "_", ( palabras, palabra ) => { return palabra.enPlural().sinAcentos().enMinusculas().toString() } );
  }

  /**
   * Une las palabras mediante el maquillador ingresado.
   * @param { string } [ elementoUnion = ', ' ] La unión entre cada elemento.
   * @param { callback } [ maquillador = null ] La función maquilladora.
   * @returns { string } La cadena resultante.
   * @throws { ParamError }
   */
  unir( elementoUnion = ", ", maquillador = null ) {
    if ( typeof elementoUnion != "string" ) throw new ParamError( "String" );
    if ( typeof maquillador != "function" ) throw new ParamError( "Function" );
    let bafer = "";
    let texto = "";
    if ( !this.hayPalabras() ) return bafer;
    for ( let indice = 0; indice < this.#list.length; ++indice ) {
      if ( indice > 0 ) bafer += elementoUnion;
      const palabra = this.#list[ indice ];
      if ( !maquillador ) texto = palabra.toString();
      else texto = maquillador( this, palabra );
      bafer += texto;
    }
    return bafer;
  }

  /**
   * Devuelve el array de palabras en forma de cadenas de texto.
   * @returns { string[] } La colección de palabras.
   */
  lista() {
    const lista = [];
    for ( const palabra of this ) lista.push( palabra.toString() );
    return lista;
  }

  // Iterador
  [ Symbol.iterator ]() {
    let index = -1;
    let data  = this.#list;
    return {
      next: () => ({
        value: data[ ++index ],
        done:  index === data.length
      })
    };
  }
}

module.exports = Palabras;
