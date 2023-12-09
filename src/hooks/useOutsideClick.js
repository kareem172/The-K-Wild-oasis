import { useEffect, useRef } from "react";

export function useOutsideClick(handler){
    const ref = useRef(null);

    useEffect(()=>{
        const handleClickOutside = (event)=>{
            if(ref.current && !ref.current.contains(event.target)){
                handler();
            }
        }
        document.addEventListener("click", handleClickOutside, true);
        return ()=>{
            document.removeEventListener("click", handleClickOutside, true);
        }
    },[ref, handler])

    return ref;
}