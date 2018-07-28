/// 爬 必应词典 内容
const request = require('request');
const headers = require('./headers');

module.exports = keywrod => {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://cn.bing.com/dict',
            jar: true,
            headers,
        }, (error, response) => {
            if (!error && response.statusCode == 200) {
                request({
                    url: 'https://cn.bing.com/dict/search?q=' + keywrod,
                    jar: true,
                    headers,
                }, (error, response, body) => {
                    if (!error && response.statusCode == 200) {
                        const matched = body.match(/<meta name="description" content="([^"]+)/) || [];
                        if (matched.length > 1) {
                            const result = matched[1].replace(/^必应词典为您提供.+的释义，/, '');
                            resolve(result);
                        } else {
                            reject();
                        }
                    } else {
                        reject();
                    }
                });
            } else {
                reject();
            }
        });
    });
}



// module.exports = {
//     name: "必应词典",
//     url: function (w) {
//         return 'http://cn.bing.com/dict/search?q=' + w;
//     },
//     headers: {
//         'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
//         'Referer': 'http://cn.bing.com/dict/',
//         'cookie': '_EDGE_V=1; MUID=2E542AE9C43F6E23158F26D3C5516FD6; SRCHD=AF=NOFORM; SRCHUID=V=2&GUID=6DEC098A304541AD87E0C10ACACC6E91&dmnchg=1; MUIDB=2E542AE9C43F6E23158F26D3C5516FD6; SRCHHPGUSR=CW=1390&CH=909&DPR=2&UTC=480&WTS=63668367209; ipv6=hit=1532774010602&t=4; ClarityID=a25f4570b5594e68879164fcb2a4d433; _EDGE_S=mkt=zh-cn&F=1&SID=39884BE3FAC96F02065A47D9FBA76EE8; SuspenBar=CLOSE=1; SRCHUSR=DOB=20180728&T=1532770455000; ULC=P=11C72|1:1&H=11C72|1:1&T=11C72|1:1; ENSEARCH=BENVER=0; _SS=SID=39884BE3FAC96F02065A47D9FBA76EE8&HV=1532773645&bIm=783',
//     },
//     action: function (body) {
//         const matched = body.match(/<meta name="description" content="必应词典为您提供index的释义，([^"]+)/) || [];
//         return matched.length > 1 ? matched[1] : null;
//     }
// };
