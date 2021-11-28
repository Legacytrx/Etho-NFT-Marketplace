import { useContext  } from 'react';

import NFTCollection from './NFTCollection/NFTCollection';
import CollectionContext from '../../store/collection-context';
import MarketplaceContext from '../../store/marketplace-context';
import Spinner from '../Layout/Spinner';

const Main = () => {
  const collectionCtx = useContext(CollectionContext);
  const marketplaceCtx = useContext(MarketplaceContext);
  
  return(
    <div className="container-fluid mt-2 bg-dark">
      {!marketplaceCtx.mktIsLoading && <NFTCollection />}
      {marketplaceCtx.mktIsLoading && <Spinner />}
    </div>
  );
};

export default Main;