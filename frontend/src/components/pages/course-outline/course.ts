import CSection from './csection';

class Course {
    public name: string;
    public courseNum: string;
    public desc: string;
    public prerequisites: string;
    public children: Course[];
    public sections: CSection[];

    constructor(courseNum: string, name: string) {
        this.name = name;
        this.courseNum = courseNum;
        this.children = new Array();
    }

    public addChildren(course: Course) {
        this.children.push(course);
    }

    //
    // "CMPT 225, MACM 201, MATH 151 (or MATH 150), and MATH 232 or 240."
    //
    public parsePrerequisites() {
        var arr = this.prerequisites.split(',');
        for (var i = 0; i < arr.length; i++) {
            // arr[i] = arr[i].trim();
            arr[i] = arr[i].replace(/[^A-Z0-9]/g, '');
            arr[i] = this.filter(arr[i]);
        }
        global.console.log(arr);
    }

    private filter(str: string): string {
        // var isPrefix: Boolean = true;
        var countSuffix = 0;
        var modifiedStr = '';

        for (var i = 0; i < str.length; i++) {
            var char = str.charAt(i);
            if (!isNaN(parseInt(char, 10))) {
                // Is a number
                countSuffix++;
                // isPrefix = false;
            }

            if (countSuffix === 3) {
                modifiedStr = str.substr(0, i + 1);
                global.console.log(modifiedStr);
                break;
            }
        }

        return modifiedStr;
    }
}

export default Course;