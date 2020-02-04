const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
    try {
        const sb = core.getInput('sandboxes');
        console.log(`SB data: ${sb}`);

        const context = github.context;
        console.log(context);

//         core.debug((new Date()).toTimeString());

//         core.setOutput('time', new Date().toTimeString());
    }
    catch (error) {
        core.setFailed(error.message);
    }
}

run();
