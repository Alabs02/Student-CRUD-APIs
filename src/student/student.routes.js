const { Router } = require('express');

// CONTROLLERS
const studentConstroller = require('./student.controller');

const router = Router();

// GET ROUTES
router.get('/', studentConstroller.getAllStudents);
router.get('/:studentID', studentConstroller.getStudentByID);

// POST ROUTES
router.post('/', studentConstroller.addStudent);
router.put('/:studentID', studentConstroller.updateStudentByID);

// DELETE ROUTES
router.delete('/:studentID', studentConstroller.removeStudentByID);



module.exports = router;