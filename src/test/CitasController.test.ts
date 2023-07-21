import { Request, Response } from "express"
import {Appointment, AppointmentReq} from "../api/components/citas/model"
import { AppointmentService } from "../api/components/citas/service"
import { AppointmentServiceImpl } from "../api/components/citas/service"
import { AppointmentController, AppointmentControllerImpl } from "../api/components/citas/controller"




const mockReq = {} as Request
const mockRes = {} as Response

describe ('CitasController', ()=> {
    let appoimentService : AppointmentService
    let appointmentController : AppointmentController

    beforeEach (() => {
        appoimentService = {
            getAllAppointments: jest.fn(),
            createAppointment: jest.fn (),
            getAppointmentById: jest.fn (),
            updateAppointment: jest.fn (),
            deleteAppointment: jest.fn()
        }

        appointmentController = new AppointmentControllerImpl(appoimentService)
        mockRes.status = jest.fn().mockReturnThis()
        mockRes.json = jest.fn().mockReturnThis()
    })

    describe('getAllAppointments', () => {
        it('should get all Appointments',async () => {
            const appointments: Appointment[] = [
                {identificacion_paciente: 'David Castiblanco', especialidad: 'General', doctor: 'Carlos Caceres', consultorio: 101, horario:'diurno'},
                {identificacion_paciente: 'Sebastian Velasquez', especialidad: 'General', doctor: 'Andres Ramires', consultorio: 102, horario:'nocturno'}
            ];

            (appoimentService.getAllAppointments as jest.Mock).mockResolvedValue(appointments)
            
            await appointmentController.getAllAppointment(mockReq, mockRes)

            expect(appoimentService.getAllAppointments).toHaveBeenCalled()
            expect(mockRes.json).toHaveBeenCalledWith(appointments)
            expect(mockRes.status).toHaveBeenCalledWith(200)
        })

        it('should be handler error and return 400 status',async () => {
            const error = new Error('Internal server Error');
            (appoimentService.getAllAppointments as jest.Mock).mockRejectedValue(error)

            await appointmentController.getAllAppointment(mockReq, mockRes)

            expect(appoimentService.getAllAppointments).toHaveBeenCalled()
            expect(mockRes.json).toHaveBeenCalledWith({ message: "Error getting all appoinments"})
            expect(mockRes.status).toHaveBeenCalledWith(400)

        })
    })

    describe('createAppointment', () => {
        it('should create a new appointment and return info',async () => {
            const appointmentRes: Appointment = {identificacion_paciente: 'David Castiblanco', especialidad: 'General', doctor: 'Carlos Caceres', consultorio: 101, horario:'diurno'}
            const appointmentReq: AppointmentReq = {
                identificacion_paciente: 'Paciente1',
                especialidad: 'Medicina General',
                id_doctor: 1,
                horario: '?'

            };
            (mockReq.body as AppointmentReq) = appointmentReq;
            (appoimentService.createAppointment as jest.Mock).mockResolvedValue(appointmentRes)

            await appointmentController.createAppointment(mockReq, mockRes)

            expect(appoimentService.createAppointment).toHaveBeenLastCalledWith(appointmentReq)
            expect(mockRes.json).toHaveBeenCalledWith(appointmentRes)
            expect(mockRes.status).toHaveBeenCalledWith(201)
        })

        it ('should be handler error and return 400 status',async () => {
            const error = new Error('Internal Server Error');
            (mockReq.body) = {};
            (appoimentService.createAppointment as jest.Mock).mockRejectedValue(error)

            await appointmentController.createAppointment(mockReq, mockRes)

            expect(appoimentService.createAppointment).toHaveBeenCalledWith({})
            expect(mockRes.json).toHaveBeenCalledWith({ message: "Internal Server Error"})
            expect(mockRes.status).toHaveBeenCalledWith(400)
        })
    })

    describe('getAppointmentById',async () => {
        it ('should get Appointment by Id',async () => {
            
            const appointmentRes : Appointment = { identificacion_paciente: "Sebastian Velasquez", especialidad: "Medicina General", doctor:"Carlos Caceres", consultorio: 101, horario: "?"};
            (mockReq.params) = {id: "1" };
            (appoimentService.getAppointmentById as jest.Mock).mockResolvedValue(appointmentRes)

            await appointmentController.getAppointmentById(mockReq, mockRes)

            expect(appoimentService.getAppointmentById).toHaveBeenLastCalledWith(1)
            expect(mockRes.json).toHaveBeenLastCalledWith(appointmentRes)
            expect(mockRes.status).toHaveBeenCalledWith(200)
        })
        
        it('should return 400 if appointment not found',async () => {
            (mockReq.params) = { id : "1" };
            (appoimentService.getAppointmentById as jest.Mock).mockRejectedValue(null)

            await appointmentController.getAppointmentById(mockReq, mockRes)

            expect(appoimentService.getAppointmentById).toHaveBeenCalledWith(1)
            expect(mockRes.json).toHaveBeenCalledWith({ error: "Failed to retrieve appointment"})
            expect(mockRes.status).toHaveBeenCalledWith(400)
        })
    })
    

})
