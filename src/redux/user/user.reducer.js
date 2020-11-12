import  UserActionTypes  from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    error: null
}

const userReaducer = (state = INITIAL_STATE, action) => {
    
    //depinde de tipul de actiune  
    switch(action.type){
        // verifica daca cazul = SIGN_IN_SUCCESS
        case UserActionTypes.SIGN_IN_SUCCESS:
         
             return {
                 ...state,
                 currentUser: action.payload,
                 error: null
             }
        // verifica daca signout a reusit
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            }

        //  verifica daca a esuant signin/signout
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:    
            return {
                ...state,
                error: action.payload
            }

       //daca nici unu din cazuri nu sunt indeplinite se aplica default 
         default:
             return state;
    }
}

export default userReaducer;