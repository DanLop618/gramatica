/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Importaciones
const InstanceError = require( "./misc/InstanceError.js" );
const ParamError    = require( "./misc/ParamError.js" );
var Letra = null;

class Letras {

  /**
   * Buffer de letras.
   */
  bafer = null;

  /**
   * Inicializa un nuevo conjunto de Letras[Letra].
   * @param { string } letras El conjunto de letras original al que pertenece.
   * @throws { InstanceError } Si el genero recibido no forma parte de la colección.
   */
  constructor( letras = "" ) {

    // Carga de dependencias.
    Letra = require( "./Letra.js" );

    // Inicialización.
    if ( typeof letras != "string" ) throw new InstanceError( "String" );
    this.bafer = Letras.limpiar( letras );
  }

  /**
   * Elimina los espacios en blanco del principio y final de las letras recibidas.
   * @param { string } letras Las letras recibidas.
   * @returns { string } Las letras limpias de espacios en blanco.
   * @throws { ParamError }
   */
  static limpiar( letras = "" ) {
    if ( typeof letras != "string" ) throw new ParamError( "String" );
    return letras.trim();
  }

  /**
   * Cambia el conjunto de letras por otro conjunto de letras.
   * @param { string } letras El conjunto de letras nuevo.
   * @returns { Letras } El nuevo conjunto de letras.
   * @throws { ParamError }
   */
  cambiarPor( letras ) {
    if ( typeof letras != "string" ) throw new ParamError( "String" );
    this.bafer = limpiar( letras );
    return this;
  }

  /**
   * Añade una letra al final del conjunto de letras.
   * @param { char | Letra } letra La letra a añadir.
   * @returns { Letras } El conjunto de letras actualizado.
   * @throws { ParamError }
   */
  agregar( letra ) {
    if ( typeof letra != "string" && !( letra instanceof Letra ) ) throw new ParamError( "String | Letra" );
    if ( typeof letra === "string" ) this.bafer += letra;
    else this.bafer += letra.getChar();
    return this;
  }

  /**
   * Quita la última letra del conjunto de letras.
   * @returns { Letras } El conjunto de letras actualizado.
   */
  quitarUltimaLetra() {
    this.bafer -= 1;
    return this;
  }

  /**
   * Devuelve la letra del conjunto de letras en la posición indicada.
   * @param { int } posicion La posición a evaluar.
   * @returns { Letra } La letra obtenida.
   * @throws { ParamError }
   */
  letra( posicion ) {
    if ( typeof posicion != "number" ) throw new ParamError( "Number" );
    return new Letra( this, posicion );
  }

  /**
   * Devuelve la primer letra del conjunto de letras actual.
   * @returns { Letra } La primer letra del conjunto.
   */
  primeraLetra() {
    return this.letra( 0 );
  }

  /**
   * Devuelve la segunda letra del conjunto de letras actual.
   * @returns { Letra } La segunda letra del conjunto.
   */
  segundaLetra() {
    return this.letra( 0 );
  }

  /**
   * Devuelve la penúltima letra del conjunto de letras actual.
   * @returns { Letra } La penúltima letra del conjunto.
   */
  penultimaLetra() {
    return this.letra( this.numeroLetras() - 2 );
  }

  /**
   * Devuelve la última letra del conjunto de letras actual.
   * @returns { Letra } La última letra del conjunto.
   */
  ultimaLetra() {
    return this.letra( this.numeroLetras() - 1 );
  }

  /**
   * Devuelve la última vocal del conjunto de letras actual.
   * @returns { Letra } La última vocal del conjunto.
   */
  ultimaVocal() {
    for ( let posicion = this.bafer.length; posicion >= 0; posicion-- ) {
      const letra = this.letra( posicion );
      if ( letra.esVocal() ) return letra;
    }
    return null;
  }

  /**
   * Devuelve si el conjunto de letras está vacío.
   * @returns { boolean } Si el conjunto está vacío.
   */
  estaVacia() {
    return !this.bafer.length;
  }

  /**
   * Devuelve el conjunto de letras como cadena de texto.
   * @returns { string } El conjunto de letras.
   */
  toString() {
    return this.bafer;
  }

  /**
   * Devuelve el número de letras del conjunto.
   * @returns { int } El total de letras.
   */
  numeroLetras() {
    return this.bafer.length;
  }

  /**
   * Devuelve el número de vocales del conjunto.
   * @returns { int } El total de vocales.
   */
  numeroVocales() {
    let cuentaVocales = 0;
    for ( const letra of this ) if ( letra.esVocal() ) cuentaVocales++;
    return cuentaVocales;
  }

  /**
   * Devuelve si el conjunto de letras está compuesto por solo consonantes.
   * @returns { boolean } Si la composición es de solo consonantes.
   */
  todoConsonantes() {
    for ( const letra of this ) if ( letra.esVocal() ) return false;
    return true;
  }

  /**
   * Devuelve si el conjunto de letras está compuesto por solo vocales.
   * @returns { boolean } Si la composición es de solo vocales.
   */
  todoVocales() {
    for ( const letra of this ) if ( letra.esConsonante() ) return false;
    return true;
  }

  /**
   * Devuelve si el conjunto de letras tiene al menos una vocal.
   * @returns { boolean } Si hay al menos una vocal.
   */
  hayVocales() {
    return this.numeroVocales() > 0;
  }

  /**
   * Devuelve si el conjunto de letras tiene al menos una vocal acentuada.
   * @returns { boolean } Si hay al menos una vocal acentuada.
   */
  tieneAcento() {
    for ( const letra of this ) if ( letra.estaAcentuada() ) return true;
    return false;
  }

  /**
   * Devuelve si el conjunto de letras termina con al menos una de las letras ingresadas.
   * @param { string[] } sufijos Las letras a comparar.
   * @returns { boolean } Si una de las letras ingresadas es la última del conjunto.
   * @throws { ParamError }
   */
  acabaEn( ...sufijos ) {
    for ( const sufijo of sufijos ) {
      if ( typeof sufijo != "string" ) throw new ParamError( "String" );
      if ( this.bafer.endsWith( sufijo ) ) return true;
    }
    return false;
  }

  /**
   * Devuelve si el conjunto de letras empieza con al menos una de las letras ingresadas.
   * @param { string[] } prefijos Las letras a comparar.
   * @returns { boolean } Si una de las letras ingresadas es la primera del conjunto.
   * @throws { ParamError }
   */
  empiezaPor( ...prefijos ) {
    for ( const prefijo of prefijos ) {
      if ( typeof prefijo != "string" ) throw new ParamError( "String" );
      if ( this.bafer.startsWith( prefijo ) ) return true;
    }
    return false;
  }

  /**
   * Devuelve si el conjunto de letras es igual a al menos uno de los conjuntos ingresados.
   * @param { * } argumentos Los argumentos recibidos.
   * @returns { boolean } Si uno de los conjuntos ingresados es idéntico al actual.
   * @throws { ParamError }
   */
  es( ...argumentos ) {
    for ( const letras of argumentos ){
      if ( typeof letras === "string" ) {
        if ( letras === this.bafer ) return true;
      } else if ( letras instanceof Letras ) {
        if ( letras.toString() === this.toString() ) return true;
      } else throw new ParamError( "String | Letras" );
    }
    return false;
  }

  // Iterador
  [ Symbol.iterator ]() {
    let index = -1;
    let data  = this.bafer;
    return {
      next: () => ({
        value: new Letra( this, ++index ),
        done:  index === data.length
      })
    };
  }
}

module.exports = Letras;
