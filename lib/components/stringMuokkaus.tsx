export const muokkaaGenre = ( valivaihe : string ) => {

    let genre : string = ""

    if (valivaihe === "scifi"){ //en keksinyt parempaa tapaa lisätä väliviivaa
        genre = "Sci-Fi";
    
    } else if (valivaihe === "filmnoir"){
        genre = "Film-Noir";
    
    } else if (valivaihe === "elamankerta"){
        genre = "Elämänkerta";
    
    } else if (valivaihe === "jannitys"){
        genre = "Jännitys";
    
    } else {
        genre = valivaihe.charAt(0).toUpperCase() + valivaihe.slice(1); //muuttaa ekan kirjaimen isoksi
    }

    return genre;

}