import { licenseValues } from "./license.mjs";
import { resolve as resolvePath } from "node:path";
import { existsSync, lstat } from "node:fs";

const PREFIX = ">>>";
const SUFFIX = ":";
const BLANK_OMIT_SUFFIX = "(leave blank to omit):";
const VALID_EMAIL_FORMAT_MSG = "Email in the format of username@domain.ext containing no white spaces expected";

const toString = (arg) => typeof arg === "string" ? `"${arg}"` : arg;

export const titleQuestion = Object.freeze({
    type: "input",
    name: "title",
    message: "Title",
    filter: (input) => Promise.resolve(input.trim()),
    validate: (input) => Promise.resolve(input.length !== 0 || "A non-blank title is required."),
    prefix: PREFIX,
    suffix: SUFFIX
});

export const descriptionQuestion =Object.freeze({
    type: "input",
    name: "description",
    message: "Description",
    filter: (input) => Promise.resolve(input.trim()),
    default: "",
    prefix: PREFIX,
    suffix: BLANK_OMIT_SUFFIX
});

export const installationQuestion = Object.freeze({
    type: "input",
    name: "installation",
    message: "Installation",
    filter: (input) => Promise.resolve(input.trim()),
    default: "",
    prefix: PREFIX,
    suffix: BLANK_OMIT_SUFFIX
});

export const usageQuestion = Object.freeze({
    type: "input",
    name: "usage",
    message: "Usage",
    filter: (input) => Promise.resolve(input.trim()),
    default: "",
    prefix: PREFIX,
    suffix: BLANK_OMIT_SUFFIX
});

export const contributionQuestion = Object.freeze({
    type: "input",
    name: "contribution",
    message: "Contribution",
    filter: (input) => Promise.resolve(input.trim()),
    default: "",
    prefix: PREFIX,
    suffix: BLANK_OMIT_SUFFIX
});

export const testsQuestion = Object.freeze({
    type: "input",
    name: "tests",
    message: "Tests",
    filter: (input) => Promise.resolve(input.trim()),
    default: "",
    prefix: PREFIX,
    suffix: BLANK_OMIT_SUFFIX
});

export const licenseQuestion = Object.freeze({
    type: "list",
    name: "license",
    message: "License",
    choices: licenseValues.map(licenseValue => licenseValue.name),
    prefix: PREFIX,
    suffix: SUFFIX
});

export const githubQuestion = Object.freeze({
    type: "input",
    name: "github",
    message: "Github username",
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
});

export const emailQuestion = Object.freeze({
    type: "input",
    name: "email",
    message: "Email",
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
});

export const outputFilepathQuestion = Object.freeze({
    type: "input",
    name: "outputFilepath",
    message: "File name or path",
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
    prefix: PREFIX,
    suffix: SUFFIX
 });

export const overwriteQuestion = Object.freeze({
    type: "confirm",
    name: "overwrite",
    when: (answers) => Promise.resolve(existsSync(answers.outputFilepath)),
    message: (answers) => `Output file path points to pre-existing file: "${answers.outputFilepath}". Overwrite?`,
    prefix: PREFIX,
    suffix: SUFFIX
 });

 export const confirmQuestion = Object.freeze({
    type: "confirm",
    name: "confirm",
    when: (answers) => Promise.resolve(answers.overwrite === undefined || answers.overwrite === true),
    message: (answers) => {
        const answersString = Object.entries(answers).filter(entry => entry[1].length !== 0).map(entry => `${entry[0]}: ${toString(entry[1])}`).join("\n");
        return `\n${answersString}\n\nCreate markdown with the above properties?`;
    },
    prefix: "",
    suffix: SUFFIX
 });

export const question = Object.freeze({
    title: titleQuestion,
    description: descriptionQuestion,
    installation: installationQuestion,
    usage: usageQuestion,
    contribution: contributionQuestion,
    tests: testsQuestion,
    license: licenseQuestion,
    github: githubQuestion,
    email: emailQuestion,
    outputFilepath: outputFilepathQuestion,
    overwrite: overwriteQuestion,
    confirm: confirmQuestion
});

export const allQuestions = Object.freeze(Object.values(question));

export const editAnswersQuestion = Object.freeze({
    type: "checkbox",
    name: "answersToEdit",
    message: "Choose properties to edit",
    when: (answers) => Promise.resolve(answers.confirm !== true),
    choices: (answers) => Promise.resolve(
        Object.entries(answers).map( (answerEntry) => ({
            name: `${answerEntry[0]}: ${toString(answerEntry[1])}`,
            value: answerEntry[0]
        }))
    ),
    prefix: PREFIX,
    suffix: SUFFIX
});

export default question;
