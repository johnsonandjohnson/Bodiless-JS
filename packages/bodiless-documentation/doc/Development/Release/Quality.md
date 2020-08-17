# Code Quality

## Standards

The BodilessJS Javascript coding standards are based on the
[AirBnB syle guide](https://github.com/airbnb/javascript). Please use the
provided [.eslintrc.json](./.eslintrc.json) to scan your code to ensure
compliance. This can be done by executing
```
npm run lint
```
from the root level, we are linting all project at the same time.

To speedup validation process you may scan only changed files:
```
npm run lint-change
```
This command will scan your changes in **current** branch against **master** branch.

To automate this process we are using
[husky](https://www.npmjs.com/package/husky) package and git hook **pre-push**.
Husky will run code scan before each git push and stop push if any code style
error detected. It's allow us keep code in compliance with code style.

*Note!* In case of urgent situation you can skip code validation using key: `--no-verify`

## Scanning with Sonarqube

The BodilessJS repo contains configurations for scanning using
[SonarQube](https://www.sonarqube.org/), and will soon be scanned
regularly on [SonarCloud](https://sonarcloud.io). For now, you can trigger a scan locally targeting
your own SonarQube server instance:

1. Install the sonar scanner locally following
   [these instructions](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/)
2. Generate a user token in your SonarQube server instance by following
   [these instructions](https://docs.sonarqube.org/latest/user-guide/user-token/).
3. Be sure you have added the url of your SonarQube server and your user token to
   your local `{install directory}/conf/sonar-scanner.properties` file, eg:
   ```
   #Configure here general information about the environment, such as SonarQube server connection details for example
   #No information about specific project should appear here
   
   #----- Default SonarQube server
   sonar.host.url=https://your-sonar-server.com
   sonar.login=your_user_token
   ```
4. `cd` to the Bodiless-JS project root.
5. To ensure test coverage reports are accurate, run tests with coverage enabled:
   ```
   > npm run test -- --coverage
   ```
6. Run the sonar scanner:
   ```
   > sonar-scanner
   ```
7. View scan results in your SonarQube server. The project key will be
   `johnsonandjohnson/Bodiless-JS`. The project name is `Bodiless-JS`.
