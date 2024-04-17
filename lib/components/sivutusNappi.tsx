import Link from 'next/link';
import 'app/globals.css';

type Props = {
    genre : string;
    sivuIn : number;
    elokuvaMaara : number;
}; 

const sivutusNappi = ({ genre, sivuIn, elokuvaMaara }: Props) => {
    let sivu : number = sivuIn;
    let edellinen : number = sivu - 1;
    let seuraava : number = Number(sivu) + 1;
    let seuseuraava : number = Number(sivu) + 2;
    let elokuvaRyhmienMaara : number = 5
    let ryhmat = 0;

    if (elokuvaMaara < 40) {
        elokuvaRyhmienMaara = 1;

    } else {
        elokuvaRyhmienMaara = Math.ceil(elokuvaMaara / 40) // pyöristää ylöspäin
    }

    for (let i = 0; i < elokuvaRyhmienMaara; i++) {
        ryhmat = ryhmat + 1;
    }
    
    if (sivu == 1) {
        if (elokuvaRyhmienMaara == 1) {
            return (
                <div className="btn-group" style={{float:"left", width:"100%"}}>
                    <Link href={`/genre/${genre}/${sivu}`} className="btn btn-active" style={{backgroundColor:"#4b5563"}}>1</Link>
                </div>
            );
        } else if (elokuvaRyhmienMaara == 2) {
            return (
                <div className="btn-group" style={{float:"left", width:"100%"}}>
                    <Link href={`/genre/${genre}/${sivu}`} className="btn btn-active" style={{backgroundColor:"#4b5563"}}>1</Link>
                    <Link href={`/genre/${genre}/2`} className="btn">2</Link>
                    <Link href={`/genre/${genre}/${seuraava}`} className="btn">{'>'}</Link>
                </div>
            );
        } else if (elokuvaRyhmienMaara == 3) {
            return (
                <div className="btn-group" style={{float:"left", width:"100%"}}>
                    <Link href={`/genre/${genre}/${sivu}`} className="btn btn-active" style={{backgroundColor:"#4b5563"}}>1</Link>
                    <Link href={`/genre/${genre}/2`} className="btn">2</Link>
                    <Link href={`/genre/${genre}/3`} className="btn">3</Link>
                    <Link href={`/genre/${genre}/${seuraava}`} className="btn">{'>'}</Link>
                </div>
            );
        } else if (elokuvaRyhmienMaara == 4) {
            return (
                <div className="btn-group" style={{float:"left", width:"100%"}}>
                    <Link href={`/genre/${genre}/${sivu}`} className="btn btn-active" style={{backgroundColor:"#4b5563"}}>1</Link>
                    <Link href={`/genre/${genre}/2`} className="btn">2</Link>
                    <Link href={`/genre/${genre}/3`} className="btn">3</Link>
                    <Link href={`/genre/${genre}/4`} className="btn">4</Link>
                    <Link href={`/genre/${genre}/${seuraava}`} className="btn">{'>'}</Link>
                </div>
            );
        } else if (elokuvaRyhmienMaara >= 5) {
            return (
                <div className="btn-group" style={{float:"left", width:"100%"}}>
                    <Link href={`/genre/${genre}/${sivu}`} className="btn btn-active" style={{backgroundColor:"#4b5563"}}>1</Link>
                    <Link href={`/genre/${genre}/2`} className="btn">2</Link>
                    <Link href={`/genre/${genre}/3`} className="btn">3</Link>
                    <Link href={`/genre/${genre}/4`} className="btn">4</Link>
                    <Link href={`/genre/${genre}/5`} className="btn">5</Link>
                    <Link href={`/genre/${genre}/${seuraava}`} className="btn">{'>'}</Link>
                </div>
            );
        } else {
            return (
                <div className="btn-group" style={{float:"left", width:"100%"}}>
                    <h1></h1>
                </div>
            );
        }
    } else if (sivu == 2) {
        if (elokuvaRyhmienMaara == 2) {
            return (
                <div className="btn-group" style={{float:"left", width:"100%"}}>
                    <Link href={`/genre/${genre}/${edellinen}`} className="btn">{'<'}</Link>
                    <Link href={`/genre/${genre}/1`} className="btn">1</Link>
                    <Link href={`/genre/${genre}/${sivu}`} className="btn btn-active" style={{backgroundColor:"#4b5563"}}>2</Link>
                </div>
            );
        } else if (elokuvaRyhmienMaara == 3) {
            return (
                <div className="btn-group" style={{float:"left", width:"100%"}}>
                    <Link href={`/genre/${genre}/${edellinen}`} className="btn">{'<'}</Link>
                    <Link href={`/genre/${genre}/1`} className="btn">1</Link>
                    <Link href={`/genre/${genre}/${sivu}`} className="btn btn-active" style={{backgroundColor:"#4b5563"}}>2</Link>
                    <Link href={`/genre/${genre}/3`} className="btn">3</Link>
                    <Link href={`/genre/${genre}/${seuraava}`} className="btn">{'>'}</Link>
                </div>
            );
        } else if (elokuvaRyhmienMaara == 4) {
            return (
                <div className="btn-group" style={{float:"left", width:"100%"}}>
                    <Link href={`/genre/${genre}/${edellinen}`} className="btn">{'<'}</Link>
                    <Link href={`/genre/${genre}/1`} className="btn">1</Link>
                    <Link href={`/genre/${genre}/${sivu}`} className="btn btn-active" style={{backgroundColor:"#4b5563"}}>2</Link>
                    <Link href={`/genre/${genre}/3`} className="btn">3</Link>
                    <Link href={`/genre/${genre}/4`} className="btn">4</Link>
                    <Link href={`/genre/${genre}/${seuraava}`} className="btn">{'>'}</Link>
                </div>
            );
        } else {
            return (
                <div className="btn-group" style={{float:"left", width:"100%"}}>
                    <Link href={`/genre/${genre}/${edellinen}`} className="btn">{'<'}</Link>
                    <Link href={`/genre/${genre}/1`} className="btn">1</Link>
                    <Link href={`/genre/${genre}/${sivu}`} className="btn btn-active" style={{backgroundColor:"#4b5563"}}>2</Link>
                    <Link href={`/genre/${genre}/3`} className="btn">3</Link>
                    <Link href={`/genre/${genre}/4`} className="btn">4</Link>
                    <Link href={`/genre/${genre}/5`} className="btn">5</Link>
                    <Link href={`/genre/${genre}/${seuraava}`} className="btn">{'>'}</Link>
                </div>
            );
        }
    } else if (sivu >= 3 && sivu < elokuvaRyhmienMaara) {
        return (
            <div className="btn-group" style={{float:"left", width:"100%"}}>
                <Link href={`/genre/${genre}/${edellinen}`} className="btn">{'<'}</Link>
                <Link href={`/genre/${genre}/${(edellinen - 1)}`} className="btn">{(edellinen - 1)}</Link>
                <Link href={`/genre/${genre}/${edellinen}`} className="btn">{edellinen}</Link>
                <Link href={`/genre/${genre}/${sivu}`} className="btn btn-active" style={{backgroundColor:"#4b5563"}}>{sivu}</Link>
                <Link href={`/genre/${genre}/${seuraava}`} className="btn">{seuraava}</Link>
                <Link href={`/genre/${genre}/${seuseuraava}`} className="btn">{seuseuraava}</Link>
                <Link href={`/genre/${genre}/${seuraava}`} className="btn">{'>'}</Link>
            </div>
        );

    } else if (sivu == (elokuvaRyhmienMaara - 1)) {
        return(
            <div className="btn-group" style={{float:"left", width:"100%"}}>
                <Link href={`/genre/${genre}/${edellinen}`} className="btn">{'<'}</Link>
                <Link href={`/genre/${genre}/${(edellinen - 2)}`} className="btn">{(edellinen - 2)}</Link>
                <Link href={`/genre/${genre}/${(edellinen - 1)}`} className="btn">{(edellinen - 1)}</Link>
                <Link href={`/genre/${genre}/${edellinen}`} className="btn">{edellinen}</Link>
                <Link href={`/genre/${genre}/${sivu}`} className="btn btn-active" style={{backgroundColor:"#4b5563"}}>{sivu}</Link>
                <Link href={`/genre/${genre}/${elokuvaRyhmienMaara}`} className="btn">{elokuvaRyhmienMaara}</Link>
                <Link href={`/genre/${genre}/${seuraava}`} className="btn">{'>'}</Link>
            </div>
        );
    } else if (sivu == elokuvaRyhmienMaara) { // TEST elokuvaryhmienMaara = viimeinen
        return(
            <div className="btn-group" style={{float:"left", width:"100%"}}>
                <Link href={`/genre/${genre}/${edellinen}`} className="btn">{'<'}</Link>
                <Link href={`/genre/${genre}/${(edellinen - 3)}`} className="btn">{(edellinen - 3)}</Link>
                <Link href={`/genre/${genre}/${(edellinen - 2)}`} className="btn">{(edellinen - 2)}</Link>
                <Link href={`/genre/${genre}/${(edellinen - 1)}`} className="btn">{(edellinen - 1)}</Link>
                <Link href={`/genre/${genre}/${edellinen}`} className="btn">{edellinen}</Link>
                <Link href={`/genre/${genre}/${sivu}`} className="btn btn-active" style={{backgroundColor:"#4b5563"}}>{sivu}</Link>
            </div>
        );
    } else {
        return(
            <div>
                <h1></h1>
            </div>
        );
    }
  };
  
  export default sivutusNappi;