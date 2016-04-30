var request = require("request");
var cheerio = require("cheerio");
var color = require('bash-color');
var out = process.stdout;
var word = encodeURI(Array.prototype.slice.call(process.argv, 2).join(' '));

var dictList = ["bing", "youdao"]; /// 对应lib文件夹的文件名
(function crawl(i) {
	var dotCount = 0;
	var option = require('./lib/' + dictList[i]);
	var f = setInterval(function() {
		++dotCount;
		if (dotCount > 3) {
			dotCount = 1;
		}
		out.clearLine();
		out.cursorTo(0);
		out.write(color.green('正在使用 ' + option.name + ' 查询' + '.'.repeat(dotCount)));
	}, 1000);
	request({
		url: option.url(word),
		headers: option.headers || {},
		timeout: 5000
	}, function(error, response, body) {
		clearInterval(f);
		if (!error && response.statusCode == 200) {
			out.clearLine();
			out.cursorTo(0);
			var $ = cheerio.load(body);
			var data = option.action($);
			if (typeof data === 'string') {
				i < dictList.length - 1 ? crawl(++i) : console.log(color.cyan(data));
			} else {
				data.map(function(item, index) {
					if (index === 0) {
						console.log(color.wrap(item, color.colors.BLUE, color.styles.hi_background));
					} else {
						console.log(color.wrap(item[0], color.colors.YELLOW, color.styles.background), item[1]);
					}
				});
			}
		} else {
			i < dictList.length - 1 ? crawl(++i) : console.log(color.red('查询失败', true));
		}
	});
})(0);
