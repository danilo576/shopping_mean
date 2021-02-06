const router = require('express').Router();
const Profesor = require('../models/Profesor');
const Ucenik = require('../models/Ucenik');

router.post('/dodajProfesora', (req, res) => {
  const ime = req.body.ime;
  const prezime = req.body.prezime;
  const email = req.body.email;
  const predmet = req.body.predmet;
  const razredni = req.body.razredni;
  const odeljenja = req.body.odeljenja;
  const zahtevi = req.body.zahtevi;
  const pol = req.body.pol;
  let prof = new Profesor({
    ime,
    prezime,
    email,
    predmet,
    razredni,
    odeljenja,
    zahtevi,
    pol,
  });
  console.log(req);
  prof
    .save()
    .then(() => res.json(prof))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.get('/vratiProfesore', (req, res) => {
  Profesor.find()
    .then((profesori) => res.send(profesori))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.delete('/brisiProfesora/:id', (req, res) => {
  Profesor.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json('Uspesno sam obrisao profesora sa prosledjenim id-om!');
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/login', (req, res) => {
  Profesor.find(req.body)
    .then((profa) => res.send(profa[0]))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/vratiProfesora', (req, res) => {
  Profesor.find({ email: req.body.email }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result[0]);
    }
  });
});
router.post('/dodajDogadjaj', (req, res) => {
  Ucenik.updateMany(
    { Razred: req.body.razred, Odeljenje: req.body.odeljenje },
    { $push: { Post: [req.body.obavestenje] } },
    (err, result) => {
      if (err) {
        res.json('error');
      } else {
        res.json(result);
      }
    }
  );
});
router.post('/zakaziRoditeljski', (req, res) => {
  Ucenik.updateMany(
    { Razred: req.body.razred1, Odeljenje: req.body.odeljenje1 },
    { $push: { Dogadjaji: [req.body.dogadjaj] } },
    (err, result) => {
      if (err) {
        res.json('error');
      } else {
        res.json(result);
      }
    }
  );
});
router.get('/Profesor/:_id', (req, res) => {
  Profesor.findById(req.params._id)
    .then((prof) => res.send(prof))
    .catch((err) => console.log(err));
});
router.post('/primiZahtev', (req, res) => {
  Profesor.findByIdAndUpdate(
    req.body.id_profe,
    { $push: { zahtevi: [req.body.zahtev] } },
    (err, result) => {
      if (err) {
        res.json('error');
      } else {
        res.json(result);
      }
    }
  );
});
router.post('/odlukaOpravdanja', (req, res) => {
  Ucenik.update(
    { _id: req.body.iducenika, 'Izostanci.Datum': req.body.datum },
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

router.post('/brisemIzostanak', (req, res) => {
  console.log(req.body);
  Profesor.update(
    { _id: req.body.idprofesora },
    { $pull: { zahtevi: { _id: req.body.idcelogzahteva } } },
    { safe: true },
    function (err, obj) {
      if (err) {
        res.json('errrrrrrrrrrrrrrrr');
      } else {
        res.json('Uspeo sam');
      }
    }
  );
});

module.exports = router;
