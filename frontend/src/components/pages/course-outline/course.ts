import CSection from './csection';

class Course {
    public name: string; // CMPT 225
    public children: Course[];

    public dept: string;
    public courseNum: string;
    public desc: string;
    public prerequisites: string;
    public sections: CSection[];
    public title: string;

    constructor(dept: string, courseNum: string) {
        this.name =  dept + ' ' +  courseNum;
        this.dept = dept;
        this.courseNum = courseNum;
        this.children = new Array();
    }

    /*
    public addChildren(course: Course) {
        this.children.push(course);
    }
    */

    //
    // "CMPT 225, MACM 201, MATH 151 (or MATH 150), and MATH 232 or 240."
    //
    public parsePrerequisites() {
        var arr = this.prerequisites.split(',');
        if (arr[0] !== '' ) { // Check if there is prereqs
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].replace(/[^ A-Z0-9]/g, '');
                arr[i] = this.filter(arr[i]);
            }
    
            this.addChildren(arr);
            global.console.log(this);
        }
    }

    private addChildren(preReqs: string[]) {
        for (var i = 0; i < preReqs.length; i++) {
            var arr = preReqs[i].split(' ');
            var course = new Course(arr[0], arr[1]);
            this.children.push(course);
        }
    }

    private filter(str: string): string {
        var countSuffix = 0;
        var modifiedStr = '';

        for (var i = 0; i < str.length; i++) {
            var char = str.charAt(i);
            if (!isNaN(parseInt(char, 10))) { // Is a number
                countSuffix++;
            }

            if (countSuffix === 3) {
                modifiedStr = str.substr(0, i + 1);
                break;
            }
        }

        return modifiedStr.trim();
    }
}

export default Course;