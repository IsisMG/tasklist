/**
 * Created by Isis on 05/01/2022.
 */

var todo = {
  //INITIALIZE TO DO LIST
  data : [], // todo list data array
  hAdd : null, // html add item text field
  hTemplate : null, // html item row template
  hList : null, // html to do list
  hButtons: null,
  
  init : () => {
    //INIT LOCALSTORAGE
    if (localStorage.todo == undefined) { localStorage.todo = "[]"; }

    //RESTORE PREVIOUS SESSION
    todo.data = JSON.parse(localStorage.todo);

    //GET HTML ELEMENTS
    todo.hAdd = document.getElementById("todo-item");
    todo.hTemplate = document.getElementById("todo-template").content;
    todo.hList = document.getElementById("todo-list");
    

    //"ENABLE" ADD ITEM FORM
    document.getElementById("todo-add").onsubmit = todo.add;

    //DRAW TO DO LIST
    todo.draw();
  },

  //DRAW TO DO LIST
  draw : () => {
    // (B1) RESET LIST
    todo.hList.innerHTML = "";

    //LOOP & GENERATE ROWS
    if (todo.data.length>0) { for (let id in todo.data) {
      let row = todo.hTemplate.cloneNode(true);
      row.querySelector(".todo-item").textContent = todo.data[id][0];
      row.querySelector(".todo-done").onclick = () => { todo.toggle(id); };
      row.querySelector(".todo-del").onclick = () => { todo.del(id); };
      if (todo.data[id][1]) {
        row.querySelector(".todo-item").classList.add("todo-ok");
      }
      todo.hList.appendChild(row);
    }}
  },

  //HELPER - SAVE DATA INTO LOCAL STORAGE
  save: () => {
    localStorage.todo = JSON.stringify(todo.data);
    todo.draw();
  },

  //ADD A NEW ITEM TO THE LIST
  add : () => {
    todo.data.push([todo.hAdd.value, false]);
    todo.hAdd.value = "";
    //  changeText(todo.hAdd.value);
      todo.save();
    return false;
  },

  //UPDATE TODO ITEM DONE/NOT YET
  toggle: (id) => {
    todo.data[id][1] = !todo.data[id][1];
    todo.save();
  },

  //DELETE ITEM
  del: (id) => { if (confirm("Delete task?")) {
    todo.data.splice(id, 1);
    todo.save();
  }}
  
};

//PAGE INIT
window.addEventListener("load", todo.init);

//SHOW OPTIONS
function showButtons(id) {
  hButtons = document.getElementById(id);
  hAvatar = document.getElementById("avatar");
  hOk = document.getElementById("todo-subok");
  
  if(hButtons.style.display == 'none'){
    hButtons.style.display = 'block';
    hAvatar.style.display= 'block';
  }

}

//ENABLE BUTTONS
function enableButtons() {

  var inputTextMensaje = document.getElementById('todo-item');
  var hButOpen = document.getElementById("btn-open");
  var hButToday = document.getElementById("btn-today");
  var hButPublic = document.getElementById("btn-public");
  var hButNormal = document.getElementById("btn-normal");
  var hButEst = document.getElementById("btn-estimation");
  var hAvatar = document.getElementById("avatar");
  var hSubmit = document.getElementById("todo-submit");
  var hOk = document.getElementById("todo-subok");
  var hButMsj = document.getElementById("btn-msj");
  var hMens = document.getElementById("btn-msj");


  const expresiones= {
        email: /\S+@\S+\.\S+/,
        tag: /^@/,
        hast: /^#/,
        link: /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
  }
  
  inputTextMensaje.addEventListener('keyup', function(evt) {
    var valueTextField = inputTextMensaje.value.trim();
    hButOpen.disabled = (valueTextField == "");
    hButToday.disabled = (valueTextField == "");
    hButPublic.disabled = (valueTextField == "");
    hButNormal.disabled = (valueTextField == "");
    hButEst.disabled = (valueTextField == "");
    hAvatar.disabled = (valueTextField == "");
    hButMsj.disabled = (valueTextField == "");
    hMens.disabled = (valueTextField == "");

    if(valueTextField==""){
      hSubmit.style.display = 'none';
      hOk.style.display = 'block';
    }
    else{
      hSubmit.style.display = 'block';
      hOk.style.display = 'none';
    }

      const splitTextInput = valueTextField.split(" ");
      splitTextInput.forEach(function(elemento){
              if (expresiones.email.test(elemento)){
                  inputTextMensaje.classList.add('color-orange');
                  inputTextMensaje.classList.remove('color-green');
                  inputTextMensaje.classList.remove('color-purple');
                  inputTextMensaje.classList.remove('color-blue');

              }else if (expresiones.tag.test(elemento)){
                  inputTextMensaje.classList.add('color-green');
                  inputTextMensaje.classList.remove('color-orange');
                  inputTextMensaje.classList.remove('color-purple');
                  inputTextMensaje.classList.remove('color-blue');
              }
              else if (expresiones.hast.test(elemento)){
                  inputTextMensaje.classList.add('color-purple');
                  inputTextMensaje.classList.remove('color-green');
                  inputTextMensaje.classList.remove('color-orange');
                  inputTextMensaje.classList.remove('color-blue');
              }
              else if (expresiones.link.test(elemento)){
                  inputTextMensaje.classList.add('color-blue');
                  inputTextMensaje.classList.remove('color-green');
                  inputTextMensaje.classList.remove('color-purple');
                  inputTextMensaje.classList.remove('color-orange');
              }
    });
  });
}
//DISABLE OPTIONS
function disableButtons(){
    var hButOpen = document.getElementById("btn-open");
    var hButToday = document.getElementById("btn-today");
    var hButPublic = document.getElementById("btn-public");
    var hButNormal = document.getElementById("btn-normal");
    var hButEst = document.getElementById("btn-estimation");
    var hButMsj = document.getElementById("btn-msj");

    hButOpen.disabled = true;
    hButToday.disabled = true;
    hButPublic.disabled = true;
    hButNormal.disabled = true;
    hButEst.disabled = true;
    hButMsj.disabled = true;
    hAvatar.disabled = true;
}

//CHANGE INITIAL VALUES
function changeInitial(){
  hButtons.style.display = 'none';
  hAvatar.style.display = 'none';
  return true;
}

//ENABLE OPTIONS TASK CREATED
function enableOptions(){
console.log("Funciona");
}

//COLORS TAGS
/*
function changeText(word) {

    const expresiones= {
        email: /\S+@\S+\.\S+/,
        tag: /^@/,
        hast: /^#/,
        link: /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    }

    var w = document.getElementById('todo-items');
    const splitTextInput = word.split(" ");
    word.forEach(function(elemento){
        if (expresiones.email.test(elemento)){
            w.classList.add('tags');
        }else if (expresiones.tag.test(elemento)){
            inputTextMensaje.classList.add('color-green');
            inputTextMensaje.classList.remove('color-orange');
            inputTextMensaje.classList.remove('color-purple');
            inputTextMensaje.classList.remove('color-blue');
        }
        else if (expresiones.hast.test(elemento)){
            inputTextMensaje.classList.add('color-purple');
            inputTextMensaje.classList.remove('color-green');
            inputTextMensaje.classList.remove('color-orange');
            inputTextMensaje.classList.remove('color-blue');
        }
        else if (expresiones.link.test(elemento)){
            inputTextMensaje.classList.add('color-blue');
            inputTextMensaje.classList.remove('color-green');
            inputTextMensaje.classList.remove('color-purple');
            inputTextMensaje.classList.remove('color-orange');
        }
    });
    inputTextMensaje.style.color = "#E5A75C";
 }*/

//RESIZE WINDOW
$(window).resize(function() {
    if ($(window).width() < 1230) {
        var mens = document.getElementById("btn-msj");
        mens.style.display = 'block';
        var cancel = document.getElementById("btn-cancel");
        cancel.style.display = 'none';
        var trash = document.getElementById("btn-dele");
        trash.style.display = 'block';

        alert('Less than 1230');
    }
    else {
        alert('More than 1230');
    }
});
