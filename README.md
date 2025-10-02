# Happy Tortoise Blog

This is a blog site made with PayloadCMS - a Next.js content management system. The blog site is made for tortoise owners and lovers.

## Used Technologies

1. React - UI Framework
2. Next.js - React with SSR & SSG
3. Tailwind CSS - CSS styling framework
4. Shadcn - React UI component Library
5. PayloadCMS - Content Management System
6. MongoDB - Document-based NoSQL database

## Live Demo

You can try a live demo at [happy-tortoise-blog-two.vercel.app](https://happy-tortoise-blog-two.vercel.app/) hosted on [Vercel](https://vercel.com/)

## Local Setup Guide

### Prerequisites

The following software must be installed in order to run this project:

1. [Node.js](https://nodejs.org/)
2. A MongoDB instance

### Clone

If you haven't already, clone this repository locally on your PC.

### Install dependencies

To install project dependencies, open this project in the terminal and run `npm install`.

### Setting up environmental variables

You may add environmental variables in a `.env`. Use `.env.example` as a reference.

1. `DATABASE_URI` (required): A URI that points to a MongoDB instance.
2. `PAYLOAD_SECRET` (required): A secret key which Payload uses to encrypt user passwords.
3. `BLOB_READ_WRITE_TOKEN` (optional): A Vercel Blob token. This will prompt the app to use vercel Blog service for media uploads instead of storing them locally.
4. `ROOT_ACCOUNT_USERNAME` (optional): A username for the root account. If you do not specify this variable, you'll be asked to create a first user.
5. `ROOT_ACCOUNT_PASSWORD` (optional): A password for the root account. If you do not specify this variable, you'll be asked to create a first user.

### Start the server

To start the development, simply run `npm run dev` in your terminal.

Alternatively, you can run `npm run build` to build the project first, then run `npm start` to start your build. This gives you a faster performance.

### Final step

After you've run the Next.js server, you can visit http://localhost:3000/ to visit the site. You can also visit http://localhost:3000/admin to visit Payload's admin dashboard.
