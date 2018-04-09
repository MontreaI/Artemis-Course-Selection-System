import CSection from './csection';

interface CourseSchedule {
    buildingCode: string;
    campus: string;
    days: string;
    endTime: string;
    endDate: string;
    isExam: boolean;
    roomNumber: string;
    sectionCode: string;
    startDate: string;
    startTime: string;
}

interface CourseInfo {
    classNumber: string;
    corequisites: string;
    courseDetails: string;
    degreeLevel: string;
    deliveryMethod: string;
    departmentalUgradNotes: string;
    dept: string;
    description: string;
    designation: string;
    gradingNotes: string;
    materials: string;
    name: string;
    notes: string;
    number: string;
    outlinePath: string;
    prerequisites: string;
    registrarNotes: string;
    section: string;
    shortNote: string;
    specialTopic: string;
    term: string;
    title: string;
    type: string;
    units: string;
}

interface Instructor {
    commonName: string;
    email: string;
    firstName: string;
    lastName: string;
    name: string;
    office: string;
    officeHours: string;
    phone: string;
    profileUrl: string;
    roleCode: string;
}

interface TextBook {
    details: string;
    isbn: string;
}

export interface CourseJsonObj {
    courseSchedule: CourseSchedule[];
    examSchedule: CourseSchedule[];
    info: CourseInfo;
    instructor: Instructor[];
    requiredText: TextBook[];
}

export class Course {
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
    public sectionNum: string;
    
    // COURSE SCHEDULE:
    public courseSchedule: CourseSchedule[];

    constructor(dept: string, courseNum: string) {
        this.name =  dept + ' ' +  courseNum;
        this.dept = dept;
        this.number = courseNum;
        this.children = new Array();
        this.courseSchedule = new Array();
    }

    // eg. "CMPT 225, MACM 201, MATH 151 (or MATH 150), and MATH 232 or 240."
    // eg. MATH 232 or 240 is a special match
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

            if (matches[0] !== '' ) { // Check if there is prereqs
                this.addChildren(matches);
            }
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