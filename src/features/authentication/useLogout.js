import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {logout as logoutApi} from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogout(){
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate:logout, isLoading} = useMutation({
        mutationFn: ()=> logoutApi(),
        onSuccess:()=>{
            queryClient.setQueryData();
            navigate("/login" ,{replace:true});
        },
        onError:(error)=>{
            console.log(error)
            toast.error("Logout failed");
        }
    });
    return {logout, isLoading};
}