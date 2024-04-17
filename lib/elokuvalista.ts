import { MongoClient, Collection, ObjectId } from 'mongodb';

const client : MongoClient = new MongoClient(process.env.DB_URI!);

export interface Elokuva {
    _id : ObjectId
    nimi : string
    alkuperainennimi : string
    valmistumisvuosi : number
    ohjaaja : string[]
    genre : string[]
    tuotantomaa : string[]
    kestomin : number
    imdbid : string
    imdburl : string
    tmdbid : string
    tmdbkuva : string
}

export interface Genre {
    nimi : string
}

export const haeElokuvat = async (koodi : string) : Promise<any> => {

    await client.connect();

    const Elokuvalista : Collection<Elokuva> = client.db().collection("elokuvalista"); //Elokuvat

    let muuttuja = Elokuvalista.find({ })
                                .sort({ valmistumisvuosi : -1, nimi : 1})
                                .limit(40)

    if (koodi === "n"){ // koodi tarkoittaa, onko sorttaus n=normaali, vai r=reverse
        return muuttuja.toArray();

    } else if(koodi === "r"){
        return muuttuja.sort({ nimi : -1}).toArray();
    }
}

export const haeElokuva = async ( id : string ) : Promise<any> => {

    await client.connect();

    const Elokuvalista : Collection<Elokuva> = client.db().collection("elokuvalista");

    return Elokuvalista.findOne({ _id : new ObjectId(id) });

}

/* 
export const haeGenre2 = async ( nimi : string, koodi : string) : Promise<any> => {

    await client.connect();

    const Elokuvalista : Collection<Elokuva> = client.db().collection("elokuvalista");

    let muuttuja = Elokuvalista.find({genre : { $regex: nimi, $options: 'si'}})
                                .sort({ valmistumisvuosi : -1, nimi : 1})
                                .limit(40)

    if (koodi === "n"){
        return muuttuja.toArray();
    }
    else if (koodi === "r"){
        return muuttuja.sort({ nimi : -1}).toArray();
    }
    else{
        return({"error" : "error"})
    }
}*/

export const haeGenre = async ( nimi : string, koodi : string, skippiNumero: number) : Promise<any> => {

    await client.connect();

    const Elokuvalista : Collection<Elokuva> = client.db().collection("elokuvalista");

    let muuttuja = Elokuvalista.find({genre : { $regex: nimi, $options: 'si'}})
                                .sort({ valmistumisvuosi : -1, nimi : 1})
                                .skip(skippiNumero)
                                .limit(40)

    if (koodi === "n"){ // koodi tarkoittaa, onko sorttaus n=normaali, vai r=reverse
        return muuttuja.toArray();
    }
    else if (koodi === "r"){
        return muuttuja.sort({ nimi : -1}).toArray();
    }
    else{
        return({"error" : "error"})
    }
}

export const haeGenreMaara = async ( nimi : string) : Promise<any> => { // laskee queryn dokumenttien määrän

    await client.connect();

    const Elokuvalista : Collection<Elokuva> = client.db().collection("elokuvalista");

    let muuttuja = Elokuvalista.countDocuments({genre : { $regex: nimi, $options: 'si'}})

    return muuttuja;
}
/* 
export const lajitteleElokuvat = ( elokuvat : Elokuva[]) : Promise<any> => {
    
    let elokuvaArray : any = []
    let jarjestaja = false
    let jarjestys : Boolean = jarjestaja

    if (jarjestys = true) {
        elokuvaArray = elokuvat.sort()
        console.log("1")
        //setJarjestaja(false)
    }
    else {
        elokuvaArray = elokuvat.sort().reverse()
        console.log("2")
        //setJarjestaja(true)
    }
    //setElokuvaLista(elokuvaArray)
    return elokuvaArray   
}
*/
