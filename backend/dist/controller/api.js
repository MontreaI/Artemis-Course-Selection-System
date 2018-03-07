'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApi = (req, res) => {
    const courses = [{ name: 'CMPT470' }];
    res.writeHead(200);
    res.write(JSON.stringify(courses));
    res.end();
};
exports.getYears = (req, res) => {
    /*
      fetch ('http://www.sfu.ca/bin/wcm/course-outlines')
          .then(response => {
        if (response.ok) {
          res.write(response.json());
      res.end();
        } else {
          throw new Error('Could not fetch from server');
        }
      });
      */
    const courses = [{ name: 'CMPT470' }];
    res.writeHead(200);
    res.write(JSON.stringify(courses));
    res.end();
};
//# sourceMappingURL=api.js.map