const mongoose = require('mongoose');

const konekcija = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(
    `MongoDB povezan na bazu --->"${conn.connection.name}", otvori MongoDBCompass`
      .yellow.inverse
  );
};

module.exports = konekcija;
