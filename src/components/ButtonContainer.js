import React, {useState} from 'react';

import EndSessionButton from './EndSessionButton'
import DeviceSelectorCarousel from './DeviceSelectorCarousel';


const ButtonContainer = ({phones}) => {

    const [activeTest, setActiveTest] = useState(false)

    const handleInput = () => {
        setActiveTest(true)
    }

    return (
        <div className="button-container">
            {!activeTest ? 
                <DeviceSelectorCarousel phones={phones} />
                :
                <EndSessionButton />
            }
        </div>
    );
};

export default ButtonContainer;