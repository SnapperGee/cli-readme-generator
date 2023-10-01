import { question, overwriteQuestions, editAnswersQuestion } from "./utils/question.mjs";
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
            await inquirer.prompt(overwriteQuestions).then( (overwriteAnswers) =>
            {
                answers.outputFilepath = overwriteAnswers.outputFilepath;
                answers.overwrite = overwriteAnswers.overwrite;
                answers.confirm = overwriteAnswers.confirm;
            });
        }

        while (answers.confirm === false)
        {
            delete answers.confirm;

            await inquirer.prompt(editAnswersQuestion, answers).then( async (answersToEdit) =>
            {
                await inquirer.prompt(questions.filter(question => answersToEdit.editAnswers.includes(question.name))).then( (newAnswers) =>
                {
                    for (const newAnswer of Object.entries(newAnswers))
                    {
                        answers[newAnswer[0]] = newAnswer[1];
                    }

                });

                answers = await inquirer.prompt(question.confirm, answers);
            });
        }

        writeToFile(answers.outputFilepath, generateMarkdown(answers), (err) => {
            if (err) { throw err; }
            console.log(`README generated at: "${answers.outputFilepath}"`);
        });
    });
};

init();

export default init;
