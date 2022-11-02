/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Importaciones
const Letras = require( "../Letras.js" );
const ParamError = require( "./ParamError.js" );

class Silaba extends Letras {

  #parent;
  tonica;

  /**
   * Inicializa un objeto <Silaba>.
   * @param { string } silaba El texto que contendrá la sílaba.
   * @param { Silabas } parent La clase padre.
   */
  constructor( silaba, parent ) {
    super( silaba );
    this.#parent = parent;
    this.tonica = false;
  }

  /**
   * Indica si la sílaba es tónica.
   * @returns { boolean }
   */
  esTonica() {
    return this.tonica;
  }

  /**
   * Indica si la sílaba es átona.
   * @returns { boolean }
   */
  esAtona() {
    return !this.tonica;
  }

  /**
   * Agrega una tilde a la sílaba.
   * @returns { Silaba } La sílaba acentuada.
   */
  acentuar() {
    if ( this.hayVocales() ) this.#parent.ultimaVocal().ponerAcento();
    this.#parent.procesarSilabaTonica( this );
    this.#parent.getPalabra().cambiarPor( this.#parent.unirSilabas() );
  }

  /**
   * Elimina la tilde de la sílaba.
   * @returns { Silaba } La sílaba sin acento.
   */
  quitarAcento() {
    for ( const letra of this ) letra.quitarAcento();
    this.#parent.procesarSilabaTonica( null );
    this.#parent.getPalabra().cambiarPor( this.#parent.unirSilabas() );
  }

  /**
   * Marca la sílaba como atona.
   */
  marcarAtona() {
    this.tonica = false;
  }

  /**
   * Marca la sílaba como tónica.
   */
  marcarTonica() {
    this.tonica = true;
  }

  /**
   * Devuelve la sílaba siguiente del conjunto.
   * @returns { Silaba } La sílaba siguiente.
   */
  siguiente() {
    return this.#parent.getList()[ this.#parent.getList().indexOf( this ) + 1 ];
  }

  /**
   * Devuelve la sílaba anterior del conjunto.
   * @returns { Silaba } La sílaba anterior.
   */
  anterior() {
    return this.#parent.getList()[ this.#parent.getList().indexOf( this ) - 1 ];
  }

  /**
   * Junta la sílaba actual con la siguiente sílaba del conjunto.
   * @returns { Silaba } La sílaba unificada.
   */
  juntarConSiguiente() {
    const silabaSiguiente = this.siguiente();
    this.agregar( silabaSiguiente.toString() );
    this.#parent.setList( this.#parent.getList().filter( s => s != silabaSiguiente ) );
    return this;
  }

  /**
   * Parte la sílaba desde una posición dada.
   * @param { int } posicion La posición.
   * @returns { Silaba } La sílaba resultante.
   * @throws { ParamError }
   */
  partir( posicion ) {
    if ( typeof posicion != "number" ) throw new ParamError( "Number" );
    if ( posicion < 0 ) posicion = this.bafer.length + posicion;
    const silabaSiguiente = new Silaba( this.bafer.substring( posicion, this.bafer.length ), this.#parent );
    this.bafer = this.bafer.substring( 0, posicion );
    const list = this.#parent.getList();
    list.splice( list.indexOf( this ) + 1, 0, silabaSiguiente )
    return this;
  }

  /**
   * Parte la sílaba desde el medio.
   * @returns { Silaba } La sílaba resultante.
   */
  partirPorMedio() {
    return this.partir( this.bafer.length / 2 );
  }

  /**
   * Junta las sílabas adyacentes desde una posición dada.
   * @param { int } posicion La posición desde la cual juntar.
   * @throws { ParamError }
   */
  juntarAdyacentesPartiendoDesde( posicion ) {
    if ( typeof posicion != "number" ) throw new ParamError( "Number" );
    return this.partir( posicion )
      .anterior()
      .juntarConSiguiente()
      .siguiente()
      .juntarConSiguiente();
  }

  /**
   * Junta las sílabas adyacentes desde la mitad del conjunto.
   */
  juntarAdyacentesPartiendoPorMedio() {
    return this.juntarAdyacentesPartiendoDesde( this.bafer.length / 2 );
  }

  /**
   * Junta las sílabas adyacentes desde el final del conjunto.
   */
  juntarAdyacentesPartiendoDesdeFinal() {
    return this.juntarAdyacentesPartiendoDesde( -2 );
  }
}

module.exports = Silaba;
