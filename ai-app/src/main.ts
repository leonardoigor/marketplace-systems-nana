import Server from './core/server';
import colorPredict from './core/color_predict'
import path from 'path';
const fs = require('fs');

const server = Server;
colorPredict.healthCheck();
const port = 3001
server.get('/make_data', (req, res) => {
    const html = "src\\render\\train\\train.html"
    res.sendFile(html, { root: '.' });
});
server.post('/save_data', (req, res) => {
    const data = req.body;
    const file_path = "./ai-app/src/render/train/data.json"
    const relative_path = path.relative(__dirname, file_path);
    fs.readFile(relative_path, (err: any, data: any) => {
        if (err) {
            console.log(err);
            res.send('error');
        }
        let body = JSON.parse(JSON.stringify(req.body))
        data = JSON.parse((data.toString()))
        data = [].concat(...data, ...body)
        fs.writeFile(relative_path, JSON.stringify(data), (err: any) => {
            if (err) {
                res.send('error');
            }
            res.send({ status: 'ok' });
        })        // res.send('ok');
    });
});
server.listen(port, () => {
    console.log('Server is running on port ' + port);
});