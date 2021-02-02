// Na svaki http zahtev serveru ovo se pozove i req mozemo dodeliti promenljivu (hello je ime promenljive koja je u req smestena)
const logger = (req, res, next) => {
  req.hello = 'Hello World';
  console.log('Middleware run');
  next();
};

module.exports = logger;
