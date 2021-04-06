import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Art from "./module/Art";
import Insurance from "./module/Insurance";
import Papers from "./module/Papers";

export default class Invest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: '0x0'};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        // alert('Your account is: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>Invest</h1>
                    <Art></Art>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>

                    <Insurance></Insurance>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                    <Papers> </Papers>
                </Jumbotron>
            </div>

        );
    }
}