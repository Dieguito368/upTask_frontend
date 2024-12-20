import { Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import AddMemberModal from "@/components/team/addMemberModal";
import { getProjectTeam, removeMemberFromProject } from "@/api/TeamAPI";

const ProjectTeamView = () => {
    const navigate = useNavigate();
    const params = useParams();
    const queryClient = useQueryClient();
    
    const projectId = params.projectId!;

    const { data: team } = useQuery({
        queryKey: ['projectTeam', projectId],
        queryFn: () => getProjectTeam(projectId),
        retry: 1
    });

    const { mutate } = useMutation({
        mutationFn: removeMemberFromProject,
        onError: error => {
            toast.error(error.message);

        },
        onSuccess: data => {
            queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] });

            toast.success(data);
        }
    });

    return (
        <>
            <h1 className='text-4xl font-black'>Administrar Equipo</h1>
            <p className='text-base font-light text-gray-500 text-justify mt-2'>Administra el equipo de trabajo para este proyecto.</p>

            <nav className='my-5 flex gap-3'>
                <button 
                    type='button' 
                    className='bg-purple-400 hover:bg-purple-500 px-8 py-2 font-bold text-white text-sm cursor-pointer transition-colors'
                    onClick={ () => navigate(`${location.pathname}?addMember=true`)}
                >Agregar Colaborador</button>

                <Link 
                    to={ `/projects/${projectId}` }
                    className='bg-fuchsia-400 hover:bg-fuchsia-500 px-8 py-2 font-bold text-white text-sm cursor-pointer transition-colors'
                >Volver</Link>
            </nav>  

            <AddMemberModal />

            <div>
                <h2 className="text-2xl font-black my-5">Miembros actuales</h2>

                { team &&
                    <>
                        { team.length ? (
                            <ul role="list" className="divide-y divide-gray-100 border border-gray-100 bg-white shadow-lg">
                                { team.map((member) => (
                                    <li key={ member._id } className="flex justify-between gap-x-6 px-5 py-5">
                                        <div className="flex min-w-0 gap-x-4">
                                            <div className="min-w-0 flex-auto space-y-2">
                                                <p className="text-lg font-black text-gray-600">
                                                    { member.name }
                                                </p>

                                                <p className="text-sm text-gray-400">
                                                    { member.email }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex shrink-0 items-center gap-x-6">
                                            <Menu as="div" className="relative flex-none">
                                                <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                                        <span className="sr-only">opciones</span>
                                                        <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
                                                </MenuButton>

                                                <Transition
                                                    as={ Fragment }
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                                        <MenuItem>
                                                            <button
                                                                type='button'
                                                                className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                                onClick={ () => mutate({ projectId, userId: member._id }) }
                                                            >
                                                                Eliminar del Proyecto
                                                            </button>
                                                        </MenuItem>
                                                    </MenuItems>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className='text-center py-20'>No hay miembros en este equipo</p>
                        ) }
                    </>
                }
            </div>
        </>
    )
}

export default ProjectTeamView;