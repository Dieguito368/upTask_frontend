import { useLocation, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { deleteNote } from "@/api/NoteAPI";
import { formatDate } from "@/utils/index";
import { Note } from "@/types/index";
import { useMemo } from "react";

type NoteDetailProps = {
    note: Note
}

const NoteDetail = ({ note } : NoteDetailProps) => {
    const params = useParams();
    const location = useLocation();
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const canDelete = useMemo(() => user?._id === note.createdBy._id, [ user ]);

    const queryParams = new URLSearchParams(location.search);
    const projectId = params.projectId!;
    const taskId = queryParams.get('viewTask')!;

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: error => toast.error(error.message),
        onSuccess: data => {
            toast.success(data);

            queryClient.invalidateQueries({ queryKey: ['viewTask', taskId] });
        }
    });

    return (
        <div 
            className="border w-1/3 flex flex-col justify-between rounded shadow"
        >
            <div className="p-3">
                <p className="font-bold text-lg">{ note.createdBy.name }</p>
                <p className="text-sm my-5">{ note.content }</p>
            </div>

            <div className="flex  items-center justify-between border-t p-3">
                <p className="text-gray-400 text-xs">{ formatDate(note.createdAt) }</p>

                {
                    canDelete && 
                        <button 
                            type="button"
                            onClick={ () => mutate({ projectId, taskId, noteId: note._id }) }
                            className="bg-red-600 p-2 rounded hover:bg-red-700 transition-colors"
                        >
                            <Trash2
                            size={ 16 } 
                                className="text-white" />
                        </button>
                }
            </div>
        </div>
    )
}

export default NoteDetail;
