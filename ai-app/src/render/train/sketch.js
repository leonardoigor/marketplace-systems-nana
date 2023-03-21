let btn = null
let btn_b, btn_w, btb_s = null
let s_1_color = [0, 0, 0]
let isChoosed = false
let lastColor = 0
let data = []
function setup() {
	createCanvas(800, 800);
	btn = createButton('random');
	btn.position(0, 0);
	btb_s = createButton('save');
	btb_s.position(140, 0);
	btb_s.mousePressed(() => {
		fetch("/save_data", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}).then(console.log)
	})

	btn.mousePressed(() => {
		btn.attribute('disabled', 'disabled')
		isChoosed = false
		s_1_color = [random(255), random(255), random(255)]
		data.push({
			color: s_1_color,
			isChoosed: isChoosed,
			lastColor: lastColor
		})
	});
	btn.attribute('disabled', 'disabled')

	btn_b = createButton('black');
	btn_b.position(60, 0);

	btn_w = createButton('white');
	btn_w.position(100, 0);
	btn_w.mousePressed(() => {
		console.log('white');
	})
	// if is choosed, change to btn enable else disable
	btn_b.mousePressed(() => {
		isChoosed = true
		btn.removeAttribute('disabled')
		lastColor = 0
	})
	btn_w.mousePressed(() => {
		isChoosed = true
		btn.removeAttribute('disabled')
		lastColor = 1
	})

}

function draw() {
	background(s_1_color);

	fill(lastColor > 0 ? 255 : 0);
	circle(width / 2, height / 5, 50);
	draLineCenter()
	drawnCircle();
}
function draLineCenter() {
	stroke(255);
	// line(0, height / 2, width, height / 2);
	line(width / 2, 0, width / 2, height);
}
function drawnCircle() {
	textAlign(CENTER, CENTER);
	let x = getScreen01();
	let fontSize = 32;
	textSize(fontSize);
	fill(255);
	stroke(0);
	text('Screen 01', x, height / 2);

	fill(0);
	x = getScreen02();
	text('Screen 02', x, height / 2);
}
const lerp = (a, b, n) => (1 - n) * a + n * b;
const getScreen01 = () => {
	// screen 01 is 0 to half of the screen
	return lerp(0, width / 2, .5);
}
const getScreen02 = () => {
	// screen 02 is half of the screen to the end of the screen
	return lerp(width / 2, width, .5);
}
