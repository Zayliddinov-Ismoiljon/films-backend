const elForm= document.querySelector(".form");
const elInput= document.querySelector(".form__input");
const elFragment= document.createDocumentFragment();
const elList= document.querySelector(".list");
const elBookmarkList= document.querySelector(".bookmark__list");

const bookmark=[];

function renderBackend(arr, element){
    if(arr.length>0){
        element.innerHTML="";
        arr.forEach(e => {
            const newItem= document.createElement("li");
            const newImg= document.createElement("img");
            const newHeading= document.createElement("h3");
            const newText=document.createElement("p");
            const newTime= document.createElement("time");
            const newBtn= document.createElement("button");

            newImg.setAttribute("src", e.Poster);
            newImg.setAttribute("class", "list__img");
            newHeading.textContent= e.Title;
            newHeading.setAttribute("class", "list__title");
            newItem.setAttribute("class", "list__item");
            newText.textContent= e.Type;
            newText.setAttribute("class", "list__text");
            newTime.textContent=e.Year;
            newTime.setAttribute("class", "list__time");
            newBtn.textContent="Bookmark";
            newBtn.dataset.filmId=e.Id;
            newBtn.setAttribute("class", "bookmark-btn");
            

            newItem.appendChild(newImg);
            newItem.appendChild(newHeading);
            newItem.appendChild(newText);
            newItem.appendChild(newTime);
            newItem.appendChild(newBtn);
            elFragment.appendChild(newItem);

            newBtn.addEventListener("click", evt=>{
                const newSubItem= document.createElement("li");
                const elRemoveBtn= document.createElement("button");

                newSubItem.textContent=e.Title;
                newSubItem.setAttribute("class", "bookmark-list__item");
                elRemoveBtn.textContent="Remove";
                elRemoveBtn.setAttribute("class", "remove-btn");

                newSubItem.appendChild(elRemoveBtn);
                elBookmarkList.appendChild(newSubItem);
                elBookmarkList.setAttribute("class", "bookmark__list");

                elRemoveBtn.addEventListener("click", evt=>{
                    elBookmarkList.removeChild(newSubItem); 
                })
            })
        });
        element.appendChild(elFragment);
    }
}



elForm.addEventListener("submit", evt=>{
    evt.preventDefault();

    (
        async function(){
            const res= await fetch(`http://www.omdbapi.com/?apikey=5fdda024&s=${elInput.value.trim()}`)
            const data = await res.json();
        
            renderBackend(data.Search, elList);
        
        }
    )();

    elBookmarkList.style.display="block";

    elInput.value="";
    
});

elBookmarkList.addEventListener("click", evt=>{
    const elDeleteBtn= evt.target.matches(".remove-btn");
    if(elDeleteBtn){
        const btnId= evt.target.dataset.filmId;
        const findIndexBookmark= bookmark.findIndex(e=>e.id==btnId);
        bookmark.splice(findIndexBookmark, 1);

        renderBackend(bookmark, elBookmarkList);
        window.localStorage.setItem("list", JSON.stringify(bookmark))
    }
})