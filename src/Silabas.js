/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Importaciones
const InstanceError = require( "./misc/InstanceError.js" );
const ParamError    = require( "./misc/ParamError.js" );
const Silaba        = require( "./misc/Silaba.js" );
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

  /**
   * Inicializa un nuevo conjunto de Silabas[Silaba].
   * @param { Palabra } palabra La palabra del conjunto.
   * @throws { InstanceError } Si el elemento recibido no es de tipo <Palabra>.
   */
  constructor( palabra ) {
    if ( !( palabra instanceof Palabra ) ) throw new InstanceError( null, null, "Palabra" );
    this.#palabra = palabra;
    if ( palabra.hayVocales() ) {
      this.#procesar1_SepararVocalesDeConsonantes();
      this.#procesar2_HiatosDiptongos();
      this.#procesar3_ReglasSeparacionSilabica();
      this.#procesar4_DeterminarSilabaTonica();
    } else {
      this.agregarProtosilaba( new Silaba( palabra.toString(), this ) );
      this.primeraSilaba().marcarTonica();
    }
  }

  /**
   * Creación de las protosílabas
   */
  #procesar1_SepararVocalesDeConsonantes() {
    let protosilaba = new Silaba( "", this );
    let ultimaFueVocal = this.#palabra.primeraLetra().esVocal();
    for ( const letra of this.#palabra ) {
      if ( ( letra.esVocal() && !ultimaFueVocal ) || ( letra.esConsonante() && ultimaFueVocal ) ) {
        this.agregarProtosilaba( protosilaba );
        protosilaba = new Silaba( "", this );
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
   * @throws { ParamError }
   */
  silaba( posicion ) {
    if ( typeof posicion != "number" ) throw new ParamError( "Number" );
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
   * @throws { ParamError }
   */
  quitarSilaba( silaba ) {
    if ( !( silaba instanceof Silaba ) ) throw new ParamError( "Silaba" );
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
   * @throws { ParamError }
   */
  unirSilabas( separador = "" ) {
    if ( typeof separador != "string" ) throw new ParamError( "String" );
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
   * @throws { ParamError }
   */
  agregarProtosilaba( silaba ) {
    if ( !( silaba instanceof Silaba ) ) throw new ParamError( "Silaba" );
    this.#list.push( silaba );
  }

  /**
   * Indica si la sílaba ingresada es la sílaba tónica del conjunto.
   * @param { Silaba } silaba La sílaba a comparar.
   * @throws { ParamError }
   */
  procesarSilabaTonica( silabaTonica ) {
    if ( !( silaba instanceof Silaba ) ) throw new ParamError( "Silaba" );
    for ( const silaba of this ) silaba.tonica = silaba === silabaTonica;
  }

  /**
   * Getter se this.#palabra
   * @returns { Palabra } this.#palabra
   */
  getPalabra() {
    return this.#palabra;
  }

  /**
   * Getter de this.#lista
   * @returns { Silabas[] } this.#lista
   */
  getList() {
    return this.#list;
  }

  /**
   * Setter de this.#lista
   * @param { Silabas[] } lista
   */
  setList( lista ) {
    this.#list = lista;
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

module.exports = Silabas;
