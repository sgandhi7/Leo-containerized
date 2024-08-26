# Welcome to the Navigator UI!

The goal of this project is to provide Navigator users with a web-based tool for performing chat-based searches, utilizing Natural Language Processing (NLP) and in-context search.

## Table of Contents

1. [Running the Project Locally](#running-the-project-locally)
2. [Running Unit Tests](#running-unit-tests)
3. [Running Code Quality Checks](#running-code-quality-checks)
4. [Publishing a new Docker Image](#publishing-a-new-docker-image)

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
SSO_TENANT_ID=[SOME_TENANT_ID] # Ex: 1234abcd-12ab-34cd-56ef-123456abcdef
SSO_CLIENT_ID=[SOME_CLIENT_ID] # Ex: 4321dcba-21ba-43dc-65fe-654321fedcba
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

## Publishing a new Docker Image

To publish a new docker image to the Azure Container Registry, perform the following:

```sh
# Login to Azure and ACI
az login
az acr login --name navigator

# Build and Publish image
docker build . -t navigator-ui
docker tag navigator-ui navigator.azurecr.io/navigator/ui:1.3.0
docker push navigator.azurecr.io/navigator/ui:1.3.0
```
