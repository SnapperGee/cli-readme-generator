const licenseUrlRoot = Object.freeze({
    shieldImg: "https://img.shields.io/badge/",
    buttonImg: "https://licensebuttons.net/l/",
    gnuClause: "https://www.gnu.org/licenses/",
    creativeCommonsClause: "https://creativecommons.org/licenses/by",
    openSourceClause: "https://opensource.org/licenses/",
    openDataCommonsClause: "https://opendatacommons.org/licenses/"
});

export const license = Object.freeze({
    apache: Object.freeze({
        name: "Apache 2.0 License",
        shieldLink: licenseUrlRoot.shieldImg + "License-Apache_2.0-blue.svg",
        clauseLink: licenseUrlRoot.openSourceClause + "Apache-2.0"
    }),

    attribution: Object.freeze({
        name: "Attribution License",
        shieldLink: licenseUrlRoot.shieldImg + "License-ODC_BY-brightgreen.svg",
        clauseLink: licenseUrlRoot.openDataCommonsClause + "by/"
    }),

    attributionNoDerivatives: Object.freeze({
        name: "Attribution-NoDerivates 4.0 International",
        shieldLink: licenseUrlRoot.shieldImg + "License-CC_BY--ND_4.0-lightgrey.svg",
        buttonLink: licenseUrlRoot.buttonImg + "by-nd/4.0/80x15.png",
        clauseLink: licenseUrlRoot.creativeCommonsClause + "-nd/4.0/)"
    }),

    attributionNonCommercial: Object.freeze({
        name: "Attribution-NonCommercial 4.0 International",
        shieldLink: licenseUrlRoot.shieldImg + "License-CC_BY--NC_4.0-lightgrey.svg",
        buttonLink: licenseUrlRoot.buttonImg + "by-nc/4.0/80x15.png",
        clauseLink: licenseUrlRoot.creativeCommonsClause + "-nc/4.0/"
    }),

    attributionNonCommercialNoDerivatives: Object.freeze({
        name: "Attribution-NonCommercial-NoDerivatives 4.0 International",
        shieldLink: licenseUrlRoot.shieldImg + "License-CC_BY--NC--ND_4.0-lightgrey.svg",
        buttonLink: licenseUrlRoot.buttonImg + "by-nc-nd/4.0/80x15.png",
        clauseLink: licenseUrlRoot.creativeCommonsClause + "-nc-nd/4.0/"
    }),

    attributionNonCommercialShareAlike: Object.freeze({
        name: "Attribution-NonCommmercial-ShareAlike 4.0 International",
        shieldLink: licenseUrlRoot.shieldImg + "License-CC_BY--NC--SA_4.0-lightgrey.svg",
        buttonLink: licenseUrlRoot.buttonImg + "by-nc-sa/4.0/80x15.png",
        clauseLink: licenseUrlRoot.creativeCommonsClause + "-nc-sa/4.0/"
    }),

    attribution4: Object.freeze({
        name: "Attribution 4.0 International",
        shieldLink: licenseUrlRoot.shieldImg + "License-CC_BY_4.0-lightgrey.svg",
        buttonLink: licenseUrlRoot.buttonImg + "by/4.0/80x15.png",
        clauseLink: licenseUrlRoot.creativeCommonsClause + "/4.0/"
    }),

    attribution4ShareAlike: Object.freeze({
        name: "Attribution-ShareAlike 4.0 International",
        shieldLink: licenseUrlRoot.shieldImg + "License-CC_BY--SA_4.0-lightgrey.svg",
        buttonLink: licenseUrlRoot.buttonImg + "by-sa/4.0/80x15.png",
        clauseLink: licenseUrlRoot.creativeCommonsClause + "-sa/4.0/"
    }),

    boost: Object.freeze({
        name: "Boost Software License 1.0",
        shieldLink: licenseUrlRoot.shieldImg + "License-Boost_1.0-lightblue.svg",
        clauseLink: "https://www.boost.org/LICENSE_1_0.txt"
    }),

    bsd2: Object.freeze({
        name: "BSD 2-Clause License",
        shieldLink: licenseUrlRoot.shieldImg + "License-BSD_2--Clause-orange.svg",
        clauseLink: licenseUrlRoot.openSourceClause + "BSD-2-Clause"
    }),

    bsd3: Object.freeze({
        name: "BSD 3-Clause License",
        shieldLink: licenseUrlRoot.shieldImg + "License-BSD_3--Clause-blue.svg",
        clauseLink: licenseUrlRoot.openSourceClause + "BSD-3-Clause"
    }),

    cco: Object.freeze({
        name: "CC0 1.0 Universal",
        shieldLink: licenseUrlRoot.shieldImg + "License-CC0_1.0-lightgrey.svg",
        buttonLink: licenseUrlRoot.buttonImg + "zero/1.0/80x15.png",
        clauseLink: "(http://creativecommons.org/publicdomain/zero/1.0/"
    }),

    eclipse: Object.freeze({
        name: "Eclipse Public License 1.0",
        shieldLink: licenseUrlRoot.shieldImg + "License-EPL_1.0-red.svg",
        clauseLink: licenseUrlRoot.openSourceClause + "EPL-1.0"
    }),

    gnuAgpl: Object.freeze({
        name: "GNU AGPL v3",
        shieldLink: licenseUrlRoot.shieldImg + "License-AGPL_v3-blue.svg",
        clauseLink: licenseUrlRoot.gnuClause + "agpl-3.0"
    }),

    gnuFdl: Object.freeze({
        name: "GNU FDL v1.3",
        shieldLink: licenseUrlRoot.shieldImg + "License-FDL_v1.3-blue.svg",
        clauseLink: licenseUrlRoot.gnuClause + "fdl-1.3"
    }),

    gnuGpl2: Object.freeze({
        name: "GNU GPL v2",
        shieldLink: licenseUrlRoot.shieldImg + "License-GPL_v2-blue.svg",
        clauseLink: licenseUrlRoot.gnuClause + "gpl-2.0.en.html"
    }),

    gnuGpl3: Object.freeze({
        name: "GNU GPL v3",
        shieldLink: licenseUrlRoot.shieldImg + "License-GPLv3-blue.svg",
        clauseLink: licenseUrlRoot.gnuClause + "gpl-3.0"
    }),

    gnuLgpl: Object.freeze({
        name: "GNU LGPL v3",
        shieldLink: licenseUrlRoot.shieldImg + "License-LGPL_v3-blue.svg",
        clauseLink: licenseUrlRoot.gnuClause + "lgpl-3.0"
    }),

    hippocratic2: Object.freeze({
        name: "Hippocratic License 2.1",
        shieldLink: licenseUrlRoot.shieldImg + "License-Hippocratic_2.1-lightgrey.svg",
        clauseLink: "https://firstdonoharm.dev/version/2/1/license/"
    }),

    hippocratic3: Object.freeze({
        name: "Hippocratic License 3.0",
        shieldLink: licenseUrlRoot.shieldImg + "License-Hippocratic_3.0-lightgrey.svg",
        clauseLink: "https://firstdonoharm.dev/version/3/0/license/"
    }),

    ibm: Object.freeze({
        name: "IBM Public License Version 1.0",
        shieldLink: licenseUrlRoot.shieldImg + "License-IPL_1.0-blue.svg",
        clauseLink: licenseUrlRoot.openSourceClause + "IPL-1.0"
    }),

    isc: Object.freeze({
        name: "ISC License",
        shieldLink: licenseUrlRoot.shieldImg + "License-ISC-blue.svg",
        clauseLink: licenseUrlRoot.openSourceClause + "ISC"
    }),

    mit: Object.freeze({
        name: "The MIT License",
        shieldLink: licenseUrlRoot.shieldImg + "License-MIT-yellow.svg",
        clauseLink: licenseUrlRoot.openSourceClause + "MIT"
    }),

    mozilla: Object.freeze({
        name: "Mozilla Public License 2.0",
        shieldLink: licenseUrlRoot.shieldImg + "License-MPL_2.0-brightgreen.svg",
        clauseLink: licenseUrlRoot.openSourceClause + "MPL-2.0"
    }),

    openDataBase: Object.freeze({
        name: "Open Database License",
        shieldLink: licenseUrlRoot.shieldImg + "License-ODbL-brightgreen.svg",
        clauseLink: licenseUrlRoot.openDataCommonsClause + "odbl/"
    }),

    publicDomain: Object.freeze({
        name: "Public Domain Dedication and License",
        shieldLink: licenseUrlRoot.shieldImg + "License-PDDL-brightgreen.svg",
        clauseLink: licenseUrlRoot.openDataCommonsClause + "pddl/"
    }),

    perl: Object.freeze({
        name: "The Perl License",
        shieldLink: licenseUrlRoot.shieldImg + "License-Perl-0298c3.svg",
        clauseLink: licenseUrlRoot.openSourceClause + "Artistic-2.0"
    }),

    artistic: Object.freeze({
        name: "The Artistic License 2.0",
        shieldLink: licenseUrlRoot.shieldImg + "License-Artistic_2.0-0298c3.svg",
        clauseLink: licenseUrlRoot.openSourceClause + "Artistic-2.0"
    }),

    sil: Object.freeze({
        name: "SIL Open Font License 1.1",
        shieldLink: licenseUrlRoot.shieldImg + "License-OFL_1.1-lightgreen.svg",
        clauseLink: licenseUrlRoot.openSourceClause + "OFL-1.1"
    }),

    unlicense: Object.freeze({
        name: "The Unlicense",
        shieldLink: licenseUrlRoot.shieldImg + "license-Unlicense-blue.svg",
        clauseLink: "https://choosealicense.com/licenses/unlicense/"
    }),

    wtfpl: Object.freeze({
        name: "Do What the Fuck You Want to Public License",
        shieldLink: licenseUrlRoot.shieldImg + "License-WTFPL-brightgreen.svg",
        clauseLink: "http://www.wtfpl.net/about/"
    }),

    zlib: Object.freeze({
        name: "The zlib/libpng License",
        shieldLink: licenseUrlRoot.shieldImg + "License-Zlib-lightgrey.svg",
        clauseLink: licenseUrlRoot.openSourceClause + "Zlib"
    })
});

export const licenseKeys = Object.freeze(Object.keys(license));
export const licenseValues = Object.freeze(Object.values(license));

export default license;
