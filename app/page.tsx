import { Elokuva, haeElokuvat } from '../lib/elokuvalista';
import Link from 'next/link';
import './globals.css'
import styles from './page.module.css'
import LisaysNappi from '../lib/components/lisaysNappi';

export default async function HomePage()  : Promise<React.ReactElement>{
  
    const elokuva : Elokuva[] = await haeElokuvat("n");

  return (
    <>
    <ul>

    <div className="preview border-base-300 bg-base-200 rounded-b-box rounded-tr-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden border bg-cover bg-top p-4 undefined"
    style={{maxWidth: "930px", marginBottom:"20px"}}>
        <div className="carousel w-full carousel-center">
            <div id="item1" className="carousel-item w-full">
                <div style={{display:"block", width:"100%", float:"left"}}>
                    <img src="https://www.themoviedb.org/t/p/original/ndCSoasjIZAMMDIuMxuGnNWu4DU.jpg" className="w-full" />
                    <h3 className='text-3xl' style={{textAlign:"center"}}>Doctor Strange in the Multiverse of Madness</h3>
                    <h1 className='text-xl' style={{textAlign:"center"}}>Toiminta, Seikkailu, Fantasia, Kauhu, Sci-Fi</h1>
                </div>
            </div> 
            <div id="item2" className="carousel-item w-full">
                <div style={{display:"block", width:"100%", float:"left"}}>
                    <img src="https://www.themoviedb.org/t/p/original/leeHVfEoza4GaZio1tIzevz6XYc.jpg" className="w-full" />
                    <h3 className='text-3xl' style={{textAlign:"center"}}>Memory</h3>
                    <h1 className='text-xl' style={{textAlign:"center"}}>Toiminta, Jännitys</h1>
                </div>
            </div> 
            <div id="item3" className="carousel-item w-full">
                <div style={{display:"block", width:"100%", float:"left"}}>
                    <img src="https://www.themoviedb.org/t/p/original/8QpzqK3nPGxpqpKqhe6QasTGBWQ.jpg" className="w-full" />
                    <h3 className='text-3xl' style={{textAlign:"center"}}>Moonfall</h3>
                    <h1 className='text-xl' style={{textAlign:"center"}}>Toiminta, Seikkailu, Sci-Fi</h1>
                </div>
            </div>
        </div> 

        <div className="flex justify-center w-full py-2 gap-2">
            <a href="#item1" className="btn btn-xs">1</a> 
            <a href="#item2" className="btn btn-xs">2</a> 
            <a href="#item3" className="btn btn-xs">3</a>
        </div>
    </div>

        <h3 className="text-3xl">Uusimmat elokuvat</h3>

        <Link className="jarjestysLinkki" style={{float:"left", marginRight:"900px", marginBottom:"15px", textAlign:"center"}} href={`/r/`}>Järjestä lista</Link> <br/>

        
        {elokuva.map((elokuva : Elokuva, idx : number) => {

            return (
                <div className='listausDiv' style={{float:"left"}}> 
                    <div className={styles.kuva}>
                    <LisaysNappi elokuvaNimi={elokuva.nimi} genre={elokuva.genre.join(", ")}/>
                        <img className={styles.kuva2} src={`https://image.tmdb.org/t/p/w185${elokuva.tmdbkuva}`} alt={elokuva.nimi}></img>
                        <div className={styles.tekstiLaatikko}>
                            <Link style={{marginTop:"0px"}} href={`/elokuva/${elokuva._id}`}>
                                <h2 className="text-2xl" style={{textAlign:"center"}}>{elokuva.nimi + " (" + elokuva.valmistumisvuosi + ")"}</h2>
                                <p className={styles.pikkuteksti}>{elokuva.genre.join(", ")}</p>
                            </Link>
                        </div>
                    </div>
                </div>
            )

        })}
        </ul>

    </>
  )

}
