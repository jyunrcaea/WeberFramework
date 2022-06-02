const Weber = {}

Weber.Canvas = null;
Weber.Renderer = null;
Weber.CenterWidth = 0;
Weber.CenterHeight = 0;
Weber.ObjectList = [
    
];

Weber.Error = function(text = "알수없는 오류") {
    console.error("Weber Error: " + text);
}

Weber.Log = function(text = "Hello world") {
    console.log("Weber Log: " + text);
}

Weber.Resize = function() {
    document.body.appendChild(Weber.Canvas);
    Weber.CenterWidth = (Weber.Canvas.width = window.innerWidth) / 2;
    Weber.CenterHeight = (Weber.Canvas.height = window.innerHeight) / 2;
}

Weber.Init = function() {
    if ((Weber.Canvas = document.getElementById("canvas"))==null) {
        Weber.Error("html 내에 id가 'canvas' 인 요소가 존재하지 않습니다.");
        return false;
    }
    if (Weber.Canvas.tagName != "CANVAS") {
        Weber.Error("'canvas' id를 가진 요소가 <canvas> 이외의 타입을 가진 요소입니다.");
        return false;
    }
    Weber.Renderer = Weber.Canvas.getContext('2d');
    Weber.Resize();
    Weber.Log("weber 초기화됨");
    return true;
}

Weber.Start = function(Fps) {
    if (Weber.ObjectList.length == 0) {
        Weber.Error("'ObjectList' 배열 내에 오브젝트가 존재하지 않습니다, 프레임워크가 작동할 이유가 없습니다.");
    }
    Weber.Renderer.fill();
    Weber.DrawMethod = setInterval(Weber.DrawManager,parseInt(1000 / Fps));
    window.onresize = Weber.Resize;
    Weber.Log("Weber Framework가 작동을 시작합니다.");
    return true;
}

Weber.Render = function(obt = new Obt()) {
    if (obt.hide) return;
    var x = 0, y = 0, w = obt.width,h = obt.height,dx=0,dy=0;
    function setting() {
        if (obt.dpx == 1) {
            dx -= w/2;
        } else if (obt.dpx == 0) {
            dx -= w;
        }
        if (obt.dpy == 1) {
            dy -= h/2;
        } else if (obt.dpy == 0) {
            dy -= h;
        }
        Weber.Renderer.save();
        Weber.Renderer.translate(x+obt.x,y+obt.y);
        Weber.Renderer.rotate(obt.rotate * Math.PI / 180);
    }
    //가로 위치
    switch (obt.px) {
        case 1:
            x = center_width;
            break;
        case 2:
            x = canvas.width;
            break;
    }
    //세로 위치
    switch (obt.py) {
        case 1:
            y  = center_height;
            break;
        case 2:
            y = canvas.height;
            break;
    }
    switch(obt.type) {
        case 0:
            if (w===null) w=canvas.width;
            if (h===null) h=canvas.height;
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
            Weber.Renderer.drawImage(obt.resource,dx,dy,w,h);
            break;
    }
    Weber.Renderer.restore();
}

Weber.DrawManager = function() {
    Weber.Renderer.fill();
    for (var i=0;i<Weber.ObjectList.length;i++) {
        render(Weber.ObjectList[i]);
    }
}

const PositionX = {
    Center:0,
    Right:1,
    Left:2
};

const PositionY = {
    Center:0,
    Top:1,
    Bottom:2
};

const ObjectType = {
    Square:0,
    Image:1,
    Font:2
};

class Obt {
    constructor(
        type = ObjectType.Square,
        x=0,
        y=0,
        w=null,
        h=null,
        size=1,
        rotate=0,
        pos_x=PositionX.Center,
        pos_y=PositionY.Center,
        draw_pos_x=PositionX.Center,
        draw_pos_y=PositionY.Center,
        source = "rgb(180,255,180)",
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