const Weber = {}

Weber.Canvas = null;
Weber.Renderer = null;

Weber.Error = function(text) {
    console.error("Weber Error: " + text);
}

Weber.Init = function() {
    if ((Weber.Canvas = document.getElementById("canvas"))==null) {
        Weber.Error("html 내에 id가 'canvas' 인 요소가 존재하지 않습니다.");
        return false;
    }
    console.log(Weber.Canvas.tagName);
    if (Weber.Canvas.tagName != "CANVAS") {
        Weber.Error("'canvas' id를 가진 요소가 <canvas> 이외의 타입을 가진 요소입니다.");
        return false;
    }
    Weber.Renderer = Weber.Canvas.getContext('2d');
    console.log("weber 초기화됨");
    return true;
}

export default Weber;