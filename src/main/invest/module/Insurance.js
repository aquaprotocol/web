import React from "react";
import {Form, Button} from 'react-bootstrap';
import Row from "react-bootstrap/Row";
import {JsonToTable} from "react-json-to-table";

export default class Insurance extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: '0x0',
        price:"10",
        name:"",
        typeOf:"C",
        date:"",
        transactionHash:'',
        transactionStatus:'',
            insuranceWorldStat:[]};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {

        this.sendTransaction(this.state.name,
            this.state.price,
            this.state.date,
            this.state.typeOf);

        event.preventDefault();
    }

    refreshWorldState() {
        fetch('http://localhost:7000/invest/getInsuranceState', {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
        })
            .then(l => l.json())
            .then(s => this.setState({insuranceWorldStat:s}))
    }
    componentDidMount() {
        this.refreshWorldState()
    }

    checkTransactionStatus() {

        console.log("Transaction status")
        const url = "https://api-kovan.etherscan.io/api?module=transaction&action=getstatus&txhash=" + this.state.transactionHash + "&apikey=TOKEN"
        this.timeout = setInterval(() => {

            fetch(url,
                {
                    headers: {'Content-Type': 'application/json'},
                    method: 'GET',
                })
                .then(l => l.json())
                .then(s => {

                    if (s.result.isError === "0") {
                        this.setState({transactionStatus: "Success"})
                        this.refreshWorldState()
                        clearInterval(this.timeout)
                    } else {
                        this.setState({transactionStatus: "Error"})
                        clearInterval(this.timeout)
                    }
                })
        }, 5000)
    }


    sendTransaction(name,price,date,typeOf) {

        this.setState({transactionStatus :'', transactionHash : ''})

        fetch('http://localhost:7000/invest/insurance', {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({"name": name, "price": price,
            "date": date, "typeOf":typeOf}),
        })
            .then(l => l.json())
            .then(s => {this.setState({transactionHash: s.hash})
            this.checkTransactionStatus()})
    }

    render() {
        return (
            <div>
                <h3>Insurance</h3>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="exampleForm.ControlSelect7">
                        <Form.Label>Select type:</Form.Label>

                        <Form.Control name="typeOf" as="select" onChange={this.handleChange}>
                            <option value="C">Car</option>
                            <option value="H">Home</option>
                            <option value="L">Life</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Insurance owner</Form.Label>
                        <Form.Control type="text" name="name" placeholder="owner"
                                      onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Date of end</Form.Label>
                        <Form.Control type="text" name="date" placeholder="2021-03-26"
                                      onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Rate</Form.Label>
                        <Form.Control name="price" as="select" onChange={this.handleChange}>
                            <option value="1">Low - 10EUR</option>
                            <option value="1">Mid - 40EUR</option>
                            <option value="1">Big - 90EUR</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type={"submit"}>
                        Buy
                    </Button>

                    <Row>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Transaction hash: {this.state.transactionHash.toString()}</Form.Label>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Transaction status: {this.state.transactionStatus}</Form.Label>
                        </Form.Group>
                    </Row>

                </Form>
                <JsonToTable json={this.state.insuranceWorldStat}/>
            </div>
        );
    }
}