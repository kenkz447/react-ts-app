const getBuildConfig = require('./getBuildConfigs');

module.exports = getBuildConfig({
    definitions: {
        API_ENTRY: 'https://protected-dusk-97974.herokuapp.com'
    },
    sourceMap: true,
    compression: true
})