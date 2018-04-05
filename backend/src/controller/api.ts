'use strict';
import { Response, Request } from 'express';
import http from 'http';
import { isUndefined } from 'util';
import { findUser, createUser, User  } from '../db/db';
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

// Returns if user password is correct or not
export let getUserPassword = (req: Request, res: Response) => {
    const user: User = { username: req.params.username, password: req.params.password, email: req.params.email};
    findUser(user).then((u: User) => {
        if (u.username == req.params.username) {
            res.writeHead(200);
            res.end();
        }
        else {
            res.writeHead(502);
            res.end();
        }
    });
};

// Creates user with defined credentials
export let createAccount = (req: Request, res: Response) => {
    const user: User = { username: req.params.username, password: req.params.password, email: req.params.email};
    createUser(user).then((result: boolean) => {
        if (result == true) {
            res.writeHead(200);
            res.end();
        }
        else {
            res.writeHead(502);
            res.end();
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
    console.log('insertCourse');
    const course: db.Course = {
        id: 0,
        department: req.params.department,
        number: req.params.number as number,
        section: req.params.section,
        year: req.params.year as number,
        term: req.params.term,
        description: '',
    };
    const courseID = db.createCourse(course);
    courseID.then((data: number) => {
        if (data != -1) {
            try {
                res.write('' + data);
                res.end();
            } catch (e) {
                console.error(e.message);
            }
        }
        else {
            console.log('insert course failed');
            try {
                res.write('-1');
                res.end();
            } catch (e) {
                console.error(e.message);
            }
        }
    });
};


export let insertUserCourse = (req: Request, res: Response) => {
    const insertResult: boolean = db.addUserCourse(req.params.username, req.params.courseID);
    if (insertResult) {
        console.log('Insertion of new course to user with id ' + req.params.courseID + ' was successful');
        res.write('1');
        res.end();
    }
    else {
        console.log('Insertion of new course to user failed');
        res.write('-1');
        res.end();
    }
    res.end();
};


export let findCourse = (req: Request, res: Response) => {
    console.log('findCourse');
    const course: db.Course = {
        id: 0,
        department: req.params.department,
        number: req.params.number as number,
        section: req.params.section,
        year: req.params.year as number,
        term: req.params.term,
        description: '',
    };
    const courseID = db.findCourse(course);
    courseID.then((data: db.Course) => {
        if (data.id != -1) {
            try {
                res.write('' + data.id);
                res.end();
            } catch (e) {
                console.error(e.message);
            }
        }
        else {
            console.log('Search of course failed');
            try {
                res.write('-1');
                res.end();
            } catch (e) {
                console.error(e.message);
            }
        }
    });
};
