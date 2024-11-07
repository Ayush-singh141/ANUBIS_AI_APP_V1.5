const submitButton=document.getElementById('submit');
const outputElement=document.getElementById('output');
const inputElement=document.querySelector('.userInput');
const buttonElement=document.querySelector('button');
const historyElement=document.querySelector('.history');
const Title=document.createElement('h1');
const fileinput=document.querySelector("#file-input");


Title.textContent="ANUBIS";
Title.style="position: fixed; left: 50%;";
Title.setAttribute("class","Title");
const filedata={
    file: {
        data:null,
        mime_type:null
    }
}
function appendh1(){
    document.getElementById('output').append(Title);
}
appendh1();
function changeInput(value){
    const inputElement=document.querySelector('.userInput');
    inputElement.value=value;
}
    import { GoogleGenerativeAI } from "@google/generative-ai";
   // 
    const genAI = new GoogleGenerativeAI(API_KEY);
    async function run(){
        // Make sure to include these imports:
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        let prompt;
        if(filedata.file.data!=null){
              const API_KEY ="API_KEY"; 
              const API_URL=`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
              const requestOption={
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    contents: [{
                        parts: [{text: inputElement.value}, ...(filedata.file.data ? [{inline_data: filedata.file}]:[])]
                    }]
                })
              }
              try {
                const response= await fetch(API_URL,requestOption);
                const data = await response.json();
                
                const userQuery=document.createElement('p');
                userQuery.setAttribute("class","user-message");
                userQuery.innerHTML=inputElement.value;
                const attachment=document.createElement('span');
                attachment.setAttribute("class","attachment");
                attachment.innerHTML=`<br> ${filedata.file.data ? `<img src="data:${filedata.file.mime_type};base64,${filedata.file.data}"/>`:""}`;
                outputElement.append(userQuery);
                outputElement.append(attachment);
                const messageElement=document.createElement('p');
                messageElement.setAttribute("class","chat-bot-message");

                messageElement.innerHTML=data.candidates[0].content.parts[0].text.replaceAll("\n","<br>").replaceAll("*","").replaceAll("#","").trim();
                outputElement.append(messageElement);
                
                Title.remove();

                outputElement.scrollTop = outputElement.scrollHeight;
                
                if(data.candidates[0].content.parts[0].text){
                    const pElement=document.createElement('p');
                    pElement.textContent=inputElement.value;
                    pElement.addEventListener('click',()=>changeInput(pElement.textContent))
                    historyElement.append(pElement);
                    historyElement.scrollTop = historyElement.scrollHeight;
                    inputElement.value='';
                    fileinput.value="";
                }
                filedata.file.data=null;
              } catch (error) {
                
              }
              
        }else{
            prompt = inputElement.value;
            const result = await model.generateContent(prompt);
            const userQuery=document.createElement('p');
            userQuery.setAttribute("class","user-message");
            userQuery.textContent=inputElement.value;
            outputElement.append(userQuery);
            const messageElement=document.createElement('p');
            messageElement.setAttribute("class","chat-bot-message");
            messageElement.innerHTML=result.response.text().replaceAll("\n","<br>").replaceAll("*","").replaceAll("#","").trim();
            outputElement.append(messageElement);
            Title.remove();
            outputElement.scrollTop = outputElement.scrollHeight;
            if(result.response.text()){
                const pElement=document.createElement('p');
                pElement.textContent=inputElement.value;
                pElement.addEventListener('click',()=>changeInput(pElement.textContent))
                historyElement.append(pElement);
                historyElement.scrollTop = historyElement.scrollHeight;
                inputElement.value='';
            }
        }
        
        
    }
submitButton.addEventListener("click", run);
function clearInput(){
    inputElement.value='';
    outputElement.textContent='';
    document.getElementById('output').append(Title);
}
buttonElement.addEventListener("click", clearInput);



function toggle_sidebar(){
    const sideBar=document.querySelector(".side-bar");
    sideBar.classList.toggle("hidden");
    sideBar.classList.toggle("show");
    
    const newchatBtn=document.querySelector(".new-chat");
    newchatBtn.classList.toggle("hide-btn");
    newchatBtn.classList.toggle("show-btn");
    
    const navElement=document.querySelector(".nav");
    navElement.classList.toggle("hide-nav");
    navElement.classList.toggle("show-nav");
    const historyElement=document.querySelector(".history");
    historyElement.classList.toggle("hide-history");
    historyElement.classList.toggle("show-history");
}
const togglebtn=document.querySelector(".hamburger");
togglebtn.addEventListener("click",toggle_sidebar);

//handling file input
fileinput.addEventListener("change",()=>{
    //selects the uploaded file

    const file = fileinput.files[0];
    if(!file) return;
    const reader=new FileReader();
    
     reader.onload =(e)=>{
          const base64String=e.target.result.split(",")[1];

          //store file in filedata object
          filedata.file={
            data: base64String,
            mime_type: file.type
          }
     }

     reader.readAsDataURL(file);

    //we empty the fileinput's value so that the user can use it again 
    fileinput.value="";
})
document.getElementById("file-upload").addEventListener("click",()=>fileinput.click());



