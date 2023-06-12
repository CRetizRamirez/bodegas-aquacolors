import Registro from "./Registro";
import Nav from "./Nav";
import IngresarArticulo from "./IngresarArticulo";
import React, { useState } from "react";
import { db } from "../firebase/credenciales";
import {
	collection,
	getDocs,
	query,
	doc,
	deleteDoc,
	updateDoc,
} from "firebase/firestore";

function Gerente({ user }) {
	const [busqueda, setBusqueda] = useState(""); // Para controlar lo que se va digitando en la busqueda
	const [articulos, setArticulos] = useState("");
	if (user) {
		// Se trae todos los datos Firebase de Articulos en un array
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

		const deleteItem = async (id, art) => {
			if (
				window.confirm(
					"CUIDADO ...!!!  Estas a punto de eliminar  *** " +
						art +
						" ***  esta acción no se puede  revertir"
				)
			) {
				await deleteDoc(doc(db, "users", id));
				getItems();
			}
		};

		async function agregar(id, art, stock, cantAgregar) {
			if (cantAgregar) {
				stock = stock + Math.floor(cantAgregar);
				const fecha = new Date(Date.now()).toLocaleString();
				const autor = user.email;
				const accion = "Agregado";
				await updateDoc(doc(db, "users", id), { stock, fecha, autor, accion });
				document.getElementById("AG" + id).value = ""; // Para limpiar el input
				getItems();
			}
		}

		async function retirar(id, art, stock, cantRetirar) {
			if (cantRetirar) {
				if (Math.floor(cantRetirar) > stock) {
					window.confirm("No puedes retirar una cantidad mayor que el Stock");
					document.getElementById("RG" + id).value = "";
				} else {
					stock = stock - cantRetirar;
					const fecha = new Date(Date.now()).toLocaleString();
					const autor = user.email;
					const accion = "Retiro";
					await updateDoc(doc(db, "users", id), {
						stock,
						fecha,
						autor,
						accion,
					});
					document.getElementById("RG" + id).value = "";
					getItems();
				}
			}
		}

		const handleChange = (e) => {
			e.preventDefault();
			setBusqueda(e.target.value);
			getItems();
		};

		return (
			<div className="container mt-4">
				<Nav />
				<h2>
					Bienvenid@ : {user.campos[1]} {}
				</h2>
				<div id="grupoDeBotones" className="my-3">
					<button
						type="button"
						className="btn btn-outline-primary"
						data-bs-toggle="modal"
						data-bs-target="#modalRegistro">
						Registrar Usuarios
					</button>
					<div
						className="modal fade"
						id="modalRegistro"
						data-bs-backdrop="static"
						data-bs-keyboard="false"
						tabIndex="-1"
						aria-labelledby="modalRegistroLabel"
						aria-hidden="true">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h3 className="modal-title" id="modalRegistroLabel">
										Registro de Usuarios
									</h3>
								</div>
								<div className="modal-body">
									<Registro />
								</div>
								<div className="modal-footer ">
									<button
										type="button"
										className="btn btn-primary"
										data-bs-dismiss="modal">
										Cerrar
									</button>
								</div>
							</div>
						</div>
					</div>
					<button
						className="btn btn-outline-secondary"
						type="button"
						data-bs-toggle="modal"
						data-bs-target="#modalIngresar">
						Ingresar Artículos Nuevos
					</button>
					<div
						className="modal fade"
						id="modalIngresar"
						data-bs-backdrop="static"
						data-bs-keyboard="false"
						tabIndex="-1"
						aria-labelledby="modalIngresarLabel"
						aria-hidden="true">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h3 className="modal-title" id="modalIngresarLabel">
										Ingresar Artículo Nuevo
									</h3>
								</div>
								<div className="modal-body">
									<IngresarArticulo />
								</div>
								<div className="modal-footer ">
									<button
										type="button"
										className="btn btn-secondary"
										data-bs-dismiss="modal">
										Cerrar
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
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
									<th scope="col" className="text-primary">
										Retirar
									</th>
									<th scope="col" className="text-success">
										Agregar
									</th>
									<th scope="col" className="text-danger">
										Eliminar
									</th>
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
												<td>
													<div className="input-group mb-3">
														<input
															minLength="4"
															maxLength="8"
															size="4"
															id={"RG" + doc.id}
															type="number"
															min="0"
															placeholder={doc.articulo}
														/>
														<div className="input-group-append">
															<button
																className="btn btn-primary"
																type="button"
																onClick={() =>
																	retirar(
																		doc.id,
																		doc.articulo,
																		doc.stock,
																		document.getElementById("RG" + doc.id).value
																	)
																}>
																Retirar
															</button>
														</div>
													</div>
												</td>
												<td>
													<div className="input-group mb-3">
														<input
															minLength="4"
															maxLength="8"
															size="4"
															id={"AG" + doc.id}
															type="number"
															min="0"
															placeholder={doc.articulo}
														/>
														<div className="input-group-append">
															<button
																className="btn btn-success"
																type="button"
																onClick={() =>
																	agregar(
																		doc.id,
																		doc.articulo,
																		doc.stock,
																		document.getElementById("AG" + doc.id).value
																	)
																}>
																Agregar
															</button>
														</div>
													</div>
												</td>
												<td>
													<button
														type="button"
														className="btn btn-danger"
														onClick={() => deleteItem(doc.id, doc.articulo)}>
														Eliminar
													</button>
												</td>
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

export default Gerente;
