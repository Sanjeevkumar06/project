const Students = require("../models/student.model");

// Create and Save a new Student
exports.create = (req, res) => {
    // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Student
  const students = new Students({
    fname : req.body.fname,
    lname : req.body.lname,
    location : req.body.location,
    email : req.body.email,
    dob : req.body.dob,
    education : req.body.education || false
  });

  // Save Students in the database
  Students.create(students, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student."
      });
    else res.send(data);
  });
  
};



exports.findAllPublished = (req, res) => {
  Students.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving student."
      });
    else res.send(data);
    // console.log(data);
  });
  
};

// Find a single Student with a id
exports.findOne = (req, res) => {
  Students.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found student with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving studtent with id " + req.params.id
            });
          }
        } else res.send(data);
      });
  
};


// Update a Students identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Students.updateById(
    req.params.id,
    new Students(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found student with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating student with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
  
};

// Delete a Students with the specified id in the request
exports.delete = (req, res) => {
  Students.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found student with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete student with id " + req.params.id
            });
          }
        } else res.send({ message: `student was deleted successfully!` });
      });
  
};