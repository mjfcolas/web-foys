const path = require(`path`);

module.exports = {
    webpack: {
        alias: {
            "@repositories":  path.resolve(__dirname, "src/modules/repository"),
            "@implementations":  path.resolve(__dirname, "src/modules/implementations"),
            "@confs":  path.resolve(__dirname, "src/assets/confs"),
        },
    },
};
