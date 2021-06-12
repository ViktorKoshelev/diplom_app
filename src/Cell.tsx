import React, { ReactNode } from 'react';

export enum POLY {
    RECTANGLE,
    HEXAGON,
    OCTAGON
}

function rectangle(): ReactNode {
    return <rect x="0" y="35" width="50" height="50"/>
}

function hexagon(): ReactNode {
    return <polygon points="0 35, 35 0, 70 35, 70 85, 35 120, 0 85"></polygon>;
}

function octagon(): ReactNode {
    return <polygon points="0 35, 35 0, 85 0, 120 35, 120 85, 85 120, 35 120, 0 85"></polygon>;
}

const poly = {
    [POLY.RECTANGLE]: rectangle,
    [POLY.HEXAGON]: hexagon,
    [POLY.OCTAGON]: octagon
};

const width = {
    [POLY.RECTANGLE]: 50,
    [POLY.HEXAGON]: 70,
    [POLY.OCTAGON]: 120
}

interface IProps {
    poly: POLY;
    fill?: boolean;
    onClick?: Function;
}

export default class Cell extends React.Component<IProps, Readonly<{}>> {

    render(): ReactNode {
        return (
            <svg className={this.props.fill ? 'filled cell' : 'empty cell'}
                onClick={() => {
                    if (this.props.onClick) {
                        this.props.onClick()
                    }
                }}
                xmlns="http://www.w3.org/2000/svg"
                width={width[this.props.poly]}
                height="120">
                {poly[this.props.poly]()}
            </svg>
        );
    }
}