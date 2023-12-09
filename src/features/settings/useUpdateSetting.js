import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updatedSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting(){
    const queryClient = useQueryClient();

    const {isLoading:isUpdating, mutate:UpdateSetting} = useMutation({
        mutationFn: (updatedSetting)=>updatedSettingApi(updatedSetting),
        onSuccess: ()=>{
            toast.success("Settings updated successfully");
            queryClient.invalidateQueries({
                queryKey:["settings"]
            })
        },
        onError: ()=>{
            toast.error("Something went wrong updating settings");
            queryClient.invalidateQueries({
                queryKey:["settings"]
            })
        }
    });
    return {isUpdating, UpdateSetting};
}