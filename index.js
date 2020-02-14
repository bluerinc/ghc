// modules
const express = require('express')
const axios = require('axios')
const dotenv = require('dotenv').config()

// express setup
const app = express()
const port = 3000
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// api elements
const accessToken = process.env.GH_API_KEY
const username = process.env.GH_USERNAME
const apiURL = "https://api.github.com"

// root route
app.get('/', (req, res) => {
    res.send('GitHub API Interaction 👋')
})

// route for receiving the webhook
app.post('/payload', async (req, res) => {

    // org and repo name provided in the body
    const repoFullName = req.body.repository.full_name

    // check for "created" action
    if (req.body.action !== "created") {
        res.send()
        return
    }

    try {
        // create a temporary file to create the master branch
        await axios.request({
            url: `${apiURL}/repos/${repoFullName}/contents/README.md`,
            method: 'PUT',
            headers: {
                Accept: "application/json",
                Authorization: "token " + accessToken
            },
            data: {
                "branch": "master",
                "message": "hello world",
                "content": "aGVsbG8gd29ybGQ="
            }
        })

        // protect the branch
        await axios.request({
            url: `${apiURL}/repos/${repoFullName}/branches/master/protection`,
            method: 'PUT',
            headers: {
                Accept: "application/vnd.github.luke-cage-preview+json",
                Authorization: "token " + accessToken
            },
            data: {
                "allow_deletions": false,
                "enforce_admins": null,
                "required_pull_request_reviews": {
                    "required_approving_review_count": 2
                },
                "restrictions": null,
                "required_status_checks": null
            }
        })

        // create the issue
        await axios.request({
            url: `${apiURL}/repos/${repoFullName}/issues`,
            method: 'POST',
            headers: {
                Accept: "application/json",
                Authorization: "token " + accessToken
            },
            data: {
                "title": "Branch protection now enabled on master",
                "body": `@${username} please note that 2 PR reviews are required before merging into \`master\`.`,
                "assignee": `${username}`
            }
        })

    } catch (error) {
        // log any errors (pending something a little more robust)
        console.log(error)
    }

    res.send()
})

// start the express server
app.listen(port, () => console.log(`Listening on port ${port}!`))