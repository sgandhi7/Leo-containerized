# Welcome to the MAIDEN UI!

The goal of this project is to provide [MAIDEN](https://github.com/MetroStar/maiden-ui) users with a web-based tool for performing investigations against a dataset, utilizing Natural Language Processing (NLP) and in-context search.

## Table of Contents

1. [Running the Project Locally](#running-the-project-locally)
2. [Running the txtai API Locally with Docker](#running-the-txtai-api-locally-with-docker)
3. [Running Unit Tests](#running-unit-tests)
4. [Running Code Quality Checks](#running-code-quality-checks)
5. [Running End-to-End (E2E) Tests](#running-end-to-end-e2e-tests)

## Running the Project Locally

1. To install dependencies, run the following:

```sh
npm install
```

2. Add a file called `.env.local` to the `maiden-ui` directory. Copy and paste the template below and replace the placeholder values with your own:

```.env
TXTAI_API_URL=http://0.0.0.0:8000
```

**NOTE:** To run with mocked data, leave out the above env variable.

3. To start the app, run the following:

```sh
npm run dev
```

## Running the txtai API Locally with Docker

1. To build the image, run the following:

```sh
cd api
docker build . -t txtai-api
```

2. To start the api, run the following:

```sh
docker run -p 8000:8000 --rm -it txtai-api
```

## Running Unit Tests

To make sure your changes do not break any unit tests, run the following:

```sh
npm run test
```

Ensure to review the coverage directory for code coverage details.

```sh
npm run coverage
```

## Running Code Quality Checks

To make sure your changes adhere to additional code quality standards, run the following:

```sh
npm run lint
npm run format
```

You can also see the `.vscode/settings.json` file to find how to enable auto-formatting on save.

## Running End-to-End (E2E) Tests

Note: running E2E tests requires the app to be running as well, run the following:

```sh
npm run e2e
```
