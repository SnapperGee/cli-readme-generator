import { question, overwriteQuestions } from "./utils/question.mjs";
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
            await inquirer.prompt(overwriteQuestions).then(overwriteAnswers =>
            {
                answers.outputFilepath = overwriteAnswers.outputFilepath;
                answers.overwrite = overwriteAnswers.overwrite;
                answers.confirm = overwriteAnswers.confirm;
            });
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
