# :lock: Express JS & Mongo DB JWT Auth Boilerplate (CRUD)

This project serves as a boilerplate for setting up your own authentication with basic CRUD actions to interface with a Mongo DB database.

## :wrench: Included

- Data is sanatised to prevent XSS.
- Data is validated, e.g: min password length, checks for existing users to prevent creating a user with the same email.
- All routes are prepended with `/api/auth`.
- `/register` route, with: **name, email and password**.
- `/login` route, with: **email and password**.
- `/user` route, to retrieve the user from the DB.
- `/delete` route to delete the user from the DB.
- `/update` route to update information about the user (currently updates just the name).