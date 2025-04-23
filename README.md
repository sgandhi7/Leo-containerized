# Welcome to the Comet Starter App!

The goal of this project is to provide a React with TypeScript starter application, which comes pre-configured with the USWDS-based [Comet Component Library](https://github.com/MetroStar/comet) as well as other tools to accelerate development. Some of these tools are as follows:

- Tooling: [Vite](https://vitejs.dev/)
- Platform: [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- Component Library: [Comet Component Library](https://github.com/MetroStar/comet)
- Data Visualization: [Victory Charts](https://formidable.com/open-source/victory/)
- State Management: [Recoil](https://recoiljs.org/)
- Form Validation: [React Hook Form](https://react-hook-form.com/)
- Unit Testing: [Jest](https://jestjs.io/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- Code Analysis: [ES Lint](https://eslint.org/)
- Code Formatting: [Prettier](https://prettier.io/)
- Authentication support: [Keycloak](https://www.keycloak.org/)

## Table of Contents

1. [Running the Project Locally](#running-the-project-locally)
2. [Running Unit Tests](#running-unit-tests)
3. [Running Code Quality Checks](#running-code-quality-checks)
5. [Contributing](#contributing)
6. [Next Steps](#next-steps)

## Running the Project Locally

1. To install dependencies, run the following:

```sh
npm install
```

2. To run locally with SSO, add a file called `.env.local` to the `comet-starter` directory. Copy and paste the template below and replace the placeholder values with your own (optional):

```
SSO_AUTHORITY=[SOME_KEYCLOAK_REALM_URL] # Ex: http://localhost:8088/realms/dev
SSO_CLIENT_ID=[SOME_CLIENT_ID] # Ex: dev-client
```

3. To start the app, run the following:

```sh
npm run dev
```

4. Build for production

```
npm run build
```

5. Run in a docker container

```
docker build -t leo-frontend .
docker run -p 8080:8080 leo-frontend

Access the app at http://localhost:8080
```

## Running Unit Tests

To make sure your changes do not break any unit tests, run the following:

```sh
npm run test
```

## Running Code Quality Checks

To make sure your changes adhere to additional code quality standards, run the following:

```sh
npm run lint
npm run format
```

You can also see the `.vscode/settings.json` file to find how to enable auto-formatting on save.


## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature_a`)
3. Commit your Changes (`git commit -m 'Added new feature_a'`)
4. Push to the Branch (`git push origin feature_a`)
5. Open a Pull Request

## Next Steps

The following provides a short list of tasks which are potential next steps for this project. These could be steps in making use of this baseline or they could be for learning purposes.

- [ ] Create github workflows to deploy to Azure
