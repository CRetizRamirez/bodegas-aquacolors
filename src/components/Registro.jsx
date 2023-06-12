import React from "react";
import firebaseApp from "../firebase/credenciales";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp); // Si da error, hay que meterlo en la funcion Login

function Registro() {
	async function registrarUsuario(email, password, rol, nombre) {
		// Este los registra en Authentication
		const infoUsuario = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		).then((usuarioFirebase) => {
			return usuarioFirebase;
		})
		.catch((error) => {
			const errorCode = error.code;
			if (errorCode === "auth/invalid-email") alert("Correo Invalido");
			if (errorCode === "auth/missing-password") alert("Contraseña invalida");
			if (errorCode === "auth/weak-password")
				alert("La contraseña debe tener 6 caracteres como mínimo");
			if(errorCode==='auth/email-already-in-use') alert('Este correo ya se encuentra registrado')
			return;
		});
		// Este los registra en Cloud Firestore
		if (infoUsuario) {
			const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
			setDoc(docuRef, { correo: email, rol: rol, nombre: nombre});
		}
	}

	function submitHandler(e) {
		e.preventDefault();
		const email = e.target.elements.emailR.value;
		const password = e.target.elements.passwordR.value;
		const rol = e.target.elements.rol.value;
		const nombre = e.target.elements.nameR.value;
		registrarUsuario(email, password, rol, nombre);
		e.target.reset(); 
	}

	return (
		<div className="container mt-1">
			<form className="mb-5" onSubmit={submitHandler}>
			<div className="mb-3">
					<input
						id="nameR"
						type="text"
						className="form-control"
						aria-describedby="emailHelp"
						placeholder="Nombre"
						required
					/>
				</div>
				<div className="mb-3">
					<input
						id="emailR"
						type="email"
						className="form-control"
						aria-describedby="emailHelp"
						placeholder="Correo Electrónico"
						required
					/>
				</div>
				<div className="mb-3">
					<input
						id="passwordR"
						type="text"
						className="form-control"
						placeholder="Contraseña"
						required
					/>
				</div>
				<div className="mb-4">
					<label>
						<div className="dropdown">
							<select id="rol">
								<option value="gerente">Gerente</option>
								<option value="encargado">Encargado</option>
								<option value="usuariogeneral">Usuario General</option>
							</select>
						</div>
					</label>
				</div>
				<div className="d-grid gap-2">
					<button
						type="submit"
						className="btn btn-primary">
						Registrar
						</button>
				</div>
			</form>
		</div>
	);
}

export default Registro;
