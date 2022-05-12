# Unios Technical Exercise

This project represents progress toward a very basic Lesson Scheduling system. Using this application, an end-user should be able to create classes by selecting a teacher, a room, and an available time-slot (session).

### Before starting

This application has been developed using [Next.js](https://nextjs.org/), some basic [React](https://reactjs.org/), [Prisma](https://www.prisma.io/), and a [PostgreSQL](https://www.postgresql.org/) database. You may not be familiar with all or any of these technologies, and that is okay! Discovery and investigation are intrinsic parts of the exercise. We feel that this project is at a level that can be reasonably well understood with some help from the corresponding library documentation.

Please ensure your development environment has the following tools available in your `$PATH`:

-   [ ] Node (at least v14.18.0)
-   [ ] Docker

### Setup

1. [Fork](https://github.com/unioslight/unios-technical-exercise/fork) the repository to your personal GitHub account
1. Clone the repository to your local development workspace
1. Install project dependencies:
    ```bash
    yarn install
    ```
1. Create a container to run a development PostgreSQL instance (Note that the following will expose the database through port `5439`):
    ```bash
    docker pull postgres;
    docker run --name unios-exercise-db -e POSTGRES_PASSWORD=password -d -p 5439:5432 postgres;
    ```
1. Create the development database for the web application:
    ```bash
    yarn prisma migrate reset;
    ```
1. You can now run the local development server:
    ```bash
    yarn next;
    ```

### Exercises

#### Task 1

Currently, the form allows users to specify a name and select a teacher, room, and time slot for a proposed class. However, hitting the submit button throws an HTTP 500 error because the corresponding API endpoint has not yet been implemented.

Please implement the `api/classes` REST endpoint(s) so that the following functional requirements are met:

-   [ ] A class must specify a Name, Teacher, Room and Session in order to be created
-   [ ] The system must prevent teachers from being double-booked for the same session
-   [ ] The system must prevent rooms from being double-booked for the same session
-   [ ] A class is saved/persisted in the system if each of the above requirements is met

#### Task 2

A seperate system requires an understanding of the lessons a teacher is assigned to.

Create a GET endpoint that returns all of the classes for a given teacher. Please note that this should be a dedicated endpoint (i.e. it should not leverage the built-in search filter capability of the repositories).

### Submitting your solution

To submit your solution for review, please create a pull request from your fork to the upstream branch. Please leave as much of your git history in-tact (i.e. please do not squash your commits).

### Resources

-   [Next.js documentation](https://nextjs.org/docs/getting-started)
-   [Prisma documentation](https://www.prisma.io/docs/concepts/components/prisma-client)
-   Feel free to use Google and StackOverflow to your heart's content!

### For Interviewees

If you are undertaking this exercise as part of a an interview, you may have been provided with a different set of exercises from those listed above. Additionally, please take some time to look over the codebase as a whole aside from the exercise tasks. We will be interested in hearing your opinions ideas surrounding this codebase including:

-   aspects of the codebase that you like or dislike, and the reasons why
-   any facets of the solution architecture that you would change or that you feel could be improved
-   any commentary on style, tech-stack, libraries used, etc.

### Contact

We welcome any comments, suggestions or feedback from participants. Feel free to drop us a line at `devops@unios.com`.
