let container=document.querySelector(".container");
let toggler=document.querySelector(".toggler-div");
let buttons=Array.from(document.querySelectorAll(".btn"));
let display=document.querySelector(".display");

let answer="";
let result="";
const chars={
    "÷":"/",
    "×":"*",
    "−":"-",
    "+":"+"
}


buttons.forEach((el)=>{
    el.addEventListener("click",(event)=>{
        switch(event.target.innerText){
            case "C":
                display.value="";
                answer="";
                result="";
                break;
            case "<":
                if(display.value){
                    display.value=display.value.slice(0,-1);
                    answer=answer.slice(0,-1);
                }
                break;
            case "=":
                try{
                    answer = answer.replace(/[(]/g, "*(");
                    if(eval(answer)=="Infinity")
                        display.value="Math ERROR";
                    else{
                        if(answer.includes("//")){
                            display.value="Syntax ERROR"
                        }
                        else{
                            result=eval(answer);
                            display.value=result;
                        }
                    }    
                }catch(error){
                    console.log(error.message);
                    display.value="Syntax ERROR"
                }
                finally{
                    if(result==undefined)
                        display.value="Syntax ERROR"
                    break;
                }
            default:
                if(display.value=="Math ERROR" || display.value=="Syntax ERROR" || display.value=="undefined"){
                    answer=event.target.innerText;
                    display.value=answer;
                }
                else if(display.value){
                    result=display.value+event.target.innerText;
                    display.value=result;
                    answer=result;
                    answer = answer.replace(/[÷×−+]/g, m => chars[m]);

                }
                else{
                    //display.value+=event.target.innerText;
                    //answer+=event.target.innerText;
                    display.value=event.target.innerText;
                    //answer+=result+event.target.innerText;
                    //answer = answer.replace(/[÷×−+]/g, m => chars[m]);
                    //console.log(answer);
                }
                break;
        }
    })
})

// answer = answer.replace(/[÷×−+]/g, m => chars[m]);
//Dark - Light mode toggle
toggler.addEventListener("click",()=>{
    if(toggler.dataset.theme==="dark"){
        toggler.dataset.theme="light";
        toggler.style.justifyContent="flex-end";
        container.classList.remove("dark");
        container.classList.add("light");
    }
    else{
        toggler.dataset.theme="dark";
        toggler.style.justifyContent="flex-start";
        container.classList.remove("light");
        container.classList.add("dark");
    }
})

