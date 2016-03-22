var spawnSync = require('child_process').spawnSync;

function hasPRMerge(gitLog) {
  for (var i = 0; i < gitLog.length; i++) {
    var commit = gitLog[i];
    if (commit.indexOf('Merge pull request ') === 0 ||
      commit.indexOf('Initial commit') === 0) {
      return true;
    }
  }
  return false;
}

function main() {
  /** SERVE ERROR IF GIT LOG DOESN'T CONTAIN A MERGE PR OR INITIAL COMMIT **/
  var gitLog = spawnSync('git', ['log', '--pretty=format:%s %H'],
    {encoding: 'utf-8'}).stdout.split('\n');
  if (!hasPRMerge(gitLog)) {
    throw new Error("Commit aborted\n
      Cannot find most recent pull or initial git commit");
  }

  /** SERVE ERROR IF KEYS ARE NOT NUMBERS **/
  if (typeof keys.user_id != "number" ||
    typeof keys.dashboard_id != "number") {
    throw new Error("Commit aborted\n
      Please double check that your gitSpy keys are correct!");
  }
}
main();