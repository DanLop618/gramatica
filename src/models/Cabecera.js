const Definicion = require( "../models/Definicion.js" );
const ParamError = require( "../misc/ParamError.js" );
const Palabra = require( "../Palabra.js" );

class Cabecera extends Palabra {

  // Atributos privados.
  #_definiciones;
  #_header;
  #_id;

  /**
   * Construye una nueva cabecera ( palabra ) a partir de un objeto JSON.
   * @param { object } json El objeto original.
   */
  constructor( json ) {
    super( json.header );
    this.#_definiciones = [];
    this.#_header = json.header;
    this.#_id = json.id;
  }

  /**
  * Obtiene el header de la cabecera.
  * @returns { string }
  */
  get header() {
    return this.#_header;
  }

  /**
   * Obtiene el identificador de la cabezera.
   * @returns { string }
   */
  get id() {
    return this.#_id;
  }

  /**
   * Obtiene las definiciones de la palabra.
   * @returns { Definicion[] }
   */
  get definiciones() {
    return this.#_definiciones;
  }

  /**
   * Añade una nueva definición a la palabra.
   * @param { Definicion } definicion La definicion a añadir.
   */
  agregarDefinicion( definicion ) {
    if ( !( definicion instanceof Definicion ) ) throw new ParamError( "Definicion" );
    this.#_definiciones.push( definicion );
  }
}

module.exports = Cabecera;
