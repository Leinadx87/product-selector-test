export class BGADP {
  configuracion = {};

  constructor(configuracion) {
    this.configuracion = configuracion;
  }

  async generateRequest() {
    const respuesta = await fetch(this.configuracion);
    //console.log('esta es la respuesta desde Bgadp ', respuesta)
    return await respuesta.json();
  }
}
