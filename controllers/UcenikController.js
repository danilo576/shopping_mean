const router = require('express').Router();
const Ucenik = require('../models/Ucenik');

router.get('/', (req, res) => {
  Ucenik.find()
    .then((ucenici) => res.json(ucenici))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.get('/ucenik/:id', (req, res) => {
  Ucenik.findById(req.params.id)
    .then((ucenik) => res.json(ucenik))
    .catch((err) => resizeTo.status(400).json('Error: ' + err));
});

router.get('/:god/:odelj', (req, res) => {
  Ucenik.find({ Razred: req.params.god, Odeljenje: req.params.odelj })
    .then((ucenik) => res.json(ucenik))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/dodajUcenika', (req, res) => {
  const Ime = req.body.ime;
  const Prezime = req.body.prezime;
  const Jmbg = req.body.jmbg;
  const DatumRodjenja = req.body.datumrodjenja;
  const Adresa = req.body.adresa;
  const Email = req.body.email;
  const Razred = req.body.razred;
  const Odeljenje = req.body.odeljenje;
  const Vladanje = req.body.vladanje;
  const Napomene = req.body.napomene;
  const Dogadjaji = req.body.dogadjaji;
  const Raspored = req.body.raspored;
  const Izostanci = req.body.izostanci;
  const Predmeti = req.body.predmeti;
  const Post = req.body.post;
  const Pol = req.body.pol;
  const noviUcenik = new Ucenik({
    Ime,
    Prezime,
    Jmbg,
    DatumRodjenja,
    Adresa,
    Email,
    Razred,
    Odeljenje,
    Vladanje,
    Napomene,
    Dogadjaji,
    Raspored,
    Izostanci,
    Predmeti,
    Post,
    Pol,
  });
  noviUcenik
    .save()
    .then(() => res.json('Dodali smo ucenika u bazu!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/update/:id', (req, res) => {
  Ucenik.findByIdAndUpdate(
    req.params.id,
    { Ime: req.body.ime },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.post('/test', (req, res) => {
  Ucenik.update(
    { _id: req.body.id_ucenika, 'Predmeti.Naziv': req.body.imePredmeta },
    { $push: { 'Predmeti.$.Ocene': req.body.ocena } },
    (err, result) => {
      if (err) {
        res.json('error');
      } else {
        res.json(result);
      }
    }
  );
});

router.post('/dodajZakljucnu', (req, res) => {
  Ucenik.update(
    { _id: req.body.id_ucenika, 'Predmeti.Naziv': req.body.imePredmeta },
    { $push: { 'Predmeti.$.ZakljucnaOcena': req.body.ocena } },
    (err, result) => {
      if (err) {
        res.json('error');
      } else {
        res.json(result);
      }
    }
  );
});
router.post('/dodajIzostanak', (req, res) => {
  Ucenik.findByIdAndUpdate(
    req.body.id_deteta,
    { $push: { Izostanci: req.body.izostanak } },
    (err, result) => {
      if (err) {
        res.json('error');
      } else {
        res.json(result);
      }
    }
  );
});
router.post('/updateIzostanak', (req, res) => {
  Ucenik.update(
    { _id: req.body._id, 'Izostanci._id': req.body.izostanakId },
    {
      'Izostanci.$.Tip': req.body.tip,
    },
    (err, result) => {
      if (err) {
        console.log('LOSE POSLAt');
        console.log(err);
      } else {
        console.log('LEPO POSLAt');
        console.log(result);
      }
    }
  );
});

module.exports = router;
