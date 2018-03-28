import * as React from 'react';
import { TableHeader, TableHeaderColumn, TableRow, Table, TableBody, TableRowColumn } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import customBaseTheme from '../themes/customBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './weekly.css';

class WeeklyView extends React.Component {
    //render() {
    //    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    //    let daysCols = days.map((day: string) => <TableHeaderColumn key={day} >{day}</TableHeaderColumn>);
    //    let cell = <TableRowColumn className={'timeCell'}>=</TableRowColumn>;
    //    let cells = Array(days.length).fill(cell);
    //    let row = <TableRow className={'timerow'}>{cells}</TableRow>;
    //    let rows = Array((22 - 8) * 2).fill(row);
    //    return (
    //        <MuiThemeProvider muiTheme={getMuiTheme(customBaseTheme)}>
    //            <Table selectable={false}>
    //                <TableHeader
    //                    adjustForCheckbox={false}
    //                    enableSelectAll={false}
    //                    displaySelectAll={false}
    //                >
    //                    {daysCols}
    //                </TableHeader>
    //                <TableBody
    //                    displayRowCheckbox={false}
    //                >
    //                    {rows}
    //                </TableBody>
    //            </Table>
    //        </MuiThemeProvider>
    //    );
    //}

    render() {
        let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        let daysCols = days.map((day: string) => <th key={day} >{day}</th>);
        let cell = <td className={'timeCell'}>=</td>;
        let cells = Array(days.length).fill(cell);
        let row = <tr className={'timerow'}>{cells}</tr>;
        let rows = Array((22 - 8) * 2).fill(row);
        return (
            <table>
                <tr>
                    {daysCols}
                </tr>
                {rows}
            </table>
        );
    }
}

export default WeeklyView;