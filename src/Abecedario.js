/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Importaciones
const Enum = require( "./misc/Enum.js" );

/**
 * ENUM de frecuencias del abecedario
 * <a href="http://es.wikipedia.org/wiki/Ortograf%C3%ADa_del_espa%C3%B1ol">Ortografía del español</a>
 */
class Abecedario extends Enum {

  /**
   * Constructores de ENUM.
   */
  static a = new Abecedario( "a", 0 );  static b = new Abecedario( "b", 1 );  static c = new Abecedario( "c", 2 );
  static d = new Abecedario( "d", 3 );  static e = new Abecedario( "e", 4 );  static f = new Abecedario( "f", 5 );
  static g = new Abecedario( "g", 6 );  static h = new Abecedario( "h", 7 );  static i = new Abecedario( "i", 8 );
  static j = new Abecedario( "j", 9 );  static k = new Abecedario( "k", 10 ); static l = new Abecedario( "l", 11 );
  static m = new Abecedario( "m", 12 ); static n = new Abecedario( "n", 13 ); static ñ = new Abecedario( "ñ", 14 );
  static o = new Abecedario( "o", 15 ); static p = new Abecedario( "p", 16 ); static q = new Abecedario( "q", 17 );
  static r = new Abecedario( "n", 18 ); static s = new Abecedario( "s", 19 ); static t = new Abecedario( "t", 20 );
  static u = new Abecedario( "u", 21 ); static v = new Abecedario( "v", 22 ); static w = new Abecedario( "w", 23 );
  static x = new Abecedario( "x", 24 ); static y = new Abecedario( "y", 25 ); static z = new Abecedario( "z", 26 );

  /**
   * Frecuencias de uso del abecedario.
   * <a href="http://es.wikipedia.org/wiki/Ortograf%C3%ADa_del_espa%C3%B1ol">Ortografía del español</a>
   */
  static frecuencias = [
    11.96, 0.92,  2.92, // abc
    6.87,  16.78, 0.52, // def
    0.73,  0.89,  4.15, // ghi
    0.30,  0.01,  8.37, // jkl
    2.12,  7.01,  0.29, // mnñ
    8.69,  2.77,  1.53, // opq
    4.94,  7.88,  3.31, // rst
    4.80,  0.39,  0.01, // uvw
    0.06,  1.54,  0.15  // xyz
  ];

  /**
   * Inicializa un objeto <Abecedario> que emula un ENUM.
   * @param { string } value La letra interna de la clase.
   * @param { int } ordinal El número posicional de la letra.
   * @returns { Abecedario }
   */
  constructor( value, ordinal ) {
    super( value, ordinal );
  }

  /**
   * Devuelve la frecuencia de uso de la letra creada.
   * @returns { double } La frecuencia de la letra verificada.
   */
  frecuenciaUso() {
    return Abecedario.frecuencias[ this.ordinal ];
  }
}

module.exports = Abecedario;
