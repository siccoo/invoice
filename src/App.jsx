/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import InvoiceForm from "./Components/InvoiceForm";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Container fluid>
        <InvoiceForm />
      </Container>
    </div>
  );
}

export default App;
