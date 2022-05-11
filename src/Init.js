import {useEffect} from 'react'
import {initialize} from './data/data_base_for_noobs'
function Init() {
    useEffect(()=>{
        initialize();
    }, [])
    return(<div></div>);
}

export default Init;