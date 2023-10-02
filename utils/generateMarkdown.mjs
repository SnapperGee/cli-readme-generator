import { licenseValues } from "./license.mjs";

const renderLicenseBadge = (license) => license ? `![${license.name}](${license.shieldLink})` : "";

const renderLicenseLink = (license) => license ? `[${renderLicenseBadge(license)}](${license.clauseLink})` : "";

const renderLicenseSection = (license) => license ? ["1. [License](#license)", `\n\n## License\n\n### ${license.name}`] : "";

export const generateMarkdown = (data) => {

    const markdownLines = [
        `# ${data.title}\n\n${renderLicenseLink(licenseValues.find(licenseValue => licenseValue.name === data.license))}`
    ];

    const tableOfContentsLines = [
        "\n\n## Table of contents\n"
    ];

    if (data.description)
    {
        tableOfContentsLines.push("1. [Description](#description)");
        markdownLines.push(`\n\n## Description\n\n${data.description}`);
    }

    if (data.installation)
    {
        tableOfContentsLines.push("1. [Installation](#installation)");
        markdownLines.push(`\n\n## Installation\n\n${data.installation}`);
    }

    if (data.usage)
    {
        tableOfContentsLines.push("1. [Usage](#usage)");
        markdownLines.push(`\n\n## Usage\n\n${data.usage}`);
    }

    if (data.license)
    {
        tableOfContentsLines.push("1. [License](#license)");
        markdownLines.push(`\n\n## License\n\n### ${data.license}`);
    }

    if (data.contribution)
    {
        tableOfContentsLines.push("1. [Contributing](#contributing)");
        markdownLines.push(`\n\n## Contributing\n\n${data.contribution}`);
    }

    if (data.tests)
    {
        tableOfContentsLines.push("1. [Tests](#tests)");
        markdownLines.push(`\n\n## Tests\n\n${data.tests}`);
    }

    if (data.github || data.email)
    {
        tableOfContentsLines.push("1. [Questions](#questions)");
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

    if (tableOfContentsLines.length !== 1)
    {
        markdownLines.splice(1, 0, tableOfContentsLines.join("\n"));
    }

    return markdownLines.join("") + "\n";
};

export default generateMarkdown;
