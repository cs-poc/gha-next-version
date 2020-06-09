const core = require('@actions/core');
const {context, getOctokit} = require('@actions/github');
const nextVersion = require('./nextVersion')
// fake change
async function run() {
    try {
        // Prepare context
        const token = core.getInput('github-token', {required: true});
        const github = getOctokit(token, {});

        // Get tags
        const {data: refs} = await github.git.listMatchingRefs({
            ...context.repo,
            ref: 'tags',
        });
        const tags = refs.map(r => r.ref).map(r => r.replace(/^refs\/tags\//, ""));

        // Call
        const base = core.getInput("base", {required: true});
        const result = nextVersion(base, tags);

        // Set outputs
        Object.keys(result).forEach(key => {
            if (result[key] !== undefined) core.setOutput(key, result[key]);
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

run()
