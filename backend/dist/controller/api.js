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

data structure:

[
  {"value":"2014"},
  {"value":"2015"}
]

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

data structure:

[
  {value: "spring"},
  {value: "summer"},
  {value: "fall"},
]

*/
exports.getTerms = (req, res) => {
    http_1.default.get('http://www.sfu.ca/bin/wcm/course-outlines?' + req.params.year, (response) => {
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
                }
                catch (e) {
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
exports.getDepartments = (req, res) => {
    http_1.default.get('http://www.sfu.ca/bin/wcm/course-outlines?' + req.params.year + '/' + req.params.term, (response) => {
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
                }
                catch (e) {
                    console.error(e.message);
                }
            });
        }
    });
};
//# sourceMappingURL=api.js.map