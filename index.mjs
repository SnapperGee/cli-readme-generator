// TODO: Include packages needed for this application
import { licenseValues } from "./utils/license.mjs";
import { generateMarkdown } from "./utils/generateMarkdown.mjs";
import inquirer from "inquirer";
import {resolve as resolvePath } from "node:path";
import { existsSync, lstatSync, writeFile } from "node:fs";

const PREFIX = ">>>";
const BLANK_OMIT_SUFFIX = "(leave blank to omit)";
const VALID_EMAIL_FORMAT_MSG = "Email in the format of username@domain.ext containing no white spaces expected";

// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        name: "title",
        message: "Title:",
        filter: (input) => input.trim(),
        validate: (input) => input.length !== 0 || "A non-blank title is required.",
        prefix: PREFIX
    },
    {
        type: "input",
        name: "description",
        message: "Description:",
        filter: (input) => input.trim(),
        default: "",
        prefix: PREFIX,
        suffix: BLANK_OMIT_SUFFIX
    },
    {
        type: "input",
        name: "installation",
        message: "Installation:",
        filter: (input) => input.trim(),
        default: "",
        prefix: PREFIX,
        suffix: BLANK_OMIT_SUFFIX
    },
    {
        type: "input",
        name: "usage",
        message: "Usage:",
        filter: (input) => input.trim(),
        default: "",
        prefix: PREFIX,
        suffix: BLANK_OMIT_SUFFIX
    },
    {
        type: "input",
        name: "contribution",
        message: "Contribution:",
        filter: (input) => input.trim(),
        default: "",
        prefix: PREFIX,
        suffix: BLANK_OMIT_SUFFIX
    },
    {
        type: "input",
        name: "tests",
        message: "Tests:",
        filter: (input) => input.trim(),
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
        filter: (input) => {
            const trimmedInput = input.trim();

            if (trimmedInput.length !== 0)
            {
                return `https://github.com/${trimmedInput}`;
            }

            return trimmedInput;
        },
        default: "",
        prefix: PREFIX,
        suffix: BLANK_OMIT_SUFFIX
    },
    {
        type: "input",
        name: "email",
        message: "Email:",
        filter: (input) => input.trim(),
        validate: (input) => {
            // Accept empty input as valid.
            if (input.length === 0) { return true; }

            // Make sure there's no whitespace
            if (input.search(/\s/g) !== -1) { return VALID_EMAIL_FORMAT_MSG; }

            // Count number of @ and period characters
            const charCount = Array.from(input)
                .reduce((count, char) => {
                        if (char === "@") { ++count.att; }
                        if (char === ".") { ++count.period; }
                        return count;
                    },
                    {att: 0, period: 0}
                );

            if (charCount.att !== 1) { return VALID_EMAIL_FORMAT_MSG; }
            if (charCount.period === 0) { return VALID_EMAIL_FORMAT_MSG; }

            return true;
        },
        prefix: PREFIX,
        suffix: BLANK_OMIT_SUFFIX
    },
    {
        type: "input",
        name: "filePath",
        message: "File name or path:",
        filter: (input) => {
            let formattedInput = input.trim();

            if (formattedInput.length !== 0)
            {
                if ( ! formattedInput.endsWith(".md"))
                {
                    formattedInput += ".md";
                }

                formattedInput = resolvePath(formattedInput);
            }

            return formattedInput;
        },
        validate: (input) => input.length !== 0 || "A file name or path is required.",
        prefix: PREFIX
    },
    {
        type: "confirm",
        name: "confirm",
        message: (answers) => {
            const answersString = JSON.stringify(answers, undefined, 1);
            const formattedAnswersString = answersString.substring(1, answersString.length - 1);
            return `${(formattedAnswersString)}\nCreate markdown with the above properties?`;
        },
        prefix: PREFIX
    }
];

// TODO: Create a function to write README file
const writeToFile = async (fileName, data, callback) => writeFile(fileName, data, callback);

// TODO: Create a function to initialize app
const init = async () =>
{
    let answers;
    let generateMdConfirmation = false;

    while (generateMdConfirmation === false)
    {
        answers = await inquirer.prompt(questions);
        generateMdConfirmation = answers.confirm;
    }

    if (existsSync(answers.filePath))
    {
        const filePathLstat = lstatSync(answers.filePath);

        if ( ! filePathLstat.isFile())
        {
            console.log(`Path points to non-file: ${answers.filePath}`);
            process.exit(0);
        }

        const confirmOverwritePrompt = {
            type: "confirm",
            name: "overwrite",
            message: `File "${answers.filePath}" already exists. Overwrite?`,
            prefix: PREFIX
        };

        const overwriteConfirmation = await inquirer.prompt([confirmOverwritePrompt]);

        if (overwriteConfirmation.overwrite === true)
        {
            writeToFile(answers.filePath, generateMarkdown(answers), (err) =>
            {
                if (err)
                {
                    throw err;
                }

                console.log(`README generated at: "${answers.filePath}"`);
            });
        }
        else
        {
            console.log(`Not overwriting file: "${answers.filePath}"`);
        }
    }
    else
    {
        writeToFile(answers.filePath, generateMarkdown(answers), (err) => {
            if (err)
            {
                throw err;
            }

            console.log(`README generated at: "${answers.filePath}"`);
        });
    }
};

// Function call to initialize app
init();
