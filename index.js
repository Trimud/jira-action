const github = require('@actions/github');
const core = require('@actions/core');
const sfcc = require('sfcc-ci');

async function run() {
    try {
        const sb = core.getInput('sandboxes');
        const sf_username = core.getInput('sf_username');
        const sf_password = core.getInput('sf_password');
        const client_id = core.getInput('client_id');
        const client_password = core.getInput('client_password');

        console.log(`SB data: ${sb}`);

        sfcc.auth.auth(client_id, client_password, (err, token) => {
            if (token) {
                console.log('Authentication succeeded. Token is %s', token);
            }
            if (err) {
                console.error('Authentication error: %s', err);
            }
        });

        // const context = github.context;
        // console.log(context);

        core.setOutput('message', 'Finished');
    }
    catch (error) {
        core.setFailed(error.message);
    }
}

run();
