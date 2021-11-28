import React, { useContext, useEffect } from 'react';

import web3 from './connection/web3';
import Navbar from './components/Layout/Navbar';
import Main from './components/Content/Main';
import Web3Context from './store/web3-context';
import CollectionContext from './store/collection-context';
import MarketplaceContext from './store/marketplace-context'
import NFTCollection from './abis/NFTCollection.json';
import NFTMarketplace from './abis/NFTMarketplace.json';
import MintForm from "./components/Content/MintNFT/MintForm";
import logo from "./img/logo2.PNG";
import Spinner from "./components/Layout/Spinner";
import "./app.css";
import ethonft_headline from "./img/ethonft_headline.png";


const App = () => {
  const web3Ctx = useContext(Web3Context);
  const collectionCtx = useContext(CollectionContext);
  const marketplaceCtx = useContext(MarketplaceContext);
  
  useEffect(() => {
    // Check if the user has Metamask active
    if(!web3) {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      return;
    }
    
    // Function to fetch all the blockchain data
    const loadBlockchainData = async() => {
      // Request accounts acccess if needed
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });  
      } catch(error) {
        console.error(error);
      }
      
      // Load account
      const account = await web3Ctx.loadAccount(web3);

      // Load Network ID
      const networkId = await web3Ctx.loadNetworkId(web3);

      // Load Contracts      
      const nftDeployedNetwork = NFTCollection.networks[networkId];
      const nftContract = collectionCtx.loadContract(web3, NFTCollection, nftDeployedNetwork);

      const mktDeployedNetwork = NFTMarketplace.networks[networkId];
      const mktContract = marketplaceCtx.loadContract(web3, NFTMarketplace, mktDeployedNetwork);

      if(nftContract) {        
        // Load total Supply
        const totalSupply = await collectionCtx.loadTotalSupply(nftContract);
        
        // Load Collection
        collectionCtx.loadCollection(nftContract, totalSupply);       

        // Event subscription
        nftContract.events.Transfer()
        .on('data', (event) => {
          collectionCtx.updateCollection(nftContract, event.returnValues.tokenId, event.returnValues.to);
          collectionCtx.setNftIsLoading(false);
        })
        .on('error', (error) => {
          console.log(error);
        });
        
      } else {
        window.alert('NFTCollection contract not deployed to detected network.')
      }

      if(mktContract) {
        // Load offer count
        const offerCount = await marketplaceCtx.loadOfferCount(mktContract);
        
        // Load offers
        marketplaceCtx.loadOffers(mktContract, offerCount); 
        
        // Load User Funds
        account && marketplaceCtx.loadUserFunds(mktContract, account);

        // Event OfferFilled subscription 
        mktContract.events.OfferFilled()
        .on('data', (event) => {
          marketplaceCtx.updateOffer(event.returnValues.offerId);
          collectionCtx.updateOwner(event.returnValues.id, event.returnValues.newOwner);
          marketplaceCtx.setMktIsLoading(false);
        })
        .on('error', (error) => {
          console.log(error);
        });

        // Event Offer subscription 
        mktContract.events.Offer()
        .on('data', (event) => {
          marketplaceCtx.addOffer(event.returnValues);
          marketplaceCtx.setMktIsLoading(false);
        })
        .on('error', (error) => {
          console.log(error);
        });

        // Event offerCancelled subscription 
        mktContract.events.OfferCancelled()
        .on('data', (event) => {
          marketplaceCtx.updateOffer(event.returnValues.offerId);
          collectionCtx.updateOwner(event.returnValues.id, event.returnValues.owner);
          marketplaceCtx.setMktIsLoading(false);
        })
        .on('error', (error) => {
          console.log(error);
        });
        
      } else {
        window.alert('ETHONFTMarketplace contract not deployed to detected network.')
      }

      collectionCtx.setNftIsLoading(false);
      marketplaceCtx.setMktIsLoading(false);

      // Metamask Event Subscription - Account changed
      window.ethereum.on('accountsChanged', (accounts) => {
        web3Ctx.loadAccount(web3);
        accounts[0] && marketplaceCtx.loadUserFunds(mktContract, accounts[0]);
      });

      // Metamask Event Subscription - Network changed
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });
    };
    
    loadBlockchainData();
  }, []);

  const showNavbar = web3 && collectionCtx.contract && marketplaceCtx.contract;
  const showContent = web3 && collectionCtx.contract && marketplaceCtx.contract && web3Ctx.account;
  
  return(
    <React.Fragment>
      {showNavbar && <Navbar />}
      {showContent && <Main />}
    </React.Fragment>
  );
};

const Header = () => {
  return (
      <div>
        <p>Header</p>
      </div>
  )
};



const Homepage = () => {
  const web3Ctx = useContext(Web3Context);
  const collectionCtx = useContext(CollectionContext);
  const marketplaceCtx = useContext(MarketplaceContext);
  
  useEffect(() => {
    // Check if the user has Metamask active
    if(!web3) {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      return;
    }
    
    // Function to fetch all the blockchain data
    const loadBlockchainData = async() => {
      // Request accounts acccess if needed
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch(error) {
        console.error(error);
      }
      
      // Load account
      const account = await web3Ctx.loadAccount(web3);
      
      // Load Network ID
      const networkId = await web3Ctx.loadNetworkId(web3);
      
      // Load Contracts
      const nftDeployedNetwork = NFTCollection.networks[networkId];
      const nftContract = collectionCtx.loadContract(web3, NFTCollection, nftDeployedNetwork);
      
      const mktDeployedNetwork = NFTMarketplace.networks[networkId];
      const mktContract = marketplaceCtx.loadContract(web3, NFTMarketplace, mktDeployedNetwork);
      
      if(nftContract) {
        // Load total Supply
        const totalSupply = await collectionCtx.loadTotalSupply(nftContract);
        
        // Load Collection
        collectionCtx.loadCollection(nftContract, totalSupply);
        
        // Event subscription
        nftContract.events.Transfer()
            .on('data', (event) => {
              collectionCtx.updateCollection(nftContract, event.returnValues.tokenId, event.returnValues.to);
              collectionCtx.setNftIsLoading(false);
            })
            .on('error', (error) => {
              console.log(error);
            });
        
      } else {
        window.alert('NFTCollection contract not deployed to detected network.')
      }
      
      if(mktContract) {
        // Load offer count
        const offerCount = await marketplaceCtx.loadOfferCount(mktContract);
        
        // Load offers
        marketplaceCtx.loadOffers(mktContract, offerCount);
        
        // Load User Funds
        account && marketplaceCtx.loadUserFunds(mktContract, account);
        
        // Event OfferFilled subscription
        mktContract.events.OfferFilled()
            .on('data', (event) => {
              marketplaceCtx.updateOffer(event.returnValues.offerId);
              collectionCtx.updateOwner(event.returnValues.id, event.returnValues.newOwner);
              marketplaceCtx.setMktIsLoading(false);
            })
            .on('error', (error) => {
              console.log(error);
            });
        
        // Event Offer subscription
        mktContract.events.Offer()
            .on('data', (event) => {
              marketplaceCtx.addOffer(event.returnValues);
              marketplaceCtx.setMktIsLoading(false);
            })
            .on('error', (error) => {
              console.log(error);
            });
        
        // Event offerCancelled subscription
        mktContract.events.OfferCancelled()
            .on('data', (event) => {
              marketplaceCtx.updateOffer(event.returnValues.offerId);
              collectionCtx.updateOwner(event.returnValues.id, event.returnValues.owner);
              marketplaceCtx.setMktIsLoading(false);
            })
            .on('error', (error) => {
              console.log(error);
            });
        
      } else {
        window.alert('ETHONFTMarketplace contract not deployed to detected network.')
      }
      
      collectionCtx.setNftIsLoading(false);
      marketplaceCtx.setMktIsLoading(false);
      
      // Metamask Event Subscription - Account changed
      window.ethereum.on('accountsChanged', (accounts) => {
        web3Ctx.loadAccount(web3);
        accounts[0] && marketplaceCtx.loadUserFunds(mktContract, accounts[0]);
      });
      
      // Metamask Event Subscription - Network changed
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });
    };
    
    loadBlockchainData();
  }, []);
  
  const showNavbar = web3 && collectionCtx.contract && marketplaceCtx.contract;
  
  return (
  <React.Fragment>
    {showNavbar && <Navbar />}
    <div class="container-fluid container-main bg-dark h">
      <div className="row text-white">
        <div className="col w-50">
          <img src={ethonft_headline} alt="Decentrlized Marketplace" width="100%"></img>
        </div>
        <div className="col w-50">
          Column 2
        </div>
      </div>
    </div>
    
  </React.Fragment>
  );
};

const Mintpage = () => {
  const web3Ctx = useContext(Web3Context);
  const collectionCtx = useContext(CollectionContext);
  const marketplaceCtx = useContext(MarketplaceContext);
  
  useEffect(() => {
    // Check if the user has Metamask active
    if(!web3) {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      return;
    }
    
    // Function to fetch all the blockchain data
    const loadBlockchainData = async() => {
      // Request accounts acccess if needed
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch(error) {
        console.error(error);
      }
      
      // Load account
      const account = await web3Ctx.loadAccount(web3);
      
      // Load Network ID
      const networkId = await web3Ctx.loadNetworkId(web3);
      
      // Load Contracts
      const nftDeployedNetwork = NFTCollection.networks[networkId];
      const nftContract = collectionCtx.loadContract(web3, NFTCollection, nftDeployedNetwork);
      
      const mktDeployedNetwork = NFTMarketplace.networks[networkId];
      const mktContract = marketplaceCtx.loadContract(web3, NFTMarketplace, mktDeployedNetwork);
      
      if(nftContract) {
        // Load total Supply
        const totalSupply = await collectionCtx.loadTotalSupply(nftContract);
        
        // Load Collection
        collectionCtx.loadCollection(nftContract, totalSupply);
        
        // Event subscription
        nftContract.events.Transfer()
            .on('data', (event) => {
              collectionCtx.updateCollection(nftContract, event.returnValues.tokenId, event.returnValues.to);
              collectionCtx.setNftIsLoading(false);
            })
            .on('error', (error) => {
              console.log(error);
            });
        
      } else {
        window.alert('NFTCollection contract not deployed to detected network.')
      }
      
      if(mktContract) {
        // Load offer count
        const offerCount = await marketplaceCtx.loadOfferCount(mktContract);
        
        // Load offers
        marketplaceCtx.loadOffers(mktContract, offerCount);
        
        // Load User Funds
        account && marketplaceCtx.loadUserFunds(mktContract, account);
        
        // Event OfferFilled subscription
        mktContract.events.OfferFilled()
            .on('data', (event) => {
              marketplaceCtx.updateOffer(event.returnValues.offerId);
              collectionCtx.updateOwner(event.returnValues.id, event.returnValues.newOwner);
              marketplaceCtx.setMktIsLoading(false);
            })
            .on('error', (error) => {
              console.log(error);
            });
        
        // Event Offer subscription
        mktContract.events.Offer()
            .on('data', (event) => {
              marketplaceCtx.addOffer(event.returnValues);
              marketplaceCtx.setMktIsLoading(false);
            })
            .on('error', (error) => {
              console.log(error);
            });
        
        // Event offerCancelled subscription
        mktContract.events.OfferCancelled()
            .on('data', (event) => {
              marketplaceCtx.updateOffer(event.returnValues.offerId);
              collectionCtx.updateOwner(event.returnValues.id, event.returnValues.owner);
              marketplaceCtx.setMktIsLoading(false);
            })
            .on('error', (error) => {
              console.log(error);
            });
        
      } else {
        window.alert('ETHONFTMarketplace contract not deployed to detected network.')
      }
      
      collectionCtx.setNftIsLoading(false);
      marketplaceCtx.setMktIsLoading(false);
      
      // Metamask Event Subscription - Account changed
      window.ethereum.on('accountsChanged', (accounts) => {
        web3Ctx.loadAccount(web3);
        accounts[0] && marketplaceCtx.loadUserFunds(mktContract, accounts[0]);
      });
      
      // Metamask Event Subscription - Network changed
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });
    };
    
    loadBlockchainData();
  }, []);
  
  const showNavbar = web3 && collectionCtx.contract && marketplaceCtx.contract;
  
  return (
      <React.Fragment>
        {showNavbar && <Navbar />}
        <div>
          <div className="row">
            <main role="main" className="col-lg-12 justify-content-center text-center">
              <div className="content mr-auto ml-auto">
                <img src={logo} alt="logo" width="500" height="140" className="mb-2"/>
                {!collectionCtx.nftIsLoading && <MintForm />}
                {collectionCtx.nftIsLoading && <Spinner />}
              </div>
            </main>
          </div>
          <hr/>
  
        </div>
      
      </React.Fragment>
  );
};

export {Homepage, Mintpage, Header , App} ; //new

