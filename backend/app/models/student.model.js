const sql = require("./db");

// constructor
const Students = function(student) {
  this.fname = student.fname;
  this.lname = student.lname;
  this.location = student.location;
  this.email = student.email;
  this.dob = student.dob;
  this.education = student.education;
};

Students.create = (newStudents, result) => {
  sql.query("INSERT INTO crud SET ?", newStudents, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("created Students: ", { id: res.insertId, ...newStudents });
    result(null, { id: res.insertId, ...newStudents });
  });
};

Students.findById = (id, result) => {
  sql.query(`SELECT * FROM crud WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Students: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Student with the id
    result({ kind: "not_found" }, null);
  });
};



Students.getAllPublished = result => {
  sql.query("SELECT * FROM `crud`", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Students: ", res);
    result(null, res);
  });
};

Students.updateById = (id, Student, result) => {
  sql.query(
    "UPDATE crud SET fname = ?, lname = ?, location = ?, email = ?, dob = ?, education = ? WHERE id = ?",
    [Student.fname, Student.lname, Student.location, Student.email, Student.dob, Student.education, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found student with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Student: ", { id: id, ...Student });
      result(null, { id: id, ...Student });
    }
  );
};

Students.remove = (id, result) => {
  sql.query("DELETE FROM crud WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found student with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

module.exports = Students;