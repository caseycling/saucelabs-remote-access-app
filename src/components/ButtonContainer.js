import React, {useState} from 'react';

import EndSessionButton from './EndSessionButton'
import DeviceSelectorCarousel from './DeviceSelectorCarousel';


const ButtonContainer = ({phones, startSession}) => {

    const [activeTest, setActiveTest] = useState(false)

    const handleInput = () => {
        setActiveTest(true)
    }

    return (
        <div className="button-container">
            {!activeTest ? 
                <DeviceSelectorCarousel phones={phones} startSession={startSession} />
                :
                <EndSessionButton />
            }
        </div>
    );
};

export default ButtonContainer;