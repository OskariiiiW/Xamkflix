import { Elokuva, haeElokuvat } from '../../lib/elokuvalista';
import Link from 'next/link';
import 'app/globals.css';

export default async function HomePage()  : Promise<React.ReactElement>{
  
    const elokuva : Elokuva[] = await haeElokuvat("r");

  return (
    <>
        <h2 className="text-2xl">Elokuvat</h2>

        <Link href={`/`}>Järjestä lista</Link>

        <ul>
        {elokuva.map((elokuva : Elokuva, idx : number) => {

            return (
                <li>
                    <Link href={`/elokuva/${elokuva._id}`}>
                        {elokuva.nimi} {"( "} {elokuva.valmistumisvuosi} {")"}
                    </Link>
                </li>
            )

        })}
        </ul>

    </>
  )

}
