'use client'
import { createClient } from '@supabase/supabase-js';
import 'app/globals.css';
//import { useState } from 'react';
import {tarkistaRow} from './tarkistaRow';

type Props = {
    elokuvaNimi : string;
    genre : string;
};

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

const lisaysNappi = ({elokuvaNimi, genre} : Props) => {
  
    let tarkastus : any = tarkistaRow(elokuvaNimi)
    console.log(tarkastus);
    //setTarkastaja(tarkastus);

    const lisaaListaan = async () : Promise<void> => {

        const {data, error} = await supabase.from('katselulista').insert( //upsert
            [{
                elokuva : elokuvaNimi || "Nimetön elokuva",
                genre : genre || "Genretön"
            }]
        )
    };

    const poistaListalta = async () : Promise<void> => {
        const { error } = await supabase
            .from('katselulista')
            .delete()
            .eq('elokuva', elokuvaNimi)
    };

    if (tarkastus.value == false) {

        return (
            <button onClick={lisaaListaan} 
                className="p-2 px-4 border border-slate-400 bg-slate-400" 
                style={{color:"green", backgroundColor:"greenyellow", width:"40px", fontSize:"30px", position:"absolute", float:"right"}}>
                +
            </button>
        );
     } else {
        return (
            <button onClick={poistaListalta} 
                className="p-2 px-4 border border-slate-400 bg-slate-400" 
                style={{color:"white", backgroundColor:"red",  width:"40px", fontSize:"30px", position:"absolute", float:"right"}}>
                -
            </button>
        );
    }
}

export default lisaysNappi;