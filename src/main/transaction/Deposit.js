import React from "react";
import {Form, Button} from 'react-bootstrap';
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";

export default class Deposit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: '0x0',
            transactionHash: '',
        transactionStatus: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
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
                        clearInterval(this.timeout)
                    } else {
                        this.setState({transactionStatus: "Error"})
                        clearInterval(this.timeout)
                    }
                })
        }, 5000)
    }

    handleSubmit(event) {

        this.setState({transactionStatus :'', transactionHash : ''})
        // console.log(this.state.depType)
        const invokeDeposition = {
            depType: this.state.depType,
            accountNumberFrom: this.state.accountNumberFrom,
            accountNumberTo: this.state.accountNumberTo,
            amount: this.state.amount,
            ethAccount: this.state.ethAccount
        }


        fetch('http://localhost:7000/deposition/invoke', {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({"invokeDeposition": invokeDeposition}),
        })
            .then(l => l.json())
            .then(s => {this.setState({transactionHash: s.hash})
                this.checkTransactionStatus()
            })

        event.preventDefault()
    }

    render() {

        return (
            <div>
                <Jumbotron>
                    <h1>Deposite</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="exampleForm.ControlSelect7">
                            <Form.Label>Select type:</Form.Label>

                            <Form.Control name={"depType"} as="select" onChange={this.handleChange}>
                                <option value="F">Fiat</option>
                                <option value="C">CryptoCurrency</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Account Number From</Form.Label>
                            <Form.Control type="text" name="accountNumberFrom" placeholder="12617261276172612"
                                          onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Eth Account</Form.Label>
                            <Form.Control type="text" name="ethAccount" placeholder="0x12kjadjhsf2232323JSAHJGD"
                                          onChange={this.handleChange}/>

                        </Form.Group>


                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Account Number To</Form.Label>
                            <Form.Control type="text" name="accountNumberTo" placeholder="12617261276172612"
                                          onChange={this.handleChange}/>

                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Value</Form.Label>
                            <Form.Control type="text" name="amount" placeholder="100" onChange={this.handleChange}/>

                        </Form.Group>
                        <Button variant="primary" type={"submit"}>
                            Send
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
                </Jumbotron>
            </div>
        );
    }
}