import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  private BASE_URL = environment.API_URL

  constructor(private http: HttpClient) { }

  getAllAppointments(): Observable<Appointment[]>{
    return this.http.get<Appointment[]>(`${this.BASE_URL}appointments`, {responseType: 'json'})
  }

  createAppointment(newAppointment: Appointment): Observable<Appointment>{
    return this.http.post<Appointment>(`${this.BASE_URL}appointments`, newAppointment, {responseType: 'json'})
  }

  deleteAppointment(id: string):Observable<any>{
    return this.http.delete(`${this.BASE_URL}appointments/${id}`, {responseType: 'json'})
  }

}
