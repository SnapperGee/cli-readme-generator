// TODO: Include packages needed for this application
import { licenseValues } from "./utils/license.mjs";
import { generateMarkdown } from "./utils/generateMarkdown.mjs";
import inquirer from "inquirer";
import {resolve as resolvePath } from "node:path";
import { existsSync, lstat, lstatSync, writeFile } from "node:fs";

const PREFIX = ">>>";
const BLANK_OMIT_SUFFIX = "(leave blank to omit)";
const VALID_EMAIL_FORMAT_MSG = "Email in the format of username@domain.ext containing no white spaces expected";

// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        name: "title",
        message: "Title:",
        filter: (input) => Promise.resolve(input.trim()),
        validate: (input) => Promise.resolve(input.length !== 0 || "A non-blank title is required."),
        prefix: PREFIX
    },
    {
        type: "input",
        name: "description",
        message: "Description:",
        filter: (input) => Promise.resolve(input.trim()),
        default: "",
        prefix: PREFIX,
        suffix: BLANK_OMIT_SUFFIX
    },
    {
        type: "input",
        name: "installation",
        message: "Installation:",
        filter: (input) => Promise.resolve(input.trim()),
        default: "",
        prefix: PREFIX,
        suffix: BLANK_OMIT_SUFFIX
    },
    {
        type: "input",
        name: "usage",
        message: "Usage:",
        filter: (input) => Promise.resolve(input.trim()),
        default: "",
        prefix: PREFIX,
        suffix: BLANK_OMIT_SUFFIX
    },
    {
        type: "input",
        name: "contribution",
        message: "Contribution:",
        filter: (input) => Promise.resolve(input.trim()),
        default: "",
        prefix: PREFIX,
        suffix: BLANK_OMIT_SUFFIX
    },
    {
        type: "input",
        name: "tests",
        message: "Tests:",
        filter: (input) => Promise.resolve(input.trim()),
        default: "",
        prefix: PREFIX,
        suffix: BLANK_OMIT_SUFFIX
    },
    {
        type: "list",
        name: "license",
        message: "License:",
        choices: licenseValues.map(licenseValue => licenseValue.name),
        prefix: PREFIX
    },
    {
        type: "input",
        name: "github",
        message: "Github username:",
        filter: (input) => new Promise( (resolve) =>
        {
            const trimmedInput = input.trim();

            if (trimmedInput.length !== 0)
            {
                resolve(`https://github.com/${trimmedInput}`);
                return;
            }

            resolve(trimmedInput);
        }),
        default: "",
        prefix: PREFIX,
        suffix: BLANK_OMIT_SUFFIX
    },
    {
        type: "input",
        name: "email",
        message: "Email:",
        filter: (input) => Promise.resolve(input.trim()),
        validate: (input) => new Promise( (resolve) =>
        {
            // Accept empty input as valid.
            if (input.length === 0) {resolve(true); return; }

            // Make sure there's no whitespace
            if (input.search(/\s/g) !== -1) { resolve(VALID_EMAIL_FORMAT_MSG); return; }

            // Count number of @ and period characters
            const charCount = Array.from(input)
                .reduce((count, char) => {
                        if (char === "@") { ++count.att; }
                        if (char === ".") { ++count.period; }
                        return count;
                    },
                    {att: 0, period: 0}
                );

            if (charCount.att !== 1 || charCount.period === 0)
            {
                resolve(VALID_EMAIL_FORMAT_MSG);
                return;
            }

            resolve(true);
        }),
        prefix: PREFIX,
        suffix: BLANK_OMIT_SUFFIX
    },
    {
        type: "input",
        name: "filePath",
        message: "File name or path:",
        filter: (input) => new Promise( (resolve) =>
        {
            let formattedInput = input.trim();

            if (formattedInput.length !== 0)
            {
                if ( ! formattedInput.endsWith(".md"))
                {
                    formattedInput += ".md";
                }

                formattedInput = resolvePath(formattedInput);
            }

            resolve(formattedInput);
        }),
        validate: (input) => new Promise((resolve, reject) =>
        {
            if (input.length === 0)
            {
                resolve("A file name or path is required.");
                return;
            }

            if ( ! existsSync(input))
            {
                resolve(true);
            }
            else
            {
                lstat(input, (err, stats) =>
                {
                    if (err) { reject(err); return; }

                    if ( ! stats.isFile())
                    {
                        resolve(`Path points to non-file. Path must point to a file to overwrite or non-existing file to create a new one.`);
                        return;
                    }

                    resolve(true);
                });
            }
        }),
        prefix: PREFIX
    },
    {
        type: "confirm",
        name: "confirm",
        message: (answers) => {
            const answersString = Object.entries(answers).filter(entry => entry[1].length !== 0).map(entry => `${entry[0]}: "${entry[1]}"`).join("\n");
            return `\n${(answersString)}\n\nCreate markdown with the above properties?`;
        },
        prefix: ""
    }
];

// TODO: Create a function to write README file
const writeToFile = async (fileName, data, callback) => writeFile(fileName, data, callback);

// TODO: Create a function to initialize app
export const init = async () =>
{
    let answers;
    let generateMdConfirmation = false;

    while (generateMdConfirmation === false)
    {
        answers = await inquirer.prompt(questions);
        generateMdConfirmation = answers.confirm;
    }
    writeToFile(answers.filePath, generateMarkdown(answers), (err) => {
        if (err) { throw err; }

        console.log(`README generated at: "${answers.filePath}"`);
    });
};

// Function call to initialize app
init();

export default init;
