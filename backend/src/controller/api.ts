'use strict';
import { Response, Request } from 'express';

export let getApi = (req: Request, res: Response) => {
    const courses = [{name: 'CMPT470'}];
    res.writeHead(200);
    res.write(JSON.stringify(courses));
    res.end();
};

export let getYears = (req: Request, res: Response) => {
  
	fetch ('http://www.sfu.ca/bin/wcm/course-outlines')
	    .then(response => {
      if (response.ok) {
        res.write(response.json());
	res.end();
      } else {
        throw new Error('Could not fetch from server');
      }
    });
    
};

