import * as React from 'react';
import { TableHeader, TableHeaderColumn, TableRow, Table, TableBody, TableRowColumn } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import customBaseTheme from '../themes/customBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './weekly.css';

//enum Day {
//    Monday      = 'Monday',
//    Tuesday     = 'Tuesday',
//    Wednesday   = 'Wednesday',
//    Thursday    = 'Thursday',
//    Friday      = 'Friday'
//}

enum Day {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday
}

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
                        },
                        {
                            day: Day.Monday,
                            start: {
                                hour: 13,
                                half: true
                            },
                            end: {
                                hour: 14,
                                half: true
                            }
                        }
                    ]
                }
            ]
        };
    }

    render() {
        let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        let daysCols = days.map((day: string) => <th className={'timeCell'} key={day} >{day}</th>);

        let rows = [];
        for (let t = 0; t < (22 - 8) * 2; t++) {
            let elems = [];
            for (let d = 0; d < days.length; d++) {
                let hasCourse = false;
                for (let course of this.state.courses) {
                    for (let time of course.time) {
                        if (time.day === d) {
                            hasCourse = true;
                            let hour = 0;
                            let timeString = '';

                            if (t % 2 === 0) {
                                hour = (t / 2) + 8;
                                timeString = `${hour}:00`;
                            } else {
                                hour = ((t - 1) / 2) + 8;
                                timeString = `${hour}:30`;
                            }

                            if (hour >= time.start.hour && hour <= time.end.hour) {
                                elems.push(<td className={'timeCell classTime'} key={`${course.name}${time.day}`}>{course.name}</td>);
                            } else {
                                elems.push(<td className={'timeCell'} key={`${d}${t}`}>{timeString}</td>);
                            }
                        }
                    }
                }
                if (!hasCourse) {
                    let timeString = t % 2 === 0 ? `${(t / 2) + 8}:00` : `${((t - 1) / 2) + 8}:30`;
                    elems.push(<td className={'timeCell'} key={`${d}${t}`}>{timeString}</td>);
                }
            }

            rows.push(<tr className={'timeRow'} key={t}>{elems}</tr>);
        }

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