module.exports = app => {
    const students = require("../controllers/student.controller.js");
  
    var router = require("express").Router();
  
    // Create a new student
    router.post("/create-student", students.create);
   
    // Retrieve all published students
    router.get("/all", students.findAllPublished);
  
    // Retrieve a single student with id
    router.get("/update-student/:id", students.findOne);
  
    // Update a student with id
    router.put("/update-student/:id", students.update);
  
    // Delete a student with id
    router.delete("/delete-student/:id", students.delete);
  
    app.use('/students', router);
  };