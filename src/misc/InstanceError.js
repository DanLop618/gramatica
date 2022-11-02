class InstanceError extends Error {
  constructor( types, type, classType = null ) {
    const message ="Imposible instanciar el objeto:"
    if ( classType ) super( `${ message } Se esperaba un tipo de dato <${ classType }>` )
    else super( `${ message } '${ type }' no coincide con: ${ types.join() }` );
    this.name = "InstanceError";
  }
}

module.exports = InstanceError;
