import React, { ReactNode } from 'react';
import Cell, { POLY } from './Cell';

interface IProps {
    code: number;
    count: number;
}

interface IState {
    code: string;
}

export default class Result extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        let code = props.code.toString(2).padStart(6, '0');
        this.state = {
            code
        };
    }

    renderResult(): ReactNode {
        switch (this.state.code.slice(0, 3)) {
            case '000': 
                return (<div className='result'>
                    <div>
                        <Cell poly={POLY.HEXAGON} fill={!!(this.props.code & 4)}/>
                        <Cell poly={POLY.RECTANGLE} fill={!!(this.props.code & 2)}/>
                    </div>
                    <div className='secondRow octagonRight'>
                        <Cell poly={POLY.OCTAGON} fill={!!(this.props.code & 1)}/>
                    </div>
                </div>)
            case '001':
                return (<div className='result'>
                    <div className='octagonRight'>
                        <Cell poly={POLY.RECTANGLE} fill={!!(this.props.code & 4)}/>
                        <Cell poly={POLY.HEXAGON} fill={!!(this.props.code & 2)}/>
                    </div>
                    <div className='secondRow'>
                        <Cell poly={POLY.OCTAGON} fill={!!(this.props.code & 1)}/>
                    </div>
                </div>)
            case '010':
                return (<div className='result wide'>
                    <div className='hexagonCenter'>
                        <Cell poly={POLY.HEXAGON} fill={!!(this.props.code & 4)}/>
                    </div>
                    <div className='secondRow'>
                        <Cell poly={POLY.OCTAGON} fill={!!(this.props.code & 2)}/>
                        <Cell poly={POLY.OCTAGON} fill={!!(this.props.code & 1)}/>
                    </div>
                </div>)
            case '011':
                return (<div className='result wide'>
                    <div>
                        <Cell poly={POLY.OCTAGON} fill={!!(this.props.code & 4)}/>
                        <Cell poly={POLY.OCTAGON} fill={!!(this.props.code & 2)}/>
                    </div>
                    <div className='secondRow hexagonCenter'>
                        <Cell poly={POLY.HEXAGON} fill={!!(this.props.code & 1)}/>
                    </div>
                </div>)
            case '100':
                return (<div className='result'>
                    <div className='octagonRight'>
                        <Cell poly={POLY.OCTAGON} fill={!!(this.props.code & 4)}/>
                    </div>
                    <div className='secondRow'>
                        <Cell poly={POLY.HEXAGON} fill={!!(this.props.code & 2)}/>
                        <Cell poly={POLY.RECTANGLE} fill={!!(this.props.code & 1)}/>
                    </div>
                </div>)
            case '101':
                return (<div className='result'>
                    <div className=''>
                        <Cell poly={POLY.OCTAGON} fill={!!(this.props.code & 4)}/>
                    </div>
                    <div className='secondRow octagonRight'>
                        <Cell poly={POLY.RECTANGLE} fill={!!(this.props.code & 2)}/>
                        <Cell poly={POLY.HEXAGON} fill={!!(this.props.code & 1)}/>
                    </div>
                </div>)
        }
    }

    render(): ReactNode {
        return (
            <div className='resultContainer'>
                {this.renderResult()}
                <div className='code'>{this.state.code}</div>
                <div className='P'>P{this.props.code}</div>
                <div className='count'>{this.props.count}</div>
            </div>
        );
    }
}