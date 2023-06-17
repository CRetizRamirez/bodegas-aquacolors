import firebaseApp from "../firebase/credenciales";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/credenciales";
import { signInWithEmailAndPassword } from "firebase/auth";

const firestore = getFirestore(firebaseApp);

function Login() {
	const navigate = useNavigate();

	function submitHandler(e) {
		e.preventDefault();
		const email = e.target.elements.email.value;
		const password = e.target.elements.password.value;
		signInWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				// Para traerme el rol desde Cloud Firestore
				const uid = userCredential.user.uid;
				const docuRef = doc(firestore, `usuarios/${uid}`);
				const docuCifrada = await getDoc(docuRef);
				const rol = docuCifrada.data().rol;
				if (rol === "gerente") navigate("/gerente");
				if (rol === "encargado") navigate("/encargado");
				if (rol === "usuariogeneral") navigate("/usuariogeneral");
				if (rol === "subgerente") navigate("/subgerente");
			})
			.catch((error) => {
				const errorCode = error.code;
				if (errorCode === "auth/invalid-email") alert("Ingresa datos válidos");
				if (errorCode === "auth/wrong-password") alert("Contraseña Incorrecta");
				if (errorCode === "auth/missing-password") alert("Ingresa Contraseña");
				if (errorCode === "auth/user-not-found") alert("Datos Incorrectos");
			});
	}

	return (
		<div className="container mb-3 mt-3">
			<h1>{"Aquacolors"} </h1>
			<form onSubmit={submitHandler} className="mb-5">
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Usuario
					</label>
					<input
						id="email"
						type="email"
						className="form-control"
						aria-describedby="emailHelp"
						placeholder="correo-electrónico"
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">
						Contraseña
					</label>
					<input
						id="password"
						type="password"
						className="form-control"
						placeholder="*******"
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Iniciar Sesión
				</button>
			</form>
		</div>
	);
}

export default Login;
