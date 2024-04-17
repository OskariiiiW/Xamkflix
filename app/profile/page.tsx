'use client'
import Link from 'next/link';
import 'app/globals.css'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function profilePage()  : React.ReactElement {

  const [metadata, setMetadata] = useState<any>();
  const [error, setError] = useState<any>();
  const supabase = createClientComponentClient();
  const router = useRouter();

  const haeTiedot = async () : Promise<void> => {

    const { data: profile } = await supabase.from('profiles').select('id, username, email');

    const { data: { user }, } = await supabase.auth.getUser()

    if(user) {
      setMetadata(user.user_metadata);
    }
  }

  const kirjauduUlos = async () : Promise<void> => {

    const { error } = await supabase.auth.signOut()

    if(error) {
      setError(error);

    } else {
      router.push("/logout");
    }
  }

  //haeTiedot();
/* 
  useEffect(() => {

    haeTiedot();

  }, []);*/

  return (
    <>
        <p>{metadata}</p>
        <p>{error}</p>
        <Link href="/watchlist" className="btn w-full border-slate-400 text-white" style={{marginTop:"20px"}}>Katselulista</Link>
        <button onClick={kirjauduUlos} className="btn w-full border-slate-400 text-white">Kirjaudu ulos</button>
        <Link href="/resetpassword" className="btn w-full border-slate-400 text-white" style={{marginTop:"20px"}}>Vaihda salasana</Link>
    </>
  )

}
