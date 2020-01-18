const inquirer = require('inquirer');
const fs = require('fs');
const axios = require('axios');
const electron = require('electron-html-to');

inquirer
    .prompt({
        message: "Enter your Github username: ",
        name: "username"
    })
    .then(function({ username }) {
        const queryUrl = `https://api.github.com/users/${username}`;
        const queryURL2 = `https://api.github.com/users/${username}/repos?per_page=100`

        axios.get(queryUrl).then(function(response) {
            console.log(response);
        })

        axios.get(queryURL2).then(function(response) {
            console.log(response);
        })
    })

//data.avatar_url
//data.name
//data.location
//data.html_url
//data.blog
//data.bio
//data.public_repos
//data.followers
//data.length => data[i].stargazers_count
//data.following