# Issue Tracker built with NextJS

This is an issue tracker app I made with NextJS. It has featuers like authentication,
assigning issues to other users and all the basic CRUD operations.

## Stack

### Frontend

- [React](https://react.dev/) - Front-end library
- [Radix UI](https://www.radix-ui.com/) - Comoponet Library
- [Tailwindcss](https://tailwindcss.com/) - Makes me not hate my life writing CSS

### Backend

- [NextJS](https://nextjs.org/)
- [MySql](https://www.mysql.com/) - Database
- [Prisma](https://www.prisma.io/) - ORM
- [NextAuth](https://next-auth.js.org/) - Authentication
- [Zod](https://zod.dev/) - Data validation

## How to Run

Firstly, clone the repo:

```sh
git clone https://github.com/turtledev65/issue-tracker.git
```

Go into the newly created directory:

```sh
cd issue-tracker
```

Install dependencies using npm:

```sh
npm install
```

Provide the required enviroment variables in a `.env` file, use `.env.example` for refernce:

```
DATABASE_URL=""

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

And now you can run it on `localhost:300` using:

```sh
npm run dev
```

## Credits

- [react-icons](https://react-icons.github.io/react-icons/) - used for the icons
