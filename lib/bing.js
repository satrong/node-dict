/// 爬 必应词典 内容

module.exports = {
    name: "必应词典",
    url: function(w) {
        return 'http://cn.bing.com/dict/search?q=' + encodeURI(w);
    },
    headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4',
        'Referer': 'http://cn.bing.com/dict/'
    },
    action: function($) {
        var headword = $("#headword");
        if (headword.length === 0) {
            return '抱歉，没有查询到';
        }
        var data = [];
        data.push(headword.text());
        headword.parent().next().children().each(function() {
            data.push([$(this).children().eq(0).text(), $(this).children().eq(1).text()]);
        });
        return data;
    }
};
