import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux' ;

import CollectionOverview from '../../componets/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../componets/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShpePage extends React.Component {

    state = {
        loading: true
    };

    unsubscribeFromSnapshop = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef =  firestore.collection('collections');

       this.unsubscribeFromSnapshop = collectionRef.onSnapshot(async snapshot =>{
           const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
           updateCollections(collectionsMap);
           this.setState({ loading:false }); 
        })
    }

    render(){
        const { match } = this.props;
        const { loading } = this.state;

        return(
            <div className='shop-page'>
                <Route exact path={`${match.path}`} 
                render={(props) => <CollectionsOverviewWithSpinner isLoading={loading}{...props} />} 
                />
                <Route path={`${match.path}/:collectionId`}
                 component={CollectionPage}
                 render={(props) => <CollectionPageWithSpinner isLoading={loading}{...props} />} 
                />
            </div>
        )
       
    }
};
    
const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap =>
        dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)( ShpePage);