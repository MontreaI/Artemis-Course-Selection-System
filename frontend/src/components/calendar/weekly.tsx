import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { Course, CourseJsonObj } from '../pages/course-outline/course'; 
import './weekly.css';
import CourseApi from '../../utils/course-api';

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

interface WeeklyCourse {
    name: string;
    time: ClassDateTime[];
}

interface State {
    courses: WeeklyCourse[];
}

function mapDayStringsToDays(days: string[]) {
    return days.map(d => {
        let day = d.trim();
        switch (day) {
            case 'Mo':
                return Day.Monday;
            case 'Tu':
                return Day.Tuesday;
            case 'We':
                return Day.Wednesday;
            case 'Th':
                return Day.Thursday;
            case 'Fr':
                return Day.Friday;
            default:
                return Day.Monday;
        }
    });
}

class WeeklyView extends React.Component<{}, State> {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props: {}, context: {}) {
        super(props);
        this.state = {
            courses: []
        };
    }

    componentDidMount() {
        let user = sessionStorage.getItem('username');
        if (user !== null) {
            global.console.log(`getting courses for ${user}`);
            let api = new CourseApi();
            api.getUserCourses(user).then((courses: Course[]) => {
                global.console.log(`got ${courses.length} courses`);
                let wCourses = courses.map(c => {
                    global.console.log(c);
                    let course: WeeklyCourse = {
                        name: c.name,
                        time: []
                    };

                    for (let schedule of c.courseSchedule) {
                        let startTimes = schedule.startTime.split(':');
                        let startHalf: boolean = (startTimes[1] !== '00');
                        let startTime: ClassTime = {
                            hour: parseInt(startTimes[0], 10),
                            half: startHalf
                        };

                        let endTimes = schedule.endTime.split(':');
                        let endHalf: boolean = (endTimes[1] !== '00');
                        let endTime: ClassTime = {
                            hour: parseInt(endTimes[0], 10),
                            half: endHalf
                        };

                        let days = mapDayStringsToDays(schedule.days.split(','));
                        for (let day of days) {
                            let time: ClassDateTime = {
                                day: day,
                                start: startTime,
                                end: endTime
                            };

                            course.time.push(time);
                        }
                    }
                    return course;
                });
                global.console.log(wCourses);
                this.setState({
                    courses: wCourses
                });
            });
        }
    }

    render() {
        let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        let daysCols = days.map((day: string) => <th className={'timeCell'} key={day} >{day}</th>);

        let rows = [];
        for (let t = 0; t < (22 - 8) * 2; t++) {
            let elems = [];
            for (let d = 0; d < days.length; d++) {
                let courses: string[] = [];
                for (let course of this.state.courses) {
                    for (let time of course.time) {
                        if (time.day === d) {
                            let hour = 0;
                            let halfHour = false;

                            if (t % 2 === 0) {
                                hour = (t / 2) + 8;
                            } else {
                                halfHour = true;
                                hour = ((t - 1) / 2) + 8;
                            }

                            if (hour === time.start.hour) {
                                if (halfHour) {
                                    courses.push(course.name);
                                } else {
                                    if (!time.start.half) {
                                        courses.push(course.name);
                                    }
                                }
                            } else if (hour === time.end.hour) {
                                if (!halfHour) {
                                    if (time.end.half) {
                                        courses.push(course.name);
                                    }
                                }
                            } else if (hour > time.start.hour &&
                                       hour < time.end.hour) {
                                     courses.push(course.name);
                            }
                        }
                    }
                }

                if (courses.length > 0) {
                    if (courses.length > 1) {
                        let coursesStr = courses.join(' ');
                        elems.push(<td className={'timeCell timeDup'} key={`${coursesStr}${d}`}>{coursesStr}</td>);
                    } else {
                        elems.push(<td className={'timeCell classTime'} key={`${courses[0]}${d}`}>{courses[0]}</td>);
                    }
                } else {
                    let timeString = t % 2 === 0 ? `${(t / 2) + 8}:00` : `${((t - 1) / 2) + 8}:30`;
                    elems.push(<td className={'timeCell'} key={`${d}${t}`}>{timeString}</td>);
                }
            }

            rows.push(<tr className={'timeRow'} key={t}>{elems}</tr>);
        }

        return (
            <table className="timetable">
                <tr>
                    {daysCols}
                </tr>
                {rows}
            </table>
        );
    }
}

export default WeeklyView;