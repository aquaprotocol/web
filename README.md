# Web
Webpage for the AquaProtocol.

Each component is independent and can be used alone.

### Main Components
Short description of the AquaProtocol main functions. 

#### [Deposit](https://github.com/aquaprotocol/web/blob/a2f498b9e8a4ef574e2718b4c9e310320295880d/src/main/transaction/Deposit.js#L6) and [Withdraw](https://github.com/aquaprotocol/web/blob/main/src/main/transaction/Withdraw.js)

Form for input variable importand for deposit/withdraw crypto and fiat currency.
Potential users select type between F (Fiat) and C (Crypto/Stable coin).
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
1. User imput data
2. Request to smart-contract-api is execute.
3. Response with transaction hash is recorded
4. Request to Kovan Etherscan API is run to optained transaction status.

#### Invest Art, Paper and Insurance

The AquaProtocol give possibility to invest in Art, buy Stock Market Paper and Insurance

* Art

```json
{"name": name // picture name, 
"price": price // picture price}
```

* Paper
```json
{"issuerId": issuerId, // Id of Issuer corporaton
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
"typeOf":typeOf // type of inusrance H-Home, C- Car, L- Life
}
```

Flow is similar to flow from deposit/withdraw step

Flow:

1. User imput data
2. Request to smart-contract-api is execute.
3. Response with transaction hash is recorded
4. Request to Kovan Etherscan API is run to obtained transaction status.











