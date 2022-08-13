const btnget=document.getElementById('btn-get');

btnget.addEventListener('click',()=>{
    clearData();
    fetchData();
});

function clearData(){
    const parent = document.querySelectorAll("#data");
    parent.forEach(parent => {
        parent.remove();
    });
}

async function fetchData() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30", {
        method: "GET"
    });

    const json = await response.json();
    const results = json.results;
    let no=0;

    for (i = 0; i < results.length; i++) {  
        no+=1;
        const container=document.getElementById('container');

        // Ambil Data Nama dan URL Pokemons
        const nameOfPokemons=results[i].name;
        const urlOfPokemons=results[i].url;
        // Ambil Data Nama dan URL Pokemons

        // Ambil Data Detail Pokemon
        const responseDetail = await fetch(urlOfPokemons, {
            method: "GET"
        });
        const detail = await responseDetail.json();

        let sprite=detail.sprites;
        let gambar=sprite["front_default"];

        let typeOfPikachu=detail.types;
        const typeNameOfPikachu = typeOfPikachu[0].type.name;
        // Ambil Data Detail Pokemon    
        
        // Buat Element Div Card-Box
        const divCardBox=document.createElement("div");
        divCardBox.classList.add("card-box");
        divCardBox.classList.add("active");
        divCardBox.setAttribute("id","data");

        // Buat BackGround sesuai type Pokemons
        switch(typeNameOfPikachu){
            case "grass":
                divCardBox.setAttribute("style","background:green");
                break;
            case "fire":
                divCardBox.setAttribute("style","background:orange");
                break;
            case "water":
                divCardBox.setAttribute("style","background:blue");
                break;
            case "bug":
                divCardBox.setAttribute("style","background:grey");
                break;
            case "ground":
                divCardBox.setAttribute("style","background:brown");
                break;
            case "poison":
                divCardBox.setAttribute("style","background:blueviolet");
                break;
            case "electric":
                divCardBox.setAttribute("style","background:yellow");
                break;
            default:
                divCardBox.setAttribute("style","background:white");
            break;
        }
        // Buat BackGround sesuai type Pokemons

        // Buat Element Div Card-Box

        // Div Name
        const divName=document.createElement("div");
        divName.classList.add("pokemons-name");
        divName.setAttribute("id",`name[${i}]`);
        // Div Name
        
        // Div Pokemons Picture
        const divImg=document.createElement("div");
        divImg.classList.add("pokemons-sprite");
        divImg.setAttribute("id","picture");
        // Div Pokemons Picture
        const imgPok=document.createElement("img");

        // Div Pokemons Types
        const divType=document.createElement("div");
        divType.classList.add("pokemons-type");
        divType.setAttribute("id",`type[${i}]`);
        // Div Pokemons Types

        container.append(divCardBox);
        divCardBox.append(divName, divImg, divType);
        divImg.appendChild(imgPok);

        const name=document.getElementById(`name[${i}]`);
        const type=document.getElementById(`type[${i}]`);
        name.innerHTML=no+" : "+nameOfPokemons;
        type.innerHTML="Type : " + typeNameOfPikachu;
        imgPok.setAttribute("src",gambar);
    }
}

    
