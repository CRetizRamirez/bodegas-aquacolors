//import { Navigate } from "react-router-dom";
import Gerente from "./Gerente";
import Login from "./Login";
import Encargado from "./Encargado";
import UsuarioGeneral from "./UsuarioGeneral";

function ProtectedRoute({ user }) {
	if (user) {
		return (
			<div>
				{user.campos[0] === "gerente" ? (
					<Gerente user={user} />
				) : user.campos[0] === "encargado" ? (
					<Encargado user={user} />
				) : user.campos[0] === "usuariogeneral" ? (
					<UsuarioGeneral user={user} />
				) : (
					<Login />
				)}
			</div>
		);
	}
}

export default ProtectedRoute;
