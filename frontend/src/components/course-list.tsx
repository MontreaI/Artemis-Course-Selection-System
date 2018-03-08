import * as React from 'react';
import { Course } from '../types/interface';

interface Props {
    courses: Course[];
}

class CourseList extends React.Component<Props, {}> {
    render() {
        return (
            <div>
                <ul>
                    {
                        this.props.courses.map((item: Course, index: number) => 
                                    <li key={index.toString()}> {item.name} </li>)
                    }
                </ul>
            </div>
        );
    }
}

export default CourseList;