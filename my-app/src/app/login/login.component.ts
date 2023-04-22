import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private http: HttpClient) { }

  onSubmit() {
    const data = { email: this.email, password: this.password };

    this.http.post('http://localhost:4000/api/login', data)
      .subscribe(response => {
        console.log(response);
        // TODO: handle success
      }, error => {
        console.log(error);
        // TODO: handle error
      });
  }
}
