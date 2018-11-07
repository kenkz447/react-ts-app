const getBuildConfig = require('./getBuildConfigs');

module.exports = getBuildConfig({
    definitions: {
        API_ENTRY: 'https://localhost:8080'
    },
    sourceMap: true,
    compression: true
})