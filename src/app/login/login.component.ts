import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = '';
  password = '';
  returnUrl: string;
  error = '';

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      () => {
        this.router.navigateByUrl(this.returnUrl);
      },
      error => {
        this.error = error.error.message;
      }
    );
  }
}
