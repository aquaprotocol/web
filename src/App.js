import React from "react";
import {BrowserRouter, Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './main/MainPage.js'
import Payment from "./main/Payment";
import Jumbotron from "react-bootstrap/Jumbotron";
import Insurance from "./main/invest/module/Insurance";
import {Link} from "react-router-dom";
import Deposit from "./main/transaction/Deposit";
import Art from "./main/invest/module/Art";
import Papers from "./main/invest/module/Papers";
import {Row,Col } from "react-bootstrap";
import Withdraw from "./main/transaction/Withdraw";

export default class App extends React.Component {


    render() {

        return (
            <div>
                <div>
                <h1>Aqua Protocol</h1>
                </div>
                <Jumbotron>
                <BrowserRouter>
                    <div className="links">
                        <Row xs={6}>
                        <Col>
                        <Link to={`/deposition`} className='link'>
                            Deposition
                        </Link>
                        </Col>
                        <Col>
                        <Link to={`/art`} className='link'>
                            Art
                        </Link>
                        </Col>
                            <Col>
                        <Link to={`/insurance`} className='link'>
                            Insurance
                        </Link>
                            </Col>

                            <Col>
                        <Link to={`/paper`} className='link'>
                             Paper
                        </Link>
                            </Col>
                            <Col>
                        <Link to={`/withdraw`} className='link'>
                            Withdraw
                        </Link>
                            </Col>
                        </Row>
                    </div>

                    <Route path={'/'} exact component={MainPage}/>
                    <Route path={'/payment'} component={Payment}/>
                    <Route path={'/deposition'} component={Deposit}/>
                    <Route path={'/art'} component={Art}/>
                    <Route path={'/insurance'} component={Insurance}/>
                    <Route path={'/paper'} component={Papers}/>
                    <Route path={'/withdraw'} component={Withdraw}/>
                </BrowserRouter>
                </Jumbotron>
            </div>
        )
    }

}