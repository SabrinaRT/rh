import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SiscrhService } from 'src/app/siscrh.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private siscrhService:SiscrhService, private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  usuario:any
  senha:any

  verificarUsuario(){
    const md5 = new Md5();
    this.siscrhService.verificarUser(this.usuario,md5.appendStr(this.senha).end()).subscribe((data:any)=>{
      if(data == null){
        console.log("bloqueado")
        this.toastr.error('Usuário ou Senha incorretos!', 'Erro!');
        
      }else{
        this.router.navigate([data.id,"home"])
      }
    })
  }

 

}
