
'use strict';

import http from 'http';

export function translate(req, res){
    var word = encodeURIComponent(req.params.word);
	var options = {
	  host: 'lexin.nada.kth.se',
	  path: '/lexin/service?searchinfo=to,swe_rus,' + word
	};
	http.get(options, function(resp){
		resp.setEncoding('utf8');
		var body = '';
		resp.on('data', function (chunk) {
		    body += chunk;
		});
		resp.on('end', function(){
			res.status(200).json({htmlData : body});
		});
	}).on('error', function(e){
		console.log("Error from Lexin: " + e.message);
		res.status(500).send(e);
	});
}