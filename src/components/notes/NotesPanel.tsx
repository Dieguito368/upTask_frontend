import { Task } from "@/types/index";
import AddNoteForm from "./AddNoteForm";
import { formatDate } from "@/utils/index";
import { useAuth } from "@/hooks/useAuth";
import { Trash2 } from "lucide-react"
import { useMemo } from "react";

type NotesPanelProps = {
    notes: Task['notes']
} 

const NotesPanel = ({ notes } : NotesPanelProps) => {
    const { user } = useAuth();

    return (
        <>
            <AddNoteForm />

            <div className="divide-y divide-gray-100 mt-10">
                { 
                    notes.length ? (
                        <>
                            <h3 className="text-2xl font-bold text-slate-600 my-5">Notas</h3> 

                            <div className="flex gap-10">
                                {
                                    notes.map(note => (
                                        <div 
                                            className="border w-1/3 flex flex-col justify-between rounded shadow"
                                            key={ note._id}
                                        >
                                            <div className="p-3">
                                                <p className="font-bold text-lg">{ note.createdBy.name }</p>
                                                <p className="text-sm my-5">{ note.content }</p>
                                            </div>

                                            <div className="flex  items-center justify-between border-t p-3">
                                                <p className="text-gray-400 text-xs">{ formatDate(note.createdAt) }</p>

                                                {
                                                    user?.email === note.createdBy.email && 
                                                        <button 
                                                            type="button"
                                                            className="bg-red-600 p-2 rounded hover:bg-red-700 transition-colors"
                                                        >
                                                            <Trash2
                                                            size={ 16 } 
                                                                className="text-white" />
                                                        </button>
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    ) : <p className="text-gray-500 text-center pt-3">No hay notas</p>
                }
            </div>
        </>
    );
}

export default NotesPanel;