/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Importaciones
const Acentuacion = require( "./Acentuacion.js" );
const Letras      = require( "./Letras.js" );
const Palabra     = require( "./Palabra.js" );

class Silabas {

  #palabra = null;
  #list = [];
  DOS_CONSONANTES_INDIVISIBLES = [
    "bl", "br", "dr", "cr", "cl", "fr", "fl", "gr",
    "gl", "pl", "pr", "tr", "dr", "ch", "ll", "rr"
  ];

  // Constructor
  constructor( palabra ) {
    //if ( !( palabra instanceof Palabra ) ) throw new Error( "TypeError: Expected type Palabra but " + typeof palabra + " was received." );
    this.#palabra = palabra;
    if ( palabra.hayVocales() ) {
      this.#procesar1_SepararVocalesDeConsonantes();
      this.#procesar2_HiatosDiptongos();
      this.#procesar3_ReglasSeparacionSilabica();
      this.#procesar4_DeterminarSilabaTonica();
    } else {
      this.agregarProtosilaba( new this.Silaba( palabra.toString(), this ) );
      this.primeraSilaba().marcarTonica();
    }
  }

  /**
   * Creación de las protosílabas
   */
  #procesar1_SepararVocalesDeConsonantes() {
    let protosilaba = new this.Silaba( "", this );
    let ultimaFueVocal = this.#palabra.primeraLetra().esVocal();
    for ( const letra of this.#palabra ) {
      if ( ( letra.esVocal() && !ultimaFueVocal ) || ( letra.esConsonante() && ultimaFueVocal ) ) {
        this.agregarProtosilaba( protosilaba );
        protosilaba = new this.Silaba( "", this );
      }
      protosilaba.agregar( letra );
      ultimaFueVocal = letra.esVocal();
    }
    this.agregarProtosilaba( protosilaba );
  }

  /**
   * Detección di Hiatos y Dispotongos.
   */
  #procesar2_HiatosDiptongos() {
    for ( const silaba of this ) {
      if ( silaba.todoVocales() &&
           silaba.numeroVocales() === 2 &&
           silaba.primeraLetra().esVocalFuerte() &&
           silaba.segundaLetra().esVocalFuerte()
         ) silaba.partirPorMedio();

      // Los verbos terminados en -uir, así como los derivados, se consideran hiatos.
      if ( this.#palabra.acabaEn( "uir" ) ) this.penultimaSilaba().partirPorMedio();
      else if ( this.#palabra.acabaEn( "uido", "uida" ) ) this.antepenultimaSilaba().partirPorMedio();
      else if ( this.#palabra.acabaEn( "uidos", "uidas" ) ) this.antepenultimaSilaba().anterior().partirPorMedio();
    }
  }

  /**
   * Juntar las protosílabas consonantes con las vocales.
   */
  #procesar3_ReglasSeparacionSilabica() {
    if ( this.numeroSilabas() <= 1 ) return;
    if ( this.primeraSilaba().todoConsonantes() ) this.primeraSilaba().juntarConSiguiente();
    if ( this.ultimaSilaba().todoConsonantes() ) this.penultimaSilaba().juntarConSiguiente();
    for ( const silaba of this ) {
      if ( !silaba.todoConsonantes() || silaba === this.primeraSilaba() || silaba === this.ultimaSilaba() ) continue;
      if ( silaba.numeroLetras() === 1 ) {
        silaba.juntarConSiguiente();
      } else if ( silaba.numeroLetras() === 2 ) {
        if ( silaba in this.DOS_CONSONANTES_INDIVISIBLES ) silaba.juntarConSiguiente();
        else silaba.juntarAdyacentesPartiendoPorMedio();
      } else if ( silaba.acabaEn( ...this.DOS_CONSONANTES_INDIVISIBLES ) ) {
        silaba.juntarAdyacentesPartiendoDesdeFinal();
      } else if ( silaba.numeroLetras() === 3 ) {
        if ( silaba.acabaEn( "l", "r" ) ) silaba.juntarAdyacentesPartiendoDesde( 1 );
        else silaba.juntarAdyacentesPartiendoDesde( 2 );
      } else if ( silaba.numeroLetras() === 4 ) silaba.juntarAdyacentesPartiendoPorMedio();
    }
  }

  /**
   * Detectar la sílaba tónica.
   */
  #procesar4_DeterminarSilabaTonica() {
    for ( const silaba of this ) {
      if ( silaba.tieneAcento() ) return silaba.marcarTonica();
    }

    if ( this.numeroSilabas() === 1 ) {
      this.primeraSilaba().marcarTonica();
    } else if ( !this.ultimaSilaba().ultimaLetra().esVocal() && !this.ultimaSilaba().ultimaLetra().es( 'n', 's' ) ) {
      this.ultimaSilaba().marcarTonica();
    } else if ( this.ultimaSilaba().ultimaLetra().es( 'y' ) ) {
      this.ultimaSilaba().marcarTonica();
    } else if ( this.numeroSilabas() > 1 ) {
      this.penultimaSilaba().marcarTonica();
    }
  }

  /**
   * Obtiene la sílaba en la posición indicada.
   * @param { int } posicion La posición a evaluar.
   * @returns { Silaba } La sílaba obtenida.
   * @throws { Error } Si el tipo de dato ingresado no es compatible.
   */
  silaba( posicion ) {
    // if ( !( posicion instanceof Int32 ) ) throw new Error( "TypeError: Expected type int but " + typeof posicion + " was received." );
    return this.#list[ posicion ];
  }

  /**
   * Obtiene el número de sílabas totales.
   * @returns { int } Sílabas totales.
   */
  numeroSilabas() {
    return this.#list.length;
  }

  /**
   * Indica si hay al menos una sílaba.
   * @returns { boolean } Si hay al menos una sílaba.
   */
  haySilabas() {
    return this.#list.length > 0;
  }

  /**
   * Devuelve la primer sílaba el conjunto.
   * @returns { Silaba } La sílaba obtenida.
   */
  primeraSilaba() {
    return this.#list[ 0 ];
  }

  /**
   * Devuelve la segunda sílaba el conjunto.
   * @returns { Silaba } La sílaba obtenida.
   */
  segundaSilaba() {
    return this.#list[ 1 ];
  }

  /**
   * Devuelve la última sílaba el conjunto.
   * @returns { Silaba } La sílaba obtenida.
   */
  ultimaSilaba() {
    return this.#list[ this.#list.length - 1 ];
  }

  /**
   * Devuelve la penúltima sílaba el conjunto.
   * @returns { Silaba } La sílaba obtenida.
   */
  penultimaSilaba() {
    return this.#list[ this.#list.length - 2 ];
  }

  /**
   * Devuelve la antepenúltima sílaba el conjunto.
   * @returns { Silaba } La sílaba obtenida.
   */
  antepenultimaSilaba() {
    return this.#list[ this.#list.length - 3 ];
  }

  /**
   * Devuelve la acentuación del conjunto de sílabas.
   * @returns { Acentuacion } La sílaba obtenida.
   */
  acentuacion() {
    if ( this.numeroSilabas() >= 1 && this.ultimaSilaba().esTonica() ) return new Acentuacion( "aguda" );
    if ( this.numeroSilabas() >= 2 && this.penultimaSilaba().esTonica() ) return new Acentuacion( "llana" );
    if ( this.numeroSilabas() >= 3 && this.antepenultimaSilaba().esTonica() ) return new Acentuacion( "esdrújula" );
    return new Acentuacion( "sobreesdrújula" );
  }

  /**
   * Elimina una sílaba del conjunto.
   * @param { Silaba } silaba La sílaba a eliminar.
   * @returns { boolean } Si la sílaba se eliminó correctamente.
   * @throws { Error } Si el tipo de dato ingresado no es compatible.
   */
  quitarSilaba( silaba ) {
    // if ( !( silaba instanceof Silaba ) ) throw new Error( "TypeError: Expected type Silaba but " + typeof silaba + " was received." );
    if ( !this.#list.includes( silaba ) ) return false;
    this.#list = this.#list.filter( s => s != silaba );
    this.#palabra.cambiarPor( this.unirSilabas() );
    return true;
  }

  /**
   * Devuelve las sílabas en forma de cadena de texto, separadas por guiones.
   * @returns { string } La cadena de texto resultante.
   */
  toString() {
    return this.unirSilabas( "-" );
  }

  /**
   * Devuelve las sílabas en forma de cadena de texto, separadas por el texto/caracter indicado.
   * @param { string } [ separador = "" ] El separador de cada sílaba.
   * @returns { string } La cadena de texto resultante.
   * @throws { Error } Si el tipo de dato ingresado no es compátible.
   */
  unirSilabas( separador = "" ) {
    // if ( !( separador instanceof String ) ) throw new Error( "TypeError: Expected type string but " + typeof separador + " was received." );
    let resultado = "";
    if ( !this.haySilabas() ) return resultado;
    for ( const silaba of this ) {
      resultado += silaba.toString();
      if ( silaba != this.ultimaSilaba() ) resultado += separador;
    }
    return resultado;
  }

  /**
   * Agrega una protosílaba al conjunto.
   * @param { Silaba } silaba La protosílaba a añadir.
   * @throws { Error } Si el tipo de dato ingresado no es compatible.
   */
  agregarProtosilaba( silaba ) {
    // if ( !( silaba instanceof Silaba ) ) throw new Error( "TypeError: Expected type Silaba but " + typeof silaba + " was received." );
    this.#list.push( silaba );
  }

  /**
   * Indica si la sílaba ingresada es la sílaba tónica del conjunto.
   * @param { Silaba } silaba La sílaba a comparar.
   * @throws { Error } Si el tipo de dato ingresado no es compatible.
   */
  procesarSilabaTonica( silabaTonica ) {
    // if ( !( silabaTonica instanceof Silaba ) ) throw new Error( "TypeError: Expected type Silaba but " + typeof silabaTonica + " was received." );
    for ( const silaba of this ) silaba.tonica = silaba === silabaTonica;
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

  // Clase de Silaba.
  Silaba = class Silaba extends Letras {

    #parent;
    tonica;

    // Constructor.
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
      if ( Silabas.this.hayVocales() ) this.#parent.ultimaVocal().ponerAcento();
      this.#parent.procesarSilabaTonica( this );
      this.#parent.#palabra.cambiarPor( this.#parent.unirSilabas() );
    }

    /**
     * Elimina la tilde de la sílaba.
     * @returns { Silaba } La sílaba sin acento.
     */
    quitarAcento() {
      for ( const letra of this ) letra.quitarAcento();
      this.#parent.procesarSilabaTonica( null );
      this.#parent.#palabra.cambiarPor( this.#parent.unirSilabas() );
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
      return this.#parent.#list[ this.#parent.#list.indexOf( this ) + 1 ];
    }

    /**
     * Devuelve la sílaba anterior del conjunto.
     * @returns { Silaba } La sílaba anterior.
     */
    anterior() {
      return this.#parent.#list[ this.#parent.#list.indexOf( this ) - 1 ];
    }

    /**
     * Junta la sílaba actual con la siguiente sílaba del conjunto.
     * @returns { Silaba } La sílaba unificada.
     */
    juntarConSiguiente() {
      const silabaSiguiente = this.siguiente();
      this.agregar( silabaSiguiente.toString() );
      this.#parent.#list = this.#parent.#list.filter( s => s != silabaSiguiente );
      return this;
    }

    /**
     * Parte la sílaba desde una posición dada.
     * @param { int } posicion La posición.
     * @returns { Silaba } La sílaba resultante.
     * @throws { Error } Si el tipo de dato recibido no es compatible.
     */
    partir( posicion ) {
      // if ( !( posicion instanceof Int32 ) ) throw new Error( "TypeError: Expected type int but " + typeof posicion + " was received." );
      if ( posicion < 0 ) posicion = this.bafer.length + posicion;
      const silabaSiguiente = new Silaba( this.bafer.substring( posicion, this.bafer.length ), this.#parent );
      this.bafer = this.bafer.substring( 0, posicion );
      this.#parent.#list.splice( this.#parent.#list.indexOf( this ) + 1, 0, silabaSiguiente );
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
     * @throws { Error } Si el tipo de dato recibido no es compatible.
     */
    juntarAdyacentesPartiendoDesde( posicion ) {
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
}

module.exports = Silabas;
