// promise -> pending , resolve (success), reject(error)
const loadCategories = async()=>{
    try{
    const url =("https://news-api-fs.vercel.app/api/categories");
    const res = await fetch(url);
    const categories = await res.json();
    displayCategories(categories.categories)
    } catch(error){
        console.log(error);
        
    }
   
};
const displayCategories = (categories)=>{
    const categoriesBtn = document.getElementById("categories");
    categoriesBtn.innerHTML = "";
    // for(const catg of categories)
    categories.forEach(catg => {
        const li = document.createElement("div");
        li.innerHTML = `
        <li id='${catg.id}' class="hover:border-b-4 hover:border-red-500 border-red-700 cursor-pointer">${catg.title}</li>
        `
        categoriesBtn.appendChild(li);
    })
    categoriesBtn.addEventListener('click',(e)=>{

        const allLi = document.querySelectorAll("li")
        allLi.forEach(li => {
            li.classList.remove('border-b-4')
        })

        if(e.target.localName === "li"){
            console.log(e.target);
            e.target.classList.add("border-b-4")
        }
    })
}
loadCategories()