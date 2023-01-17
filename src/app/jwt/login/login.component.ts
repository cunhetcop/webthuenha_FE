import {Component, OnInit} from '@angular/core';
import {first} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import { AuthenticationService } from 'src/app/service/authentication.service.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {HttpClient} from "@angular/common/http";
import {Register} from "../../model/register";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

// export class LoginComponent {
//   user:any;
//   loggedIn:any;
//
//   constructor(private authService: SocialAuthService) { }
//
//   ngOnInit() {
//     this.authService.authState.subscribe((user) => {
//       this.user = user;
//       this.loggedIn = (user != null);
//       console.log(this.user)
//     });
//   }
//
//
// }


export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username : new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
  });
  // returnUrl?: string;
  // adminUrl?: string;
  error = '';
  loading = false;
  submitted = false;
  register!: Register
  loggedIn:any;
  user!: any;
  social!:SocialUser;


  constructor(private activatedRoute: ActivatedRoute,
              private authService: SocialAuthService,
              private router: Router,
              private authenticationService: AuthenticationService,

              private formBuilder: FormBuilder, private http : HttpClient,
  )
  {
    console.log(this.authenticationService.currentUserValue);
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.social = user;
      this.loggedIn = (user != null);
      console.log(this.social)

      this.http.post<any>("http://localhost:8080/register1", this.social)
        .subscribe(res => {
          localStorage.setItem('ACCESS_TOKEN', res.accessToken);
          localStorage.setItem('ROLE', res.roles[0].authority);
          localStorage.setItem('USERNAME', res.username);
          localStorage.setItem('ID', res.id);
          if (res.roles[0].authority == "ROLE_ADMIN") {
            this.router.navigate(['/home'])
          } else

          if (res.roles[0].authority == "ROLE_USER") {

            this.router.navigate(['/home']);
          }
          Swal.fire(
            ' ',
            '<h2 style="color: green; font-size: 32px">Đăng nhập tài khoản Google thành công!!!</h2>',
            'success'

          )
          this.router.navigate(['/home']);
        }, err => {
          Swal.fire(
            ' ','<h2 style="color: red; font-size: 32px">Tài khoản đã tồn tại. Vui lòng đăng ký lại</h2>',
            'error'
          )
          console.log(err);
        })

    })

  }


  login() {
    this.submitted = true;
    this.loading = true;
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
          Swal.fire(
            ' ',
            '<h2 style="color: green; font-size: 32px">Đăng nhập thành công!!!</h2>',
            'success'
          )
          localStorage.setItem('ACCESS_TOKEN', data.accessToken);
          localStorage.setItem('ROLE', data.roles[0].authority);
          localStorage.setItem('USERNAME', data.username);
          localStorage.setItem('ID', data.id);
          if (data.roles[0].authority == "ROLE_ADMIN") {
            this.router.navigate(['/home'])
          } else

          if (data.roles[0].authority == "ROLE_USER") {

            this.router.navigate(['/home']);
          }
        },
        error => {
          Swal.fire(
            ' ',
            '<h2 style="color: red; font-size: 32px">Tài khoản của bạn đã bị khoá hoặc sai mật khẩu!</h2>',
            'error'
          )
          this.loading = false;
        });
  }

  logout() {
    this.authenticationService.logout()
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("ROLE");
    localStorage.removeItem("USERNAME");
    localStorage.removeItem("ID'");
  }

  signUp(){

    // @ts-ignore
    this.user = localStorage.getItem("user")
    console.log(this.user);
    this.register.email = this.user;
    // this.register.userName=this.user.name;
    // this.register.phone="";
    // this.register.password="0101010101";
    // this.register.confirmPassword="0101010101";
    console.log(this.register.email);
    // this.http.post<Register>("http://localhost:8080/register",this.signupForm.value)
    //   .subscribe(res=>{
    //     Swal.fire(
    //       ' ',
    //       '<h2 style="color: green; font-size: 32px">Đăng ký tài khoản thành công!!!</h2>',
    //       'success'
    //     )
    //     this.signupForm.reset();
    //     this.router.navigate(['']);
    //   },err=>{
    //     Swal.fire(
    //       ' ',
    //       '<h2 style="color: red; font-size: 32px">Tài khoản đã tồn tại. Vui lòng đăng ký lại</h2>',
    //       'error'
    //     )
    //     console.log(err);
    //   })

  }
}
