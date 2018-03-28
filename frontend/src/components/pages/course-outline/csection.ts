class CSection {
    public name: string;
    public sectionNum: string;
    public courseTitle: string;
    public classType: string;
    public sectionCode: string;
    public associatedClass: string;

    constructor(name: string, sectionNum: string, courseTitle: string, classType: string, sectionCode: string, associatedClass: string) {
        this.name = name;
        this.sectionNum = sectionNum;
        this.courseTitle = courseTitle;
        this.classType = classType;
        this.sectionCode = sectionCode;
        this.associatedClass = associatedClass;
    }
}

export default CSection;