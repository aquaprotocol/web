import React from "react";
import Card from "react-bootstrap/Card";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Invest from "./invest/Invest";
import Deposit from "./transaction/Deposit";
import Withdraw from "./transaction/Withdraw";


export default class Payment extends React.Component {

    client = new W3CWebSocket('ws://127.0.0.1:8080/ws');

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.location.state.value,
            depType: 'F',
            bankAccountBalance: '',
            contractAccountBalance: '',
            accountNumberFrom: '',
            accountNumberTo: '',
            amount: '',
            ethAccount:'',
            transactionHash:'',
            dataFromServer:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }



    componentDidMount() {

        this.client.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
        }

        this.client.onmessage = evt => {
            // listen to data sent from the websocket server
            const message = JSON.parse(evt.data)
            this.setState({dataFromServer: message.body})
            console.log(message.body)
        }

        fetch('http://localhost:5000/v2_1_1.1/accounts/v2_1_1.1/getAccount', {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({"accountNumber": "BANK_ACCOUNT_NUMBER"}),
        })
            .then(l => l.json())
            .then(s => this.setState({bankAccountBalance: s.availableBalance}))

        fetch('http://localhost:7000/treasury/balanceOf', {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({"accountNumber": "OPERATOR_ADDRESS"}),
        })
            .then(l => l.json())
            .then(s => this.setState({contractAccountBalance: s.balance}))
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
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
            .then(s => this.setState({transactionHash: "Transaction hash: " + s.hash}))

        event.preventDefault()
    }

    render() {
        return (
            <div>
                <div>
                    <Card>
                        <Card.Body>
                            <Card.Title> Account: {this.state.value.toString()}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Fiat
                                balance: {this.state.bankAccountBalance.toString()} PLN</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Token
                                balance: {this.state.contractAccountBalance.toString()} PLC</Card.Subtitle>
                        </Card.Body>
                    </Card>
                </div>


<Deposit></Deposit>

                <Invest></Invest>
                <Withdraw> </Withdraw>
            </div>
        );
    }
}