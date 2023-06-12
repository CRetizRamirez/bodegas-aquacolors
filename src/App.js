import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Gerente from "./components/Gerente";
import Encargado from "./components/Encargado";
import UsuarioGeneral from "./components/UsuarioGeneral";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebaseApp from "./firebase/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function App() {
	const [user, setUser] = useState(null);

	async function getRolAndName(uid) {
		const docuRef = doc(firestore, `usuarios/${uid}`);
		const docuCifrada = await getDoc(docuRef);
		const infoRol = docuCifrada.data().rol;
		const infoNombre = docuCifrada.data().nombre;
		return [infoRol, infoNombre];
	}

	function setUserWithFirebaseAndCampos(usuarioFirebase) {
		getRolAndName(usuarioFirebase.uid).then((campos) => {
			const userData = {
				uid: usuarioFirebase.uid,
				email: usuarioFirebase.email,
				campos: campos,
			};
			setUser(userData);
		});
	}

	onAuthStateChanged(auth, (usuarioFirebase) => {
		if (usuarioFirebase) {
			if (!user) {
				setUserWithFirebaseAndCampos(usuarioFirebase);
			}
		} else {
			setUser(null);
		}
	});

	//isAllowed={!!user && user.campos[0] === "gerente"}

	return (
		<div>
			<Routes>
				<Route path="*" element={<Login />} />
				<Route path="/" element={<Login />} />
				<Route
					path="/gerente"
					element={
						<ProtectedRoute user={user} >
							<Gerente user={user} />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/encargado"
					element={
						<ProtectedRoute user={user} >
							<Encargado user={user} />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/usuariogeneral"
					element={
						<ProtectedRoute user={user} >
							<UsuarioGeneral user={user} />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
