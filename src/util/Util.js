const Definicion = require( "../models/Definicion.js" );
const Cabecera = require( "../models/Cabecera.js" );
const Genero = require( "../Genero.js" );

class Util {

  /**
   * Obtiene las cabeceras de la palabra obtenida en un objeto JSON.
   * @param { object } json El objeto a validar.
   * @returns { Cabecera[] } Una colección de cabeceras.
   */
  static async obtenerCabeceras( json ) {
    const HttpInterface = require( "../interfaces/HttpInterface.js" );
    const cabeceras = [];
    for ( const res of json.res ) {
      const original = res.header;
      if ( res.header.search( ',' ) > 0 ) res.header = res.header.slice( 0, res.header.search( ',' ) );
      const cabecera = new Cabecera( res );
      const definiciones = await HttpInterface.request( `fetch?id=${ cabecera.id }` );
      for ( const definicion of definiciones ) cabecera.agregarDefinicion( definicion );
      cabeceras.push( cabecera );
      if ( original === res.header ) continue;
      const cambio = original.slice( original.search( ',' ) + 2, original.length );
      res.header = res.header.slice( 0, res.header.length - cambio.length ) + cambio;
      const antigenero = new Cabecera( res );
      for ( const definicion of definiciones ) antigenero.agregarDefinicion( definicion );
      cabeceras.push( antigenero );
    }
    return cabeceras;
  }

  /**
   * Obtiene las definiciones de una metadata HTML.
   * @param { string } metadata La metadata HTML a verificar.
   * @returns { Definicion[] } Una colección de definiciones.
   */
  static obtenerDefiniciones( metadata ) {
    const definiciones = [];
    const contenedores = [ ...metadata.matchAll( /<p class="j\d?"[^>]*>(.+?)(?=<\/p>)/g ) ];
    for ( const contenedor of contenedores ) {
      const detalles = contenedor[ 0 ].match( /<abbr[^>]*>(.+?)(?=<\/abbr>)/ );
      const tipo = detalles[ 0 ].match( /title="(.+)">/ )[ 1 ]
        .replace( /&#xE1;/g, 'á' )
        .replace( /&#228;/g, 'ä' )
        .replace( /&#xE9;/g, 'é' )
        .replace( /&#235;/g, 'ë' )
        .replace( /&#xED;/g, 'í' )
        .replace( /&#239;/g, 'ï' )
        .replace( /&#xF3;/g, 'ó' )
        .replace( /&#246;/g, 'ö' )
        .replace( /&#xFA;/g, 'ú' )
        .replace( /&#252;/g, 'ü' )
        .replace( /&#255;/g, 'ÿ' )
        .replace( /&#xF1;/g, 'ñ' );

      const definicion = contenedor[ 1 ].replace( /<abbr[^>]+>.+?<\/abbr>/, '' )
        .replace( /<span class="h">.+<\/span>/g, '' )
        .replace( /<span class="n_acep">\S+ <\/span>/g, '' )
        .replace( /&#xE1;/g, 'á' )
        .replace( /&#228;/g, 'ä' )
        .replace( /&#xE9;/g, 'é' )
        .replace( /&#235;/g, 'ë' )
        .replace( /&#xED;/g, 'í' )
        .replace( /&#239;/g, 'ï' )
        .replace( /&#xF3;/g, 'ó' )
        .replace( /&#246;/g, 'ö' )
        .replace( /&#xFA;/g, 'ú' )
        .replace( /&#252;/g, 'ü' )
        .replace( /&#255;/g, 'ÿ' )
        .replace( /&#xF1;/g, 'ñ' )
        .replace( /&#x2016;/g, '||' )
        .replace( 'sing.', 'singular' )
        .replace( 'pl.', 'plural' )
        .replace( 't.', 'también' )
        .replace( 'p.', 'poco' )
        .trim();

      definiciones.push( new Definicion( tipo, definicion ) );
    }
    return definiciones;
  }
}

module.exports = Util;
