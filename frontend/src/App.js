// Import React
import React,{Component} from "react";

// Import Bootstrap
import { Nav, Navbar, Container, Row, Col }
		from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// Import Custom CSS
import "./App.css";

// Import from react-router-dom
import { BrowserRouter as Router, Routes,
	Route, Link } from "react-router-dom";

// Import other React Component
import CreateStudent from "./Components/Create";
import StudentEdit from "./Components/Edit";
import StudentList from "./Components/Tablelist";






// App Component
class App extends Component{
render(){
return (
	<Router>
	<div className="App">
		<header className="App-header">
		<Navbar bg="dark" variant="dark">
			<Container>
			<Navbar.Brand>
				<Link to={"#"}
				className="nav-link">
				Student Management System
				</Link>
			</Navbar.Brand>

			</Container>
		</Navbar>
		</header>

		<Container>
		<Row>
			<Col md={12}>
			<div className="wrapper">
				<Routes>
				<Route path="/" element={<StudentList/>} />
				<Route path="/Create" element={<CreateStudent/>} />
				<Route path="/Tablelist" element={<StudentList/>} />
				<Route path="/Edit/:id" element={<StudentEdit/>} />
				</Routes>
			</div>
			</Col>
		</Row>
		</Container>
	</div>
	</Router>
);
};
}

export default App;
