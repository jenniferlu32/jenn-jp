const express = require('express');
const router = express.Router();
const { models: { Campus, Student } } = require('./db');

router.get('/students', async(req, res, next) => {
  try {
    const students = await Student.findAll({
      include: [ { model: Campus } ]
    });
    res.send(students);
  } catch(err) {
    next(err);
  };
});

router.post('/students', async(req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).send(student);
  } catch(err) {
    next(err);
  };
});

router.get('/students/:id', async(req, res, next) => {
  try {
    const student = await Student.findOne({
      where: {
        id: req.params.id
      },
      include: [ { model: Campus } ]
    });
    res.send(student);
  } catch(err) {
    next(err);
  };
});

router.delete('/students/:id', async(req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id)
    await student.destroy()
    res.sendStatus(200);
  } catch(err) {
    next(err);
  };
});

router.put('/students/:id', async(req, res, next) => {
  try {
    const student = await Student.findOne({
      where: {
        id: req.params.id
      },
      include: [{ model: Campus }]
    });
    await student.update(req.body);
    res.status(200).send(student);
  } catch(err) {
    next(err);
  };
});

router.put('/students/unregister/:id', async(req, res, next) => {
  try {
    const student = await Student.findOne({
      where: {
        id: req.params.id
      },
      include: [{ model: Campus }]
    });
    await student.update({
      campusId: null,
      campus: []
    });
    res.status(200).send(student);
  } catch(err) {
    next(err);
  };
});

router.get('/campuses', async(req, res, next) => {
  try {
    const campuses = await Campus.findAll({
      include: [{ model: Student }],
    });
    res.status(201).send(campuses);
  } catch(err) {
    next(err);
  };
});

router.post('/campuses', async(req, res, next) => {
  try {
    const campus = await Campus.create(req.body);
    res.status(201).send(campus);
  } catch(err) {
    next(err);
  };
});

router.get('/campuses/:id', async(req, res, next) => {
  try {
    const campus = await Campus.findOne({
      where: {
        id: req.params.id
      },
      include: [ { model: Student } ]
    });
    res.send(campus);
  } catch(err) {
    next(err);
  };
});

router.delete('/campuses/:id', async(req, res, next) => {
  try {
    await Campus.destroy({
      where: {
        id: req.params.id
      }
    });
    res.sendStatus(204);
  } catch(err) {
    next(err);
  };
});

router.put('/campuses/:id', async(req, res, next) => {
  try {
    //find Campus
    let campus = await Campus.findOne({
      where: {
        id: req.params.id
      },
      include: [ { model: Student } ]
    });
    //update campus
    await campus.update(req.body)
    //get campus again
    campus = await Campus.findByPk(req.params.id)
    
    res.status(200).send(campus);
  } catch(err) {
    next(err);
  };
});

module.exports = router;
