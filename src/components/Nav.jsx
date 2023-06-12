import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/credenciales";

function Nav() {
	const navigate = useNavigate();

	const handleLogout = async (e) => {
		e.preventDefault();
		navigate("/");
		signOut(auth);
	};

	return (
		<div>
			<nav className="navbar bg-secondary ">
				<div className="container-fluid ">
					<form className="d-flex ">					
						<button
							onClick={handleLogout}
							className="btn btn-warning"
							type="submit">
							Salir
						</button>
					</form>
				</div>
			</nav>
		</div>
	);
}
export default Nav;
