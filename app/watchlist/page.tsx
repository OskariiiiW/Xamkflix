'use client'
import Link from 'next/link';
import 'app/globals.css'

export default function watchlistPage()  : React.ReactElement {

  return (
    <>
        <Link href="/logout" className="btn border-slate-400 text-white">Kirjaudu ulos</Link>
    </>
  )

}
