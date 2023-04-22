import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName!: string;
  lastName!: string;
  email!: string;
  phone!: string;
  gender!: string;
  password1!: string;
  password2!: string;

  constructor(private http: HttpClient) {}

  onSubmit() {
    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      gender: this.gender,
      password1: this.password1,
      password2: this.password2
    };

    this.http.post('http://localhost:4000/api/register', data)
     
    .subscribe(response => {
      console.log(response);
      // TODO: handle success
    }, error => {
      console.log(error);
      // TODO: handle error
    });
  }
}
