# WebDriverIO E-commerce Test Automation Framework

## Overview
This project is a test automation framework using WebDriverIO designed specifically for the e-commerce website at https://www.saucedemo.com/. It includes automated tests for various functionalities like authentication, product page validation, cart operations, checkout process, and navigation through the burger menu.

## Prerequisites
Before setting up the project, ensure you have the following installed:
- Node.js (Latest Official Version 21.5)
- NPM (Generally comes with Node.js - Latest Official Version 10.2.5)

## Framework Structure
- **`test/`**: Contains all test files and test data.
- **`test/specs/`**: Contains all the test suites and test files for different features or components.
- **`test/data/`**: Contains all test data.
- **`pages/`**: Contains Page Object Models for each page of the application.
- **`docs/`**: Contains extensive documentation of the framework.
- **`allure-report/`**: Destination for test execution reports.
- **`allure-results/`**: Contains the raw data for the test execution reports.
- **`wdio.conf.js`**: The main configuration file for WebDriverIO.
- **`package.json`**: Contains all the dependencies and scripts for the project.
- **`README.md`**: Contains instructions for setting up and running the framework.
- **`.gitignore`**: Contains the files and directories that should be ignored by Git.
- **`.github/workflows/`**: Contains the GitHub Actions workflow file for CI.

## Setup Instructions
1. **Clone the Repository:**
- Clone the repository to your local machine using the following command:
```git clone https://github.com/nikosthermo/ecommerce-automation-framework.git```
- Navigate to the project directory using the following command:
```cd ecommerce-automation-framework```
2. **Install Dependencies:**
- Install all the dependencies using the following command:
```npm install```
3. **Run the Tests:**
- Run the following command to verify that the setup was successful:
```npm run wdio```
- The tests should run and the results should be displayed in the terminal.
4. **Run the Tests with Allure Report:**
```npm test```
- The tests should run and the allure report will be displayed in the browser.

## Continuous Integration (CI) Setup with GitHub Actions

### Overview:
The project is configured with a GitHub Actions workflow that automates running tests and generating reports on every push or pull request to the `main` branch. This ensures that all changes are tested, and quality is maintained.

### CI Workflow:
The `.github/workflows/node.js.yml` file in the repository contains the CI workflow definition. It specifies the steps taken by GitHub Actions to run the tests and generate reports.

### Triggering CI Runs:
The CI process is automatically triggered when pushing commits or creating pull requests against the `main` branch. The progress and results are presented in the 'Actions' tab of this GitHub repository.

### Viewing Test Results:
After a CI run completes, the execution result is directly presented in the GitHub Actions interface. Full test report is available as downloadable artifact. To view the report, download and extract the artifact, navigate to the extracted `allure-artifacts` directory and run the command `allure open allure-report`.
