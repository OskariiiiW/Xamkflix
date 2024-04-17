//'use client'
import { Elokuva, haeElokuva } from '../../../lib/elokuvalista';
import Link from 'next/link';
import 'app/globals.css';
import styles from 'app/page.module.css'
import Modal from '../../../lib/components/Modal';
import elokuvaTiedot from '../../../lib/components/elokuvaTiedot';
//import { useState } from 'react';

interface Props {
    params : {
        id : string
    }
};

//export const [open, setOpen] = useState(false);

export default async function ElokuvaPage({params} : Props) : Promise<React.ReactElement> {

    const elokuva : Elokuva = await elokuvaTiedot(params.id);

    const elokuva2 : Elokuva = await haeElokuva(params.id);
    //let otsikko : string = "";
    let eroavaNimi : string = "";
    let kestoString : string = "";
    let nayttelijat : string = "";
    let ohjaajat : string = elokuva.ohjaaja.join(", ");
    let tuotantomaat : string = elokuva.tuotantomaa.join(", ");
    let kuva : string = `https://image.tmdb.org/t/p/w342${elokuva.tmdbkuva}`;
    //let tmdbLinkki : string = `https://www.themoviedb.org/movie/${elokuva.tmdbid}`; vissiin turha
    let kuvausTieto : any = await fetch(`https://api.themoviedb.org/3/movie/${elokuva.tmdbid}?api_key=${process.env.API_KEY}&language=fi`) //TEST---------
        .then((response) => response.json());
    let henkiloTieto : any = await fetch(`https://api.themoviedb.org/3/movie/${elokuva.tmdbid}/credits?api_key=${process.env.API_KEY}&language=fi`) //TEST---------
        .then((response) => response.json());

    if (henkiloTieto.cast[1]) { //joistakin elokuvista puuttuu cast -tiedot, joten sovellus kaatuu
        for (let i = 0; i < 5; i++) { // lisää ensimmäiset 5 näyttelijää samaan stringiin
        nayttelijat = nayttelijat + ", " + henkiloTieto.cast[i].name
        }
    }
    else {
        nayttelijat = ", Nayttelijätiedot puuttuvat."
    }
    
    if (nayttelijat.charAt(0) === ","){ // poistaa ensimmäisen pilkun
        nayttelijat = nayttelijat.slice(2)
    }

    if (elokuva.nimi != elokuva.alkuperainennimi) { // tarkistaa, eroaako alkuperäinen nimi esitetystä nimestä
        //otsikko = elokuva.nimi + " (" + elokuva.alkuperainennimi + ")";
        //otsikko = elokuva.nimi;
        eroavaNimi = "(" + elokuva.alkuperainennimi + ")"
    }
    else {
        //otsikko = elokuva.nimi;
    }

    if (elokuva.kestomin > 60) { // tarkistaa, onko elokuva yli tunnin, ja jos on muuttaa sen tunneiksi ja minuuteiksi
        let tunnit : number = parseInt((elokuva.kestomin / 60).toString());
        let minuutit : number = elokuva.kestomin - tunnit * 60;
        kestoString = tunnit + " t " + minuutit + " min";
    }
    else{
        kestoString = elokuva.kestomin + "min";
    }
    
  return (
    <>

        <div className="infodiv" style={{marginLeft:"50px"}}>

            <img style={{float:"left", marginTop:"17.42px"}} src={kuva}></img>
            <ul style={{float:"left", marginTop:"0px", maxHeight:"513px", marginLeft:"30px"}}>
                <h1 style={{textAlign:"left", maxWidth:"500px"}} className="text-1xl">{elokuva.nimi}</h1>
                <h3 style={{textAlign:"left", maxWidth:"500px"}} className="text-3xl">{eroavaNimi}</h3>

                <p className="kuvaustieto">
                    {kuvausTieto.overview}
                </p>

                <label htmlFor="my-modal-3" className="btn">Lue lisää...</label>

                <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative">
                        <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="text-lg font-bold">{elokuva.nimi + " " + eroavaNimi}</h3>
                        <p className="py-4">{kuvausTieto.overview}</p>
                    </div>
                </div>


                <p className="kuvaus">{elokuva.genre.join(", ")}</p>
                <p className="kuvaus">{elokuva.valmistumisvuosi}</p>
                <p className="kuvaus">{kestoString}</p>
                <p className="kuvaus">Näyttelijät: {nayttelijat}</p>
                <p className="kuvaus">Ohjaaja(t): {ohjaajat}</p>
                <p className="kuvaus">Tuotantomaa(t): {tuotantomaat}</p>

                <Link href="/" className={styles.valikko}>Palaa listaukseen</Link> <br />
            </ul>
        </div>
        
    </>
  )
}