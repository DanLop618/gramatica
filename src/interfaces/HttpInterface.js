const { IncomingMessage } = require( "http" );
const { URL, KEY } = require( "../util/Constants.js" );
const Util = require( "../util/Util.js" );
const https = require( "https" );

class HttpInterface {

  // Agente HTTP
  static agent = new https.Agent({
    ALPNProtocols: [ "http/1.1" ],
    minVersion:    "TLSv1.3",
    maxVersion:    "TLSv1.3"
  });

  // Headers de request.
  static headers = {
    "User-Agent":    "Diccionario/2 CFNetwork/808.2.16 Darwin/16.3.0",
    "Content-Type":  "application/x-www-form-urlencoded",
    "Authorization": KEY
  };

  /**
   * Realiza un requests GET al API de la RAE.
   * @param { string } endpoint El endpoint del URL.
   * @returns { Promise<IncomingMessage> } La respuesta HTTP.
   * @throws { RequestError } Si el endpoint es inválido.
   */
  static async request( endpoint ) {
    const url = URL + endpoint;
    return new Promise(( resolve, reject ) => {
      https.get(url, { headers: HttpInterface.headers, agent: HttpInterface.agent }, ( res ) => {
        if( res.statusCode != 200 ) return reject( "Llamada no disponible en este momento." );
        const chunks = [];
        res.on("data", ( chunk ) => {
          let data = chunk.toString().replace( /\n|\t/g , '' );
          if ( data.search( /json\(/ ) != -1 ) data = data.slice( 5, -1 );
          if ( data.search( /jsonp123\(/ ) != -1 ) data = data.slice( 9, -1 );
          chunks.push( data );
        });
        res.once("end", async () => {
          const metadata = chunks.join( '' ).replace( /<sup>\d*<\\\/sup>/g, '' );
          if ( !metadata.startsWith( '{' ) && !metadata.startsWith( '[' ) ) return resolve( Util.obtenerDefiniciones( metadata ) );
          const response = JSON.parse( metadata );
          if ( !( response instanceof Array ) ) return resolve( Util.obtenerCabeceras( response ) );
          const coincidencias = [];
          for ( const coincidencia of response ) {
            const res = await HttpInterface.request( `search?w=${ coincidencia }&m=30` );
            coincidencias.push( res );
          }
          return resolve( coincidencias );
        });
      });
    });
  }
}

module.exports = HttpInterface;
