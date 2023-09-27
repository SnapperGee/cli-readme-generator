const licenseBadgeImgUrlRoot = Object.freeze({
    shield: "https://img.shields.io/badge/",
    button: "https://licensebuttons.net/l/"
});

export const license = Object.freeze({
    apache: Object.freeze({
        name: "Apache 2.0 License",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-Apache_2.0-blue.svg"
    }),

    attribution: Object.freeze({
        name: "Attribution License",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-ODC_BY-brightgreen.svg"
    }),

    attributionNoDerivatives: Object.freeze({
        name: "Attribution-NoDerivates 4.0 International",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-CC_BY--ND_4.0-lightgrey.svg",
        buttonLink: licenseBadgeImgUrlRoot.button + "by-nd/4.0/80x15.png"
    }),

    attributionNonCommercial: Object.freeze({
        name: "Attribution-NonCommercial 4.0 International",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-CC_BY--NC_4.0-lightgrey.svg",
        buttonLink: licenseBadgeImgUrlRoot.button + "by-nc/4.0/80x15.png"
    }),

    attributionNonCommercialNoDerivatives: Object.freeze({
        name: "Attribution-NonCommercial-NoDerivatives 4.0 International",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-CC_BY--NC--ND_4.0-lightgrey.svg",
        buttonLink: licenseBadgeImgUrlRoot.button + "by-nc-nd/4.0/80x15.png"
    }),

    attributionNonCommercialShareAlike: Object.freeze({
        name: "Attribution-NonCommmercial-ShareAlike 4.0 International",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-CC_BY--NC--SA_4.0-lightgrey.svg",
        buttonLink: licenseBadgeImgUrlRoot.button + "by-nc-sa/4.0/80x15.png"
    }),

    attribution4: Object.freeze({
        name: "Attribution 4.0 International",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-CC_BY_4.0-lightgrey.svg",
        buttonLink: licenseBadgeImgUrlRoot.button + "by/4.0/80x15.png"
    }),

    attribution4ShareAlike: Object.freeze({
        name: "Attribution-ShareAlike 4.0 International",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-CC_BY--SA_4.0-lightgrey.svg",
        buttonLink: licenseBadgeImgUrlRoot.button + "by-sa/4.0/80x15.png"
    }),

    boost: Object.freeze({
        name: "Boost Software License 1.0",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-Boost_1.0-lightblue.svg"
    }),

    bsd2: Object.freeze({
        name: "BSD 2-Clause License",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-BSD_2--Clause-orange.svg"
    }),

    bsd3: Object.freeze({
        name: "BSD 3-Clause License",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-BSD_3--Clause-blue.svg"
    }),

    cco: Object.freeze({
        name: "CC0 1.0 Universal",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-CC0_1.0-lightgrey.svg",
        buttonLink: licenseBadgeImgUrlRoot.button + "zero/1.0/80x15.png"
    }),

    eclipse: Object.freeze({
        name: "Eclipse Public License 1.0",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-EPL_1.0-red.svg"
    }),

    gnuAgpl: Object.freeze({
        name: "GNU AGPL v3",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-AGPL_v3-blue.svg"
    }),

    gnuFdl: Object.freeze({
        name: "GNU FDL v1.3",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-FDL_v1.3-blue.svg"
    }),

    gnuGpl2: Object.freeze({
        name: "GNU GPL v2",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-GPL_v2-blue.svg"
    }),

    gnuGpl3: Object.freeze({
        name: "GNU GPL v3",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-GPLv3-blue.svg"
    }),

    gnuLgpl: Object.freeze({
        name: "GNU LGPL v3",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-LGPL_v3-blue.svg"
    }),

    hippocratic2: Object.freeze({
        name: "Hippocratic License 2.1",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-Hippocratic_2.1-lightgrey.svg"
    }),

    hippocratic3: Object.freeze({
        name: "Hippocratic License 3.0",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-Hippocratic_3.0-lightgrey.svg"
    }),

    ibm: Object.freeze({
        name: "IBM Public License Version 1.0",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-IPL_1.0-blue.svg"
    }),

    isc: Object.freeze({
        name: "ISC License",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-ISC-blue.svg"
    }),

    mit: Object.freeze({
        name: "The MIT License",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-MIT-yellow.svg"
    }),

    mozilla: Object.freeze({
        name: "Mozilla Public License 2.0",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-MPL_2.0-brightgreen.svg"
    }),

    openDataBase: Object.freeze({
        name: "Open Database License",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-ODbL-brightgreen.svg"
    }),

    publicDomain: Object.freeze({
        name: "Public Domain Dedication and License",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-PDDL-brightgreen.svg"
    }),

    perl: Object.freeze({
        name: "The Perl License",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-Perl-0298c3.svg"
    }),

    artistic: Object.freeze({
        name: "The Artistic License 2.0",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-Artistic_2.0-0298c3.svg"
    }),

    sil: Object.freeze({
        name: "SIL Open Font License 1.1",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-OFL_1.1-lightgreen.svg"
    }),

    unlicense: Object.freeze({
        name: "The Unlicense",
        shieldLink: licenseBadgeImgUrlRoot.shield + "license-Unlicense-blue.svg"
    }),

    wtfpl: Object.freeze({
        name: "Do What the Fuck You Want to Public License",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-WTFPL-brightgreen.svg"
    }),

    zlib: Object.freeze({
        name: "The zlib/libpng License",
        shieldLink: licenseBadgeImgUrlRoot.shield + "License-Zlib-lightgrey.svg"
    })
});

export default license;
