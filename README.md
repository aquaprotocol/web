# Web
The Webpage for the AquaProtocol.

Each component is independent and can be used alone.

### Main Components
Short description of the AquaProtocol mains functions.

#### [Deposit](https://github.com/aquaprotocol/web/blob/a2f498b9e8a4ef574e2718b4c9e310320295880d/src/main/transaction/Deposit.js#L6) and [Withdraw](https://github.com/aquaprotocol/web/blob/main/src/main/transaction/Withdraw.js)

The Form for input a variable important for deposit/withdraw crypto and fiat currency.
Potential users select types between F (Fiat) and C (Crypto/Stable coin).
If select F then fiat deposition will be executed, C is for crypto/stable coin.

* Deposit/Withdraw

Request object deposit:

```javascript
        const invokeDeposition = {
            depType: this.state.depType, //F or C
            accountNumberFrom: this.state.accountNumberFrom, //Sender bank account address / Sender ethereum account address
            accountNumberTo: this.state.accountNumberTo, //Optional for fast transfer
            amount: this.state.amount, // price
            ethAccount: this.state.ethAccount // asset account address where money should be deposited
        }
```

Request object withdraw:
```javascript
        const invokeWithdraw = {
            depType: this.state.depType,
            accountNumberFrom: this.state.accountNumberFrom,
            accountNumberTo: this.state.accountNumberTo,
            amount: this.state.amount,
            ethAccount: this.state.ethAccount
        }
```
Response:
Transaction hash

Flow:
1. User input data
2. The Request to the smart-contract-api is executed.
3. The Response with transaction hash is recorded
4. The Request to the Kovan Etherscan API is run to obtain transaction status.

#### Invest [Art](https://github.com/aquaprotocol/web/blob/main/src/main/invest/module/Art.js), [Paper](https://github.com/aquaprotocol/web/blob/main/src/main/invest/module/Papers.js) and [Insurance](https://github.com/aquaprotocol/web/blob/main/src/main/invest/module/Insurance.js)

The AquaProtocol give possibility to invest in Art, buy Stock Market Paper and Insurance

* Art

```json
{"name": name // picture name,
"price": price // picture price}
```

* Paper
```json
{"issuerId": issuerId, // Id of Issuer corporation
"series": series, // Series of stock paper
"price": price, //Price
"numberFrom": from, // number from with paper package start
"numberTo": to // number from with paper package end}
```

* Insurance

```json
{"name": name, //owner name
"price": price, //price
"date": date, //date to end of insurance
"typeOf":typeOf // type of insurance H-Home, C- Car, L- Life
}
```

Flow is similar to flow from deposit/withdraw step

Flow:

1. The User input data
2. The Request to the smart-contract-api is executed
3. The Response with the transaction hash is recorded
4. The Request to the Kovan Etherscan API is run to obtain transaction status.


