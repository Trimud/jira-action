const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
    try {
        const sandboxes = JSON.parse(core.getInput('sandboxes'));
        const event = core.getInput('event');
        const allowedEvents = ['start', 'stop', 'delete', 'restart', 'reset', 'create'];

        // Check if event is allowed and if not
        // throw an error and exit this action
        if (allowedEvents.includes(event)) {
            core.setFailed('Not a valid event input. Expected one of the following: start | stop | delete | restart | reset');
        }

        if (sandboxes !== undefined && sandboxes.length > 0) {
            // Loop through all sandboxes returned by previous action step
            for (let sandbox of sandboxes) {
                switch (event) {
                    case 'create':
                        await exec.exec('sfcc-ci sandbox:create -r zzrb -t 12 -s');
                        break;
                    case 'delete':
                        await exec.exec('sfcc-ci sandbox:delete -N -s', [sandbox.id]);
                        break;
                    case 'restart':
                        await exec.exec('sfcc-ci sandbox:restart -s', [sandbox.id]);
                        break;
                    case 'reset':
                        await exec.exec('sfcc-ci sandbox:reset -N -s', [sandbox.id]);
                        break;
                    case 'stop':
                        if (sandbox.state === 'started') {
                            await exec.exec('sfcc-ci sandbox:stop -s', [sandbox.id]);
                        }
                        break;
                    case 'start':
                        if (sandbox.state === 'stopped') {
                            await exec.exec('sfcc-ci sandbox:start -s', [sandbox.id]);
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
