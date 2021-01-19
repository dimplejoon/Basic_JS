const weather = document.querySelector(".js-weather");

const API_KEY = "3ac05120c8c6723fcc9860e96e9ff734";
const COORDS = "coords";

function getWeather(lat,lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric` //lat= , lon= , appid= 부분에는 내가 지정한 longitude와 latitude그리고 API 키를 ${ } 안에 넣어줘야 한다
).then(function(response){
    return response.json();
})
 .then(function(json){
     const temperature = json.main.temp;
     const place = json.name;
     weather.innerText = `${temperature} @ ${place}`
 });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, //객체에 변수의 이름과 키의 이름을 같게 저장해주는 객체 함수를 만들고 있다.
        longitude // latitude:latitude , longitude:longitude 라는 의미
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude)
}

function handleGeoError(){
    console.log('Cant access geo location');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError); //앞의 현재 주소 가져오는 것 성공했을 때 그 것을 담을 함수 옆이 실패했을 때 담을 함수
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null)  {
        askForCoords();
    } else{
        const parseCoords = JSON.parse(loadedCoords); //stirng화 되어있는 것을 JSON화 시키는 것.Javascript에서 객체를 만들 때 사용하는 표현식. 자바스크립트에서 데이터를 저장하거나 전송할 때 사용되는 경량의 DATA 교환 형식
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}/*local storage에 아무것도 없으면(null)이면 정상적으로 askForCoords함수가 실행되고, 
이 함수 안에서 정상적으로 위치정보를 가져오게 되면 handleGeoSuccess가 실행되는데, 
이 안에서 API가 최종적으로 호출된다.*/

function init(){
    loadCoords();
}

init();
