# ETHO-NFT-MARKETPLACE
Marketplace for nfts running on etho protocol 


`Etho Protocol NFT Marketplace`


This is an open decentralized NFT Marketplace built with smart contracts powered by Etho Protocol.

No one cares about the info under this section. It's for dev's YO! 

This marketplace deployed on ETH = 140$
This marketplace deployed on ETHO = 0.03$

Minting + hosting a simple image on ETH = 40-80$ range
Minting + hosting a simple image on ETHO = < 0.01 $


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### The repository

First, you will need to `clone` or `fork` the repository into your Github account:


```
$ git clone https://github.com/dylie/ETHO-NFT-MARKETPLACE
```

### Installing

First, you will need to install the dependencies with: `npm install`.

Run the following command in your terminal after cloning the main repo:

```
$ npm install
```

Then, you will need to install Truffle globally by running the following command int your terminal:

```
$ npm install -g truffle
```

### Running the Tests

First, you will have to compile the smart contracts by running the following command in your terminal:

```
$ truffle compile
```

Then you will have to install and run Ganache to run your blockchain locally:

https://www.trufflesuite.com/ganache



### Deployment on the Etho Protocol Blockchain

Deploy the contracts on the ETHO blockchain by running the following command:

```
$ truffle migrate --network dev
```

### RUN IT!



Finally you just need to run the following command in your terminal to open the User Interface:

```
$ npm start
```


### Technology stack

- `Solidity`
- `React.js`
- `Truffle`
- `Web3.js`
- `Ganache`
- `Node.js`
- `Metamask`
- `IPFS - ETHOFS`


### NFT Marketplace features


The user can perform the following actions on this NFT Marketplace:

#### Mint

The user must input a name, description and upload a file (image) to mint his own NFT. Once minted, a representation of this NFT will be displayed in the marketplace and initially it will be owned by its creator. This is open for everyone, meaning everyone can participate in this NFT creation within this collection. 

#### Make Offer

The user can offer his NFT by specifying its price (in Ether). If someone fulfills this offer, then the ownership is transferred to a new owner. 

#### Cancel Offer

The user can cancel an offer he did in the past if in the end he does not want to sell his NFT or wants to adjust the price.

#### Buy

A user can buy those NFT which someone else offered. This will require paying the requested price (the Ether will be transferred to the smart contract to be claimed later on).

#### Claim Funds

If a user sold an NFT, he can claim his funds by clicking the button in the top-right.

## Resources

- [ethereum.org](https://ethereum.org/)
- [truffle suit](https://www.trufflesuite.com/)
- [node.js](https://nodejs.org/)
- [web3.js](https://web3js.readthedocs.io/)
- [react.js](https://reactjs.org/)
- [IPFS](https://ipfs.io/)
- [ETHOFS](https://uploads.ethoprotocol.com/)
