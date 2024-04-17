import { Elokuva, haeElokuva } from '../elokuvalista';

const elokuvaTiedot = async (elokuvaId: string) => { // komponentti, joka vie mongoDB tietojen haun pois päätiedostoista
    const elokuva : Elokuva = await haeElokuva(elokuvaId);// jotta voi käyttää reactia niissä
                                                        // paitsi että ei siltikään toimi
    return elokuva;
}

export default elokuvaTiedot;