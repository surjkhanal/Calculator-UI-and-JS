let equationPanel = document.querySelector("#equation");
let resultPanel = document.querySelector("#result");
let errorPanel = document.querySelector("#error");
let history = document.querySelector("#history");
let historyList = document.querySelector("#history ul");
history.style.visibility = "hidden";

function resetPanel (){
    equationPanel.innerHTML ="";
    errorPanel.innerHTML = "";
    resultPanel.innerHTML ="0";
}
function clearLast(){
    let str = equationPanel.innerHTML.split(" ");
    str.pop();
    equationPanel.innerHTML=str.join(" ")
}
function toggleHistory(){
    let style = history.style.visibility;
    history.style.visibility =style=="hidden"?"visible":"hidden"
}

let resetBtn = document.querySelector("#reset");
let backBtn = document.querySelector("#back");
let historyBtn = document.querySelector("#history-btn");
let submitBtn = document.querySelector("#submit");

resetBtn.addEventListener("click", resetPanel);
backBtn.addEventListener("click", clearLast);
historyBtn.addEventListener("click", toggleHistory);


let keys = document.querySelectorAll(".key")
let nums = document.querySelectorAll(".nums")
let operators = document.querySelectorAll(".operator")

nums.forEach(key=>{
    key.addEventListener("click", (event) => {
        equationPanel.innerHTML +=event.target.innerHTML;
    });
})


operators.forEach(key => {
    key.addEventListener("click",handleOpKey)
})

function handleOpKey(event) {
    let triggerKey = event.target.innerHTML
    switch (triggerKey){
        case "+":case "-":
        case "/":case "*":
        case "(":case ")":
        equationPanel.innerHTML +=" " +event.target.innerHTML+" ";
        break;

        case "sin":
        case "cos":
        case "tan":
            equationPanel.innerHTML =event.target.innerHTML;
            break;
        case "pi":
            equationPanel.innerHTML +=Math.PI.toPrecision(3);
            break;

        case "=":
            resultPanel.innerHTML = "0";
            let eq = equationPanel.innerHTML;
            equationPanel.innerHTML="";
            if(eq.search("sin")==0){
                let result = Math.sin(eval(eq.substring(3,))).toPrecision(3);
                resultPanel.innerHTML = result;
                pushHistory(eq,result);
            }
            else if(eq.search("cos")==0){
                let result = Math.cos(eval(eq.substring(3,))).toPrecision(3);
                resultPanel.innerHTML = result;
                pushHistory(eq,result);
            }
            else if(eq.search("tan")==0){
                let result = Math.tan(eval(eq.substring(3,))).toPrecision(3);
                resultPanel.innerHTML = result;
                pushHistory(eq,result);
            }

            else{
                let result = eval(eq);
                if(result==Infinity) {
                    errorPanel.innerHTML = "can not divide by zero";
                }
                else if(result){
                    resultPanel.innerHTML = result;
                    pushHistory(eq,result)
                }
            }
            break;
        default: console.log(event.target.innerHTML)
    }
}

function pushHistory(eq,result){
    let e = document.createElement('li');
    e.innerHTML = eq + " = "+result; 
    historyList.appendChild(e)
}