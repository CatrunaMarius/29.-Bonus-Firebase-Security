import { createSelector } from 'reselect';



const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

// selecteaza pt match map id

export const selectCollection = collectionUrlParam => 
    createSelector(
        [selectCollections],
        // map 
        collections =>collections ? collections[collectionUrlParam] : null
           
    )

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

//determina si trimiete o valuare booling daca o colectie este null sau nu
export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
)