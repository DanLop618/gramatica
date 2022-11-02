/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Importaciones.
const Enum          = require( "./misc/Enum.js" );
const Palabra       = require( "./Palabra.js" );
const Terminacion   = require( "./misc/Terminacion.js" );
const Terminaciones = require( "./misc/Terminaciones.js" );
const ParamError    = require( "./misc/ParamError.js" );

class Genero extends Enum {

  /**
   * Constructores de géneros gramaticales.
   */
  static neutro    = new Genero( "neutro", 0 );
  static masculino = new Genero( "masculino", 1 );
  static femenino  = new Genero( "femenino", 2 );

  /**
   * Tipos de géneros gramaticales.
   */
  static terminacionesSingulares = new Terminaciones();
  static terminacionesPlurales = new Terminaciones();

  // Añadimos las terminaciones singulares.
  static {
    this.terminacionesSingulares.agregar( "umbre", Genero.femenino );
    this.terminacionesSingulares.agregar( "triz", Genero.femenino );
    this.terminacionesSingulares.agregar( "icie", Genero.femenino );
    this.terminacionesSingulares.agregar( "esa", Genero.femenino );
    this.terminacionesSingulares.agregar( "isa", Genero.femenino );
    this.terminacionesSingulares.agregar( "ína", Genero.femenino );
    this.terminacionesSingulares.agregar( "ión", Genero.femenino, "anfitrión", "aluvión", "avión", "camión", "centurión", "embrión", "gorrión", "guión" );
    this.terminacionesSingulares.agregar( "dad", Genero.femenino, "abad" );
    this.terminacionesSingulares.agregar( "tad", Genero.femenino );
    this.terminacionesSingulares.agregar( "tud", Genero.femenino );
    this.terminacionesSingulares.agregar( "ies", Genero.femenino );
    this.terminacionesSingulares.agregar( "ud", Genero.femenino, "alud" );
    this.terminacionesSingulares.agregar( "ez", Genero.femenino, "ajedrez", "juez", "pez", "diez" );
    this.terminacionesSingulares.agregar( "is", Genero.femenino, "análisis", "chasis", "cutis", "dieciséis", "frontis", "iris", "parchís", "paréntesis", "pubis", "seis", "tenis" );
    this.terminacionesSingulares.agregar( "ma", Genero.masculino, "alma", "ama", "ánima", "apotema", "arma", "cama", "forma" );
    this.terminacionesSingulares.agregar( "o", Genero.masculino, "dinamo", "mano", "radio", "seo" );
    this.terminacionesSingulares.agregar( "a", Genero.femenino, "capicúa", "día", "futbolista", "koala", "mapa", "poeta" );
    this.terminacionesSingulares.agregar( "z", Genero.femenino, "haz", "lápiz", "tamiz", "avestruz", "regaliz", "maíz" );
    this.terminacionesSingulares.agregar( "e", Genero.masculino, "base", "clase", "clave", "constante", "corriente", "debacle", "elipse", "espiral", "falange", "fase", "fe", "fiebre", "frase", "frente", "fuente", "gente", "hélice", "higiene", "ingle", "leche", "lente", "liebre", "llave", "madre", "masacre", "muerte", "nave", "nieve", "noche", "nube", "patente", "peste", "plebe", "sangre", "serie", "serpiente", "suerte", "tele", "tilde", "torre", "ubre", "variable" );
    this.terminacionesSingulares.agregar( "l", Genero.masculino, "cal", "cárcel", "col", "diagonal", "espiral", "hiel", "integral", "miel", "moral", "sal", "señal", "versal" );
    this.terminacionesSingulares.agregar( "n", Genero.masculino, "crin", "desazón", "imagen", "razón", "sartén", "sinrazón", "virgen" );
    this.terminacionesSingulares.agregar( "r", Genero.masculino, "coliflor", "flor", "mujer", "sor" );
    this.terminacionesSingulares.agregar( "s", Genero.masculino, "diabetes", "res", "tos", "venus" );
    this.terminacionesSingulares.agregar( "á", Genero.masculino, "mamá" );
    this.terminacionesSingulares.agregar( "é", Genero.masculino, "matiné" );
    this.terminacionesSingulares.agregar( "í", Genero.masculino );
    this.terminacionesSingulares.agregar( "ó", Genero.masculino, "gogó" );
    this.terminacionesSingulares.agregar( "ú", Genero.masculino );
    this.terminacionesSingulares.agregar( null, Genero.masculino, "ram", "red", "sed", "web" ); // Excepciones femeninas
    this.terminacionesSingulares.agregar( null, Genero.femenino, "rey", "reloj", "ardid", "hábitat", "robot" ); // Excepciones masculinas
  }

  // Añadimos las terminaciones plurales.
  static {
    this.terminacionesPlurales.agregar( "umbres", Genero.femenino );
    this.terminacionesPlurales.agregar( "trices", Genero.femenino );
    this.terminacionesPlurales.agregar( "icies", Genero.femenino );
    this.terminacionesPlurales.agregar( "iones", Genero.femenino, "aviones", "camiones" );
    this.terminacionesPlurales.agregar( "dades", Genero.femenino );
    this.terminacionesPlurales.agregar( "tades", Genero.femenino );
    this.terminacionesPlurales.agregar( "tudes", Genero.femenino );
    this.terminacionesPlurales.agregar( "ieses", Genero.femenino );
    this.terminacionesPlurales.agregar( "esas", Genero.femenino );
    this.terminacionesPlurales.agregar( "isas", Genero.femenino );
    this.terminacionesPlurales.agregar( "inas", Genero.femenino );
    this.terminacionesPlurales.agregar( "udes", Genero.femenino, "aludes" );
    this.terminacionesPlurales.agregar( "eces", Genero.femenino, "dieces", "haces", "peces" );
    this.terminacionesPlurales.agregar( "ces", Genero.femenino, "avestruces", "jueces", "lápices", "tamices" );
    this.terminacionesPlurales.agregar( "mas", Genero.masculino, "almas", "amas", "ánimas", "apotemas", "armas", "camas", "formas" );
    this.terminacionesPlurales.agregar( "les", Genero.masculino, "cárceles", "coles", "espirales", "integrales", "mieles", "sales", "señales", "variables", "versales" );
    this.terminacionesPlurales.agregar( "nes", Genero.masculino, "crines", "razones", "sartenes" );
    this.terminacionesPlurales.agregar( "res", Genero.masculino, "flores", "liebres", "madres", "mujeres", "torres" );
    this.terminacionesPlurales.agregar( "ses", Genero.masculino, "bases", "clases", "elipses", "frases", "reses", "toses" );
    this.terminacionesPlurales.agregar( "os", Genero.masculino, "dinamos", "manos", "radios", "seos" );
    this.terminacionesPlurales.agregar( "as", Genero.femenino, "días", "koalas", "mapas", "poetas" );
    this.terminacionesPlurales.agregar( "es", Genero.masculino, "claves", "constantes", "fes", "fuentes", "leches", "llaves", "muertes", "naves", "pestes", "redes", "series" );
    this.terminacionesPlurales.agregar( "ás", Genero.masculino, "mamás" );
    this.terminacionesPlurales.agregar( "és", Genero.masculino );
    this.terminacionesPlurales.agregar( "ís", Genero.masculino );
    this.terminacionesPlurales.agregar( "ó", Genero.masculino );
    this.terminacionesPlurales.agregar( "ús", Genero.masculino );
  }

  /**
   * Inicializa un objeto <Genero> que emula un ENUM.
   * @param { string } value El género interno de la clase.
   * @param { int } ordinal El número posicional del género.
   * @returns { Genero }
   */
  constructor( value, ordinal ) {
    super( value, ordinal );
  }

  /**
   * Obtiene el género de la palabra.
   * @param { Palabra } palabra La palabra a verificar.
   * @returns { this } El género obtenido.
   * @throws { ParamError }
   */
  static segunPalabra( palabra ) {
    if ( !( palabra instanceof Palabra ) ) throw new ParamError( "Palabra" );
    if ( palabra.estaVacia() ) return Genero.neutro;
    if ( palabra.primeraLetra().esDigito() ) return Genero.masculino;
    if ( palabra.numeroLetras() === 1 ) return Genero.femenino;
    const terminaciones = palabra.numero().esPlural() ? Genero.terminacionesPlurales : Genero.terminacionesSingulares;
    for ( const terminacion of terminaciones ) {
      if ( terminacion.esExcepcion( palabra ) ) return terminacion.genero.contrario();
      if ( terminacion.de( palabra ) ) return terminacion.genero;
    }
    return Genero.masculino;
  }

  /**
   * Obtiene el género a usar delante de la palabra.
   * @param { Palabra } palabra La palabra a verificar.
   * @returns { this } El género obtenido.
   * @throws { ParamError }
   */
  static antepuestoSegunPalabra( palabra ) {
    if ( !( palabra instanceof Palabra ) ) throw new ParamError( "Palabra" );
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
    return this.value === "masculino";
  }

  /**
   * Indica si el género es femenino.
   * @returns { boolean } Si el género es femenino.
   */
  esFemenino() {
    return this.value === "femenino";
  }

  /**
   * Indica si el género es néutro.
   * @returns { boolean } Si el género es néutro.
   */
  esNeutro() {
    return this.value === "neutro";
  }

  /**
   * Devuelve el género contrario al actual.
   * @returns { this } El género contrario.
   */
  contrario() {
    if ( this.esMasculino() ) return Genero.femenino;
    if ( this.esFemenino() ) return Genero.masculino;
    return Genero.neutro;
  }
}

module.exports = Genero;
