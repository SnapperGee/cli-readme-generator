import { license as definedLicense } from "./license.mjs";

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
export const renderLicenseBadge = (license) => Object.keys(definedLicense).includes(license) ? `![${definedLicense[license].name}](${definedLicense[license].shieldLink})`: "";

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
const renderLicenseLink = (license) =>
{

}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
const renderLicenseSection = (license) =>
{

}

// TODO: Create a function to generate markdown for README
export const generateMarkdown = (data) => {
  return `# ${data.title}

`;
}

export default generateMarkdown;
