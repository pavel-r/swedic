'use strict';

import compose from 'composable-middleware';
import Busboy from 'busboy';

export function fileToReqBody(){
    return compose()
      .use(function(req, res, next){
        var body = '';
        var busboy = new Busboy({ headers: req.headers });
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
          console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
          file.on('data', function(data) {
            console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
            body += data;
          });
          file.on('end', function() {
            console.log('File [' + fieldname + '] Finished');
            req.body = JSON.parse(body);
            next();
          });
        });
        req.pipe(busboy);
      });
}