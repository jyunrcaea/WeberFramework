export default class Weber {
    static #Canvas = null;
    static #Renderer = null;
    static #CenterWidth = 0;
    static #CenterHeight = 0;
    static ObjectList = [];
    static #Error(text = "알수없는 오류") {
        console.error("Weber Error: " + text);
    }
    static #Log(text = "Hello world") {
        console.log("Weber Log: " + text);
    }
    static #Resize() {
        document.body.appendChild(this.#Canvas);
        this.#CenterWidth = (this.#Canvas.width = window.innerWidth) / 2;
        this.#CenterHeight = (this.#Canvas.height = window.innerHeight) / 2;
    }
    static Init(id = "canvas") {
        if ((this.#Canvas = document.getElementById(id))==null) {
            this.#Error("html 내에 id가 '" + id + "' 인 요소가 존재하지 않습니다.");
            return false;
        }
        if (this.#Canvas.tagName != "CANVAS") {
            this.#Error("'canvas' id를 가진 요소가 <canvas> 이외의 타입을 가진 요소입니다.");
            return false;
        }
        this.#Renderer = this.#Canvas.getContext('2d');
        this.Resize();
        this.#Log("weber 초기화됨");
        return true;
    }
    static Start(Fps) {
        if (this.ObjectList.length == 0) {
            this.#Error("'ObjectList' 배열 내에 오브젝트가 존재하지 않습니다, 프레임워크가 작동할 이유가 없습니다.");
        }
        this.Renderer.fill();
        this.DrawMethod = setInterval(this.#DrawManager,parseInt(1000 / Fps));
        window.onresize = this.#Resize;
        this.#Log("Weber Framework가 작동을 시작합니다.");
        return true;
    }
    static #Render(obt = new Obt()) {
        if (obt.hide) return;
        var x = 0, y = 0, w = obt.width,h = obt.height,dx=0,dy=0;
        function setting() {
            if (obt.dpx == 0) {
                dx -= w/2;
            } else if (obt.dpx == 2) {
                dx -= w;
            }
            if (obt.dpy == 0) {
                dy -= h/2;
            } else if (obt.dpy == 2) {
                dy -= h;
            }
            this.#Renderer.save();
            this.#Renderer.translate(x+obt.x,y+obt.y);
            this.#Renderer.rotate(obt.rotate * Math.PI / 180);
        }
        //가로 위치
        switch (obt.px) {
            case 0:
                x = this.#CenterWidth;
                break;
            case 2:
                x = this.#Canvas.width;
                break;
        }
        //세로 위치
        switch (obt.py) {
            case 0:
                y  = this.#CenterHeight;
                break;
            case 2:
                y = this.#Canvas.height;
                break;
        }
        switch(obt.type) {
            case 0:
                if (w===null) w=this.#Canvas.width;
                if (h===null) h=this.#Canvas.height;
                setting();
                Weber.Renderer.fillStyle = obt.resource;
                Weber.Renderer.fillRect(dx,dy,w,h);
                break;
            case 1:
                if (w===null) w=obt.resource.width;
                if (h===null) h=obt.resource.height;
                w*=obt.size;
                h*=obt.size;
                setting();
                this.#Renderer.drawImage(obt.resource,dx,dy,w,h);
                break;
        }
        this.#Renderer.restore();
    }
    static #DrawManager() {
        this.#Renderer.fill();
        for (var i=0;i<this.ObjectList.length;i++) {
            this.#Render(this.ObjectList[i]);
        }
    }
    
}

export const WeberTypes = {
    PositionX:{
    Center:0,
    Right:1,
    Left:2
    },
    PositionY:{
    Center:0,
    Top:1,
    Bottom:2
    },
    ObjectType:{
    Square:0,
    Image:1,
    Font:2
    },
    Color:{
        Red:"rbg(255,0,0)",
        Orange:"rbg(255,127,0)",
        Yellow:"rbg(255,212,0)",
        Green:"rbg(0,128,0)",
        Blue:"rbg(0,0,255)",
        SkyBlue:"rbg(80,188,233)",
        Violet:"rbg(139,0,255)",
        White:"rbg(255,255,255)",
        Black:"rbg(0,0,0)",
        Grey:"rbg(127,127,127)",
        Dark:"rbg(31,30,51)"
    }
}

export class Obt {
    constructor(
        type = WeberTypes.ObjectType.Square,
        x=0,
        y=0,
        w=null,
        h=null,
        size=1,
        rotate=0,
        pos_x=WeberTypes.PositionX.Center,
        pos_y=WeberTypes.PositionY.Center,
        draw_pos_x=WeberTypes.PositionX.Center,
        draw_pos_y=WeberTypes.PositionY.Center,
        source = WeberTypes.Color.Dark,
        subsource = null,
        hide = false
    ) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.type = type;
        this.px = pos_x;
        this.py = pos_y;
        this.dpx = draw_pos_x;
        this.dpy = draw_pos_y;
        this.rotate = rotate;
        this.hide = hide;
        this.width = w;
        this.height = h;
        switch (this.type) {
            case 1:
                this.resource = new Image();
                this.resource.src = source;
                break;
            default:
                this.resource = source;
                break;
        }
    }
}