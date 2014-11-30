var http = require('http'); // httpオブジェクトのロード
var fs   = require('fs');

var server = http.createServer();
server.on('request', doRequest);
server.listen(1234);
console.log('Server Running !!');

function doRequest(request, response) {
	var number = Math.floor(Math.random() * 3); // 繰り下げた整数値
	fs.readFile('./toppage.html', 'UTF-8',
				function (err, data) {
					var title   = ["ページA", "ページB", "ページC"];
					var content = ["※これはサンプルで作ったものです。",
								  "もう一つのコンテンツです",
								  "最後に用意したコンテンツです"];
					var data2   = data.replace(/@title@/g, title[number]).replace(/@content@/g, content[number]);
					response.writeHead(200, {'Content-Type': 'text/html'}); // レスポンスヘッダを送信
					response.write(data2);                                    // ファイル内容読み込み
					response.end();
				});
}
