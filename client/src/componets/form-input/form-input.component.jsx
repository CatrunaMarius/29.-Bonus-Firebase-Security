import React from 'react';

import './form-input.styles.scss'

//acesta va fi o componenta functionala pentru ca nu vrem nici un state

const FormInput = ({ handleChange, lable, ...otherProps }) => (
    <div className="group">
        <input className='form-input' onChange={handleChange} {...otherProps}/>

        {
            lable ? 
            (<label className={`${otherProps.value.lenght ? 'shrink': ''} form-input-label`}>
                {lable}
            </label>) : null
        }

    </div>
)




export default FormInput;