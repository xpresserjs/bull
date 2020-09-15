/**
 * @type {ObjectCollection}
 */
const PluginConfig = $.objectCollection({
    enabled: true,
    handleCron: false,
});

// Merge with user defined configuration
PluginConfig.merge(
    $.$config.get('plugins[@xpresser/bull]', {})
);

module.exports = PluginConfig;