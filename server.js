const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Inicijalni Middleware
app.use(express.json());

// Definisanje ruta
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Shopping', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// Povezivanje na bazu
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
