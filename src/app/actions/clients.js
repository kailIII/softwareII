export function addClient(id_client, nombre, apellido, cedula, nacionalidad, telefono, email){
	return {
		type: "ADD_CLIENT",
		id_client: id_client,
		nombre: nombre,
		apellido: apellido,
		cedula: cedula,
		nacionalidad: nacionalidad,
		telefono: telefono,
		email: email,
	}
}

export function removeClient(id_client){
	return {
		type: "REMOVE_CLIENT",
		id_client: id_client,
	}
}