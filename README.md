# Air Conditioner Remote

## Introduction

**Air Conditioner Remote** is An innovative IoT system that allows you to control your air conditioner effortlessly using the MQTT protocol.

## ERD

Entity Relationship Diagram (ERD) :


## Installation

To set up this project, please ensure that your system meets the following requirements:

- NodeJS
- Node Package Manager (NPM)
  
After confirming that your system meets the requirements, follow these steps to set up the project:

1. Install the necessary dependencies by running the following command in your project directory:

    ```bash
    npm install
    ```

2. Copy the `.env.example` file and rename it to `.env`. Make sure to configure the `.env` file with the necessary settings.

3. Generate an application key by running:

    ```bash
    node ace key:generate
    ```

4. Migrate the database tables by running:

    ```bash
    node ace migration:run
    ```

5. Seed the database with initial data by running:

    ```bash
    node ace db:seed
    ```

## API Doc

Application Programming Interface (API) documentation for mobile applications:


