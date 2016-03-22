// var ImageToAscii = require('image-to-ascii');
var spawnSync = require('child_process').spawnSync;
var keys = require('./USER_KEYS');

function throwErr(error) {
  throw new Error(error);
}

function parseHash(commit) {
  var HASH_LENGTH = 40;
  return commit.substring(commit.length - HASH_LENGTH);
}

function getLastPullHash(gitLog) {
  for (var i = 0; i < gitLog.length; i++) {
    var commit = gitLog[i];
    if (commit.indexOf('Merge pull request ') === 0 ||
      commit.indexOf('Initial commit') === 0) {
      return parseHash(commit);
    }
  }
  throwErr("Error: cannot find most recent pull or initial git commit");
}

function formatDiffs(gitDiff) {
  var diffs = [];
  for (var i = 0; i < gitDiff.length - 1; i++) {
    var diff = gitDiff[i];
    diffs.push({
      "mod_type": diff.substring(0, 1),
      "file": diff.substring(2),
      "commit_message": "TO-DO"
    });
  }
  return diffs;
}

function main() {
  /** SERVE ERROR IF KEYS ARE NOT NUMBERS **/
  if (typeof keys.user_id != "number" ||
    typeof keys.dashboard_id != "number") {
    throwErr("Please double check that your gitSpy keys are correct!");
  }

  /** Parse most recent commit hash and pull hash from git log **/
  var gitLog = spawnSync('git', ['log', '--pretty=format:%s %H'],
    {encoding: 'utf-8'}).stdout.split('\n');
  var commitHash = parseHash(gitLog[0]);
  var lastPullHash = getLastPullHash(gitLog);

  /** Parse and format all diffs since last merge **/
  var gitDiff = spawnSync('git',
    ['diff', '--name-status', lastPullHash, commitHash],
    {encoding: 'utf-8'}).stdout.split('\n');
  var diffs = formatDiffs(gitDiff);

  /** send POST request to server **/
  var data = {
    users_id: keys.user_id,
    dashboards_id: keys.dashboard_id,
    last_pulled_commit: lastPullHash,
    diffs: diffs
  };
  data = JSON.stringify(data);
  spawnSync('curl',
    ['-X', 'POST', '-H', 'Content-Type: application/json', '-d',
      data, 'http://gitspy.com/api/commits'],
    {encoding: 'utf-8'});

  /** console log cute ascii art **/
  // ImageToAscii('https://s-media-cache-ak0.pinimg.com/236x/2d/8e/e8/2d8ee815146390d567706f2c7b5c2916.jpg', function(err, converted) {
  //     console.log(err || converted);
  // });
}
main();