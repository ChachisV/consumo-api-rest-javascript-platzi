const api = axios.create({
    baseURL: "https://api.thecatapi.com/v1"
});
api.defaults.headers.common['X-API-KEY'] = "23c05573-2fea-4b9e-b29a-9d107fe2b1e9";

const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=2";

const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites";

const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;

const API_URL_UPLOAD = "https://api.thecatapi.com/v1/images/upload";


const spanError = document.getElementById("error")

const button = document.getElementById("otroMichi");

const loadRandomMichis = async () =>{
    const response = await fetch(API_URL_RANDOM);
    const data = await response.json();
    console.log("random",data);

    if( response.status !== 200){
        spanError.innerHTML = "Hubo un error en Random michis" + response.status;
    } else {
        const img1 = document.getElementById("img1");
        const btn1 = document.getElementById("btn1");
        const img2 = document.getElementById("img2");
        const btn2 = document.getElementById("btn2");
        
        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1.onclick = () => saveFavouriteMichis(data[0].id)
        btn2.onclick = () => saveFavouriteMichis(data[1].id)
    }

    
}


const loadFavoritesMichis = async () =>{
    const response = await fetch(API_URL_FAVORITES, {
        method: "GET",
        headers: {
            "X-API-KEY": "23c05573-2fea-4b9e-b29a-9d107fe2b1e9",
        },
    });
    const data = await response.json();
    console.log("favorites",data);

    if( response.status !== 200){
        spanError.innerHTML = "Hubo un error en Favorite michis" + response.status;    
    } else {
        const section = document.getElementById("favoriteMichis");
        section.innerHTML = ""

        const h2 = document.createElement("h2");
        const h2Text = document.createTextNode("Michis Favoritos");
        h2.appendChild(h2Text);
        section.appendChild(h2);
        data.forEach(michi => {            
            const article = document.createElement("article");
            const img = document.createElement("img");
            const btn = document.createElement("button");
            const btnText = document.createTextNode("Sacar michi de favoritos");

            img.src = michi.image.url ;
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavoriteMichis(michi.id);
            article.appendChild(img)
            article.appendChild(btn);
            section.appendChild(article);
        })
    }
}

const saveFavouriteMichis = async (id) =>{
    const {data, status} = await api.post("/favourites", {
        image_id: id,
    });
    // const response = await fetch(API_URL_FAVORITES, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "X-API-KEY": "23c05573-2fea-4b9e-b29a-9d107fe2b1e9",
    //     },
    //     body: JSON.stringify({
    //         image_id: id
    //     }),
    // });
    // const data = await response.json();



    console.log("save",status);

    if(status !== 200){
        spanError.innerHTML = "Hubo un error en Favorite michis " + status  + data.message;    
    }else{
        console.log("Michi agregado a favoritos");
        loadFavoritesMichis();
    }

}

const deleteFavoriteMichis = async(id) =>{
    const response = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: "DELETE",
        headers: {
            "X-API-KEY": "23c05573-2fea-4b9e-b29a-9d107fe2b1e9"
        }
    });
    const data = await response.json();

    if( response.status !== 200){
        spanError.innerHTML = "Hubo un error en Favorite michis " + response.status  + data.message;    
    } else {
        console.log("Michi eliminado de favoritos");
        loadFavoritesMichis();
    }
}

const uploadMichiPhoto = async () =>{
    const form = document.getElementById("uploadingForm")
    const formData = new FormData(form);

    console.log(formData.get("file"))

    const response = await fetch(API_URL_UPLOAD, {
        method: "POST",
        headers: {
            "X-API-KEY": "23c05573-2fea-4b9e-b29a-9d107fe2b1e9",           
        },
        body: formData,
    })
    const data = await response.json();

    console.log(response)

    if( response.status !== 201){
        spanError.innerHTML = "Hubo un error en Subir michis " + response.status  + data.message;    
    } else {
        console.log("Foto de michi cargada");
        console.log({ data });
        console.log(data.url);
        saveFavouriteMichis(data.id);        
    }
}

loadRandomMichis();
loadFavoritesMichis();
