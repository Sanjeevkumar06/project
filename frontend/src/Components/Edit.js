// EditStudent Component for update student data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// EditStudent Component
const Edit = (props) => {
  const params = useParams()
const [formValues, setFormValues] = useState({
  fname : '',lname : '', location : '', email : '', dob : '', education : ''
});

const handleInput=(e)=>{
  setFormValues((data) => ({ ...data, [e.target.name]: e.target.value }));
}
//onSubmit handler
const onSubmit = (e) => {
  e.preventDefault();
	axios
	.put(
		"http://localhost:4000/students/update-student/" +
		params.id,
		formValues
	)
	.then((res) => {
		if (res.status === 200) {
		alert("Student successfully updated");
    window.location = "/Tablelist";
		} else Promise.reject();
	})
	.catch((err) => alert("Something went wrong"));
};


// Load data from server and reinitialize student form
useEffect(() => {
	axios
	.get(
		"http://localhost:4000/students/update-student/"
		+ params.id
	)
	.then((res) => {
		const { fname, lname, location, email, dob, education } = res.data;
		setFormValues({ fname, lname, location, email, dob, education });
	})
	.catch((err) => console.log(err));
}, []);

// Return student form
return(
	<>
<Form  onSubmit={onSubmit}>

<Form.Group className="mb-3">
<Form.Label>First Name</Form.Label>
<Form.Control type="text"  name = "fname" autoComplete="none" value={formValues.fname} onChange={handleInput} required />
</Form.Group>

<Form.Group className="mb-2">
<Form.Label>Last Name</Form.Label>
<Form.Control type="text"  name = "lname" autoComplete="none" value={formValues.lname} onChange={handleInput} required/>
</Form.Group>

<Form.Group className="mb-2">
<Form.Label>Location</Form.Label>
<Form.Control type="text"  name = "location" autoComplete="none" value={formValues.location} onChange={handleInput} required/>
</Form.Group>

<Form.Group className="mb-2">
<Form.Label>Email Id</Form.Label>
<Form.Control type="email"  name = "email" autoComplete="none" value={formValues.email} onChange={handleInput} required/>
</Form.Group>

<Form.Group className="mb-2">
<Form.Label>DOB</Form.Label>
<Form.Control type="date" name="dob"   value={formValues.dob} onChange={handleInput} required/>
</Form.Group>

<Form.Group className="mb-2">
<Form.Label>Education</Form.Label>
<Form.Control type="text"  autoComplete="none" name = "education" value={formValues.education} onChange={handleInput} required/>
</Form.Group>

<Form.Group className="mb-2">
<Form.Label>About</Form.Label>
<textarea className ="form-control" id="exampleFormControlTextarea1" autoComplete="none" rows="3" value={formValues.about} name = "about" onChange={handleInput}></textarea>
</Form.Group>

<Button variant="success" type="submit">
Update
</Button>&nbsp;
<Link to={"/Tablelist"} className="text-decoration-none"><Button  variant="danger">Cancel</Button></Link>
</Form>
	</>
)
};

// Export EditStudent Component
export default Edit;
