const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

/*function filterFn(toDo){//여기 ()안의 인자의 이름은 뭐든 가능. 따라서 알기 쉽게 설정
    return toDo.id ===1; //true(아아디가 1일때만) 일 때만 반환
}*/ //forEach에서 function을 실행하는 것 같이 각각의 item과 같이 실행이 된다.

let toDos = []; //입력해준 할 것 목록 저장이 되는 배열
//const는 변경불가인 상수, let은 변경가능한 변수
function deleteToDo(event){
    const btn = event.target;//event.target은 실제 이벤트가 발생하는 위치, 내가 클릭한 요소를 반환한다. 여기서 내가 어떤 것을 삭제시키는지 보여준다. 
    const li = btn.parentNode; //지워줘야 할 li인 parentNode를 event.target의 메소드를 가진 btn을 객체로 활용하여 parentNode를 지정해줌
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });//filter는 함수 하나를 실행시킨다.
    toDos = cleanToDos
    saveToDos(); // 그다음 로컬 스토리지에 저장해줘야 웹페이지에 기록이 안남아서 새로고침해도 삭제된 상태가 유지된다.
} //filter는 array의 모든 아이템을 통해 함수를 실행하고 그리고 true인 아이템들만 가지고 새로운 array를 만든다.

function saveToDos(){//콘솔에 toDoObj를 통해 생성해준 것을 localstorage에도 저장해주기 위함. 저장안해주면 일회성으로 사라짐
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

function paintToDo(text){
    const li=  document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1; 
    li.id = newId; //li에게 id를 주기 위함
    delBtn.innerText = "✖";
    delBtn.addEventListener("click", deleteToDo); 
    span.innerText=text;
    li.appendChild(delBtn);
    li.appendChild(span);
    toDoList.appendChild(li);
    const toDoObj = { //콘솔에 생성
        text:text,//text라는 key에 text가 value로 온다는 것.
        id: newId
    };
    toDos.push(toDoObj);//
    saveToDos()//위에 function은 기능을 만들어준 것. 이렇게 실행시켜야 localstorage에 저장될 것
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
};

function loadToDos(){ //toDos를 불러오는 작업
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);//자바스크립트는 string형태로 저장되기 떄문에 다시 object화 시켜준 것
        parsedToDos.forEach(function(toDo){ //foreach는 해당 array에 담겨있는 것들을 각각 한번씩 함수를 실행시켜 주는 것. pasrseTodos를 각각실행시키는 매개변수 function(toDo)를 넣어준것. 각각 실행시켜주는데 그형태를 function(toDo)로 해주겠다는 것 그 function은? 아래의 paintToDo(toDo.text);의 형태로
            paintToDo(toDo.text); //parseToDos내에 있는 것들에 대해서 painToDo function을 실행 시켜주는 것! 저장된 것 string형을 다시 object화 시켜주는 
        }) //function(toDo)에서 toDo는 매개변수이므로 내가 지정해주는 것, 함수를 실행하여 어떠한 값을 보내고자 할때 매개변수를 사용
        } //함수 선언에서 활용하기 위하여 사용하는 변수를 '매개변수'라고 부릅니다.
         //이름에서 드러나듯이 나중에 함수를 호출할 때 매개 역할을 하는 변수입니다.
    }

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();