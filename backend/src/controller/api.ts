'use strict';
import { Response, Request } from 'express';
import http from 'http';
import { isUndefined } from 'util';

export let getApi = (req: Request, res: Response) => {
    const courses = [{ name: 'CMPT470' }];
    res.writeHead(200);
    res.write(JSON.stringify(courses));
    res.end();
};



/*
GET /bin/wcm/course-outlines
REST wrapper for the Course Outlines data. Returns a list of years.
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

// Returns a list of courses or the current term
export let getDepartments = (req: Request, res: Response) => {
    http.get('http://www.sfu.ca/bin/wcm/course-outlines?' +  req.params.year + '/' + req.params.term, (response) => {
        if (response.statusCode != 200) {
            console.error('Could not fetch departments from server ' + req.params.year);
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
// Returns a list of course numbers that includes the course title for the given department.
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

// Returns a list of course sections for the given course number.
export let getCourseSections = (req: Request, res: Response, year: string, term: string, department: string, courseNumber: string) => {
    http.get('http://www.sfu.ca/bin/wcm/course-outlines?' + year + '/' + term + '/' + department + '/' + courseNumber, (response) => {
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
export let getCourseOutline = (req: Request, res: Response, year: string, term: string, department: string, courseNumber: string, courseSection: string) => {
    http.get('http://www.sfu.ca/bin/wcm/course-outlines?' + year + '/' + term + '/' + department + '/' + courseNumber + '/' + courseSection, (response) => {
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

*/