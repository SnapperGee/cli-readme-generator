import { question, allQuestions, editAnswersQuestion } from "./utils/question.mjs";
import { generateMarkdown } from "./utils/generateMarkdown.mjs";
import inquirer from "inquirer";
import { writeFile } from "node:fs";

const OUTPUT_FILEPATH_OVERWRITE = Object.freeze([question.outputFilepath, question.overwrite]);

const OUTPUT_FILEPATH_OVERWRITE_CONFIRM = Object.freeze([...OUTPUT_FILEPATH_OVERWRITE, question.confirm]);

const questions = allQuestions;

const writeToFile = async (fileName, data, callback) => writeFile(fileName, data, callback);

export const init = async () =>
{
    let answers = await inquirer.prompt(questions);

    while(answers.overwrite === false)
    {
        delete answers.outputFilepath;
        delete answers.overwrite;

        answers = await inquirer.prompt(OUTPUT_FILEPATH_OVERWRITE_CONFIRM, answers).catch(err => {throw err;});
    }

    while(answers.confirm === false)
    {
        delete answers.confirm;

        const answersToEdit = await inquirer.prompt(editAnswersQuestion, answers)
            .then(answersWithAnswersToEdit => answersWithAnswersToEdit.answersToEdit)
            .catch(err => {throw err;});

        if (answersToEdit.some(answerToEdit => answerToEdit === question.outputFilepath.name || answerToEdit === question.overwrite.name))
        {
            delete answers.outputFilepath;
            delete answers.overwrite;

            if(answersToEdit.includes(question.outputFilepath.name) && ! answersToEdit.includes(question.overwrite.name))
            {
                answersToEdit.splice(answersToEdit.indexOf(question.outputFilepath.name) + 1, 0, question.overwrite.name);
            }

            if(answersToEdit.includes(question.overwrite.name) && ! answersToEdit.includes(question.outputFilepath.name))
            {
                answersToEdit.splice(answersToEdit.indexOf(question.overwrite.name), 0, question.outputFilepath.name);
            }
        }

        if (answersToEdit.length !== 0)
        {
            let newAnswers = await inquirer.prompt(answersToEdit.map(answerToEdit => questions.find(question => answerToEdit === question.name))).catch(err => {throw err});

            while(newAnswers.overwrite === false)
            {
                delete newAnswers.outputFilepath;
                delete newAnswers.overwrite;

                newAnswers = await inquirer.prompt(OUTPUT_FILEPATH_OVERWRITE, newAnswers).catch(err => {throw err;});
            }

            for (const newAnswerKey in newAnswers)
            {
                const newAnswer = newAnswers[newAnswerKey];
                answers[newAnswerKey] = newAnswer;
            }
        }

        answers = await inquirer.prompt(question.confirm, answers).catch(err => {throw err;});
    }

    writeToFile(answers.outputFilepath, generateMarkdown(answers), (err) => {
        if (err) { throw err; }
        console.log(`README generated at: "${answers.outputFilepath}"`);
    });
};

init();

export default init;
