/// 有道词典

module.exports = {
	name: "有道词典",
	url: function(w) {
		return "http://m.youdao.com/dict?le=eng&q=" + w;
	},
	headers: {
		"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
		"Referer": "http://m.youdao.com/"
	},
	action: function($) {
		var ec = $("#ec"),
			data = [];
		if (ec.length === 0) return "抱歉，没有查询到";
		data.push(ec.children("h2").children("span").text().trim());
		ec.children("ul").children().each(function() {
			var s = $(this).text().trim();
			data.push((s.match(/^([a-z]+\.)\s*(.+)/i) || []).slice(1));
		});
		return data;
	}
};
