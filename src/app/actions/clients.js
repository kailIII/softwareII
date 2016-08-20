export function addOrEditClient(client_id, nombre, cedula, nacionalidad, telefono, email, type){
	return {
		type: type,
		client_id: client_id,
		nombre: nombre,
		cedula: cedula,
		nacionalidad: nacionalidad,
		telefono: telefono,
		email: email
	}
}

export function removeClient(client_id){
	return {
		type: "REMOVE_CLIENT",
		client_id: client_id
	}
}