var http = require('http'); // httpオブジェクトのロード
var fs   = require('fs');   // file systemオブジェクトのロード
var ejs  = require('ejs');

var wholetemplate   = fs.readFileSync('./toppage.ejs', 'utf8'); // サーバーを作る前にファイルを読み込ませる
var contenttemplate = fs.readFileSync('./content.ejs', 'utf8');

var server = http.createServer();
server.on('request', doRequest);
server.listen(1234);
console.log('Server Running !!');

function doRequest(request, response) {
	var render = ejs.render(wholetemplate, 
							{title:"タイトルです",
							 content: ejs.render(contenttemplate, {
								 data: [
									 "これは最初のデータです",
									 "次のデータだよ。",
									 "一番最後のデータだよ"
								 ]
							 })
							});
	response.writeHead(200, {'Content-Type': 'text/html'}); // レスポンスヘッダを送信
	response.write(render);                                    // ファイル内容読み込み
	response.end();
}
