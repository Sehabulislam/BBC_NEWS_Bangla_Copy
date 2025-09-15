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
        <li id='${catg.id}' class="hover:border-b-4 hover:border-red-500 border-red-600 cursor-pointer">${catg.title}</li>
        `
        categoriesBtn.appendChild(li);
    })
    categoriesBtn.addEventListener('click',(e)=>{

        const allLi = document.querySelectorAll("li")
        allLi.forEach(li => {
            li.classList.remove('border-b-4')
        })

        if(e.target.localName === "li"){
            showLoading()
            // console.log(e.target.id);
            e.target.classList.add("border-b-4");
            loadCategoriesNews(e.target.id)
        }
    })
}

const loadCategoriesNews =async(newsid)=>{
    try{
        const url =`https://news-api-fs.vercel.app/api/categories/${newsid}`
        const res = await fetch(url);
        const data = await res.json();
        displayCategoriesNews(data.articles);
    }
    catch(error){
        showError();
    }
}

const displayCategoriesNews =(news)=>{
    if(news.length === 0){
        showEmptyMassage();
        return;
    }
    const newsContainer = document.getElementById("newsContainer");
    newsContainer.innerHTML = "";
    news.forEach(newsdata =>{
        // console.log(newsdata);
        const div = document.createElement("div");
        div.innerHTML = `
                <div class="w-full p-2 flex flex-row md:flex-col">
                    <img  src="${newsdata.image.srcset[5].url}" alt="${newsdata.image.alt}" class=" w-[160px] md:w-full h-30 mr-3 md:mr-0 object-cover ">
                <div class="mt-3 space-y-2">
                    <h2 class="font-semibold">${newsdata.title}</h2>
                <p class="text-sm text-gray-600">${newsdata.time}</p>
                </div>
                </div>
        `
        newsContainer.appendChild(div)
    })
}
const showLoading =()=>{
    newsContainer.innerHTML = `
    <div class="flex justify-center items-center py-30">
                <span class="loading loading-bars loading-xl"></span>
            </div>
    `
}
const showError =()=>{
    newsContainer.innerHTML = `
    <div class="text-center col-span-full space-y-3">
          <img src="assets/alert-error.png" alt="" class="m-auto">
          <p class="text-md text-gray-500 font-bangla">Page not found</p>
          <h2 class="text-4xl font-semibold font-bangla">নেক্সট Categories এ যান </h2>
        </div>
    `
}
const showEmptyMassage =()=>{
    newsContainer.innerHTML =`
    <div class="text-center col-span-full space-y-3">
          <img src="assets/alert-error.png" alt="" class="m-auto">
          <p class="text-md text-gray-500 font-bangla">এই Categories এ এখনো কোন News যুক্ত করা হয়নি।</p>
          <h2 class="text-4xl font-semibold font-bangla">নেক্সট Categories এ যান </h2>
        </div>
    `
}
loadCategoriesNews("main");

loadCategories()