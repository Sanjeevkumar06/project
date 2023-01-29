import React,{Component} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { Link } from "react-router-dom";


class Create extends Component{
    constructor(props){
        super(props);
        this.state = {
            fname : '',lname : '', location : '', email : '', dob : '', education : '', about : ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event,props) {
        event.preventDefault();
        console.log(this.state);
        const studentObject = {fname: this.state.fname,
            lname: this.state.lname,
            location: this.state.location,
            email: this.state.email,
            dob: this.state.dob,
            education: this.state.education
          };
          axios.post('http://localhost:4000/students/create-student', studentObject)
          .then((res) => {
            if (res.status === 200) {
            alert("Student successfully updated");
            window.location = "/Tablelist";
            } else Promise.reject();
        })
          this.setState({ fname: '', lname: '', location: '', email: '', dob: '', education: '',about :'' })
      }

    handleInput(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
        // console.log(this.state);
      }

    render(){
        return(
            <>
        <Form  onSubmit={this.onSubmit}>

        <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Your First Name" name = "fname" autoComplete="none" value={this.state.fname} onChange={this.handleInput} required />
        </Form.Group>

        <Form.Group className="mb-2">
            <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Last Name" name = "lname" autoComplete="none" value={this.state.lname} onChange={this.handleInput} required/>
        </Form.Group>

        <Form.Group className="mb-2">
            <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Location" name = "location" autoComplete="none" value={this.state.location} onChange={this.handleInput} required/>
        </Form.Group>

        <Form.Group className="mb-2">
            <Form.Label>Email Id</Form.Label>
                <Form.Control type="email" placeholder="Enter Mail Id" name = "email" autoComplete="none" value={this.state.email} onChange={this.handleInput} required/>
        </Form.Group>

        <Form.Group className="mb-2">
            <Form.Label>DOB</Form.Label>
                <Form.Control type="date" name="dob" placeholder="Date of Birth"  value={this.state.dob} onChange={this.handleInput} required/>
        </Form.Group>

        <Form.Group className="mb-2">
            <Form.Label>Education</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Qualification" autoComplete="none" name = "education" value={this.state.education} onChange={this.handleInput} required/>
        </Form.Group>

        <Form.Group className="mb-2">
            <Form.Label>About</Form.Label>
            <textarea className ="form-control" id="exampleFormControlTextarea1" autoComplete="none" rows="3" value={this.state.about} name = "about" onChange={this.handleInput}></textarea>
        </Form.Group>

        <Button variant="primary" type="submit">
        Submit
        </Button>&nbsp;
        <Link to={"/Tablelist"} className="text-decoration-none"><Button  variant="danger">Cancel</Button></Link>
        </Form>
            </>
        )
    }
}

export default Create;