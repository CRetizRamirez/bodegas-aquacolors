import React, { useState } from "react";
import { db } from "../firebase/credenciales";
import { collection, getDocs, query } from "firebase/firestore";
import Nav from "./Nav";

function UsuarioGeneral({ user }) {
	const [busqueda, setBusqueda] = useState(""); 
	const [articulos, setArticulos] = useState("");

	if (user) {
		// Se trae todos los datos Firebase en un array
		const getItems = async () => {
			const colRef = collection(db, "users");
			const result = await getDocs(query(colRef));
			setArticulos(getArrayFromCollection(result));
			return getArrayFromCollection(result);
		};
		const getArrayFromCollection = (collection) => {
			return collection.docs.map((doc) => {
				return { ...doc.data(), id: doc.id };
			});
		};

		const handleChange = (e) => {
			e.preventDefault();
			setBusqueda(e.target.value);
			getItems();
		};

		return (
			<div className="container mt-4">
				<Nav />
				<h2>Bienvenid@ : {user.campos[1]} </h2>
				<div className="my-4" height="50%">
					<div className="my-3">
						<div className="container-fluid">
							<form className="d-flex">
								<input
									className="form-control me-2"
									type="search"
									placeholder="Buscar artículos..."
									aria-label="Search"
									onChange={handleChange}
								/>
							</form>
						</div>
					</div>
					<div className="table-responsive-sm">
						<table className="table table-striped table-responsive-sm">
							<thead className="table-success">
								<tr>
									<th scope="col">Clave</th>
									<th scope="col">Articulo</th>
									<th scope="col">Stock</th>
									<th scope="col">Bodega</th>
									<th scope="col">Ubicacion</th>
								</tr>
							</thead>
							{articulos &&
								articulos.map((doc) =>
									doc.articulo
										.toString()
										.toLowerCase()
										.includes(busqueda.toString().toLocaleLowerCase()) ? (
										<tbody key={doc.id}>
											<tr>
												<th scope="row">{doc.clave}</th>
												<td>{doc.articulo}</td>
												<td>{doc.stock}</td>
												<td>{doc.bodega}</td>
												<td>{doc.ubicacion}</td>
											</tr>
										</tbody>
									) : (
										<tbody key={doc.id} />
									)
								)}
						</table>
					</div>
				</div>
			</div>
		);
	}
}

export default UsuarioGeneral;
