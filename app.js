var superagent = require('superagent');/*抓取网页内容的网页爬虫*/
var cheerio = require('cheerio');/*nodejs版的jquery*/
var express = require('express');
var app = express();
app.get('/', function(req, res, next){
	superagent.get('https://cnodejs.org')
		.end(function(err, sres){
			if(err){
				return next(err);
			}
			var $ = cheerio.load(sres.text);
			var items = [];
			$('#topic_list .topic_title').each(function(idx, element){
				var $element = $(element);
				items.push({
					title: $element.attr('title'),
					href: $element.attr('href'),
					user: $element.parent().parent().find('.user_avatar').attr('href').replace('/user/', '')
				});
			});
			res.send(items);
		});
});
app.listen(process.env.PORT || 8080, function(){
	console.log('App is listening at port 8080');
})