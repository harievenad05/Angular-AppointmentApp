import { Component, OnInit } from '@angular/core';
import { Appointment } from '../common/appointment';
import { AppointmentsService } from '../common/appointments.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {
  public loading: boolean = true;
  public errorMsg: string;
  public successMsg: string;
  public appointments: Appointment[];
  public columns = ['appointmentDate', 'name', 'email', 'cancel'];

  constructor(private appointmentService: AppointmentsService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(){
    this.appointmentService.getAllAppointments().subscribe((res: Appointment[]) => {
      this.appointments = res;
      this.loading = false;
      console.log(this.appointments);
    }, (err: ErrorEvent) => {
      this.errorMsg = err.error.message;
      this.loading = false;
    });
  };

  cancelAppointment(id: string){
    this.appointmentService.deleteAppointment(id).pipe(
      mergeMap(() => this.appointmentService.getAllAppointments())
    ).subscribe((res: Appointment[]) => {
      this.appointments = res;
      this.successMsg = 'Successfully deleted appointment'
    }, (err: ErrorEvent) => {
      this.errorMsg = err.error.message;
    })
  }

}
