class Definicion {

  // Atributos privados.
  #_definicion;
  #_tipo;

  /**
   * Inicializa una nueva definición de una palabra.
   * @param { string } tipo El tipo de definición.
   * @param { string } definicion La definición.
   */
  constructor( tipo, definicion ) {
    this.#_definicion = definicion;
    this.#_tipo = tipo;
  }

  /**
   * Obtiene el tipo de la definición.
   * @returns { string }
   */
  get tipo () {
    return this.#_tipo;
  }

  /**
   * Obtiene la definición en sí.
   * @returns { string }
   */
  get definicion () {
    return this.#_definicion;
  }
}

module.exports = Definicion;
