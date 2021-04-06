import React from "react";
import {Form, Button} from 'react-bootstrap';
import {Redirect} from "react-router-dom";

export default class MainPage extends React.Component {

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

        if (this.state.value !== '0x0') {
            return <Redirect to={{pathname:'/payment', state: { value:this.state.value }}}/>;
        }

        return (
            <div>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Control as="select" size="lg" onChange={this.handleChange}>
                                <option name="value" >Please select account:</option>
                                <option name="value" >58150017805507845039441513</option>
                                <option name="value" >0x143sdgfgdfdgi</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        );
    }
}