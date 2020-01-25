const inquirer = require('inquirer');
const path = require("path");
const fs = require('fs');
const axios = require('axios');
const electronHTML = require('electron-html-to');
let colorBackground;

inquirer
    .prompt([{
        message: "Enter your Github username: ",
        name: "username"
    },
    {
        name: 'color',
        message: 'Enter your favorite color: ',
        default: 'blue'
    }])
    .then(answers => {
        console.log(answers.username);
        console.log(answers.color);
        const queryUrl = `https://api.github.com/users/${answers.username}`;
        colorBackground = answers.color;
        console.log(answers.color);
        console.log(colorBackground);

        axios.get(queryUrl).then(function(response) {
            return  writeAndAppendToFile(response);
            }).then(html => {
                console.log('converting');
                    const conversion = electronHTML({
                      converterPath: electronHTML.converters.PDF
                    })


                    conversion({ html }, function(err, result) {
                        if (err) {
                          return console.error(err);
                        }
              
                        result.stream.pipe(
                          fs.createWriteStream(path.join(__dirname, "resume.pdf"))
                        );
                        conversion.kill();
                      });
            })
    })


const writeAndAppendToFile = (response) => {
    return `<body style="text-align: center;">\n <div style="margin: 10px; padding: 10px; border:3px solid ${colorBackground};"><p> ${response.data.name}</p>\n</div>\n <img src="${response.data.avatar_url}">\n <div style="margin: 10px; padding: 10px; border:3px solid ${colorBackground};"> <p>${response.data.location}</p>\n <a href="${response.data.html_url}"></a>\n <a href="${response.data.blog}"></a>\n <p>${response.data.bio}</p>\n <p>Public Repositories: ${response.data.public_repos}</p>\n <p>Followers: ${response.data.followers}</p>\n <p>Following: ${response.data.following}</p>\n </div> </body>`; 
}