import CSection from './csection';

class Course {
    public name: string; // CMPT 225
    public children: Course[];

    // INFO:
    public degreeLevel: string;
    public deliveryMethod: string;
    public dept: string;
    public description: string;
    public designation: string;
    public number: string;
    public title: string;
    public prerequisites: string;
    public sections: CSection[];
    public units: string;
    public term: string;
    
    // COURSE SCHEDULE:
    public campus: string;
    public days: string;
    public startTime: string;
    public endTime: string;
    public buildingCode: string;
    public roomNumber: string;

    constructor(dept: string, courseNum: string) {
        this.name =  dept + ' ' +  courseNum;
        this.dept = dept;
        this.number = courseNum;
        this.children = new Array();
    }

    // eg. "CMPT 225, MACM 201, MATH 151 (or MATH 150), and MATH 232 or 240."
    public parsePrerequisites() {
        var arr = this.prerequisites.replace(/[A-Z]{3,}\s\d{3}\s(and|or)\s\d{3}/g, ''); // MATH 232 or 240
        var specialMatches = this.prerequisites.match(/[A-Z]{3,}\s\d{3}\s(and|or)\s\d{3}/g);
        var matches = arr.match(/[A-Z]{3,}\s\d{3}/g); // MATH 232

        if (matches === null && specialMatches != null) {
            matches = [];
        }

        if (matches != null) {

            if (specialMatches != null ) {
                specialMatches = this.formatPreReqStr(specialMatches);
                for (var i = 0; i < specialMatches.length; i++) {
                    let strArr = specialMatches[i].match(/[A-Z]{3,}\s\d{3}/g);
                    if (strArr != null) {
                        for (var j = 0; j < strArr.length; j++) {
                            matches.push(strArr[j]);
                        }
                    }
                }
            }

            global.console.log(matches);
            global.console.log(specialMatches);

            if (matches[0] !== '' ) { // Check if there is prereqs
                this.addChildren(matches);
            }
            global.console.log(matches);
        }
    }

    private formatPreReqStr(str: string[]): string[] {
        var unformattedArr = str; 
        var formattedArr: string[] = [];

        if (unformattedArr != null) {
            for (var i = 0; i < unformattedArr.length; i++) {
                var prefix = unformattedArr[i].match(/[A-Z]{3,}/g); // MATH
                var oldStr = unformattedArr[i].match(/[A-Z]{3,}\s\d{3}\s(and|or)\s/g); // MATH 232 or 
                unformattedArr[i] = unformattedArr[i].replace(/[A-Z]{3,}\s\d{3}\s(and|or)\s/g, ''); // 240
                if (prefix != null && oldStr != null) {
                    let formattedStr = (oldStr[0] + prefix[0] + ' ' + unformattedArr[i]).match(/[A-Z]{3,}\s\d{3}/g);
                    formattedArr[i] = oldStr[0] + prefix[0] + ' ' + unformattedArr[i];
                }
            }
        }
        return formattedArr;
    }

    private addChildren(preReqs: string[]) {
        for (var i = 0; i < preReqs.length; i++) {
            var arr = preReqs[i].split(' ');
            var course = new Course(arr[0], arr[1]);
            this.children.push(course);
        }
    }
}

export default Course;