import { lchmod } from 'fs';

// import { IMain, IDatabase } from 'pg-promise';
// import * as pgPromise from 'pg-promise';

//const connectionString: string = 'postgres://monkeys:root@csil-cpu470.csil.sfu.ca:3376/MonkeysDB';
const connectionString: string = 'postgres://ykprolcv:8KT4k4_Gzm2JGTwbWdx-5RbfmNvu0eGg@nutty-custard-apple.db.elephantsql.com:5432/ykprolcv';

const pgp = require('pg-promise')();
const db = pgp(connectionString);

export interface User {
    username: string;
    password: string;
    email: string;
}

export interface Course {
    id: number;
    department: string;
    number: number;
    section: string;
    year: number;
    term: string;
    description: string;
}

export function createTableUsers() {
    return db.none('CREATE TABLE IF NOT EXISTS users ' +
        '(' +
        'username text NOT NULL PRIMARY KEY,' +
        'password text NOT NULL,' +
        'email text' +
        ')')
    .then(() => {
        return true;
    })
    .catch((error: Error) => {
        global.console.log(error);
        return false;
    });
}

export function createTableCourses() {
    return db.none('CREATE TABLE IF NOT EXISTS courses ' +
            '(' +
            'id serial PRIMARY KEY,' +
            'department varchar(4) NOT NULL,' +
            'number integer NOT NULL,' +
            'section text NOT NULL,' +
            'year integer NOT NULL,' +
            'term text NOT NULL,' +
            'description text' +
            ')')
    .then(() => {
        return true;
    })
    .catch((error: Error) => {
        global.console.log(error);
        return false;
    });
}

export function createTableUserCourse() {
    return db.none('CREATE TABLE IF NOT EXISTS UserCourse ' +
        '(' +
        'username text NOT NULL,' +
        'id integer NOT NULL,' +
        'PRIMARY KEY (username, id)' +
        ')')
    .then(() => {
        return true;
    })
    .catch((error: Error) => {
        global.console.log(error);
        return false;
    });
}

/*
 * Accepts an user object. The object can have username and password for login
 * or just username for admin lookup
*/
export function findUser(user: User) {
    return db.one('SELECT * FROM users WHERE username = $1 AND password = $2', [user.username, user.password])
                 .then((data: User) => data)
                 .catch((err: Error) => {
                     global.console.log(err);
                     return { username: '', password: '', email: '' };
                 });
}

/*
 *Accepts user's email and sends off password to email
*/
export function emailUser(user: User) {
    return db.one('SELECT * FROM users WHERE username = $1 AND email = $2', [user.username, user.email])
                 .then((data: User) => data)
                 .catch((err: Error) => {
                     global.console.log(err);
                     return { username: '', password: '', email: '' };
                 });
}

/*
 * Create an user
 */
export function createUser(user: User) {
    return db.none('INSERT INTO users(username, password, email) VALUES($1, $2, $3)', [user.username, user.password, user.email])
             .then(() => true)
             .catch((error: Error) => {
                 global.console.log(error);
                 return false;
             });
}

/*
 * Create a course
 * return the created course's id
 */
export function createCourse(course: Course) {
    return db.none('SELECT * FROM courses WHERE department = $1 AND number = $2 AND section = $3 AND year = $4 AND term = $5',
                  [ course.department,
                    course.number,
                    course.section,
                    course.year,
                    course.term ])
            .then(() => {
                return db.one('INSERT INTO courses(department, number, section, year, term, description) VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
                              [ course.department,
                                course.number,
                                course.section,
                                course.year,
                                course.term,
                                course.description ])
                       .then((data: Course) => {
                           return data.id;
                       })
                       .catch((err: Error) => {
                           global.console.log(err);
                           return -1;
                       });
            })
            .catch((err: Error) => {
                return -1;
            });
}

/*
 * Return a course object
 * Couldn't find course if returned id is -1
 */
export function findCourse(course: Course) {
    return db.one('SELECT * FROM courses WHERE department = $1 AND number = $2 AND section = $3 AND year = $4 AND term = $5',
        [course.department,
        course.number,
        course.section,
        course.year,
        course.term])
        .then((data: Course) => {
            return data;
        })
        .catch((err: Error) => {
            return {
                id: -1
            };
        });
}

/*
 * Add a course to an user
 */
export function addUserCourse(username: string, courseID: number) {
    return db.none('INSERT INTO UserCourse(username, id) VALUES ($1, $2)', [username, courseID])
        .then(() => {
            return true;
        })
        .catch((err: Error) => {
            global.console.log(err);
            return false;
        });
}