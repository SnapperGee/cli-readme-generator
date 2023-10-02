import { question, overwriteQuestions, editAnswersQuestion } from "./utils/question.mjs";
import { generateMarkdown } from "./utils/generateMarkdown.mjs";
import inquirer from "inquirer";
import { writeFile } from "node:fs";

const questions = Object.values(question);

const writeToFile = async (fileName, data, callback) => writeFile(fileName, data, callback);

export const init = async () =>
{
    let answers = await inquirer.prompt(questions).then( async (initAnswers) =>
    {
        while(initAnswers.overwrite === false)
        {
            delete initAnswers.outputFilepath;
            delete initAnswers.overwrite;

            initAnswers = await inquirer.prompt([question.outputFilepath, question.overwrite], initAnswers);
        }

        return initAnswers;
    });

    while(answers.confirm === false)
    {
        delete answers.confirm;

        const answersToEdit = await inquirer.prompt(editAnswersQuestion, answers).then(anwersWithAnswersToEdit => anwersWithAnswersToEdit.answersToEdit);

        console.log(`\n\n\n${Object.entries(answersToEdit)}\n\n\n`);

        if (answersToEdit.includes(question.outputFilepath) || answersToEdit.includes(question.overwrite))
        {
            delete answers.outputFilepath;
            delete answers.overwrite;

            answers = await inquirer.prompt([question.outputFilepath, question.overwrite], answers);
        }

        if (answersToEdit.length !== 0)
        {
            const newAnswers = await inquirer.prompt(answersToEdit.map(answerToEdit => questions.find(question => answerToEdit === question.name))).catch(err => {throw new err});

            for (const newAnswer in newAnswers)
            {
                answers[newAnswer] = newAnswers[newAnswer];
            }
        }

        answers = await inquirer.prompt(question.confirm, answers);

    }

    writeToFile(answers.outputFilepath, generateMarkdown(answers), (err) => {
        if (err) { throw err; }
        console.log(`README generated at: "${answers.outputFilepath}"`);
    });
};

init();

export default init;
