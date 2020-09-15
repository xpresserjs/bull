/**
 * @type {ObjectCollection}
 */
const PluginConfig = $.objectCollection({
    enabled: true,
    handleCron: false,
    logCompletedTime: true,
});

// Merge with user defined configuration
PluginConfig.merge(
    $.$config.get('plugins[@xpresser/bull]', {})
);

module.exports = PluginConfig;