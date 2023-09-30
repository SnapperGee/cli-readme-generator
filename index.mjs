import { question } from "./utils/question.mjs";
import { generateMarkdown } from "./utils/generateMarkdown.mjs";
import inquirer from "inquirer";
import { writeFile } from "node:fs";

const questions = Object.values(question);

const writeToFile = async (fileName, data, callback) => writeFile(fileName, data, callback);

export const init = async () =>
{
    let answers = await inquirer.prompt(questions);

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

    // inquirer.prompt(questions).then( (answers) =>
    // {
    //     if (answers.overwrite === false)
    //     {
    //         console.log(`Overwrite of "${answers.outputFilepath}" rejected. Aborting...`);
    //     }
    //     else if (answers.confirm === true)
    //     {
    //         writeToFile(answers.outputFilepath, generateMarkdown(answers), (err) => {
    //             if (err) { throw err; }
    //             console.log(`README generated at: "${answers.outputFilepath}"`);
    //         });
    //     }
    //     else
    //     {
    //         console.log(`Generation of "${answers.outputFilepath}" rejected. Aborting...`);
    //     }
    // });
};

init();

export default init;
