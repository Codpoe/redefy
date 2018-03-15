import React from 'react';

import Sticky from '../../src/sticky/';

export default (props) => {
    return (
        <Sticky
            style={{
                position: 'absolute',
                top: '200px'
            }}
            offset={20}
        >
            <div
                style={{
                    width: '200px',
                    height: '140px',
                    background: 'red'
                }}
            >
            </div>
        </Sticky>
    )
}