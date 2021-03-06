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
    number: string;
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
            'number text NOT NULL,' +
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
        'id text NOT NULL,' +
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
    return db.one('SELECT * FROM users WHERE email = $1 AND username = $2', [user.email, user.username])
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

export function getUserCourses(username: string): Promise<string[]> {
    interface Result {
        id: string;
    }
    return db.manyOrNone('SELECT id FROM UserCourse WHERE username = $1', [username])
        .then((data: Result[]) => {
            return data.map(d => d.id);
        })
        .catch((err: Error): string[] => {
            return [];
        });
}

export function findCourseByID(id: number): Promise<Course> {
    return db.one('SELECT * FROM courses WHERE id=$1', [id])
             .then((data: Course) => {
                return data;
              })
             .catch((err: Error) => {
                global.console.log(`DBError: ${err}`);
                throw err;
              });
}

export function findCourseOfUser(username: string, course: Course): Promise<string> {
    interface Result {
        id: string;
    }
    return db.one('SELECT courses.id ' +
                  'FROM UserCourse INNER JOIN courses ON UserCourse.id = courses.id ' +
                  'WHERE UserCourse.username = $1 AND ' +
        'courses.department = $2 AND courses.number = $3 AND courses.section = $4 AND courses.year = $5 AND courses.term = $6',
        [username, course.department.toLowerCase(), course.number.toLowerCase(), course.section.toLowerCase(), course.year, course.term.toLowerCase()])
        .then((data: Result) => data.id)
        .catch((err: Error) => {
            global.console.log(`DBError: ${err}`);
            throw err;
        });
}

export function deleteUserCourse(username: string, id: string) {
    return db.none('DELETE FROM UserCourse WHERE username = $1 AND id = $2', [username, id]).catch((err: Error) => { throw err; });
}