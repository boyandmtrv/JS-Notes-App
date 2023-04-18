const noteListDiv = document.querySelector(".note-list");

let noteID = 1;
function Note(id, title, content) {
  this.id = id;
  this.title = title;
  this.content = content;
}

function eventListeners() {
  document.addEventListener("DOMContentLoaded", displayNotes);
  document.getElementById("add-note-btn").addEventListener("click", addNewNote);

  noteListDiv.addEventListener("click", deleteNote);
}

eventListeners();

function getDataFromStorage() {
  return localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
}

function addNewNote() {
  const noteTitle = document.getElementById("note-title");
  const noteContent = document.getElementById("note-content");

  if (validateInput(noteTitle, noteContent)) {
    let notes = getDataFromStorage();

    let noteItem = new Note(noteID, noteTitle.value, noteContent.value);
    noteID++;
    notes.push(noteItem);
    createNote(noteItem);



    localStorage.setItem("notes", JSON.stringify(notes));
    noteTitle.value = "";
    noteContent.value = "";


  }

}

function validateInput(title, content) {
  if (title.value !== "" && content.value !== "") {
    return true;
  } else {
    if (title.value === "") title.classList.add("warning");
    if (content.value === "") content.classList.add("warning");
  }
  setTimeout(() => {
    title.classList.remove("warning");
    content.classList.remove("warning");

  }, 1600);
}

function createNote(noteItem) {
  const div = document.createElement("div");
  div.classList.add("note-item");
  div.setAttribute("data-id", noteItem.id);
  div.innerHTML = `
        <h3>${noteItem.title}</h3>
        <p>${noteItem.content}</p>
        <button type = "button" class = "btn delete-note-btn">
        <span><i class="ri-delete-bin-line"></i></span>
        </buttton>
  `;
  noteListDiv.appendChild(div);
}

function displayNotes() {
  let notes = getDataFromStorage();
  if (notes.length > 0) {
    noteID = notes[notes.length - 1].id;
    noteID++;
  } else {
    noteID = 1;
  }
  notes.forEach(item => {
    createNote(item);
  });
}

function deleteNote(e) {
  if (e.target.classList.contains("delete-note-btn")) {

    e.target.parentElement.remove();
    let divID = e.target.parentElement.dataset.id;
    let notes = getDataFromStorage();
    let newNotesList = notes.filter(item => {
      return item.id !== parseInt(divID);
    });
    localStorage.setItem("notes", JSON.stringify(newNotesList));
  }
}







