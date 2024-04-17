'use client'
import Link from 'next/link';
import 'app/globals.css';
import styles from './page.module.css'
//import { createClient} from '@supabase/supabase-js';
import { useRef, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

//const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);

export default function resetpasswordPage()  : React.ReactElement { //async Promise<React.ReactElement> Aiheuttaa virheen

    const lomakeRef : React.MutableRefObject<any> = useRef<HTMLFormElement>();
    //const lomakeRef2 : React.MutableRefObject<any> = useRef<HTMLFormElement>();
    const [vaihtoTila, setVaihtoTila] = useState<Boolean>(false);
    //const [sahkoPosti, setSahkoPosti] = useState<string>();
    const router = useRouter();
    const [virhe, setVirhe] = useState<string>();

    const vaihdaSalasana = async (e: React.FormEvent) : Promise<void> => {
        e.preventDefault();
        const supabase = createClientComponentClient();
        //setSahkoPosti(lomakeRef.current.sposti)

        /*if (vaihtoTila) {
            const { data, error } = await supabase.auth.updateUser({
                password: lomakeRef.current.salasana.value
            })

            if(!error) {

                router.push("/resetpassword/emailsent")


            } else if (lomakeRef.current.salasana.value !== lomakeRef.current.salasana2.value) {

                setVirhe("Salasanat eivät täsmää.");

            } else if (!lomakeRef.current.salasana.value) {

                setVirhe("Salasana ei ole kelvollinen.");

            }

        } else {*/

            const { data, error } = await supabase.auth.resetPasswordForEmail(lomakeRef.current.sposti.value, {
                redirectTo: 'http://localhost:3000/resetpassword/change',}) 

            if(!error) {

                //setVaihtoTila(true);
                router.push("/resetpassword/emailsent")

            } else if (!lomakeRef.current.sposti.value) {

                setVirhe("Sähköposti ei ole kelvollinen.");

            }
        //}
    }

  return (
    <>
        {(Boolean(!vaihtoTila))

            ?   <form className='p-6 space-y-2' ref={lomakeRef}>
                    <input type="text" name="sposti" placeholder='Sähköposti' className="input input-bordered w-full"/>
                    <button onClick={vaihdaSalasana} className="btn w-full border-slate-400 text-white">Vaihda salasana</button>
                    <Link href="/profile" className="btn w-full border-slate-400 text-white">Takaisin</Link>
                </form>

            :   <form className='p-6 space-y-2' ref={lomakeRef}>
                    <input type="password" name="salasana" placeholder='Salasana' className="input input-bordered w-full"/>
                    <input type="password" name="salasana2" placeholder='Salasana uudelleen' className="input input-bordered w-full"/>
                    <button onClick={vaihdaSalasana} className="btn w-full border-slate-400 text-white">Vaihda salasana</button>

                </form>
        }

        {(Boolean(virhe))
            ? <div className='alert alert-error rounded-md text-sm'>{virhe}</div>
            : null
        }


    </>
  )

}
