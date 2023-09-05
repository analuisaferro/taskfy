let btn = document.querySelector("#manda");
let show = document.querySelector(".main");
let notas;
localStorage.getItem("minhasNotas") ? notas = localStorage.getItem("minhasNotas") : notas = [];

window.onload = function(){
    if(localStorage.getItem("minhasNotas") != "null" && localStorage.getItem("minhasNotas") != null){
        loadNotes();
    }
    else if(localStorage.getItem("minhasNotas") == "null"){
        localStorage.clear();
    }
}
btn.addEventListener("click", ()=>{
    let title = document.querySelector(".titulo").value;
    let text = document.querySelector(".texto").value;
    let link = document.querySelector(".link").checked;
    console.log(link)
    if(text)
        addNote(title, text, link);
        loadNotes();
        document.querySelector(".titulo").value = "";
        document.querySelector(".texto").value = "";
        document.querySelector(".link").checked = false;
})

//FUNCTIONS

function loadNotes(){
    show.innerHTML= "";
    let showNotes = notesManage();
    showNotes.forEach((note, i) => {
    constructVNote(note.noteTitle, note.noteText, note.link, i);
    });
}
function addNote(title, text, link){
    if (localStorage.getItem("minhasNotas")){
        notas = notesManage();
        notas.push({"noteTitle": title, "noteText": text, "link": link});
    }
    else{
        notas.push({"noteTitle": title, "noteText": text, "link": link})
    }
    notesManage(notas);
}
function constructVNote(title, text, link, i){
    let divNote = document.createElement("div");
    if(!link){
        divNote.innerHTML =      `<div class="card mb-3">
        <div class="card-header">
          <p class="text-start"><strong>${title}</strong></p>
        </div>
        <div class="card-body d-flex justify-content-between">
          <p class="card-text">${text}</p>
          <button class="btn btn-danger" onclick="deleteNote(${i})">Delete</button>
        </div>
        </div>`;
    }
    else {
        divNote.innerHTML =      `<div class="card mb-3">
        <div class="card-header">
          <p class="text-start"><strong>${title}</strong></p>
        </div>
        <div class="card-body d-flex justify-content-between">
          <a href="${text}" target="_blank" class="card-text">${text}</a>
          <button class="btn btn-danger" onclick="deleteNote(${i})">Delete</button>
        </div>
        </div>`;
    }

    show.appendChild(divNote);
}
function notesManage(attNotes=null){
    if(attNotes)
        localStorage.setItem("minhasNotas", JSON.stringify(attNotes));
    else{
        notas = JSON.parse(localStorage.getItem("minhasNotas"));
        return notas;
    }
         
}
function deleteNote(id){
    notas = notesManage();
    notas.splice(id, 1);
    notesManage(notas);
    loadNotes();
}