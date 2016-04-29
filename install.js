"use strict";
const cp = require("child_process");
const path = require("path");
const fs = require("fs");
const color = require('bash-color');
var npmRoot = cp.execSync("npm -g root", {
	encoding: 'utf8'
});

var platform = {
	isWin: /win/i.test(process.platform),
	isLinux: /linux/i.test(process.platform)
};

if (platform.isWin) {
	fs.writeFile(path.join(npmRoot, '../dict.cmd'), fileContent(__dirname), (err) => {
		if (err) throw err;
		console.log("dict 已成为全局命令，您现在可以执行命令：");
		console.log(color.green("  dict hello"));
		console.log("即可翻译hello");
	});
} else if (platform.isLinux) {
	let dictPath = path.join(__dirname, "bin/dict");
	fs.writeFile(dictPath, fileContent(__dirname), {
		mode: 0o777 /// 必须具备执行的权限，否则执行 dict 时会提示没有权限
	}, err => {
		if (err) throw err;
		cp.exec(`ln -s ${dictPath} ${path.join(process.argv[0],'../dict')}`, {
			encoding: 'utf8'
		}, (error, stdout, stderr) => {
			if (error) throw error;
			console.log("dict 已成为全局命令，您现在可以执行命令：");
			console.log(color.green("  dict hello"));
			console.log("即可翻译hello");
		});
	});
}

function fileContent(projectRoot) {
	projectRoot = path.join(projectRoot, 'index.js');
	var s;
	if (platform.isWin) {
		s = `@IF EXIST "%~dp0\\node.exe" (
  "%~dp0\\node.exe"  "${projectRoot}" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "${projectRoot}" %*
)
        `;
	} else if (platform.isLinux) {
		s = `#!/usr/bin/env node

require('${projectRoot}');
        `;
	}
	return s;
}
