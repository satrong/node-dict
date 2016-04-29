var request = require("request");
var cheerio = require("cheerio");
var color = require('bash-color');
var out = process.stdout;

var dotCount = 0;
var word = Array.prototype.slice.call(process.argv, 2).join(' ');
var search = function(w) {
    return 'http://cn.bing.com/dict/search?q=' + encodeURI(w);
};




var dictList = ["bing"]; /// 对应lib文件夹的文件名
(function() {
    var option = require('./lib/' + dictList[0]);
    var f = setInterval(function() {
        ++dotCount;
        out.clearLine();
        out.cursorTo(0);
        out.write(color.green('正在使用 ' + option.name + ' 查询' + '.'.repeat(dotCount)));
    }, 300);
    request({
        url: option.url(word),
        headers: option.headers || {}
    }, function(error, response, body) {
		clearInterval(f);
		if (!error && response.statusCode == 200) {
			var $ = cheerio.load(body);
			var data = option.action($);


			var headword = $("#headword");
			out.clearLine();
			out.cursorTo(0);
			if (headword.length === 0) {
				return console.log(color.cyan('抱歉，没有查询到'));
			}
			console.log(color.wrap(headword.text(), color.colors.BLUE, color.styles.hi_background));
			headword.parent().next().children().each(function() {
				var type = color.wrap($(this).children().eq(0).text(), color.colors.YELLOW, color.styles.background);
				var explanation = $(this).children().eq(1).text();
				console.log(type, explanation);
			});
		} else {
			console.log(color.red('查询失败', true));
		}
    });
})();




request({
    url: search(word),
    headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4',
        'Referer': 'http://cn.bing.com/dict/'
    }
}, function(error, response, body) {
    clearInterval(f);
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        var headword = $("#headword");
        out.clearLine();
        out.cursorTo(0);
        if (headword.length === 0) {
            return console.log(color.cyan('抱歉，没有查询到'));
        }
        console.log(color.wrap(headword.text(), color.colors.BLUE, color.styles.hi_background));
        headword.parent().next().children().each(function() {
            var type = color.wrap($(this).children().eq(0).text(), color.colors.YELLOW, color.styles.background);
            var explanation = $(this).children().eq(1).text();
            console.log(type, explanation);
        });
    } else {
        console.log(color.red('查询失败', true));
    }
});
