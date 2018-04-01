'use strict';
import { Response, Request } from 'express';
import http from 'http';
import { isUndefined } from 'util';
import * as db from '../db/db';

export let getApi = (req: Request, res: Response) => {
    const courses = [{ name: 'CMPT470' }];
    res.writeHead(200);
    res.write(JSON.stringify(courses));
    res.end();
};



/*
GET /bin/wcm/course-outlines
REST wrapper for the Course Outlines data. Returns a list of years.

data structure:

[
  {"value":"2014"},
  {"value":"2015"}
]

*/
export let getYears = (req: Request, res: Response) => {
    http.get('http://www.sfu.ca/bin/wcm/course-outlines', (response) => {
        if (response.statusCode != 200) {
            throw new Error('Could not fetch from server');
        }
        else {
            let jsonData = '';
            response.on('data', (chunk) => { jsonData += chunk; });
            response.on('end', () => {
                try {
                    res.write(jsonData);
                    res.end();
                } catch (e) {
                    console.error(e.message);
                }
            });
        }
    });
};

/*
The year in the format yyyy (e.g. 2015). Alternately, the dynamic variable 'current' and 'registration can be used.
'current' - will use the year of the current active term
'registration' - will use the year of the current registration term.

data structure:

[
  {value: "spring"},
  {value: "summer"},
  {value: "fall"},
]

*/
export let getTerms = (req: Request, res: Response) => {
    http.get('http://www.sfu.ca/bin/wcm/course-outlines?' +  req.params.year, (response) => {
        if (response.statusCode != 200) {
            console.error('Could not fetch terms from server');
        }
        else {
            let jsonData = '';
            response.on('data', (chunk) => { jsonData += chunk; });
            response.on('end', () => {
                try {
                    res.write(jsonData);
                    res.end();
                } catch (e) {
                    console.error(e.message);
                }
            });
        }
    });
};

/* Returns a list of courses or the current term

data structure:

[
  {
    text: "ALS",
    value: "als"
  },
  {
    text: "ARCH",
    value: "arch"
  },
]

*/
export let getDepartments = (req: Request, res: Response) => {
    http.get('http://www.sfu.ca/bin/wcm/course-outlines?' +  req.params.year + '/' + req.params.term, (response) => {
        if (response.statusCode != 200) {
            console.error('Could not fetch departments from server');
        }
        else {
            let jsonData = '';
            response.on('data', (chunk) => { jsonData += chunk; });
            response.on('end', () => {
                try {
                    res.write(jsonData);
                    res.end();
                } catch (e) {
                    console.error(e.message);
                }
            });
        }
    });
};

/* Returns a list of course numbers that includes the course title for the given department.

data structure:

[
   {
      text:"110",
      value:"110",
      title:"Introductory Chemistry"
   },
]

*/
export let getCourseNumbers = (req: Request, res: Response) => {
    http.get('http://www.sfu.ca/bin/wcm/course-outlines?' + req.params.year + '/' + req.params.term + '/' + req.params.department, (response) => {
        if (response.statusCode != 200) {
            throw new Error('Could not fetch course numbersfrom server');
        }
        else {
            let jsonData = '';
            response.on('data', (chunk) => { jsonData += chunk; });
            response.on('end', () => {
                try {
                    res.write(jsonData);
                    res.end();
                } catch (e) {
                    console.error(e.message);
                }
            });
        }
    });
};

/* Returns a list of course sections for the given course number.

[
  {
    text: "C100",
    value: "c100",
    title: "Genetics",
    classType: "e",
    sectionCode: "SEC",
    associatedClass: "100"
  },
]

*/
export let getCourseSections = (req: Request, res: Response) => {
    http.get('http://www.sfu.ca/bin/wcm/course-outlines?' + req.params.year + '/' + req.params.term + '/' + req.params. department + '/' + req.params.courseNumber, (response) => {
        if (response.statusCode != 200) {
            throw new Error('Could not fetch from server');
        }
        else {
            let jsonData = '';
            response.on('data', (chunk) => { jsonData += chunk; });
            response.on('end', () => {
                try {
                    res.write(jsonData);
                    res.end();
                } catch (e) {
                    console.error(e.message);
                }
            });
        }
    });
};


// Returns the content details of a specific course outline.
export let getCourseOutline = (req: Request, res: Response) => {
    http.get('http://www.sfu.ca/bin/wcm/course-outlines?' + req.params.year + '/' + req.params.term + '/' + req.params.department + '/' + req.params.courseNumber + '/' + req.params.courseSection, (response) => {
        if (response.statusCode != 200) {
            throw new Error('Could not fetch from server');
        }
        else {
            let jsonData = '';
            response.on('data', (chunk) => { jsonData += chunk; });
            response.on('end', () => {
                try {
                    res.write(jsonData);
                    res.end();
                } catch (e) {
                    console.error(e.message);
                }
            });
        }
    });
};

export let insertUser = (req: Request, res: Response) => {
    const user: db.User = {
        username: req.params.username,
        password: req.params.password,
        email: req.params.email,
    };

    if (() => {return db.createUser(user); }) {
        console.log('Insertion of new user was successful');
        res.status(200);
    }
    else {
        console.log('Insertion of new user failed');
        res.status(404);
    }
    res.end();
};

/*
export interface Course {
    id: number;
    department: string;
    number: number;
    section: string;
    year: number;
    term: string;
    description: string;
}
*/

export let insertCourse = (req: Request, res: Response) => {
    const course: db.Course = {
        id: 0,
        department: req.params.department,
        number: req.params.number,
        section: req.params.section,
        year: req.params.year,
        term: req.params.term,
        description: req.params.description
    };
    const courseID = db.createCourse(course);
    if ( courseID != 0) {
        console.log('Insertion of new course was successful');
        try {
            res.write(courseID);
        } catch (e) {
            console.error(e.message);
        }
        res.status(200);
    }
    else {
        console.log('Insertion of new user failed');
        res.status(404);
    }
    res.end();
};


export let insertUserCourse = (req: Request, res: Response) => {
    const course: db.Course = {
        id: req.params.courseID,
        department: req.params.department,
        number: req.params.number,
        section: req.params.section,
        year: req.params.year,
        term: req.params.term,
        description: req.params.description
    };
    const insertResult: boolean = db.addUserCourse(req.params.username, req.params.courseID);
    if (insertResult) {
        console.log('Insertion of new course to user with id ' + course.id + ' was successful');
        res.status(200);
    }
    else {
        console.log('Insertion of new course to user failed');
        res.status(404);
    }
    res.end();
};


export let findCourse = (req: Request, res: Response) => {
    const course: db.Course = {
        id: 0,
        department: req.params.department,
        number: req.params.number,
        section: req.params.section,
        year: req.params.year,
        term: req.params.term,
        description: '',
    };
    const courseID = db.findCourse(course);
    if ( courseID != -1) {
        console.log('Search of course was successful');
        try {
            res.write(courseID);
        } catch (e) {
            console.error(e.message);
        }
        res.status(200);
    }
    else {
        console.log('Seatch of course failed');
        res.status(404);
    }
    res.end();
};
