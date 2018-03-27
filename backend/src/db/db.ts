// import { IMain, IDatabase } from 'pg-promise';
// import * as pgPromise from 'pg-promise';

const connectionString: string = 'postgres://root:root@localhost:7331/database';

const pgp = require('pg-promise')();
const db = pgp(connectionString);

interface User {
    username: string;
}

export function createTableUsers() {
    db.none('CREATE TABLE IF NOT EXIST users (username text NOT NULL PRIMARY KEY)')
      .catch((error: Error) => {
        global.console.log(error);
      });
}

export function createTableCourses() {
    db.none('CREATE TABLE IF NOT EXIST courses ' +
            '(' +
            'id integer PRIMARY KEY,' +
            'department varchar(4) NOT NULL,' +
            'number integer NOT NULL' +
            'section integer NOT NULL' +
            ')')
      .catch((error: Error) => {
        global.console.log(error);
      });
}

export function findUser(username: string): Promise<boolean> {
    return db.one('SELECT * FROM users WHERE username = $1', username)
             .then((data: User) =>  true)
             .catch((err: Error) => {
                 global.console.log(err);
                 return false;
             });
}

export function createUser(username: string): Promise<boolean> {
    return db.none('INSERT INTO users(username) VALUES($1)', username)
             .then(() => true)
             .catch((error: Error) => {
                 global.console.log(error);
                 return false;
             });
}