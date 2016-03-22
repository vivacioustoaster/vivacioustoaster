var fs = require('fs');
var spawnSync = require('child_process').spawnSync;

var postCommitPath = './.git/hooks/post-commit';
var runGitSpy = '#!/bin/sh\nnode gitSpy/gitSpy.js';

function createFile(path, content) {
  if (!fs.existsSync(path)) {
    var file = fs.openSync(path, 'w');
    fs.writeFileSync(path, content);
    fs.closeSync(file);
  }
}

function main() {
  /** Create pre-merge and post-commit scripts **/
  createFile(postCommitPath, runGitSpy);

  /** Make files executable **/
  spawnSync('chmod', ['+x', '.git/hooks/post-commit']);
  console.log("GitSpy hooks added ʕ•ᴥ•ʔ");
}
main();
