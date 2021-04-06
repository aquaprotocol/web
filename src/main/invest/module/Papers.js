import React from "react";
import {Button, Form} from 'react-bootstrap';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {JsonToTable} from "react-json-to-table";

export default class Papers extends React.Component {

    timeout = 0

    constructor(props) {
        super(props);
        this.state = {
            value: '0x0',
            transactionHash: '',
            transactionStatus: '',
            papersWorldStat:[]
        };
        this.buyPaper1 = this.buyPaper1.bind(this);
        this.buyPaper2 = this.buyPaper2.bind(this);
        this.buyPaper3 = this.buyPaper3.bind(this);


    }

    buyPaper1(event) {

        this.sendTransaction("Fast Well Co.", "A", "1", "10", "1")
    }

    buyPaper2(event) {

        this.sendTransaction("Fast Well Co.", "B", "1", "10", "1")
    }

    buyPaper3(event) {

        this.sendTransaction("Fast Well Co.", "C", "1", "10", "1")


    }

    refreshWorldState() {
        fetch('http://localhost:7000/invest/getPaperState', {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
        })
            .then(l => l.json())
            .then(s => this.setState({papersWorldStat:s}))
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

    sendTransaction(issuerId, series, from, to, price) {
        this.setState({transactionStatus :'', transactionHash : ''})
        fetch('http://localhost:7000/invest/paper', {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({
                "issuerId": issuerId, "series": series, "price": price,
                "numberFrom": from, "numberTo": to
            }),
        })
            .then(l => l.json())
            .then(s => {
                this.setState({
                    transactionHash: s.hash

                })
                this.checkTransactionStatus()
            })
    }

    render() {

        return (
            <div>
                <h3>Papers</h3>
                <Row>
                    <Col xs={1} md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Fast Well Co.</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">A 1 - 100.000</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">100 EUR</Card.Subtitle>
                            </Card.Body>
                            <Button onClick={this.buyPaper1}>Buy</Button>
                        </Card>
                    </Col>

                    <Col xs={6} md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Fast Well Co.</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">B 1 - 100.000</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">100 EUR</Card.Subtitle>
                            </Card.Body>
                            <Button onClick={this.buyPaper2}>Buy</Button>
                        </Card>
                    </Col>

                    <Col xs={6} md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Fast Well Co.</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">C 1 - 100.000</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">100 EUR</Card.Subtitle>
                            </Card.Body>
                            <Button onClick={this.buyPaper2}>Buy</Button>
                        </Card>
                    </Col>
                </Row>

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

                <JsonToTable json={this.state.papersWorldStat}/>
            </div>
        );
    }
}