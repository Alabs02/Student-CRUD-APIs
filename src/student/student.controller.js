const pool = require('@root/database');

// QUERIES
const studentQueries = require('./student.queries');

const handleError = (res, code, error) => {
  res.status(422).json({
    status: 'failed',
    code: code,
    message: error
  });
  return;
}

const getAllStudents = (req, res) => {
  pool.query(studentQueries.GET_ALL_STUDENTS, (error, results) => {
    if (error) throw error;

    res.status(200).json(results.rows);
  });
}

const getStudentByID = (req, res) => {
  const studentID = parseInt(req.params.studentID, 10);

  pool.query(studentQueries.GET_STUDENT_BY_ID, [studentID], (error, results) => {
    if (error) throw error;

    res.status(200).json(results.rows);
  });
}

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  pool.query(studentQueries.CHECK_EMAIL_EXISTS, [email], (error, results) => {
    if (error) throw error;

    if (results.rows?.length) {
      res.send({
        code: 200,
        message: "Email already exists!"
      });
    }

    pool.query(studentQueries.ADD_STUDENT, [name, email, age, dob], (error) => {
      if (error) throw error;

      res.status(201).send({
        code: 201,
        message: "Student Created Successfully!"
      });
    });
  });
};

const updateStudentByID = (req, res) => {
  const studentID = parseInt(req.params.studentID, 10);

  const { name, age } = req.body;

  pool.query(studentQueries.GET_STUDENT_BY_ID, [studentID], (error, results) => {
    const hasNoStudent = !results?.rows.length;

    if (error) handleError(res, 422, error);

    if (hasNoStudent) handleError(res, 404, "Student does not exists!");

    if (!hasNoStudent) {
      pool.query(studentQueries.UPDATE_STUDENT, [studentID, name, age], (error) => {
        if (error) handleError(res, 422, error);

        res.status(200).send({
          code: 200,
          status: 'Success',
          message: "Student Updated Successfully!"
        });
      });
    }
  });
};

const removeStudentByID = async (req, res) => {
  var studentID = parseInt(req.params.studentID, 10);

  pool.query(studentQueries.GET_STUDENT_BY_ID, [studentID], (error, results) => {
    const hasNoStudent = !results?.rows.length;

    if (error) handleError(res, 422, error);

    if (hasNoStudent) handleError(res, 404, "Student does not exists!");

    if (!hasNoStudent) {
      pool.query(studentQueries.REMOVE_STUDENT, [studentID], (error) => {
        if (error) handleError(res, 422, error);

        res.status(200).json({
          code: 200,
          status: 'Success',
          message: "Student Removed Successfully!"
        });
      });
    }
  });
}

module.exports = {
  getAllStudents,
  getStudentByID,

  addStudent,
  removeStudentByID,
  updateStudentByID
};