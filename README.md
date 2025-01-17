
## Flight Status and Booking System Simulation

This project is a flight status and booking system that allows users to book flights and receive email notifications about flight status changes. The system also provides an admin interface to update flight statuses and view all flights.

## Deployed Links

Both backend and frontend are deployed on the **Redhat Openshift**.

You can visit the application via the below links:-

Frontend: https://indigohack-frontend-aabhashgauda1-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/

Backend: https://indigohack-backend-aabhashgauda1-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/

## Code Branches

You can access the code on the following branches:-

**Backend Branch:** backendCode

**Frontend Branch:** frontendCode


## Tech Stack

**Frontend:** Next.js, TailwindCSS

**Backend:** Node.js, NestJS

**Database:** MongoDB

**Language:** TypeScript


## Features

- ## User Access
    - Signin
    - Signup
    - Book tickets
    - Receive email notifications for booked flight status changes
    - View Flight Booked Flight Status
    - Profile update

- ## Admin Access
    - Update flight statuses
    - View all flights

## Getting Started

- ## Prerequisites
    - Node.js (v14 or higher)
    - MongoDB
## Installation

Github clone

```bash
  git clone https://github.com/aagauda/indigo-hack.git
```

Backend Installation

```bash
  git checkout backendCode
  npm Install
  nest start --watch
```
Frontend Installation

```bash
  git checkout frontendCode
  npm Install
  npm run dev
```

Environment Variables

```bash
 DB_URL= your database url [mongodb]
 email_password="your password"
 mail="your email"
```




## Admin Login Credentials

Please use these credentials to login as a flight admin and update the flight status.

**Username:** admin@indigo.com

**Password:** admin123

## Role Based Access.

Here the user and admin has same login and based on the role the person is identified.

![image](https://github.com/user-attachments/assets/9df8ddfa-883e-4b75-8bf0-d0f3ed926569)


    
