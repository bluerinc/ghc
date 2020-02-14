# GitHub API Interaction

A Node / Express endpoint that exposes a single route designed for invocation via a [webhook](https://en.wikipedia.org/wiki/Webhook) that is triggered upon the creation of a new repository within a pre-configured GitHub organization. When called, it both restricts access to the `master` branch and provides a notification by assigning (and notifying within the body) a new GitHub Issue.

## Installation

The service runs on [Node.js](https://nodejs.org) which can be downloaded [here](https://nodejs.org/en/download/). Once installed, you'll be able to install the dependencies with the following:

```
npm i
```

You'll also need to create a file called `.env` in the root of the project. This contains both the GitHub API key and the username of the individual you'd like to be notified upon creation of a repository. Copy and paste the following and update the API key and username respectively. Note that they don't need to be wrapped in quotes.

```
GH_API_KEY=yourapikey
GH_USERNAME=yourusername
```

## Running Locally

With the necessary dependencies in place, you're now ready to run the service. Use the following command to start the service:

```
node index.js
```

## Testing

To test the service from your local development environment, you can use [ngrok](https://ngrok.com) to temporarily make your locally running web server publicly available. Once downloaded, you'll be able to run with the following command (for Unix-based Operating Systems) from the root of your project.

```
/Applications/ngrok http 80
```

This will open an interface-tunnel such as `http://066c8c2f.ngrok.io/` that you can paste into GitHub to test the webhook. Note that you'll need to include the `/payload` route, so the full URL will look something like this `http://066c8c2f.ngrok.io/payload`.

## Deploying 

To deploy to something more permanent (such as [Heroku](https://www.heroku.com/), [AWS Lambda](https://aws.amazon.com/lambda/), or [Azure Functions](https://azure.microsoft.com/en-us/services/functions/)) the code is largely ready to go. You'll just need to follow the respective guidelines to setup the environment variables, install the dependencies, etc.

## Dependencies

Note that the following 3rd party frameworks and libraries were used:

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [Axios](https://www.npmjs.com/package/axios)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [body-parser](https://www.npmjs.com/package/body-parser)

## Questions

Any questions, feel free to reach out at [kevin@bluer.com](kevin@bluer.com).