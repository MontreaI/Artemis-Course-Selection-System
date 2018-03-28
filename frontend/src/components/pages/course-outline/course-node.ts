import CSection from './csection';

class CourseNode {
    public name: string; // CMPT 225
    public children: CourseNode[];

    constructor(dept: string, courseNum: string) {
        this.name = dept + ' ' + courseNum;
        this.children = new Array();
    }

    public addChildren(courseNode: CourseNode) {
        this.children.push(courseNode);
    }
}

export default CourseNode;