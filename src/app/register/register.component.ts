import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username = ""
  email = ""
  password = ""
  cfpassword = ""
  firstname = ""
  lastname = ""

  constructor() {
  }

  ngOnInit() {

  }
  validateEmail() {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(this.email)) {
      document.getElementById('pTagEmail').style.display = "none"
      document.getElementById('inputemail').classList.remove("is-danger");
      return true
    } else {
      document.getElementById('pTagEmail').style.display = "block"
      document.getElementById('inputemail').classList.add("is-danger");
      return false
    }
  }
  checkPassword() {
    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    if (this.password != this.cfpassword) {
      document.getElementById('pTagPassword').style.display = "block";
      document.getElementById('inputpassword').classList.add("is-danger");
      document.getElementById('inputcfpassword').classList.add("is-danger");
      document.getElementById('pTagCFPassword').style.display = "block";
      return false
    } else {
      if (mediumRegex.test(this.password)) {
        document.getElementById('inputpassword').classList.remove("is-warning")
        document.getElementById('inputcfpassword').classList.remove("is-warning")
        document.getElementById('inputpassword').classList.add("is-success")
        document.getElementById('inputcfpassword').classList.add("is-success")
      } else {
        document.getElementById('inputpassword').classList.add("is-warning")
        document.getElementById('inputcfpassword').classList.add("is-warning")
      }
      document.getElementById('pTagPassword').style.display = "none";
      document.getElementById('pTagCFPassword').style.display = "none";
      document.getElementById('inputpassword').classList.remove("is-danger");
      document.getElementById('inputcfpassword').classList.remove("is-danger");
      return true
    }
  }
  checkEmptyfield() {
    if (this.username !== "" && this.password !== "" && this.email !== "" && this.firstname !== "" && this.lastname !== "") {
      document.getElementById('inputpassword').classList.remove("is-danger");
      document.getElementById('inputcfpassword').classList.remove("is-danger");
      document.getElementById('inputemail').classList.remove("is-danger");
      document.getElementById('inputusername').classList.remove("is-danger");
      document.getElementById('inputfirstname').classList.remove("is-danger");
      document.getElementById('inputlastname').classList.remove("is-danger");
      return true
    } else {
      document.getElementById('inputpassword').classList.add("is-danger");
      document.getElementById('inputcfpassword').classList.add("is-danger");
      document.getElementById('inputemail').classList.add("is-danger");
      document.getElementById('inputusername').classList.add("is-danger");
      document.getElementById('inputfirstname').classList.add("is-danger");
      document.getElementById('inputlastname').classList.add("is-danger");
      alert("please input information all field")
      return false
    }
  }
  onSubmit() {
    var data = {
      username: this.username,
      email: this.email,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname
    }
    if (this.checkEmptyfield()) {
      if (this.checkPassword()) {
        if (this.validateEmail()) {
          document.getElementById('pJson').style.display = "block";
          console.log(data)
          // axios.post("http://localhost:4001/register", data).then((res) => {
          //   if (res.data.status) {
          //     document.getElementById('inputusername').classList.remove('is-danger')
          //     document.getElementById('pTagUsername').style.display="none";
          //     alert("Success")
          //     console.log(res.data.status)
          //   } else {
          //     document.getElementById('inputusername').classList.add('is-danger')
          //     document.getElementById('pTagUsername').style.display="block";
          //   }
          // })
        } else {
          this.validateEmail()
        }
      } else {
        this.checkPassword()
      }
    } else {
      this.checkEmptyfield()
    }
  }

}
