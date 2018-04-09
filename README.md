Artemis
======

## Architecture

The application is built on React.js for the front end. The backend is built on Express.js. PostgreSQL is our database of choice.

## Features

#### Login Page

The Login page is very minimalistic, authentication only requires a username and password to access an user's account.

##### **Sign Up**

Registration of an account requires an user to select the 'Sign Up' button which will redirect you to another page to input required details.

##### **Password Reset**

Resetting a password requires an user to select the 'Password Reset' button which will ask for the username whose password you want to reset
and the the email which you want the password to be sent to.

#### Course Selection Page

The Course Selection page allows the user to search up courses up to as early as 2015 and the current year. It utilizes SFU's "Course Outlines REST API"
to populate the dropdown menues and table lsit of selectable section types. 

##### **Clearing Form** 

Clear already selected options on the form to start over for pure convenience of users.

##### **Saving Courses to Timetable**

Courses can be saved to the user's timetable which can be accessed on the lower navigation bar available on every page except login.

##### **Searching Course Outlines**

A user may look up more details of a course; however, this feature only supports sections of type *'LEC'* because only lectures have a course outline supplied
by "SFU's Course Outlines REST API"

#### Timetable Page

A list of all sections that the user has selected on the Course Selection Page in order to preview their schedule.

Clicking on a course will navigate to Course Outline Page for details about the course.

Clicking on the X button will remove the course from the users list of courses.

###### **Removing Unwanted Courses**

Users may decide to opt out of an course by selecting the 'X' icon next to a course label on the timetable.

#### Course Outline Page

## Accounts

#### Test Accounts

| Username        | Password    |
| ------------- |:-------------:| 
| rca71    | rca71 | 

 

## Deployment

To deploy the website, go to deployment folder and run `vagrant up`. This will bring up the VM and build the website. 
Due to the VM might not have sufficient memory, the build process might fail. In that case, running `vagrant reload --provision` should fix the problem.
After deployment, navigate to `http://localhost:3376/` to access the application.

## Issues

## Important Notes

