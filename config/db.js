const mongoose = require('mongoose');

const konekcija = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Povezan na hostu: ${conn.connection.host}`);
};

module.exports = konekcija;
