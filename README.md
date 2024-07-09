# Welcome to the Navigator UI!

The goal of this project is to provide Navigator users with a web-based tool for performing chat-based searches, utilizing Natural Language Processing (NLP) and in-context search.

## Table of Contents

1. [Running the Project Locally](#running-the-project-locally)
2. [Running Unit Tests](#running-unit-tests)
3. [Running Code Quality Checks](#running-code-quality-checks)

## Running the Project Locally

1. To install dependencies, run the following:

```sh
npm install
```

2. Add a file called `.env.local` to the `2024-intern-main` directory. Copy and paste the template below and replace the placeholder values with your own:

```.env
AZURE_API_URL=[SOME_API_URL] # Ex: https://some-api.azurecontainerapps.io
AZURE_API_KEY=[SOME_API_KEY] # Ex: 1234567890asdfghjkl
AZURE_MODEL_DEPLOYMENT=[SOME_MODEL_DEPLOYMENT] # Ex: deployment-ml-1
```

3. To start the app, run the following:

```sh
npm run dev
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
