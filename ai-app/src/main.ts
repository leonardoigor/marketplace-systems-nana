import Server from './core/server';
import colorPredict from './core/color_predict'

const server = Server;
colorPredict.healthCheck();
const port = 3001
server.listen(port, () => {
    console.log('Server is running on port ' + port);
});