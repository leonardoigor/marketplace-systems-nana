const ts = require('@tensorflow/tfjs');

class ColorPredict {
    private model: any;
    healthCheck() {
        console.log('ColorPredict healthCheck');
    }
    constructor() {
        this.model = this.makeModel();
        const x = [[0, 0, 0], [255, 255, 255]]
        const y = [[1, 0], [0, 1]]
        this.train(x, y).then(() => {
            console.log('ColorPredict train done');
        });
        console.log('ColorPredict constructor');
    }
    color_normalize(color: number) {
        return color / 255;
    }
    color_array_normalize(color: number[][]) {
        return color.map((c) => c.map((cc) => this.color_normalize(cc)));
    }
    async train(input: number[][], output: number[][]) {
        const _input_tensor = ts.tensor2d(this.color_array_normalize(input), [input.length, 3]);
        const _output_tensor = ts.tensor2d(output, [output.length, 2]);
        await this.model.fit(_input_tensor, _output_tensor, {
            epochs: 1000, callbacks: {
                onEpochEnd: async (epoch: any, logs: any) => {
                    if (epoch % 100 === 0) {
                        console.log(epoch, logs.loss);
                    }
                }
            }
        });
        // save model
        // const saveResult = await this.model.save('./');
        this.predict([[0, 0, 0], [255, 255, 255]]).then((result) => {
            console.log('ColorPredict predict', result);
        });
        console.log('ColorPredict train',);
    }
    async predict(input: number[][]): Promise<boolean[]> {
        const results = []
        input = this.color_array_normalize(input);
        for (let i = 0; i < input.length; i++) {
            const _input_tensor = ts.tensor2d(([input[i]]), [1, 3]);
            const result = await this.model.predict(_input_tensor);
            const d = await result.dataSync()
            results.push(this.argmax(d) > 0);
        }
        return results;
    }
    private argmax(array: number[]) {
        return array.indexOf(Math.max(...array));
    }
    private makeModel() {
        const model = ts.sequential();
        model.add(ts.layers.dense({ units: 1, inputShape: [3], activation: 'relu' }));
        model.add(ts.layers.dense({ units: 64, activation: 'relu' }));
        model.add(ts.layers.dense({ units: 2, activation: 'softmax' }));
        model.compile({ loss: 'binaryCrossentropy', optimizer: 'sgd' });
        model.summary();
        return model;
    }
}
const colorPredict = new ColorPredict();
export default colorPredict;