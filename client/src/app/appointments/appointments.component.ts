import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppointmentsService } from '../common/appointments.service';
import { Appointment } from '../common/appointment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  public successMsg: string;
  public errorMsg: string;
  newAppointment: Appointment = {
    _id : '',
    appointmentDate: '',
    name: '',
    email: ''
  }


  constructor(private appointmentService: AppointmentsService) { }
  ngOnInit(): void {

  }

  resetForm(form?: NgForm){
    if (form = null)
      form.resetForm();
    this.newAppointment.appointmentDate = '';
    this.newAppointment.name = '';
    this.newAppointment.email = '';

  }


  createAppointment(){
    delete this.newAppointment._id;
    this.successMsg = '';
    this.errorMsg = '';
    console.log(this.newAppointment);

    this.appointmentService.createAppointment(this.newAppointment).subscribe((res: Appointment) => {
      this.resetForm();
      const appointmentDate = new Date(res.appointmentDate).toDateString();
      this.successMsg = `Appointment created successfully for ${appointmentDate}`
    }, (err: ErrorEvent) => {
      this.errorMsg = err.error.message;
    })
  }

}
