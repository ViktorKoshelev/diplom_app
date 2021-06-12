import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Grid from './Grid';
import Results from './Results';

interface IState {
  results: number[];
}

class App extends React.Component<{}, IState> {
    constructor(props: {}) {
      super(props);
      const results = Array(48).fill(0);
      this.state = {
        results
      };
      this.onToggleCell = this.onToggleCell.bind(this);
    }

    onToggleCell(cells: boolean[][]) {
      const results = Array(48).fill(0);
      for (let rowIndex = 0; rowIndex < cells.length - 2; rowIndex++) {
        const row = cells[rowIndex];
        const prevRow = cells[rowIndex - 1];
        const nextRow = cells[rowIndex + 1];
        for (let columnIndex = 0; columnIndex < row.length - 2; columnIndex++) {
          const cell: number = Number(row[columnIndex]);
          const nextCell: number = Number(row[columnIndex + 1]);

          let octaIndex: number;
          if (columnIndex % 2) {
            // center hex
            octaIndex = (columnIndex + 1) / 2;
          } else {
            // center rect
            octaIndex = columnIndex / 2;
          }
          
          const hexIndex = columnIndex * 2 + 1;

          let topCell: number | null = null;
          if (prevRow) {
            if (rowIndex % 2) {
              // hexagon, center octagon
              topCell = Number(prevRow[hexIndex]);
            } else {
              // octagon
              topCell = Number(prevRow[octaIndex]);
            }
          }

          let bottomCell: number | null = null;
          if (nextRow) {
            if (rowIndex % 2) {
              bottomCell = Number(nextRow[hexIndex]);
            } else {
              bottomCell = Number(nextRow[octaIndex]);
            }
          }

          // const prefixes = [0, 8, 16, 24, 32, 40];
          
          let forTopCell: number, forBottomCell: number;
          if (rowIndex % 2) {
            // octa not even
            forTopCell = 16;
            forBottomCell = 24;            
          } else {
            // even
            if (columnIndex % 2) {
              // hex not even
              forTopCell = 32;
              forBottomCell = 0;
            } else {
              // rect even
              forTopCell = 40;
              forBottomCell = 8;
            }
          }
          
          if (topCell !== null) {
            const topResult = forTopCell + 4 * topCell + 2 * cell + 1 * nextCell;
            
            results[topResult] = results[topResult] + 1;
          }
          if (bottomCell !== null) {
            const bottomResult = forBottomCell + 4 * cell + 2 * nextCell + 1 * bottomCell;
            
            results[bottomResult] = results[bottomResult] + 1;
          }
        }
      }
      
      this.setState({
        results
      });
    }

    render() {
      return (
        <div className="app">
            <Grid onToggleCell={this.onToggleCell}/>
            <Results results={this.state.results}/>
        </div>
      );
    }
  }

ReactDOM.render(
    <App />,
    document.getElementById('root')
  );