let button = document.querySelector(".btn.btn-primary");
let colors = ["#ff7eb9","#ff65a3","#7afcff", "#feff9c", "fff740"];
let colorI = 0;

button.addEventListener("click",function(){
    console.log("Clicked Button!");

    let title = document.getElementsByClassName("titlebox")[0].value;
    let noteContent = document.getElementsByTagName("textarea")[0].value;

    if (title && noteContent)
    {
        let newNote = document.createElement("div");
        newNote.classList.add("card");
        newNote.style.width = "18rem";
        newNote.style.backgroundColor = colors[colorI % colors.length];
        colorI++;

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        let noteTitle = document.createElement("h3");
        noteTitle.innerText = title;

        let noteText = document.createElement("p");
        noteText.innerText = noteContent;

        let burnButton = document.createElement("button");
        burnButton.classList.add("btn", "btn-danger");
        burnButton.innerText = "🔥";
        burnButton.addEventListener("click",function(){
            newNote.remove();
        });

        cardBody.appendChild(noteTitle);
        cardBody.appendChild(noteText);
        cardBody.appendChild(burnButton);
        newNote.appendChild(cardBody);

        document.getElementsByClassName("pnotes")[0].appendChild(newNote);
        }
});

