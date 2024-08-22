# Airbnb Clone

Welcome to the Airbnb Clone project! This project is a full-stack web application that replicates core features of the Airbnb platform, allowing users to browse, book, and manage properties.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [Acknowledgements](#acknowledgements)

## Overview

This project is an Airbnb clone built using a modern web development stack. The application allows users to explore properties, book stays, manage bookings, and host properties, similar to the functionalities provided by Airbnb.

## Features

- **User Authentication:** Secure sign-up, log-in, and log-out functionalities.
- **Property Listings:** Users can view detailed information about various properties.
- **Booking System:** Users can book available properties for specific dates.
- **Hosting:** Users can list their properties for others to book.
- **Search Functionality:** Search for properties based on location, date, and other filters.
- **Reviews and Ratings:** Users can leave reviews and ratings for properties.

## Tech Stack

- **Frontend:** React.js, TypeScript, Tailwind CSS
- **Backend:** Nest.js, TypeScript
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** Passport.js, JWT
- **Deployment:** Docker

## Database Schema

The database schema is designed to support the main functionalities of the application, including user management, property listings, and bookings.

- **Users Table:** Stores user information such as name, email, and password.
- **Properties Table:** Contains details about each property, including title, description, location, price, and host information.
- **Bookings Table:** Manages booking information, including the property booked, user who booked, and booking dates.
- **Reviews Table:** Stores reviews and ratings for properties.

## Acknowledgements

- [React](https://reactjs.org/)
- [Nest.js](https://nestjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Airbnb](https://www.airbnb.com/) for the original inspiration.