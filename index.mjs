import { question } from "./utils/question.mjs";
import { generateMarkdown } from "./utils/generateMarkdown.mjs";
import inquirer from "inquirer";
import { writeFile } from "node:fs";

const questions = Object.values(question);

const writeToFile = async (fileName, data, callback) => writeFile(fileName, data, callback);

export const init = async () =>
{
    let answers;
    let generateMdConfirmation = false;

    while (generateMdConfirmation === false)
    {
        answers = await inquirer.prompt(questions);
        generateMdConfirmation = answers.confirm;
    }
    writeToFile(answers.outputFilepath, generateMarkdown(answers), (err) => {
        if (err) { throw err; }
        console.log(`README generated at: "${answers.outputFilepath}"`);
    });
};

// Function call to initialize app
init();

export default init;
