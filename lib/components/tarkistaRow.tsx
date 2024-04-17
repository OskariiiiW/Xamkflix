'use client'

import { createClient } from "@supabase/supabase-js";

/* 
type Props = {
    elokuvaNimi : string;
};*/

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export const tarkistaRow = async (elokuvaNimi : string) : Promise<any> => {

    let tarkastaja = false;

    const { data, error } = await supabase // data, error 
        .from('katselulista')
        .select('elokuva')
        .eq('elokuva', elokuvaNimi)//.then(result => {return result})

        if (data) { //tarkastaa onko elokuva jo listalla
            if (data?.length > 0){
                tarkastaja = true;
            }
        }

        return tarkastaja;
}

//export default tarkastaja;