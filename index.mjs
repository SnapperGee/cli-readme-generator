import { question } from "./utils/question.mjs";
import { generateMarkdown } from "./utils/generateMarkdown.mjs";
import inquirer from "inquirer";
import { writeFile } from "node:fs";

const questions = Object.values(question);

const writeToFile = async (fileName, data, callback) => writeFile(fileName, data, callback);

export const init = () =>
{
    inquirer.prompt(questions).then( async (answers) =>
    {
        while (answers.overwrite === false)
        {
            delete answers.outputFilepath;
            delete answers.overwrite;
            answers = await inquirer.prompt([question.outputFilepath, question.overwrite, question.confirm], answers);
        }

        if (answers.confirm === true)
        {
            writeToFile(answers.outputFilepath, generateMarkdown(answers), (err) => {
                if (err) { throw err; }
                console.log(`README generated at: "${answers.outputFilepath}"`);
            });
        }
        else
        {
            console.log(`Generation of "${answers.outputFilepath}" rejected. Aborting...`);
        }
    });
};

init();

export default init;
