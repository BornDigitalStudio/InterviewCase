import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

export const useToastPortal = (position = 'top-right') => {
    const [loaded, setLoaded] = useState(false);
    const [portalId] = useState(`toast-portal-${v4()}`);

    useEffect(() => {
        const div = document.createElement('div');
        div.id = portalId;
        div.setAttribute(
            'style',
            `position: fixed;
             z-index: 1000;
              ${
                  position === 'bottom-right'
                      ? 'bottom: 0px; right: 0px;'
                      : position === 'bottom-left'
                      ? 'bottom: 0px; left: 0px;'
                      : position === 'top-left'
                      ? 'top: 20px; left: 20px;'
                      : 'top: 20px; right: 20px;'
              }`
        );

        document.getElementsByTagName('body')[0].prepend(div);

        setLoaded(true);

        return () => {
            document.getElementsByTagName('body')[0].removeChild(div);
        };
    }, [portalId, position]);

    return { loaded, portalId };
};