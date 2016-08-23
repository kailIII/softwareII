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

export function filterForName(name){
	return {
		type: "FILTER_NAME",
		name: name
	}
}

export function filterForId(cedula){
	return {
		type: "FILTER_ID",
		cedula: cedula
	}
}