
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
		resp.on('data', function (chunk) {
			res.send({htmlData : "" + chunk});
		});
	}).on('error', function(e){
		console.log("Error from Lexin: " + e.message);
		res.send("");
	});
}