import { license as definedLicense, licenseKeys } from "./license.mjs";

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
export const renderLicenseBadge = (license) => licenseKeys.includes(license) ? `![${definedLicense[license].name}](${definedLicense[license].shieldLink})`: "";

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
const renderLicenseLink = (license) => licenseKeys.includes(license) ? `[${renderLicenseBadge(license)}](${definedLicense[license].clauseLink})`: "";

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
const renderLicenseSection = (license) => licenseKeys.includes(license) ? `${renderLicenseLink(license)}\n${definedLicense[license].name}` : "";

// TODO: Create a function to generate markdown for README
export const generateMarkdown = (data) => {
  return `# ${data.title}

`;
}

export default generateMarkdown;
