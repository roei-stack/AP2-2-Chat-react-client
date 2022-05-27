import {useEffect} from 'react'
import {initialize} from './data/data'
function Init() {
    useEffect(()=>{
        initialize();
    }, [])
    return(<></>);
}

export default Init;