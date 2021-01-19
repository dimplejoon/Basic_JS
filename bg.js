const body = document.querySelector("body");

const IMG_NUMBER = 7;

function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg` // +1 을 주는 이유는 알지? 컴은 무조건 0부터 시작이야
    image.classList.add("bgImage");
    body.prepend(image); //prepend 부모 태그 가장 앞에 내가 넣을 태그를 위치시킨다. prepend = "접두어를 붙이다"
}

function genRandom(){
    const number = Math.floor(Math.random() * 7); 
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber)
}

init();