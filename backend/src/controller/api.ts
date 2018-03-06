'use strict';
import { Response, Request } from 'express';

export let getApi = (req: Request, res: Response) => {
    const courses = [{name: 'CMPT470'}];
    res.writeHead(200);
    res.write(JSON.stringify(courses));
    res.end();
};