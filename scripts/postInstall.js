#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const process = require('process')

const routesFile = path.join(process.env.INIT_CWD, '/app/routes.js')

const lines =  [
  `/* ******************************************************************************************************************`,
  `The code below this line ensures that the tabs work. You can remove it if you want the default prototype kit.`,
  `Any additional routes – e.g. for branching logic or validating inputs – should go ABOVE this code.`,
  `A how-to for setting up tabs is available on GitHub:`,
  `https://github.com/jrmedd/govuk-prototype-kit-tabs-interface/blob/main/README.md#how-it-works`,
  `****************************************************************************************************************** */`,
  `const { useStructure, pathPattern } = require('govuk-prototype-kit-tabs-interface')`,
  `router.get('/', (req, res) => res.render('index.html'))`,
  `router.get(pathPattern, useStructure, () => null)`,
  `/* ******************************************************************************************************************`,
  `/* The code above this line ensures that the tabs work. You can remove it if you want the default prototype kit.`,
  `****************************************************************************************************************** */`,
  ``
]

const fileContent = fs.readFileSync(routesFile, 'utf8');
const fileLines = fileContent.split('\n'); // Split the file into lines
if (!fileLines.includes(lines[1])) {
  fileLines.splice(fileLines.length, 0, ...lines);
  const updatedContent = fileLines.join('\n');
  fs.writeFileSync(routesFile, updatedContent, 'utf8');
  console.info('Inserted dvsa-tabs code')
} 
else {
  console.info('Already insertd dvsa-tabs code')
}

