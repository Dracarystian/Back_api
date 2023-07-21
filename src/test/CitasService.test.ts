import { Appointment, AppointmentReq } from "../api/components/citas/model";
import { AppointmentServiceImpl } from "../api/components/citas/service";  
import { AppointmentRepository } from "../api/components/citas/repository";
import { DoctorRepository } from "../api/components/doctores/repository";



describe('CitasService', () => {
    let appointmentService: AppointmentServiceImpl
    let appointmentRepository: AppointmentRepository
    let doctorRepository: DoctorRepository

    beforeEach(() => {
        appointmentRepository = {
            getAllAppointment: jest.fn(),
            createAppointment: jest.fn(),
            getAppointmentById: jest.fn(),
            updateAppointment: jest.fn(),
            deleteAppointment: jest.fn(),     
        }

        appointmentService = new AppointmentServiceImpl(appointmentRepository, doctorRepository)
    })

    describe('getAllAppointments', () =>{
        it('should get all appointments from serveice',async () => {
            
            const appoinments: Appointment[] =[
                {identificacion_paciente: "Sebastian Velasquez", especialidad:"Medicina General", doctor:"Carlos Caceres", consultorio: 101, horario:"?"},
            ];

            (appointmentRepository.getAllAppointment as jest.Mock).mockResolvedValue(appoinments)

            const result = await appointmentService.getAllAppointments()

            expect(appointmentRepository.getAllAppointment).toHaveBeenCalled()
            expect(result).toEqual(appoinments)
        })
        it('should return an empty array when no doctors are found',async () => {
            
            (appointmentRepository.getAllAppointment as jest.Mock).mockResolvedValue([])

            const result = await appointmentService.getAllAppointments()

            expect(appointmentRepository.getAllAppointment).toHaveBeenCalled()
            expect(result).toEqual([])
        })

    })

    describe ('createAppointment', () => {
        it('should create a new doctor and return it from service',async () => {
            
            const appointmentRes: Appointment = {identificacion_paciente: "Sebastian Velasquez", especialidad:"Medicina General", doctor:"Carlos Caceres", consultorio: 101, horario:"?"}
            const AppointmentReq: AppointmentReq = {identificacion_paciente: "Sebastian Velasquez", especialidad: "Medicina General", id_doctor: 1, horario: "?"};

            (appointmentRepository.createAppointment as jest.Mock).mockResolvedValue(appointmentRes)

            const result = await appointmentService.createAppointment(AppointmentReq)

            expect(appointmentRepository.createAppointment).toHaveBeenCalledWith(AppointmentReq)
            expect(result).toEqual(appointmentRes)
        })
        it('should throw and error if appointment creation fails',async () => {
            
            const appointmentReq: AppointmentReq = {identificacion_paciente: "Sebastian Velasquez", especialidad: "Medicina General", id_doctor: 1, horario: "?"};
            const error1 = new Error('Failed to create appointment');
            (appointmentRepository.createAppointment as jest.Mock).mockRejectedValue(error1)

            await expect(appointmentService.createAppointment(appointmentReq)).rejects.toThrowError(error1)
            expect(appointmentRepository.createAppointment).toHaveBeenLastCalledWith(appointmentReq)
        })
    })

    describe('getAppointmentById', () => {
        it('should get appointment by id from service',async () => {
            
            const appointment: Appointment = {identificacion_paciente: "Sebastian Velasquez", especialidad:"Medicina General", doctor:"Carlos Caceres", consultorio: 101, horario:"?"}
            const appointmentId = 1;
            
            (appointmentRepository.getAppointmentById as jest.Mock).mockResolvedValue(appointment)

            const result = await appointmentService.getAppointmentById(appointmentId)

            expect(appointmentRepository.getAppointmentById).toHaveBeenCalledWith(appointmentId)
            expect(result).toEqual(appointment)
        })
        it('should return an empty array when no appointments are found',async () => {
            
            const appointmentId = 1;
            (appointmentRepository.getAppointmentById as jest.Mock).mockResolvedValue(null)

            const result = await appointmentService.getAppointmentById(appointmentId)

            expect(appointmentRepository.getAppointmentById).toHaveBeenCalledWith(appointmentId)
            expect(result).toBeNull()
        })
        it('should throw an error if retrieval fails',async () => {
            
            const appointmentId = 1;
            const error = new Error('Database error');
            (appointmentRepository.getAppointmentById as jest.Mock).mockRejectedValue(error)

            await expect(appointmentService.getAppointmentById(appointmentId)).rejects.toThrowError(error)
            expect(appointmentRepository.getAppointmentById).toHaveBeenCalledWith(appointmentId)
        })

    })
})