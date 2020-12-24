const core = require('@actions/core');
const github = require('@actions/github');

try {
  const blockingHour = core.getInput('blocking-hour');

  const currentTime = new Date();

  if (blockingHour <= currentTime.getHours()) {
    core.setFailed(`Looks like you can't merge after ${blockingHour}, time to clock off I guess`);
  } else {
    core.setOutput("message", "Phew, it's still early enough to merge");
  }
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
