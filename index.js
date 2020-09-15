const config = require('./config');

module.exports = {
    run() {
        // Check if bull plugin is enabled
        const bullIsEnabled = config.get('enabled') === true;
        // Check if handleCron is true
        const bullCanHandleCron = config.get('handleCron') === true;

        // Handle cron with bull if bullIsEnabled && bullCanHandleCron
        if (bullIsEnabled && bullCanHandleCron) {
            // Add on serverBooted Event to start cron after server boot.

            $.on.serverBooted(async () => {
                // Require Bull
                const Bull = require('bull');

                // Path tpo cron.js
                const cronDefinition = $.path.backend('jobs/cron.js');
                // Check if cron.js exists
                const cronDefinitionExists = $.file.exists(cronDefinition);

                if (cronDefinitionExists) {
                    // Require Cron definition file.
                    const cronDotJs = require(cronDefinition);

                    // Loop Through definitions and require all
                    for (const cron of cronDotJs) {
                        const cronFile = $.path.backend(`jobs/${cron.job}`)
                        const job = require(cronFile);

                        const bull = new Bull(cronFile);
                        await bull.empty();
                        await bull.removeJobs()

                        bull.process(async (queue, done) => {
                            queue.end = done ? done : () => {
                            };
                            return job.handler([], queue, done)
                        });

                        if (config.get('logCompletedTime') === true) {
                            bull.on('completed', (job) => {
                                const jobsPath = $.path.backend('jobs/');
                                const jobName = job.queue.name.replace(jobsPath, '');
                                console.log(`Cron: {${jobName}} ran at (${new Date().toUTCString()})`)
                            });
                        }

                        bull.add({}, {repeat: {cron: cron.schedule}});
                    }

                    $.logInfo(`Added (${cronDotJs.length}) Jobs to cron..`)
                }

            });
        }
    }
}