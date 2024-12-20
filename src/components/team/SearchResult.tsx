import { addUserToProject } from "@/api/TeamAPI"
import { TeamMember } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type SearchResultProps = {
    user: TeamMember
    reset: () => void
}

const SearchResult = ({ user, reset } : SearchResultProps) => {
    const navigate = useNavigate();
    const params = useParams();

    const queryClient = useQueryClient();

    const projectId = params.projectId!
    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: error => {
            toast.error(error.message);
        },
        onSuccess: data => {
            toast.success(data);
            navigate(location.pathname, { replace: true });
            reset();
            queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] })
        }
    });

    return (
        <div className="mt-10 animate__animated animate__fadeIn">
            <h3 className="text-center font-bold">Resultado</h3>

            <div className="flex justify-between items-center">
                <p className="text-sm">{ user.name }</p>
                
                <button
                    className="text-purple-600 hover:bg-purple-100 px-10 py-3 text-sm font-bold cursor-pointer"
                    onClick={ () => mutate({ projectId, userId: user._id }) }
                >Agregar al proyecto</button>
                </div>
        </div>
    )
}

export default SearchResult
