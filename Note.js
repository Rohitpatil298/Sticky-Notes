const addbtn = document.querySelector("#Addbtn");
const main=document.querySelector(".main");

addbtn.addEventListener("click",function(){
    addnote();
})
const savenotes=()=>{
    const notes= document.querySelectorAll(".note textarea");
    console.log(notes)
    const data =[];
    notes.forEach(
        (note)=>{
            data.push(note.value)
        }
    )
    if(data.length===0){
        localStorage.removeItem("notes");
    }else{
        localStorage.setItem("notes",JSON.stringify(data));
    }
    
}


function addnote(text =""){
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML=`
    <div class="tool">
        
        <i class=" trash bi bi-trash-fill"></i>
        
        <i class="save bi bi-bookmark-fill"></i>
    </div>
    <textarea>${text}</textarea>
    `;
    note.querySelector(".trash").addEventListener("click",function(){
        note.remove();
        savenotes();
    })

    note.querySelector(".save").addEventListener("click",function(){
        savenotes();
    })
    note.querySelector("textarea").addEventListener(
        "focusout",function(){
            savenotes();
        }
    )
    main.appendChild(note);
    savenotes();
}
(
    function(){
        const localnote =JSON.parse(localStorage.getItem("notes"));
        if(localnote== null){
                addnote()
        }
       else{
            localnote.forEach(
                (localnote)=>{
                    addnote(localnote)
                }
            )
       }
       
    }
)()