'use client'
import Link from 'next/link';
import 'app/globals.css'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function logoutPage() {

  const supabase = createClientComponentClient();
  const router = useRouter();
  const [error, setError] = useState<any>();


  const kirjauduUlos = async () => {
    const { error } = await supabase.auth.signOut()

    router.push("/login");

    if(error) {
      setError(error);
    }
  }

  useEffect(() => {

    kirjauduUlos();

  }, []);

}
