'use strict';
import { Response, Request } from 'express';
import http from 'http';

export let getApi = (req: Request, res: Response) => {
    const courses = [{name: 'CMPT470'}];
    res.writeHead(200);
    res.write(JSON.stringify(courses));
    res.end();
};

export let getYears = (req: Request, res: Response) => {
    http.get('http://www.sfu.ca/bin/wcm/course-outlines', (response) => {
        if (response.statusCode != 200) {
            throw new Error('Could not fetch from server');

        }
        else {
            let jsonData = '';
            response.on('data', (chunk) => jsonData += chunk);
            response.on('end', () => {
                res.write(jsonData);
                res.end();
            });
        }
    });
};