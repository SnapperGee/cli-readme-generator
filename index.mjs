import { question, overwriteQuestions, editAnswersQuestion } from "./utils/question.mjs";
import { generateMarkdown } from "./utils/generateMarkdown.mjs";
import inquirer from "inquirer";
import { writeFile } from "node:fs";

const questions = Object.values(question);

const writeToFile = async (fileName, data, callback) => writeFile(fileName, data, callback);

export const init = async () =>
{
    let answers = await inquirer.prompt(questions);

    while(answers.confirm === false)
    {
        delete answers.confirm;

        while(answers.overwrite === false)
        {
            delete answers.outputFilepath;
            delete answers.overwrite;

            answers = await inquirer.prompt(overwriteQuestions, answers);
        }

        const answersToEdit = await inquirer.prompt(editAnswersQuestion, answers);//.then( async (answersToEdit) =>

        const newAnswers = await inquirer.prompt(answersToEdit.editAnswers.map(answerToEdit => questions.find(question => answerToEdit === question.name))).catch(err => {throw new err});

        console.log(newAnswers);

        for (const newAnswer in newAnswers)
        {
            answers[newAnswer] = newAnswers[newAnswer];
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
