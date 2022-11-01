/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Importaciones.
const Palabra = require( "./Palabra.js" );

// Terminación de las palabras.
class Terminacion {

  excepciones = [];
  terminacion;
  genero;

  // Constructor
  constructor( terminacion, genero, ...[ excepciones ] ) {
    this.excepciones = excepciones;
    this.terminacion = terminacion;
    this.genero = genero;
  }

  /**
   * Indica si la palabra recibida es una excepción a la regla.
   * @param { Palabra } palabra La palabra a validar.
   * @returns { boolean } Si es una excepción.
   */
  esExcepcion( palabra ) {
    for ( const exception of excepciones )
      if ( palabra.es( excepcion ) ) return true;
    return false;
  }

  /**
   * Sin datos.
   * @param { Palabra } palabra
   * @returns { boolean }
   */
  de( palabra ) {
    return this.terminacion != null && palabra.acabaEn( this.terminacion );
  }
}

// Lista de terminaciones | Terminaciones<Terminacion>
class Terminaciones {

  list = [];

  // Contructor
  constructor() {}

  /**
   * Agrega una nueva terminación a la lista e terminaciones.
   * @param { string } terminacion La terminación de la palabra.
   * @param { Genero } genero El género de la terminación.
   * @param { string[] } excepciones Las excepciones a la regla.
   */
  agregar( terminacion, genero, ...[ excepciones ] ) {
    this.list.push( new Terminacion( terminacion, genero, excepciones ) );
  }

  // Iterador
  [ Symbol.iterator ]() {
    let index = -1;
    let data  = this.list;
    return {
      next: () => ({
        value: data[ ++index ],
        done:  index === data.length
      })
    };
  }
}

class Genero {

  /**
   * Tipos de géneros gramaticales.
   */
  static #terminacionesSingulares = new Terminaciones();
  static #terminacionesPlurales = new Terminaciones();
  #generos = [ "neutro", "masculino", "femenino" ];
  #ordinal;
  #genero;

  // Añadimos las terminaciones singulares.
  static {
    this.#terminacionesSingulares.agregar( "umbre", new Genero( "femenino" ) );
    this.#terminacionesSingulares.agregar( "triz", new Genero( "femenino" ) );
    this.#terminacionesSingulares.agregar( "icie", new Genero( "femenino" ) );
    this.#terminacionesSingulares.agregar( "esa", new Genero( "femenino" ) );
    this.#terminacionesSingulares.agregar( "isa", new Genero( "femenino" ) );
    this.#terminacionesSingulares.agregar( "ína", new Genero( "femenino" ) );
    this.#terminacionesSingulares.agregar( "ión", new Genero( "femenino" ), "anfitrión", "aluvión", "avión", "camión", "centurión", "embrión", "gorrión", "guión" );
    this.#terminacionesSingulares.agregar( "dad", new Genero( "femenino" ), "abad" );
    this.#terminacionesSingulares.agregar( "tad", new Genero( "femenino" ) );
    this.#terminacionesSingulares.agregar( "tud", new Genero( "femenino" ) );
    this.#terminacionesSingulares.agregar( "ies", new Genero( "femenino" ) );
    this.#terminacionesSingulares.agregar( "ud", new Genero( "femenino" ), "alud" );
    this.#terminacionesSingulares.agregar( "ez", new Genero( "femenino" ), "ajedrez", "juez", "pez", "diez" );
    this.#terminacionesSingulares.agregar( "is", new Genero( "femenino" ), "análisis", "chasis", "cutis", "dieciséis", "frontis", "iris", "parchís", "paréntesis", "pubis", "seis", "tenis" );
    this.#terminacionesSingulares.agregar( "ma", new Genero( "masculino" ), "alma", "ama", "ánima", "apotema", "arma", "cama", "forma" );
    this.#terminacionesSingulares.agregar( "o", new Genero( "masculino" ), "dinamo", "mano", "radio", "seo" );
    this.#terminacionesSingulares.agregar( "a", new Genero( "femenino" ), "capicúa", "día", "futbolista", "koala", "mapa", "poeta" );
    this.#terminacionesSingulares.agregar( "z", new Genero( "femenino" ), "haz", "lápiz", "tamiz", "avestruz", "regaliz", "maíz" );
    this.#terminacionesSingulares.agregar( "e", new Genero( "masculino" ), "base", "clase", "clave", "constante", "corriente", "debacle", "elipse", "espiral", "falange", "fase", "fe", "fiebre", "frase", "frente", "fuente", "gente", "hélice", "higiene", "ingle", "leche", "lente", "liebre", "llave", "madre", "masacre", "muerte", "nave", "nieve", "noche", "nube", "patente", "peste", "plebe", "sangre", "serie", "serpiente", "suerte", "tele", "tilde", "torre", "ubre", "variable" );
    this.#terminacionesSingulares.agregar( "l", new Genero( "masculino" ), "cal", "cárcel", "col", "diagonal", "espiral", "hiel", "integral", "miel", "moral", "sal", "señal", "versal" );
    this.#terminacionesSingulares.agregar( "n", new Genero( "masculino" ), "crin", "desazón", "imagen", "razón", "sartén", "sinrazón", "virgen" );
    this.#terminacionesSingulares.agregar( "r", new Genero( "masculino" ), "coliflor", "flor", "mujer", "sor" );
    this.#terminacionesSingulares.agregar( "s", new Genero( "masculino" ), "diabetes", "res", "tos", "venus" );
    this.#terminacionesSingulares.agregar( "á", new Genero( "masculino" ), "mamá" );
    this.#terminacionesSingulares.agregar( "é", new Genero( "masculino" ), "matiné" );
    this.#terminacionesSingulares.agregar( "í", new Genero( "masculino" ) );
    this.#terminacionesSingulares.agregar( "ó", new Genero( "masculino" ), "gogó" );
    this.#terminacionesSingulares.agregar( "ú", new Genero( "masculino" ) );
    this.#terminacionesSingulares.agregar( null, new Genero( "masculino" ), "ram", "red", "sed", "web" ); // Excepciones femeninas
    this.#terminacionesSingulares.agregar( null, new Genero( "femenino" ), "rey", "reloj", "ardid", "hábitat", "robot" ); // Excepciones masculinas
  }

  // Añadimos las terminaciones plurales.
  static {
    this.#terminacionesPlurales.agregar( "umbres", new Genero( "femenino" ) );
    this.#terminacionesPlurales.agregar( "trices", new Genero( "femenino" ) );
    this.#terminacionesPlurales.agregar( "icies", new Genero( "femenino" ) );
    this.#terminacionesPlurales.agregar( "iones", new Genero( "femenino" ), "aviones", "camiones" );
    this.#terminacionesPlurales.agregar( "dades", new Genero( "femenino" ) );
    this.#terminacionesPlurales.agregar( "tades", new Genero( "femenino" ) );
    this.#terminacionesPlurales.agregar( "tudes", new Genero( "femenino" ) );
    this.#terminacionesPlurales.agregar( "ieses", new Genero( "femenino" ) );
    this.#terminacionesPlurales.agregar( "esas", new Genero( "femenino" ) );
    this.#terminacionesPlurales.agregar( "isas", new Genero( "femenino" ) );
    this.#terminacionesPlurales.agregar( "inas", new Genero( "femenino" ) );
    this.#terminacionesPlurales.agregar( "udes", new Genero( "femenino" ), "aludes" );
    this.#terminacionesPlurales.agregar( "eces", new Genero( "femenino" ), "dieces", "haces", "peces" );
    this.#terminacionesPlurales.agregar( "ces", new Genero( "femenino" ), "avestruces", "jueces", "lápices", "tamices" );
    this.#terminacionesPlurales.agregar( "mas", new Genero( "masculino" ), "almas", "amas", "ánimas", "apotemas", "armas", "camas", "formas" );
    this.#terminacionesPlurales.agregar( "les", new Genero( "masculino" ), "cárceles", "coles", "espirales", "integrales", "mieles", "sales", "señales", "variables", "versales" );
    this.#terminacionesPlurales.agregar( "nes", new Genero( "masculino" ), "crines", "razones", "sartenes" );
    this.#terminacionesPlurales.agregar( "res", new Genero( "masculino" ), "flores", "liebres", "madres", "mujeres", "torres" );
    this.#terminacionesPlurales.agregar( "ses", new Genero( "masculino" ), "bases", "clases", "elipses", "frases", "reses", "toses" );
    this.#terminacionesPlurales.agregar( "os", new Genero( "masculino" ), "dinamos", "manos", "radios", "seos" );
    this.#terminacionesPlurales.agregar( "as", new Genero( "femenino" ), "días", "koalas", "mapas", "poetas" );
    this.#terminacionesPlurales.agregar( "es", new Genero( "masculino" ), "claves", "constantes", "fes", "fuentes", "leches", "llaves", "muertes", "naves", "pestes", "redes", "series" );
    this.#terminacionesPlurales.agregar( "ás", new Genero( "masculino" ), "mamás" );
    this.#terminacionesPlurales.agregar( "és", new Genero( "masculino" ) );
    this.#terminacionesPlurales.agregar( "ís", new Genero( "masculino" ) );
    this.#terminacionesPlurales.agregar( "ó", new Genero( "masculino" ) );
    this.#terminacionesPlurales.agregar( "ús", new Genero( "masculino" ) );
  }

  // Constructor
  constructor( genero ) {
    // if ( !genero in this.#generos ) throw new Error( "¡Género gramatical inválido!" );
    this.#ordinal = this.#generos.indexOf( genero );
    this.#genero = genero;
  }

  /**
   * Obtiene el género de la palabra.
   * @param { Palabra } palabra La palabra a verificar.
   * @returns { this } El género obtenido.
   */
  static segunPalabra( palabra ) {
    if ( palabra.estaVacia() ) return new Genero( "neutro" );
    if ( palabra.primeraLetra().esDigito() ) return new Genero( "masculino" );
    if ( palabra.numeroLetras() === 1 ) return new Genero( "femenino" );
    const terminaciones = palabra.numero().esPlural() ? terminacionesPlurales : terminacionesSingulares;
    for ( const terminacion of terminaciones ) {
      if ( terminacion.esExcepcion( palabra ) ) return terminacion.genero.contrario();
      if ( terminacion.de( palabra ) ) return terminacion.genero;
    }
    return new Genero( "masculino" );
  }

  /**
   * Obtiene el género a usar delante de la palabra.
   * @param { Palabra } palabra La palabra a verificar.
   * @returns { this } El género obtenido.
   */
  static antepuestoSegunPalabra( palabra ) {
    const usarMasculinoEnVezFemenino =
      palabra.genero().esFemenino() &&
      palabra.numero().esSingular() &&
      palabra.empiezaPor( "a", "ha", "á", "há" ) &&
      palabras.silabas().primeraSilaba().esTonica();
    if ( usarMasculinoEnVezFemenino ) return new Género( "masculino" );
    else return palabra.genero();
  }

  /**
   * Indica si el género es masculino.
   * @returns { boolean } Si el género es masculino.
   */
  esMasculino() {
    return this.#genero === "masculino";
  }

  /**
   * Indica si el género es femenino.
   * @returns { boolean } Si el género es femenino.
   */
  esFemenino() {
    return this.#genero === "femenino";
  }

  /**
   * Indica si el género es néutro.
   * @returns { boolean } Si el género es néutro.
   */
  esNeutro() {
    return this.#genero === "neutro";
  }

  /**
   * Devuelve el género contrario al actual.
   * @returns { this } El género contrario.
   */
  contrario() {
    if ( this.esMasculino() ) return new Genero( "masculino" );
    if ( this.esFemenino() ) return new Genero( "femenino" );
    return new Genero( "neutro" );
  }

  /**
   * Obtiene el tipo de género en forma de string.
   * @returns { string } El tipo de acento.
   */
  toString() {
    return this.#genero;
  }

  /**
   * Obtiene el ordinal del tipo de género.
   * @returns { int } El ordinal del tipo de género.
   */
  ordinal() {
    return this.#ordinal;
  }
}

module.exports = Genero;
