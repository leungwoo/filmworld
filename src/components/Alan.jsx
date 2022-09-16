import React, { useEffect, useContext } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { ColorModeContext } from '../utils/ToggleColorMode';

const useAlan = () => {
    const { setMode } = useContext(ColorModeContext);
    useEffect(() => {
        alanBtn({
            key: 'f5d15d72fcbfdd86988084e5a26b4ad32e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({ command, mode }) => {
                if (command === 'changeMode') {
                    if (mode === 'light') {
                        setMode('light');
                    } else {
                        setMode('dark');
                    }
                    // Call the client code that will react to the received command
                }
            }
        });
    }, []);


};

export default useAlan;