"use client"
import Link from 'next/link';
import 'app/globals.css';
import styles from './page.module.css'
import { createClient} from '@supabase/supabase-js';
import { useRef, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

//const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);

//export const revalidate : number = 10; päivittää "välimuistin"

export default function registerPage()  : React.ReactElement {
  
    //const {data, error} = await supabase.from('soa-kayttajat').select('*');
    const lomakeRef : React.MutableRefObject<any> = useRef<HTMLFormElement>();
    const router = useRouter();
    const [virhe, setVirhe] = useState<string>();

    const register = async (e: React.FormEvent) : Promise<void> => {
        e.preventDefault();

        const supabase = createClientComponentClient();

        //let valivaihe : string = lomakeRef.current.sposti.value;
        //let valivaihe2 : number = valivaihe.indexOf("@");
        //let tunnus = valivaihe.substring(0, valivaihe2);


        const { data, error } = await supabase.auth.signUp({
            email: lomakeRef.current.sposti.value,
            password: lomakeRef.current.salasana.value
            //user_metadata: { name: tunnus }
          })

        if(!error) {

            router.push("/register/complete");

        } else if (lomakeRef.current.salasana.value !== lomakeRef.current.salasana2.value) {

            setVirhe("Salasanat eivät täsmää");

        } else if (!lomakeRef.current.sposti.value || !lomakeRef.current.salasana.value){

            setVirhe("Sähköposti tai salasana puuttuu");

        }
    }

  return (
    <>
        <form className='p-6 space-y-2' ref={lomakeRef}>
            <input type="text" name="sposti" placeholder='Sähköposti' className="input input-bordered w-full"/>
            <input type="password" name="salasana" placeholder='Salasana' className="input input-bordered w-full"/>
            <input type="password" name="salasana2" placeholder='Salasana' className="input input-bordered w-full"/>
            <button onClick={register} className="btn w-full border-slate-400 text-white">Rekisteröidy</button>
            <Link href="/login" className="btn w-full border-slate-400 text-white" style={{float:"right"}}>Takaisin</Link>
        </form>

        {virhe}
    </>
  )

}
