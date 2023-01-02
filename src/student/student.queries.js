const GET_ALL_STUDENTS = "SELECT * FROM students";
const GET_STUDENT_BY_ID = "SELECT * FROM students WHERE id = $1";
const CHECK_EMAIL_EXISTS = "SELECT email FROM students WHERE email = $1";
const ADD_STUDENT = "INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4)";
const REMOVE_STUDENT = "DELETE FROM students WHERE id = $1";
const UPDATE_STUDENT = "UPDATE students SET name = $2, age = $3 WHERE id = $1";

module.exports = {
  GET_ALL_STUDENTS,
  GET_STUDENT_BY_ID,
  CHECK_EMAIL_EXISTS,
  ADD_STUDENT,
  UPDATE_STUDENT,
  REMOVE_STUDENT
};