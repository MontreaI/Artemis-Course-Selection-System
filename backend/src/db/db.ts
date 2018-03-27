// import { IMain, IDatabase } from 'pg-promise';
// import * as pgPromise from 'pg-promise';

//const connectionString: string = 'postgres://monkeys:root@csil-cpu470.csil.sfu.ca:3376/MonkeysDB';
const connectionString: string = 'postgres://ykprolcv:8KT4k4_Gzm2JGTwbWdx-5RbfmNvu0eGg@nutty-custard-apple.db.elephantsql.com:5432/ykprolcv';

const pgp = require('pg-promise')();
const db = pgp(connectionString);

interface User {
    username: string;
}

export function createTableUsers() {
    db.none('CREATE TABLE IF NOT EXISTS users ' +
        '(' +
        'username text NOT NULL PRIMARY KEY' +
        'password text NOT NULL' +
        ')')
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

export function findUser(username: string, password: string): Promise<boolean> {
    return db.one('SELECT * FROM users WHERE username = $1 AND password = $2', username, password)
             .then((data: User) =>  true)
             .catch((err: Error) => {
                 global.console.log(err);
                 return false;
             });
}

export function createUser(username: string, password: string): Promise<boolean> {
    return db.none('INSERT INTO users(username, password) VALUES($1, $2)', username, password)
             .then(() => true)
             .catch((error: Error) => {
                 global.console.log(error);
                 return false;
             });
}