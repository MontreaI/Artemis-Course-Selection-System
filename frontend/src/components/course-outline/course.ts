class Course {
    public name: String;
    public desc: String;
    public children: Course[];

    constructor(name: String) {
        this.name = name;
        this.children = new Array();
        this.desc = name;
    }

    public addChildren(course: Course) {
        this.children.push(course);
    }
}

export default Course;