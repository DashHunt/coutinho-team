# Training Management API

## Overview

The Training Management API is a RESTful backend application designed to manage athletes, exercises, workout plans, and training execution.

The system allows coaches and personal trainers to create exercise libraries, build workout programs, assign plans to athletes, and track training progress over time.

This project aims to demonstrate backend engineering concepts such as:

* REST API Design
* Authentication & Authorization
* Database Modeling
* Business Rules Implementation
* Caching Strategies
* Testing
* Documentation
* Scalable Software Architecture


# Technical Challenge

Develop a Training Management API capable of supporting multiple coaches and athletes.

The application must provide endpoints for:

* User management
* Exercise management
* Workout creation
* Athlete management
* Training assignment
* Progress tracking


# Technologies

Required:

* Node.js
* TypeScript
* PostgreSQL
* Prisma ORM

Recommended:

* Redis
* Docker
* Swagger/OpenAPI
* Jest

# Business Context

A coach manages multiple athletes.

Each athlete can have multiple training plans.

Each training plan contains multiple workouts.

Each workout contains multiple exercises.

Each exercise contains execution parameters such as:

* Sets
* Repetitions
* Rest time
* Notes


# FUNCTIONAL REQUIREMENTS

## FR01 - User Registration

The system must allow user registration.
The user password must be hashed.

Fields:

{
  "name": "Arthur",
  "email": "arthur@email.com",
  "password": "123456"
}

## FR02 - Authentication

The system must support authentication using JWT.

Endpoint:

POST /auth/login

Return:

{
  "token": "jwt-token"
}

## FR03 - Create Exercise

Users must be able to create exercises.

Example:

{
  "name": "Bench Press",
  "muscleGroup": "Chest",
  "equipment": "Barbell",
  "description": "Flat barbell bench press"
}


## FR04 - List Exercises

The system must provide:

### Filters

* muscle group
* equipment
* search by name

Example:

GET /exercises?muscleGroup=Chest

## FR05 - Create Athlete

The system must allow coaches to register athletes.

Example:

{
  "name": "John Doe",
  "email": "john@email.com",
  "weight": 82,
  "height": 178
}

## FR06 - Create Training Plan

A coach must be able to create a training plan.

Example:

{
  "name": "Hypertrophy Program",
  "objective": "Muscle Gain"
}

## FR07 - Create Workout

A training plan may contain multiple workouts.

Example:

{
  "name": "Workout A",
  "day": "Monday"
}

## FR08 - Add Exercises To Workout

A workout must support multiple exercises.

Example:

{
  "exerciseId": "123",
  "sets": 4,
  "reps": "8-12",
  "restTime": 90
}

## FR09 - Assign Training Plan

The coach must be able to assign a training plan to an athlete.

Example:

{
  "athleteId": "123",
  "trainingPlanId": "456"
}

## FR10 - Register Workout Execution

Athletes must be able to record completed workouts.

Example:

{
  "workoutId": "123",
  "completed": true,
  "notes": "Great performance"
}

## FR11 - Training History

The system must maintain a complete workout history.

Endpoint:

GET /athletes/:id/history

## FR12 - Dashboard Statistics

The system must provide statistics.

Examples:

* Total Athletes
* Total Exercises
* Total Training Plans
* Completed Workouts
* Adherence Percentage

# NON-FUNCTIONAL REQUIREMENTS

## NFR01 - Pagination

All list endpoints must support pagination.

Example:

GET /athletes?page=1&limit=20

## NFR02 - Filtering

All resources must support filtering when applicable.

## NFR03 - Validation

All requests must be validated.

Examples:

* Required fields
* Email format
* Positive numbers


## NFR04 - Error Handling

Standardized error responses.

Example:

{
  "error": true,
  "message": "Athlete not found"
}

# Redis Requirements

Redis must be used for caching.

Cache:

GET /exercises
Cache Key: exercises:list
TTL: 3600 seconds

Cache:

GET /athletes/:id/history
Cache Key: athlete-history:{id}
TTL: 1800 seconds


# Security Requirements

* Password hashing using bcrypt
* JWT Authentication
* Protected routes
* Authorization checks


# Database Entities

## User

id
name
email
password
createdAt

---

## Athlete

id
name
email
weight
height
coachId

---

## Exercise

id
name
description
muscleGroup
equipment

---

## TrainingPlan

id
name
objective
coachId

---

## Workout

id
name
trainingPlanId

---

## WorkoutExercise

id
workoutId
exerciseId
sets
reps
restTime
notes

---

## WorkoutExecution

id
athleteId
workoutId
completedAt
notes

---

# API Documentation

Swagger/OpenAPI documentation must be available.

Endpoint:

/api-docs


# Testing Requirements

Unit Tests:

* Authentication
* Exercise creation
* Training assignment

Integration Tests:

* User login
* Create athlete
* Create workout
* Assign plan
* Register workout execution