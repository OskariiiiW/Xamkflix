'use client'
import 'app/globals.css';
import { useRef, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function adminLoginPage() {

    const lomakeRef : React.MutableRefObject<any> = useRef<HTMLFormElement>();
    const [kirjautumistila, setKirjautumistila] = useState<boolean>(true);
    const [virhe, setVirhe] = useState<any>();
    const supabase = createClientComponentClient();
    //const {data} = await supabase.auth.getSession(); vaatii async, mika aiheuttaa virheen

    const kirjaudu = async (e: React.FormEvent) : Promise<void> => {
        e.preventDefault();

        const {data, error} = await supabase.auth.signInWithPassword({
            email : lomakeRef.current.tunnus.value,
            password : lomakeRef.current.salasana.value
        })

        if(!error) {
            setKirjautumistila(false);

        } else {
            setVirhe("Ylläpitotunnus tai salasana on väärin tai puuttuu");
            //setKirjautumistila(false);

        }
    }

    const kirjauduUlos = async () : Promise<void> => {

        const { error } = await supabase.auth.signOut()
    
        if(error) {
            setVirhe(error);
    
          
        } else {
            setKirjautumistila(true);
        }
      }

  return (

    (kirjautumistila)
    ?   (virhe) 
        ?   <>
        
           <form className='p-6 space-y-2' ref={lomakeRef}>
                <input type="text" name="tunnus" placeholder='Ylläpitotunnus' className="input input-bordered w-full"/>
                <input type="password" name="salasana" placeholder='Salasana' className="input input-bordered w-full"/>
                <button onClick={kirjaudu} className="btn w-full border-slate-400 text-white">Kirjaudu sisään</button>
            </form>
            <div className='alert alert-error rounded-md text-sm'>{virhe}</div>
        </>

        :   <form className='p-6 space-y-2' ref={lomakeRef}>
                <input type="text" name="tunnus" placeholder='Ylläpitotunnus' className="input input-bordered w-full"/>
                <input type="password" name="salasana" placeholder='Salasana' className="input input-bordered w-full"/>
                <button onClick={kirjaudu} className="btn w-full border-slate-400 text-white">Kirjaudu sisään</button>
            </form>

    :   (virhe) 
        ?   <>
                <p>{virhe}</p>
            </>

        :   <>
            <p>kirjauduttu sisään</p>
            <button onClick={kirjauduUlos} className="btn w-full border-slate-400 text-white">Kirjaudu ulos</button>
            </>
  )

}
