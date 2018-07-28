
const word = encodeURI(Array.prototype.slice.call(process.argv, 2).join(' '));
const ora = require('ora');
const dictList = ["bing", "youdao"]; /// 对应lib文件夹的文件名

if (['-v', '--version'].indexOf(word.toLowerCase()) > -1) {
	console.log(require('./package.json').version);
	return;
}

(async () => {
	const spinner = ora().start();
	for (let i = 0, len = dictList.length; i < len; i++) {
		try {
			const result = await require('./lib/' + dictList[i])(word);
			spinner.succeed(result);
			break;
		} catch (err) {
			if (i + 1 === len) {
				spinner.fail('查询失败');
			}
		}
	}
})();
