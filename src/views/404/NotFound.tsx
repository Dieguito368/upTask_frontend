import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <h1 className="font-black text-center text-4xl text-white">Página no encontrada</h1>
            <p className="text-center text-white mt-5">
                Tal vez quieras volver a { ' ' }
                <Link to="/" className="text-fuchsia-500 font-bold">Proyectos</Link>
            </p>
        </div>
    )
}

export default NotFound;