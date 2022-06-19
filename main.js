console.log("hello world")

const URL = "https://api.thecatapi.com/v1/images/search?limit=3&api_key23c05573-2fea-4b9e-b29a-9d107fe2b1e9";

// fetch(URL)
//     .then(res => res.json())
//     .then(data => {
//         const img = document.querySelector("img");
//         img.src = data[0].url;
//     });
const button = document.getElementById("otroMichi");

const otroMichi = async () =>{
    const response = await fetch(URL);
    const data = await response.json();

    console.log(data);
    const img = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const img3 = document.getElementById("img3");
    
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
}

otroMichi();

