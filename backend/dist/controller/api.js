'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
exports.getApi = (req, res) => {
    const courses = [{ name: 'CMPT470' }];
    res.writeHead(200);
    res.write(JSON.stringify(courses));
    res.end();
};
/*
GET /bin/wcm/course-outlines
REST wrapper for the Course Outlines data. Returns a list of years.
*/
exports.getYears = (req, res) => {
    http_1.default.get('http://www.sfu.ca/bin/wcm/course-outlines', (response) => {
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
                }
                catch (e) {
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
exports.getTerms = (req, res, year, registration) => {
    if (registration != undefined) {
        registration = '';
    }
    else {
        registration = '/' + registration;
    }
    http_1.default.get('http://www.sfu.ca/bin/wcm/course-outlines?' + year + registration, (response) => {
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
                }
                catch (e) {
                    console.error(e.message);
                }
            });
        }
    });
};
// Returns a list of course numbers that includes the course title for the given department.
exports.getCourseNumbers = (req, res, year, term, department) => {
    http_1.default.get('http://www.sfu.ca/bin/wcm/course-outlines?' + year + '/' + term + '/' + department, (response) => {
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
                }
                catch (e) {
                    console.error(e.message);
                }
            });
        }
    });
};
// Returns a list of course sections for the given course number.
exports.getCourseSections = (req, res, year, term, department, courseNumber) => {
    http_1.default.get('http://www.sfu.ca/bin/wcm/course-outlines?' + year + '/' + term + '/' + department + '/' + courseNumber, (response) => {
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
                }
                catch (e) {
                    console.error(e.message);
                }
            });
        }
    });
};
// Returns the content details of a specific course outline.
exports.getCourseOutline = (req, res, year, term, department, courseNumber, courseSection) => {
    http_1.default.get('http://www.sfu.ca/bin/wcm/course-outlines?' + year + '/' + term + '/' + department + '/' + courseNumber + '/' + courseSection, (response) => {
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
                }
                catch (e) {
                    console.error(e.message);
                }
            });
        }
    });
};
//# sourceMappingURL=api.js.map