import * as React from 'react';
import { TableHeader, TableHeaderColumn, TableRow, Table, TableBody, TableRowColumn } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import customBaseTheme from '../themes/customBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './weekly.css';

enum Day {
    Monday      = 'Monday',
    Tuesday     = 'Tuesday',
    Wednesday   = 'Wednesday',
    Thursday    = 'Thursday',
    Friday      = 'Friday'
};

interface ClassTime {
    hour: number;
    half: boolean;
}

interface ClassDateTime {
    day: Day;
    start: ClassTime;
    end: ClassTime;
}

interface Course {
    name: string;
    time: ClassDateTime[];
}

interface State {
    courses: Course[];
}

class WeeklyView extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            courses: [
                {
                    name: 'CMPT470',
                    time: [
                        {
                            day: Day.Thursday,
                            start: {
                                hour: 13,
                                half: true
                            },
                            end: {
                                hour: 15,
                                half: true
                            }
                        }
                    ]
                }
            ]
        }
    }

    render() {
        let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        let daysCols = days.map((day: string) => <th className={'timeCell'} key={day} >{day}</th>);

        var times = Array.apply(0, Array((22 - 8) * 2)).map((_: number, index: number) => {
            return index % 2 === 0 ?  `${(index / 2) + 8}:00` : `${((index - 1) / 2) + 8}:30`;
        });

        let rows = times.map((time: string, i: number) => {
            let cells = Array.apply(0, Array(days.length))
                             .map((_: number, di: number) => <td className={'timeCell'} key={`${i}${di}`}> {time} </td>);
            return <tr className={'timeRow'} key={i}>{cells}</tr>;
        }); 

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