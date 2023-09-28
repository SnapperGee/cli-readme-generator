import { license as definedLicense, licenseKeys } from "./license.mjs";

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
export const renderLicenseBadge = (license) => licenseKeys.includes(license) ? `![${license.name}](${license.shieldLink})`: "";

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
const renderLicenseLink = (license) => licenseKeys.includes(license) ? `[${renderLicenseBadge(license)}](${license.clauseLink})`: "";

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
const renderLicenseSection = (license) => licenseKeys.includes(license) ? `${renderLicenseLink(license)}\n${definedLicense[license].name}` : "";

// TODO: Create a function to generate markdown for README
export const generateMarkdown = (data) => {
    let markDownString = "# " + data.title;

    if (data.description)
    {
        markDownString += `\n\n## Description\n\n${data.description}`;
    }

    if (data.installation)
    {
        markDownString += `\n\n## Installation\n\n${data.installation}`;
    }

    if (data.usage)
    {
        markDownString += `\n\n## Usage\n\n${data.usage}`;
    }

    if (data.contribution)
    {
        markDownString += `\n\n## Contribution Guidelines\n\n${data.contribution}`;
    }

    if (data.tests)
    {
        markDownString += `\n\n## Tests\n\n${data.tests}`;
    }

    if (data.github || data.email)
    {
        markDownString += "\n\n## Questions\n\nAny questions can be directed to";

        if (data.github)
        {
            markDownString += ` Github [here](${data.github})`;
        }

        if (data.email)
        {
            markDownString += ` ${data.github ? "or ": ""}${data.email}`;
        }
    }

    return markDownString;
};

export default generateMarkdown;
