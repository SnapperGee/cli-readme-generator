/**
 * Main entry point of this node package. Contains the sequence of `inquirer.prompt` questions asked to the user and
 * some logic to create loops to ensure all questions are answered correctly.
 *
 * @module index
 */

import { question, allQuestions, editAnswersQuestion } from "./utils/question.mjs";
import { generateMarkdown } from "./utils/generateMarkdown.mjs";
import inquirer from "inquirer";
import { writeFile } from "node:fs";

const OUTPUT_FILEPATH_OVERWRITE = Object.freeze([question.outputFilepath, question.overwrite]);

const OUTPUT_FILEPATH_OVERWRITE_CONFIRM = Object.freeze([...OUTPUT_FILEPATH_OVERWRITE, question.confirm]);

const questions = allQuestions;

const writeToFile = async (fileName, data, callback) => writeFile(fileName, data, callback);

/**
 * Function used to initialize the interactive CLI to generate a markdown file.
 */
export const init = async () =>
{
    // Initial user input answers
    let answers = await inquirer.prompt(questions).catch(err => {throw err;});

    // Require output file path to not already exist or confirm that it points to a file to be overwritten.
    while(answers.overwrite === false)
    {
        // Delete old properties relating to output file path before overwriting them.
        delete answers.outputFilepath;
        delete answers.overwrite;

        // Prompt user for output file path (and overwrite confirmation if needed)
        answers = await inquirer.prompt(OUTPUT_FILEPATH_OVERWRITE_CONFIRM, answers).catch(err => {throw err;});
    }

    // Loop to prompt for input until user confirms settings for generated markdown file are correct.
    while(answers.confirm === false)
    {
        // Delete confirm answer before overwriting it.
        delete answers.confirm;

        // Get array of answer names user wants to edit.
        const answersToEdit = await inquirer.prompt(editAnswersQuestion, answers)
            .then(answersWithAnswersToEdit => answersWithAnswersToEdit.answersToEdit)
            .catch(err => {throw err;});

        // If user wants to edit output file path and/or out put file path overwrite answer(s)
        if (answersToEdit.some(answerToEdit => answerToEdit === question.outputFilepath.name || answerToEdit === question.overwrite.name))
        {
            // Delete answers before overwriting them.
            delete answers.outputFilepath;
            delete answers.overwrite;

            // If user wants to edit output file path but not overwrite answer, add overwrite answer to be edited incase
            // new output file path points to a file.
            if(answersToEdit.includes(question.outputFilepath.name) && ! answersToEdit.includes(question.overwrite.name))
            {
                answersToEdit.splice(answersToEdit.indexOf(question.outputFilepath.name) + 1, 0, question.overwrite.name);
            }

            // If user wants to edit overwrite answer but not output file path answer, add output file path answer to be
            // edited so a new file output path can be prompted to user.
            if(answersToEdit.includes(question.overwrite.name) && ! answersToEdit.includes(question.outputFilepath.name))
            {
                answersToEdit.splice(answersToEdit.indexOf(question.overwrite.name), 0, question.outputFilepath.name);
            }
        }

        // If there are answers user wants to edit...
        if (answersToEdit.length !== 0)
        {
            // Prompt user with questions derived form answers user specified they wanted to edit.
            let newAnswers = await inquirer.prompt(answersToEdit.map(answerToEdit => questions.find(question => answerToEdit === question.name))).catch(err => {throw err});

            // Require output file path to not already exist or confirm that it points to a file to be overwritten.
            while(newAnswers.overwrite === false)
            {
                delete newAnswers.outputFilepath;
                delete newAnswers.overwrite;

                newAnswers = await inquirer.prompt(OUTPUT_FILEPATH_OVERWRITE, newAnswers).catch(err => {throw err;});
            }

            // Update answers with new answers
            answers = {...answers, ...newAnswers};
        }

        // Prompt user for confirmation that new settings for generated markdown are correct.
        answers = await inquirer.prompt(question.confirm, answers).catch(err => {throw err;});
    }

    // Once user confirms generated markdown settings are correct, create or overwrite markdown file
    writeToFile(answers.outputFilepath, generateMarkdown(answers), (err) => {
        if (err) { throw err; }
        console.log(`README generated at: "${answers.outputFilepath}"`);
    });
};

init();

export default init;
