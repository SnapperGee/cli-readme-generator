import { license as definedLicense, licenseKeys, licenseValues } from "./license.mjs";

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
export const renderLicenseBadge = (license) => `![${license.name}](${license.shieldLink})`;

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
const renderLicenseLink = (license) => `[${renderLicenseBadge(license)}](${license.clauseLink})`;

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
const renderLicenseSection = (license) => licenseKeys.includes(license) ? `${renderLicenseLink(license)}\n${license.name}` : "";

// TODO: Create a function to generate markdown for README
export const generateMarkdown = (data) => {

    const markdownLines = [
        `# ${data.title}\n\n${renderLicenseLink(licenseValues.find(licenseValue => licenseValue.name === data.license))}`
    ];

    if (data.description)
    {
        markdownLines.push(`\n\n## Description\n\n${data.description}`);
    }

    if (data.installation)
    {
        markdownLines.push(`\n\n## Installation\n\n${data.installation}`);
    }

    if (data.usage)
    {
        markdownLines.push(`\n\n## Usage\n\n${data.usage}`);
    }

    if (data.contribution)
    {
        markdownLines.push(`\n\n## Contributing\n\n${data.contribution}`);
    }

    if (data.tests)
    {
        markdownLines.push(`\n\n## Tests\n\n${data.tests}`);
    }

    if (data.github || data.email)
    {
        markdownLines.push("\n\n## Questions\n\nAny questions can be directed to");

        if (data.github)
        {
            markdownLines.push(` Github [here](${data.github})`);
        }

        if (data.email)
        {
            markdownLines.push(` ${data.github ? "or ": ""}${data.email}`);
        }
    }

    return markdownLines.join("");
};

export default generateMarkdown;
