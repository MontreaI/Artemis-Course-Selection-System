'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApi = (req, res) => {
    const courses = [{ name: 'CMPT470' }];
    res.writeHead(200);
    res.write(JSON.stringify(courses));
    res.end();
};
//# sourceMappingURL=api.js.map