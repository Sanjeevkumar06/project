import React,{Component} from "react";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";



class Tablelist extends Component{
  constructor(props){
    super(props);
    this.state = {
      Students : [],
      search : ''
  }
 this.handleSearchChange = this.handleSearchChange.bind(this); 
 
  }

componentDidMount(){
  axios
  .get("http://localhost:4000/students/all")
  .then(({ data }) => {
    this.setState({ Students : data })
  // console.log(data);
    
  })
  .catch((error) => {
    console.log(error);
  });
};



  deleteData(id){
    var result = window.confirm("Want to delete?");
if (result) {
  axios
  .delete(
"http://localhost:4000/students/delete-student/" + id)
  .then((res) => {
    if (res.status === 200) {
      alert("Student successfully deleted");
      window.location.reload();
    }
  })
  .catch((err) => alert("Something went wrong"));
}
}

handleSearchChange = event => {
  this.setState({ search: event.target.value });


};

render(){
  const data = this.state.Students;
  // console.log({data});
  const search = this.state.search;
  const filteredData = data.filter(item =>
    item.fname.toLowerCase().includes(search.toLowerCase())
  );
  return(
        <>

        <div className="mb-4">
            <div  className="search">
            <input  type="search" className="search form-control rounded" placeholder="Search by Name"  value={this.state.search} onChange={this.handleSearchChange} aria-label="Search" aria-describedby="search-addon" />
            <span><i className="bi bi-search p-2"></i></span>
            </div>
            <Link to={"/Create"} className="text-decoration-none"><button type="button" className="btn btn-primary float-end ">Add</button></Link>
        </div>

        <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Location</th>
          <th>Email</th>
          <th>DOB</th>
          <th>Education</th>
          <th>Action</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
              {filteredData.map(student => (
                <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.fname}</td>
                    <td>{student.lname}</td>
                    <td>{student.location}</td>
                    <td>{student.email}</td>
                    <td>{student.dob}</td>
                    <td>{student.education}</td>
                    <td><Link to={"/Edit/"+student.id} className="text-decoration-none"><i className="bi bi-pen"> </i>Edit</Link></td>
                    <td><Button onClick={() => this.deleteData(student.id)} size="sm" variant="danger">Delete <i className="bi bi-trash">  </i></Button></td>
                    
                </tr>
              ))}
            </tbody>
    </Table>
        </>
    )
}
}

export default Tablelist;