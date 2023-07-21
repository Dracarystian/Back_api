class DoctorGetAllError extends Error {
    constructor(){
        super("Failed to retrieve doctor list")
        this.name = "DoctorGetAllError"
    }
}

class PatientGetAllError extends Error {
    constructor(){
        super("Failed to retrieve patient list")
        this.name = "PatientGetAllError"
    }
}

class DoctorCreationError extends Error {
    constructor(message: string){
        super(message)
        this.name = "DoctorCreationError"
    }
}

class DoctorUpdateError extends Error {
    constructor(){
        super("Failed to update doctor")
        this.name = "DoctorUpdateError"
    }
}

class DoctorDeleteError extends Error {
    constructor(){
        super("Failed to delete doctor")
        this.name = "DoctorDeleteError"
    }
}

class RecordNotFoundError extends Error {
    constructor(){
        super("Record has not found yet")
        this.name = "RecordNotFound"
    }
}


class GetAllError extends Error {
    constructor(message: string, componentName?: string){
        super(message)
        this.name = `${componentName}GetAllError`
    }
}

class AppointmentUpdateError extends Error {
    constructor(){
        super("Failed to update appointment")
        this.name = "AppointmentUpdateError"
    }
}

class AppointmentDeleteError extends Error {
    constructor(){
        super("Failed to delete Appointment")
        this.name = "AppointmentDeleteError"
    }
}

class PatientUpdateError extends Error {
    constructor(){
        super("Failed to update Patient")
        this.name = "PatientUpdateError"
    }
}

class PatientDeleteError extends Error {
    constructor(){
        super("Failed to update Patient")
        this.name = ("PatientDeleteError")
    }
}

export {
    DoctorGetAllError,
    DoctorCreationError,
    RecordNotFoundError,
    DoctorUpdateError,
    DoctorDeleteError,
    PatientGetAllError,
    GetAllError,
    AppointmentUpdateError,
    AppointmentDeleteError,
    PatientUpdateError,
    PatientDeleteError
}


///////////Errores genericos/////////////

class creationErrors extends Error{
    constructor(message: string, componentName: string){
        super(message)
        this.name = `${componentName}CreationError`
    }
}

class updateError extends Error {
    constructor(message: string, componentName: string){
        super(message)
        this.name = `${componentName}UpdateError`
    }
}

class recordNotFoundError extends Error {
    constructor(){
        super("Record has not found yet")
        this.name = "RecordNotFound"
    }
}

class DeleteError extends Error{
    constructor(message: string, componentName: string){
        super(message)
        this.name = `${componentName}DeleteError`
    }
}

class getAllError extends Error {
    constructor(message: string, componentName: string){
        super(message)
        this.name = `${componentName}GetAllError`
    }
}

export {
    creationErrors,
    updateError,
    recordNotFoundError,
    DeleteError,
    getAllError
}