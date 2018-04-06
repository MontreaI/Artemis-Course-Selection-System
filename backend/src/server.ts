import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';

import * as apiController from './controller/api';
import * as db from './db/db';

const port = process.env.port || 3376;

const app = express();
app.use(express.json());
app.use(express.urlencoded( { extended: false} ));
app.use(cors());
cors({origin: true});

app.set('port', port);

// General Course Information GET requests
app.get('/years', apiController.getYears);
app.get('/terms/:year', apiController.getTerms);
app.get('/terms/:year/:term', apiController.getDepartments);
app.get('/terms/:year/:term/:department', apiController.getCourseNumbers);
app.get('/terms/:year/:term/:department/:courseNumber', apiController.getCourseSections);
app.get('/terms/:year/:term/:department/:courseNumber/:courseSection', apiController.getCourseOutline);
app.get('/users/:username/:password/:email', apiController.getUserPassword);

// General Database Information
app.get('/insert/user/:username/:password/:email', apiController.insertUser);
app.get('/insert/course/:department/:number/:section/:year/:term', apiController.insertCourse);
app.get('/get/userCourse/:department/:number/:section/:year/:term', apiController.findCourse);
app.get('/insert/userCourse/:username/:department/:number/:section/:year/:term', apiController.insertUserCourse);

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
app.get('/', function(req, res, next) {
    global.console.log('got root request');
});

http.createServer(app).listen(port);
console.log('running on port', port);

db.createTableCourses().then((result: boolean) => {
    if (result) {
        db.createTableUsers().then((result: boolean) => {
            if (result) {
                db.createTableUserCourse().then((result: boolean) => {
                    if (!result) {
                        global.console.log("couldn't create table usercourse");
                    }
                });
            } else {
                global.console.log("couldn't create table users");
            }
        });
    } else {
        global.console.log("couldn't create table courses");
    }
});