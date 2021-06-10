import React, { useCallback, useState } from 'react';

import * as styles from './HighlightCircle.scss';

interface HighlightCircleProps {
    onClick: () => void
    children: React.ReactNode
}

const HighlightCircle: React.FC<HighlightCircleProps> = ({ onClick, children }) => {
    const [color, setColor] = useState('red')

    const handleMouseOver: React.MouseEventHandler<SVGElement> = useCallback(() => {
        setColor('green')
    }, [])

    const handleMouseOut: React.MouseEventHandler<SVGElement> = useCallback(() => {
        setColor('red')
    }, [])

    return (
        <svg
            className={styles.svgContainer}
            onClick={onClick}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            width="230"
            height="230"
        >
            <g style={{ transform: 'translate(4px, 14px)' }}>
                <path
                    x="0" y="0"
                    style={{
                        opacity: 0.5,
                        color: 'black',
                        fill: 'none',
                        fillOpacity: 1.0,
                        fillRule: 'evenodd',
                        stroke: '#192229',
                        strokeWidth: 15,
                        strokeLinecap: 'butt',
                        strokeLinejoin: 'miter',
                        marker: 'none',
                        markerStart: 'none',
                        markerMid: 'none',
                        markerEnd: 'none',
                        strokeMiterlimit: 4,
                        strokeDasharray: 'none',
                        strokeDashoffset: 0,
                        strokeOpacity: 1,
                        visibility: 'visible',
                        display: 'inline',
                        overflow: 'visible'
                    }}
                    d="M 212 105 A 90 90 0 1 1  15,103.21429 A 90 90 0 1 1  212 105 z"
                />
            </g>
            <g style={{ transform: 'translate(15px, 15px)' }}>
                <path
                    x="0" y="0"
                    style={{
                        opacity: 0.5,
                        color: 'black',
                        fill: 'none',
                        fillOpacity: 1.0,
                        fillRule: 'evenodd',
                        stroke: color,
                        strokeWidth: 15,
                        strokeLinecap: 'butt',
                        strokeLinejoin: 'miter',
                        marker: 'none',
                        markerStart: 'none',
                        markerMid: 'none',
                        markerEnd: 'none',
                        strokeMiterlimit: 4,
                        strokeDasharray: 'none',
                        strokeDashoffset: 0,
                        strokeOpacity: 1,
                        visibility: 'visible',
                        display: 'inline',
                        overflow: 'visible'
                    }}
                    d="M 190 103.21429 A 87.5 87.5 0 1 1  15,103.21429 A 87.5 87.5 0 1 1  190 103.21429 z"
                />
                <text
                    x="43"
                    y="110"
                    fill="white"
                    fontSize="30"
                >
                    {children}
                </text>
            </g>
        </svg>
    );
}

export default HighlightCircle;