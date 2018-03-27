class Course {
    public name: string;
    public courseNum: string;
    public desc: string;
    public children: Course[];

    constructor(courseNum: string, name: string) {
        this.name = name;
        this.courseNum = courseNum;
        this.children = new Array();
    }

    public addChildren(course: Course) {
        this.children.push(course);
    }
}

export default Course;