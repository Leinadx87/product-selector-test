import { BGADP } from './Bgadp';

export class DataManager {
  constructor(configuracion) {
    this.configuracion = configuracion;
  }

  async obtenerCuentas() {
    const instanciaDataManager = new BGADP(this.configuracion);

    const resultado = await instanciaDataManager.generateRequest();
    let nuevoArreglo = [];
    let productos = [];
    console.log('res ', resultado);

    resultado.data.contracts.map((contract) => {
      productos.push({
        alias: contract.alias,
        balance: contract.detail.specificAmounts[0].amounts[0].amount,
        id: contract.id,
        printedNumber: contract.number,
      });
    });

    nuevoArreglo.push({
      currency: 'MXN',
      products: productos,
    });
    console.log('res 2 ', nuevoArreglo);

    return nuevoArreglo;
  }
}
