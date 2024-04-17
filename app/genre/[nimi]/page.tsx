import { Elokuva, haeGenre, haeGenreMaara} from '../../../lib/elokuvalista';
import {muokkaaGenre} from '../../../lib/components/stringMuokkaus'
import Link from 'next/link';
import 'app/globals.css';
import styles from '../../page.module.css'
import SivutusNappi from '../../../lib/components/sivutusNappi';

interface Props {
    params : {
        nimi : string
    }
}

export default async function GenrePage({params} : Props) : Promise<React.ReactElement> {

    //let skippiNumero: number = 0; // kuvaa skipattujen elokuvien määrää

    let genre = muokkaaGenre(params.nimi) // lisää stringiin tarvittavat isot kirjaimet, ääkköset ja väliviivat
                                          // tein siitä komponentin, koska tarvitsin samaa koodia monessa tiedostossa

   let elokuvat : Elokuva[] = await haeGenre(genre, "n", 0);
   let test = params.nimi;
   let elokuvaMaara = await haeGenreMaara(test);

   //let korjattuGenre = genre.replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/å/g, 'o');

  return (
    <>
    <ul>
        <h2 className="text-2xl" style={{textAlign:"left"}}>{genre}</h2>

        <p style={{marginBottom:"15px"}}>Järjestä lista:
            <Link href={`/rrgenre/${params.nimi}`} className="jarjestysLinkki" style={{textDecoration:"none"}}>Nimellä</Link>
            <Link href={`/rgenre/${params.nimi}`} className="jarjestysLinkki" style={{textDecoration:"none"}}>Vuodella</Link>
        </p>
        
        {elokuvat.map((elokuva : Elokuva, idx : number) => {

            return (
                <div className='listausDiv' style={{float:"left"}}> 
                    <div className={styles.kuva}>
                        <img className={styles.kuva2} src={`https://image.tmdb.org/t/p/w185${elokuva.tmdbkuva}`} alt={elokuva.nimi}></img>
                        <div className={styles.tekstiLaatikko}>
                            <Link style={{marginTop:"0px"}} href={`/elokuva/${elokuva._id}`}>
                                <h2 style={{textAlign:"center"}} className="text-2xl">{elokuva.nimi + " (" + elokuva.valmistumisvuosi + ")"}</h2>
                                <p className={styles.pikkuteksti}>{elokuva.genre.join(", ")}</p>
                            </Link>
                        </div>
                    </div>
                </div>
            )
            })}
        </ul>
        <div style={{float:"left", width:"100%", alignItems:"center", marginBottom:"10px"}}>
            <Link style={{float:"left"}} href="/" className={styles.valikko}>Palaa listaukseen</Link>
        </div>

        <div style={{display:"flex", float:"left", width:"100%", alignItems:"center"}}>
            <SivutusNappi genre={params.nimi} sivuIn={1} elokuvaMaara={elokuvaMaara}></SivutusNappi>
        </div>

    </>
  )
}