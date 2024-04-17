import 'app/globals.css';
import Link from 'next/link';
import Image from 'next/image';
import {Montserrat} from 'next/font/google';
import styles from './layout.module.css';
import kuva from '/public/harmaaXamk.png';
import kuva2 from '/public/avatar.png';
//import {sessionState} from '../middleware'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
//import { NextFont} from '@next/font'; pitää vissiin asentaa erikseen, koska ei ole sellaista moduulia oletuksena

const fontti = Montserrat({
  weight : '400',
  subsets : ['latin']
});

interface Props {
  children: React.ReactNode
}

export default async function RootLayout({children} : Props) : Promise<React.ReactElement>{

    const supabase = createClientComponentClient();

    const {data} = await supabase.auth.getSession(); //tarkistaa, onko kirjauduttu sisaan. Pitaisi varmaan paivittaa
                                                     //jotenkin jotta toimisi oikein

    const { data: { user } } = await supabase.auth.getUser() //hakee kayttajan tiedot

  return (
    (data.session) //vaihtaa nakymaa sen mukaan, onko kirjauduttu sisaan
    ? <html>
        <head />
        <body className={fontti.className}>

          <div className={styles.header}>
          <Image style={{marginBottom:"25px", marginTop:"10px"}} src={kuva} alt="Xamk logo"/>
          </div>
          
          <div className='genrediv'>
            <h2 className="text-2xl">Genret</h2>
            <Link href={`/genre/komedia`} className={styles.genreValikko}>Komedia</Link> <br />
            <Link href={`/genre/lyhytelokuva`} className={styles.genreValikko}>Lyhytelokuva</Link> <br />
            <Link href={`/genre/draama`} className={styles.genreValikko}>Draama</Link> <br />
            <Link href={`/genre/elamankerta`} className={styles.genreValikko}>Elämänkerta</Link> <br />
            <Link href={`/genre/historia`} className={styles.genreValikko}>Historia</Link> <br />
            <Link href={`/genre/fantasia`} className={styles.genreValikko}>Fantasia</Link> <br />
            <Link href={`/genre/kauhu`} className={styles.genreValikko}>Kauhu</Link> <br />
            <Link href={`/genre/perhe`} className={styles.genreValikko}>Perhe</Link> <br />
            <Link href={`/genre/romantiikka`} className={styles.genreValikko}>Romantiikka</Link> <br />
            <Link href={`/genre/toiminta`} className={styles.genreValikko}>Toiminta</Link> <br />
            <Link href={`/genre/seikkailu`} className={styles.genreValikko}>Seikkailu</Link> <br />
            <Link href={`/genre/sota`} className={styles.genreValikko}>Sota</Link> <br />
            <Link href={`/genre/western`} className={styles.genreValikko}>Western</Link> <br />
            <Link href={`/genre/scifi`} className={styles.genreValikko}>Sci-Fi</Link> <br />
            <Link href={`/genre/mysteeri`} className={styles.genreValikko}>Mysteeri</Link> <br />
            <Link href={`/genre/jannitys`} className={styles.genreValikko}>Jännitys</Link> <br />
            <Link href={`/genre/musiikki`} className={styles.genreValikko}>Musiikki</Link> <br />
            <Link href={`/genre/musikaali`} className={styles.genreValikko}>Musikaali</Link> <br />
            <Link href={`/genre/rikos`} className={styles.genreValikko}>Rikos</Link> <br />
            <Link href={`/genre/urheilu`} className={styles.genreValikko}>Urheilu</Link> <br />
            <Link href={`/genre/dokumentti`} className={styles.genreValikko}>Dokumentti</Link> <br />
            <Link href={`/genre/animaatio`} className={styles.genreValikko}>Animaatio</Link> <br />
            <Link href={`/genre/filmnoir`} className={styles.genreValikko}>Film-Noir</Link> <br />
          </div>

          <details className="dropdown mb-32" style={{float:"right", marginRight:"130px", marginBottom:"0"}}>
            <Image className="avatar w-24 rounded-full" src={kuva2} alt="avatar.png"/>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              {(data.session)
              ? <p>{user?.email}</p>
              : <p>Sähköposti</p>
              }
              <Link href="/logout" className='btn border-slate-400'>Kirjaudu ulos</Link>
            </ul>
          </details>

          <div className='FloatBlock'>
            {children}
          </div>
          
        </body>
      </html>

    : <html>
        <head />
        <body className={fontti.className}>

          <div className={styles.header}>
          <Image style={{marginBottom:"25px", marginTop:"10px"}} src={kuva} alt="Xamk logo"/>
          </div>

          <div className='FloatBlock'>
            {children}
          </div>
          
        </body>
      </html>
  )
}