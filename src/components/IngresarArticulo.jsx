import React from "react";
import { db } from "../firebase/credenciales";
import { collection, addDoc } from "firebase/firestore";

function IngresarArticulo({user}) {
	// Para ingresar articulos a db
	async function ingresarArt(clave, articulo, stock, bodega, ubicacion, fechaActual, autor) {
		try {
			const docRef = await addDoc(collection(db, "users"), {
				clave: clave,
				articulo: articulo,
				stock: stock,
				bodega: bodega,
				ubicacion: ubicacion,
				fecha: fechaActual,
				autor: autor,
			});
		} catch (e) {
			console.error("Error al ingresar el artículo: ", e);
		}
	}

	function submitHandler(e) {
		e.preventDefault();
		const clave = e.target.elements.clave.value.toString().toLowerCase();
		const articulo = e.target.elements.articulo.value.toString().toLowerCase();
		const stock = e.target.elements.stock.value;
		const bodega = e.target.elements.bodega.value.toString().toLowerCase();
		const ubicacion = e.target.elements.ubicacion.value.toString().toLowerCase();
		const fechaActual = (new Date(Date.now())).toLocaleString();
		const autor = user.campos[1];
		ingresarArt(clave, articulo, stock, bodega, ubicacion, fechaActual, autor);
		e.target.reset();
	}

	return (
		<div className="container">
			<form className="mb-3" onSubmit={submitHandler}>
				<div className="mb-3">
					<input
						id="articulo"
						type="text"
						className="form-control"
						placeholder="Articulo"
						required
					/>
				</div>
				<div className="mb-3">
					<input
						id="clave"
						type="text"
						className="form-control"
						placeholder="Clave"
						required
					/>
				</div>
				<div className="mb-3">
					<input
						id="stock"
						type="number"
						min="0"
						className="form-control"
						placeholder="Stock"
						required
					/>
				</div>
				<div className="mb-3">
					<input
						id="ubicacion"
						type="text"
						className="form-control"
						placeholder="Ubicacion"
						required
					/>
				</div>
				<div className="mb-4">
					<label>Bodega:
						<div className="dropdown">
							<select id="bodega">
								<option value="candy">Candy</option>
								<option value="cristal">Cristal</option>
								<option value="oficina">Oficina</option>
								<option value="perla">Perla</option>
							</select>
						</div>
					</label>
				</div>
				<div className="d-grid gap-2">
					<button type="submit" className="btn btn-secondary">
						Ingresar
					</button>
				</div>
			</form>
		</div>
	);
}

export default IngresarArticulo;
