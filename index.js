const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
    try {
        const sandboxes = JSON.parse(core.getInput('sandboxes'));
        const event = JSON.parse(core.getInput('event'));

        if (sandboxes !== undefined && sandboxes.length > 0) {
            for (let sandbox of sandboxes) {
                switch (event) {
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
                    case 'delete':
                        await exec.exec('sfcc-ci sandbox:delete -N -s', [sandbox.id]);

                        break;
                    case 'restart':
                        await exec.exec('sfcc-ci sandbox:restart -s', [sandbox.id]);

                        break;
                    case 'reset':
                        await exec.exec('sfcc-ci sandbox:reset -N -s', [sandbox.id]);

                        break;
                    default:
                        await exec.exec(`sfcc-ci sandbox:${event} -s`, [sandbox.id]);

                        break;
                }
            }
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
