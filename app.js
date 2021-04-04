var url = require('url');
var fs = require('fs');

function renderHtml(filepath,response){
    response.writeHead(200,{'Content-Type':'text/html'});
    fs.readFile(filepath,(err,data)=>{
        if(err){
            response.writeHead(404,'File Not Found')
        }
        else{
            response.write(data);
        }
        response.end();
    })
    //module2.func2();
}

module.exports = {
    handleRequests : (req,res)=>{
        res.writeHead(200,{'Content-Type':'text/html'});
        let path = url.parse(req.url).pathname;
        switch(path){
            case '/': 
                renderHtml('./index.html',res)
                break;
            case '/login':
                renderHtml('./login.html',res);
                break;
            default :
                res.writeHead(404,{'Content-Type':'text/plain'});
                res.write('404 File Not Found');
                res.end();
        }
    }
}
