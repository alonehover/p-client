let context: any = null;//画布上下文
let boundaryHeight = 0;//画布高，边界值
let boundaryWidth = 0;//画布宽，边界值
let starArr: any[] = [];
let meteorArr: any[] = [];
let STAR_COUNT = 500;//星星数，常量
let METEOR_COUNT = 4;//流星数，常量
let METEOR_SEPARATE = 100; //流星之间间隔，常量
let meteorCoordinateArr: any[] = [];//存所有流星的坐标数组
let playMeteorTimeout: any = null;
let playStarsTimeout: any = null;

class MeteorRain {
    constructor(
        public x: number = -1,
        public y: number = -1,
        public length: number = -1,
        public angle: number = 30,
        public width: number = -1,
        public height: number = -1,
        public speed: number = 1,
        public offset_x: number = -1,
        public offset_y: number = -1,
        public alpha: number = 1
    ) {

    }

    init(i: any) {
        this.alpha = 1;//透明度
        this.angle = 30; //流星倾斜角
        this.speed = Math.ceil(Math.random() + 0.5); //流星的速度

        const x = Math.random() * 80 + 180;
        const cos = Math.cos(this.angle * 3.14 / 180);
        const sin = Math.sin(this.angle * 3.14 / 180) ;

        this.length = Math.ceil(x);//流星长度

        this.width = this.length * cos;  //流星所占宽度，及矩形的宽度
        this.height = this.length * sin; //流星所占高度，及矩形的高度
        this.offset_x = this.speed * cos * 3.5;
        this.offset_y = this.speed * sin * 3.5;

        this.getPos(i);
    }

    getPos(i: any) {
        const _this = this;

        function getCoordinate(): void {
            _this.x = Math.random() * boundaryWidth; //x坐标

            for (let k = 0; k < meteorCoordinateArr.length; k++) {
                if (Math.abs(_this.x - meteorCoordinateArr[k]) < METEOR_SEPARATE) { //这里如果流星之间距离过小，会把其他流星隔断，严重影响效果。
                    return getCoordinate();
                }   
            }

            meteorCoordinateArr[i] = _this.x;
        }

        getCoordinate();

        this.y = 0.2 * boundaryHeight;  //y坐标
    }

    //画流星
    draw () {
        context.save();
        context.beginPath();
        context.lineWidth = 2.5; //宽度
        context.globalAlpha = this.alpha; //设置透明度

        //创建横向渐变颜色,起点坐标至终点坐标
        const line = context.createLinearGradient(this.x, this.y, this.x + this.width, this.y - this.height);

        //分段设置颜色
        line.addColorStop(0, "rgba(255, 255, 255, 1)");
        line.addColorStop(1, "rgba(255, 255,255 , 0)");

        if (this.alpha < 0 ) {
            this.alpha = -this.alpha;
        }
        //填充
        context.strokeStyle = line;
        //起点
        context.moveTo(this.x, this.y);
        //终点
        context.lineTo(this.x + this.width, this.y - this.height);

        context.closePath();
        context.stroke();
        context.restore();
    }

    //计算流星坐标
    countPos () {
        //往左下移动,x减少，y增加
        this.x = this.x - this.offset_x;
        this.y = this.y + this.offset_y;
    }

    move () {

        const x = this.x + this.width - this.offset_x;
        const y = this.y - this.height;

        this.alpha -= 0.002;

        //重新计算位置，往左下移动
        this.countPos();

        if (this.alpha <= 0) {
            this.alpha = 0;
        }
        else if(this.alpha > 1) {
            this.alpha = 1;
        }

        //画一个矩形去清空流星
        context.clearRect(this.x - this.offset_x, y, this.width + this.offset_x, this.height); 
        //重绘
        this.draw(); 
    }
}

class Star {
    constructor(
        public x: number = boundaryWidth * Math.random(),
        public y: number = boundaryHeight * Math.random(),
        public color: string = ""
    ) {

    }

    init() {
        this.getColor();
    }

    //产生随机颜色
    getColor () {
        const _randomNum = Math.random();

        if (_randomNum < 0.5) {
            this.color = "gray";
        }
        else {
            this.color = "white";
        }

    }

    //绘制
    draw () {
        context.beginPath();
        //画圆点
        context.arc(this.x, this.y, 0.05, 0, 2 * Math.PI);
        context.strokeStyle = this.color;
        context.stroke(); 
        context.closePath();
    } 
}

//星星闪起来
function playStars() {
    for (let n = 0; n < STAR_COUNT; n++) {  
        starArr[n].getColor();  
        starArr[n].draw();  
    }  

    clearTimeout(playStarsTimeout);
    playStarsTimeout = setTimeout(playStars, 200);
}

//流星动起来
function playMeteor() {
    for (let n = 0; n < METEOR_COUNT; n++) {  
        const rain = meteorArr[n];

        rain.move();//移动

        if (rain.y > boundaryHeight + 100) {//超出界限后重来
            context.clearRect(rain.x, rain.y - rain.height, rain.width, rain.height);
            meteorCoordinateArr[n] = 0;//清空坐标数组具体流星的坐标
            meteorArr[n] = new MeteorRain(n);
            meteorArr[n].init(n);
        }
    }  

    clearTimeout(playMeteorTimeout);
    playMeteorTimeout = setTimeout(playMeteor, 5);
}

//初始化画布及context
function init(container: any) {
    starArr = [];
    meteorArr = [];

    const canvas = document.createElement("canvas");
    container.appendChild(canvas);

    console.log(container.offsetWidth, container.offsetHeight);
    debugger

    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    boundaryHeight = canvas.height;
    boundaryWidth =  canvas.width;

    //获取context
    context = canvas.getContext("2d");
    context.fillStyle = "black";

    //画星星
    for (let i = 0; i < STAR_COUNT; i++) {
        const star = new Star();
        star.init();
        star.draw();
        starArr.push(star);
    }
    //画流星
    for (let j = 0; j < METEOR_COUNT; j++) {
        const rain = new MeteorRain();
        rain.init(j);
        rain.draw();
        meteorArr.push(rain);
    }

    playStars();//星星动起来
    playMeteor();//流星动起来
}

export default init