import { useEffect, useRef } from "react";

export function useOutsideClick(handler, Propagation = true){
    const ref = useRef(null);
    useEffect(()=>{
        const handleClickOutside = (event)=>{
            if(ref.current && !ref.current.contains(event.target)){
                handler();
            }
        }
        document.addEventListener("click", handleClickOutside, Propagation);
        return ()=>{
            document.removeEventListener("click", handleClickOutside, Propagation);
        }
    },[ref, handler, Propagation])

    return ref;
}