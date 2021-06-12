import React, { ReactNode } from 'react';
import Cell, { POLY } from './Cell';

interface IState {
    cells: boolean[][];
}

interface IProps {
    onToggleCell: (cells: boolean[][]) => void;
}

export default class Grid extends React.Component<IProps, IState> {
    private rows = 14;
    private columns = 10;

    // нечетные ряды содержат в два раза больше ячеек чем четные
    private generateCells(rows: number, columns: number): boolean[][] {
        const result = [];
        for (let index = 0; index < rows; index++) {
            const realNumeration = index + 1;
            const rowLength = columns * ((realNumeration % 2) + 1);
            result.push(Array(rowLength).fill(false));
        }
        return result;
    }

    constructor(props: IProps) {
        super(props);
        this.state = {
            cells: this.generateCells(this.rows, this.columns)
        };
        this.toggleCell = this.toggleCell.bind(this);
    }

    private toggleCell(row: number, column: number) {
        const cells = this.state.cells.map((stateRow, rowIndex) => {
            return stateRow.map((filled, columnIndex) => {
                return rowIndex === row && column === columnIndex ? !filled : filled;
            })
        });
        this.setState({
            cells
        })
        this.props.onToggleCell(cells);
    }

    renderCells(row: boolean[], rowIndex: number): ReactNode {
        return (
            <div className="row" key={rowIndex}>
                {
                    row.map((filled: boolean, columnIndex: number) => {
                        const realNumeration = rowIndex + 1;
                        const doublePoly = columnIndex % 2 ? POLY.HEXAGON : POLY.RECTANGLE;
                        const poly: POLY = realNumeration % 2 ? doublePoly :
                            POLY.OCTAGON; 
                        return <Cell key={rowIndex + ';' + columnIndex}
                                    fill={filled}
                                    poly={poly} 
                                    onClick={() => this.toggleCell(rowIndex, columnIndex) }/>
                    })
                }
            </div>
        );
    }

    render(): ReactNode {
        return (
            <div className="grid">
                {this.state.cells.map(this.renderCells.bind(this))}
            </div>
        );
    }
}