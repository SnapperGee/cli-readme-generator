/**
 * Module containing questions to pass to `inquirer`'s `prompt` function.
 * @module question
 */

import { licenseValues } from "./license.mjs";
import { resolve as resolvePath } from "node:path";
import { existsSync, lstat } from "node:fs";

const PREFIX = ">>>";
const SUFFIX = ":";
const BLANK_OMIT_SUFFIX = "(leave blank to omit):";
const VALID_EMAIL_FORMAT_MSG = "Email in the format of username@domain.ext containing no white spaces expected";

const toString = (arg) => typeof arg === "string" ? `"${arg}"` : arg;

/**
 * `inquirer.prompt` question to set the ***Title*** of the generated markdown file to insert as the h1 element at the
 * top of the page. A non-blank string is required and any leading and trailing white space is removed.
 */
export const titleQuestion = Object.freeze({
    type: "input",
    name: "title",
    message: "Title",
    filter: (input) => Promise.resolve(input.trim()),
    validate: (input) => Promise.resolve(input.length !== 0 || "A non-blank title is required."),
    prefix: PREFIX,
    suffix: SUFFIX
});

/**
 * `inquirer.prompt` question to set the ***Description*** section content of the generated markdown file. Answering
 * this question is optional and any leading and trailing whitespace is removed.
 */
export const descriptionQuestion =Object.freeze({
    type: "input",
    name: "description",
    message: "Description",
    filter: (input) => Promise.resolve(input.trim()),
    default: "",
    prefix: PREFIX,
    suffix: BLANK_OMIT_SUFFIX
});

/**
 * `inquirer.prompt` question to set the ***Installation*** section content of the generated markdown file. Answering
 * this question is optional and any leading and trailing whitespace is removed.
 */
export const installationQuestion = Object.freeze({
    type: "input",
    name: "installation",
    message: "Installation",
    filter: (input) => Promise.resolve(input.trim()),
    default: "",
    prefix: PREFIX,
    suffix: BLANK_OMIT_SUFFIX
});

/**
 * `inquirer.prompt` question to set the ***Usage*** section content of the generated markdown file. Answering this
 * question is optional and any leading and trailing whitespace is removed.
 */
export const usageQuestion = Object.freeze({
    type: "input",
    name: "usage",
    message: "Usage",
    filter: (input) => Promise.resolve(input.trim()),
    default: "",
    prefix: PREFIX,
    suffix: BLANK_OMIT_SUFFIX
});

/**
 * `inquirer.prompt` question to set the ***Contribution*** section content of the generated markdown file. Answering
 * this question is optional and any leading and trailing whitespace is removed.
 */
export const contributionQuestion = Object.freeze({
    type: "input",
    name: "contribution",
    message: "Contribution",
    filter: (input) => Promise.resolve(input.trim()),
    default: "",
    prefix: PREFIX,
    suffix: BLANK_OMIT_SUFFIX
});

/**
 * `inquirer.prompt` question to set the ***Tests*** section content of the generated markdown file. Answering this
 * question is optional and any leading and trailing whitespace is removed.
 */
export const testsQuestion = Object.freeze({
    type: "input",
    name: "tests",
    message: "Tests",
    filter: (input) => Promise.resolve(input.trim()),
    default: "",
    prefix: PREFIX,
    suffix: BLANK_OMIT_SUFFIX
});

/**
 * `inquirer.prompt` question to set the ***License*** section content of the generated markdown file. Answering this
 * question is optional and any leading and trailing whitespace is removed.
 */
export const licenseQuestion = Object.freeze({
    type: "list",
    name: "license",
    message: "License",
    choices: licenseValues.map(licenseValue => licenseValue.name),
    prefix: PREFIX,
    suffix: SUFFIX
});

/**
 * `inquirer.prompt` question to use as the **Github URL contact** in the ***Questions*** section content of the
 * generated markdown file. Answering this question is optional and any leading and trailing whitespace is removed.
 */
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

/**
 * `inquirer.prompt` question to use as the **email contact** in the ***Questions*** section content of the
 * generated markdown file. Answering this question is optional and any input is checked to not contain any whitespace
 * and at least 1 period, `'.'`, character and 1 att, `'@'`, character. Any leading and trailing whitespace is removed.
 */
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

/**
 * `inquirer.prompt` question to set the output file path of the generated markdown file. The input has `".md"` appended
 * to it if it doesn't already end with it and is then passed to {@link resolvePath path.resolve}. A non empty string
 * that results in a path pointing to a file or doesn't exit yet is required.
 */
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

 /**
  * `inquirer.prompt` question to confirm overwriting the file the {@link outputFilepathQuestion} points to (if
  * applicable).
  */
export const overwriteQuestion = Object.freeze({
    type: "confirm",
    name: "overwrite",
    when: (answers) => Promise.resolve(existsSync(answers.outputFilepath)),
    message: (answers) => `Output file path points to pre-existing file: "${answers.outputFilepath}". Overwrite?`,
    prefix: PREFIX,
    suffix: SUFFIX
 });

 /**
  * `inquirer.prompt` question to confirm the values all answered prompt questions.
  */
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

 /**
  * An object containing all questions of the {@link question} module ***except the {@link editAnswersQuestion}***.
  */
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

/**
 * A frozen array of all the values of the {@link question} object.
 */
export const allQuestions = Object.freeze(Object.values(question));

/**
 * `inquirer.prompt` question to select which prompt answers to edit.
 */
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
