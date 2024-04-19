# Welcome to the Horizon Hunt UI!

The goal of this project is to provide [Horizon Hunt](https://github.com/MetroStar/maiden-ui) users with a web-based tool for performing investigations against a dataset, utilizing Natural Language Processing (NLP) and in-context search.

## Table of Contents

1. [Running the Project Locally](#running-the-project-locally)
2. [Running Unit Tests](#running-unit-tests)
3. [Running Code Quality Checks](#running-code-quality-checks)
4. [Running End-to-End (E2E) Tests](#running-end-to-end-e2e-tests)
5. [Publishing a new Docker Image](#publishing-a-new-docker-image)

## Running the Project Locally

1. To install dependencies, run the following:

```sh
npm install
```

2. Add a file called `.env.local` to the `maiden-ui` directory. Copy and paste the template below and replace the placeholder values with your own:

```.env
TXTAI_API_URL=[SOME_API_URL] # Ex: https://some-api.azurecontainerapps.io
```

3. To run locally with Azure AD SSO, add the following to your `.env.local` (optional):

```
SSO_TENANT_ID=[SOME_AZURE_AD_TENANT_ID] # Ex: 71e3a698-4ce5-4689-abf7-9a19e9de8a65
SSO_CLIENT_ID=[SOME_AZURE_AD_CLIENT_ID] # Ex: 8cf26978-03e0-4e01-a70e-15791cc80b70
```

4. To start the app, run the following:

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

## Running End-to-End (E2E) Tests

Note: running E2E tests requires the app to be running as well, run the following:

```sh
npm run e2e
```

## Publishing a new Docker Image

To publish a new docker image to the Azure Container Registry, perform the following:

```sh
# Login to Azure and ACI
az login
az acr login --name maiden

# Build and Publish image
docker build . -t horizon-hunt-ui
docker tag horizon-hunt-ui maiden.azurecr.io/horizon-hunt/ui:[SOME_TAG] # Ex: 1.0.99
docker push maiden.azurecr.io/horizon-hunt/ui:[SOME_TAG] # Ex: 1.0.99
```
