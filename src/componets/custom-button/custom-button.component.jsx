import React from 'react';


import {CustomButtonContainer} from './custom-buttin.styles'

//exportam  componenta state

const CustomButton = ( {children, ...props}) => (
    <CustomButtonContainer {...props}>
        {children}

    </CustomButtonContainer>
)



export default CustomButton;