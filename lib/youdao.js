/// 有道词典
const request = require("request");
const cheerio = require("cheerio");
const headers = require('./headers');

module.exports = keyword => {
	return new Promise((resolve, reject) => {
		request({
			url: `http://dict.youdao.com/suggest?type=DESKDICT&num=1&q=${keyword}&ver=2.0&le=eng`,
			headers,
			jar: true,
		}, (error, response, body) => {
			if (!error && response.statusCode == 200) {
				const $ = cheerio.load(body);
				let result = '';
				$("item").children().each((index, el) => {
					if (el.name === 'explain') {
						result = el.firstChild.data.trim().slice(7, -2);
					}
				});
				resolve(result);
			} else {
				reject();
			}
		});
	});
}
