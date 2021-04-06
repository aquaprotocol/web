import React from "react";
import {Button, Form} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import {JsonToTable} from "react-json-to-table";

export default class Art extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: '0x0',
        pictureName:"",
        picturePrice:"",
            transactionHash:'',
            transactionStatus:'',
        artWorldStat:[]};
        this.handleChange = this.handleChange.bind(this);
        this.buyArt = this.buyArt.bind(this);
        this.buyInsurance = this.buyInsurance.bind(this);
        this.buyPapers = this.buyPapers.bind(this);

    }

    refreshWorldState() {
        fetch('http://localhost:7000/invest/getArtState', {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
        })
            .then(l => l.json())
            .then(s => this.setState({artWorldStat:s}))
    }
    componentDidMount() {
    this.refreshWorldState()
    }

    buyArt(event) {
        this.sendTransaction("Night and day, Hans Mamlink", "1");
        event.preventDefault();
    }

    buyInsurance(event) {
        this.sendTransaction("Rise sun, Ted Ford", "1");
        event.preventDefault();
    }

    buyPapers(event) {
        this.sendTransaction("Watch sky, Franc Welinger", "1");
        event.preventDefault();
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

    sendTransaction(name,price) {
        this.setState({transactionStatus :'', transactionHash : ''})
        fetch('http://localhost:7000/invest/art', {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({"name": name, "price": price}),
        })
            .then(l => l.json())
            .then(s =>
            {this.setState({transactionHash: s.hash})

                this.checkTransactionStatus()
            })
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    render() {
        return (
            <div>
                <Container>
                    <h3>Art</h3>
                    <Row>
                        <Col xs={6} md={4}>
                            <Row>
                                <Figure>
                                    <Figure.Image
                                        width={171}
                                        height={180}
                                        alt="171x180"
                                        src="http://cirrus.cba.pl/UNI/T2/011.gif"
                                    />
                                    <Figure.Caption  class="text-center">Night and day, Hans Mamlink</Figure.Caption>
                                    <Figure.Caption name="picturePrice" class="text-center">400 EUR</Figure.Caption>
                                </Figure>
                            </Row>
                            <Row >
                                <Button onClick = {this.buyArt}>Buy</Button>
                            </Row>
                        </Col>

                        <Col xs={6} md={4}>
                            <Row>
                                <Figure>
                                    <Figure.Image
                                        width={171}
                                        height={180}
                                        alt="171x180"
                                        src="http://cirrus.cba.pl/ensemble/temp/3.png"
                                    />
                                    <Figure.Caption class="text-center">Rise sun, Ted Ford</Figure.Caption>
                                    <Figure.Caption class="text-center">100 EUR</Figure.Caption>
                                </Figure>
                            </Row>
                            <Row >
                                <Button onClick = {this.buyInsurance}>Buy</Button>
                            </Row>
                        </Col>

                        <Col xs={6} md={4}>
                            <Row>
                                <Figure>
                                    <Figure.Image
                                        width={171}
                                        height={180}
                                        alt="171x180"
                                        src="http://cirrus.cba.pl/pliki/anim1.gif"
                                    />
                                    <Figure.Caption class="text-center">Watch sky, Franc Welinger</Figure.Caption>
                                    <Figure.Caption class="text-center">200 EUR</Figure.Caption>
                                </Figure>
                            </Row>
                            <Row >
                                <Button onClick = {this.buyPapers}>Buy</Button>
                            </Row>
                        </Col>


                    </Row>
                </Container>



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

                <JsonToTable json={this.state.artWorldStat}/>
            </div>
        );
    }
}