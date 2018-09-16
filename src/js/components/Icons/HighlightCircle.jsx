import React, { PureComponent } from 'react';
import autobind from 'autobind-decorator';

import * as styles from './HighlightCircle.scss';

class HighlightCircle extends PureComponent {
    state = { color: 'red' }

    @autobind
    handleMouseOver() {
        this.setState({ color: 'green' });
    }

    @autobind
    handleMouseOut() {
        this.setState({ color: 'red' });
    }

    render() {
        return (
            <svg
                className={styles.svgContainer}
                onClick={this.props.onClick}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
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
                            stroke: this.state.color,
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
                        {this.props.children}
                    </text>
                </g>
            </svg>
        );
    }
}

export default HighlightCircle;