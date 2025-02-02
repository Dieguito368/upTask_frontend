import { Task } from "@/types/index";
import AddNoteForm from "./AddNoteForm";
import NoteDetail from "./NoteDetail";

type NotesPanelProps = {
    notes: Task['notes']
} 

const NotesPanel = ({ notes } : NotesPanelProps) => {
    return (
        <>
            <AddNoteForm />

            <div className="divide-y divide-gray-100 mt-10">
                { 
                    notes.length ? (
                        <>
                            <h3 className="text-2xl font-bold text-slate-600 my-5">Notas</h3> 

                            <div className="flex gap-10">
                                { notes.map(note => <NoteDetail note={ note } key={ note._id } /> ) }
                            </div>
                        </>
                    ) : <p className="text-gray-500 text-center pt-3">No hay notas</p>
                }
            </div>
        </>
    );
}

export default NotesPanel;