import React, { ReactNode } from 'react';
import Result from './Result';

interface IProps {
    results: number[];
}


const positiveFragments = [1, 10, 12, 13, 14, 15, 47];
const negativeFragments = [19, 27, 29, 31, 35, 37, 39];
export default class Results extends React.Component<IProps> {

    calcEilerCharacteristic(): number {
        const result = positiveFragments.reduce((acc, index) => this.props.results[index] + acc, 0) - 
        negativeFragments.reduce((acc, index) => this.props.results[index] + acc, 0)
        return result;
    }

    render(): ReactNode {
        return (
            <div className="results">
                {
                    this.props.results.map((count, index) => 
                        <Result key={index} count={count} code={index}/>
                    )
                }
                <span className='eiler'>χ = {this.calcEilerCharacteristic()}</span>
            </div>
        );
    }
}