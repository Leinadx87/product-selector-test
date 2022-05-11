export class GftFinancialOverviewV0 {
    constructor(config) {
      this.host = config.host;
      // https://mock-senda-node.herokuapp.com/financial-overview/v0/financial-overview?contracts.productType=ACCOUNTS
      // https://bbva.mx/financial-overview/v0/financial-overview?contracts.productType=ACCOUNTS
    }
    getUrl() {
      return `/financial-overview/v0/financial-overview`;
    }
    constructUrl(params) {
      return `${this.host}${this.getUrl()}${params}`;
    }
    generateRequest(params) {
      return fetch(this.constructUrl(params)).then(this.onSuccess).catch(this.onError);
    }
    onError(error) {
      return `Sucedió un error: ${error}`;
    }
    async onSuccess(response) {
      return await response.json();
    }
  }
  /* const dataProvider = new GftFinancialOverviewV0({host: 'https://mock-senda-node.herokuapp.com'});
  dataProvider.generateRequest('?contracts.productType=ACCOUNTS').then(resultado => {
    console.log(resultado)
  }); */