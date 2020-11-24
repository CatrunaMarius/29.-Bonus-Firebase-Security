import React from 'react';

import { 
    ErrorImageOverlay,
    ErrorImageContainer,
    ErrorImageText
} from './error-boundary.styles';






class ErrorBoundary extends React.Component {
    
    constructor(){
        super();

        this.state = {
            hasErrored: false
        };
    }

    // prinde ori ce eroare care apare in fiecare children componenta
    static getDerivedStateFromError(error){

        //procesarea erori
        return { hasErrored: true}
    }

    // ne da acces la eroare si info legata de eroare
    componentDidCatch(error, info){
        // ce faci cu eroarea
        console.log(error);
    }

    render() {
        // daca apare o erore va renda ceva ce noi am stabilit mai jos
        if (this.state.hasErrored) {
            return (
                <ErrorImageOverlay >
                    <ErrorImageContainer imageUrl='https://i.imgur.com/lKJiT77.png' />
                    <ErrorImageText>Sorry A Dog Ate this Page</ErrorImageText>
                </ErrorImageOverlay>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;