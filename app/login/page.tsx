'use client'
import Link from 'next/link';
import 'app/globals.css';
import styles from './page.module.css'
//import { createClient} from '@supabase/supabase-js';
import { useRef, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

//const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);

export default function loginPage()  : React.ReactElement { //async Promise<React.ReactElement> Aiheuttaa virheen

    const lomakeRef : React.MutableRefObject<any> = useRef<HTMLFormElement>();
    const router = useRouter();
    const [virhe, setVirhe] = useState<string>();

    const kirjaudu = async (e: React.FormEvent) : Promise<void> => {
        e.preventDefault();

        const supabase = createClientComponentClient();

        const {data, error} = await supabase.auth.signInWithPassword({
            email : lomakeRef.current.tunnus.value,
            password : lomakeRef.current.salasana.value
        })

        if(!error) {

            router.push("/")

        } else {

            setVirhe("Käyttäjätunnus tai salasana on väärin tai puuttuu")

        }
    }

  return (
    <>
        <form className='p-6 space-y-2' ref={lomakeRef}>
            <input type="text" name="tunnus" placeholder='Käyttajatunnus' className="input input-bordered w-full"/>
            <input type="password" name="salasana" placeholder='Salasana' className="input input-bordered w-full"/>
            <button onClick={kirjaudu} className="btn w-full border-slate-400 text-white">Kirjaudu sisään</button>
            <Link href="/register" className="btn w-full border-slate-400 text-white">Rekisteröidy</Link>
            <Link href="/resetpassword" className="btn w-full border-slate-400 text-white">Unohtuiko salasana?</Link>

            {(Boolean(virhe))
                ? <div className='alert alert-error rounded-md text-sm'>{virhe}</div>
                : null
            }

        </form>

    </>
  )

}
