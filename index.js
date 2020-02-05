const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
    try {
        const sandboxes = JSON.parse(core.getInput('sandboxes'));
        const event = core.getInput('event');
        const allowedEvents = ['start', 'stop', 'create', 'delete', 'restart', 'reset'];

        // Check if incoming event is allowed,
        // throw an error and exit this action
        if (allowedEvents.includes(event) === false) {
            core.setFailed('Not a valid event input. Expected one of the following: start | stop | create | delete | restart | reset');
        }

        if (sandboxes !== undefined && sandboxes.length > 0) {
            // Loop through all sandboxes returned by previous action step
            for (let sandbox of sandboxes) {
                switch (event) {
                    case 'delete':
                        await exec.exec('sfcc-ci sandbox:delete -N -s', [sandbox.id]);
                        break;
                    case 'reset':
                        await exec.exec('sfcc-ci sandbox:reset -N -s', [sandbox.id]);
                        break;
                    default:
                        await exec.exec(`sfcc-ci sandbox:${event} -N -s`, [sandbox.id]);
                        break;
                }
            }
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
