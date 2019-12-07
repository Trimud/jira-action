const core = require('@actions/core');

async function run() {
    try {
        const ms = core.getInput('milliseconds');
        console.log(`Waiting ${ms} milliseconds...`);
        console.log($GITHUB_EVENT_PATH);

        core.debug((new Date()).toTimeString());

        core.setOutput('time', new Date().toTimeString());
    }
    catch (error) {
        core.setFailed(error.message);
    }
}

run();
