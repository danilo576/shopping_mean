class Greska extends Error {
  constructor(poruka, statusniKod) {
    //u roditeljskoj klasi ovom stringu 'poruka' pristupamo sa .message
    super(poruka);
    this.statusniKod = statusniKod;
  }
}

module.exports = Greska;
