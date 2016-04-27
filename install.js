"use strict";
const cp = require("child_process");
const path = require("path");
const fs = require("fs");
const color = require('bash-color');
var npmRoot = cp.execSync("npm -g root", {
    encoding: 'utf8'
});
var isWin = /win/i.test(process.platform);

fs.writeFile(path.join(npmRoot, '../dict' + (isWin ? '.cmd' : '')), fileContent(__dirname), (err) => {
    if (err) throw err;
    console.log("dict 已成为全局命令，您现在可以执行命令：");
    console.log(color.green("  dict hello"));
    console.log("即可翻译hello");
});

function fileContent(projectRoot) {
    projectRoot = path.join(projectRoot, 'index.js');
    var s;
    if (isWin) {
        s = `@IF EXIST "%~dp0\\node.exe" (
  "%~dp0\\node.exe"  "${projectRoot}" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "${projectRoot}" %*
)
        `;
    } else if (/linux/i.test(process.platform)) {
        s = `bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\\\,/,g')")

case \`uname\` in
    *CYGWIN*) basedir=\`cygpath -w "$basedir"\`;;
esac

if [ -x "$basedir/node" ]; then
  "$basedir/node"  "${projectRoot}" "$@"
  ret=$?
else
  node  "${projectRoot}" "$@"
  ret=$?
fi
exit $ret
        `;
    }
    return s;
}
