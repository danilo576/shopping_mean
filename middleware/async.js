//Koristimo ovo da ne bismo morali try/catch strukturu da ponavljamo u nasem kontroleru
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
