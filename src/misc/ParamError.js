class ParamError extends Error {
  constructor( type ) {
    super( `Se esperaba un tipo de dato <${ type }>` );
    this.name = "ParamError";
    this.type = type;
  }
}

module.exports = ParamError;
