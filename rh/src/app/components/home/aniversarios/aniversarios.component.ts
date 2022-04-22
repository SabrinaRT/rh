import { Component, OnInit } from '@angular/core';
import { DadosPessoais, DadosProfissionais } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';

@Component({
  selector: 'app-aniversarios',
  templateUrl: './aniversarios.component.html',
  styleUrls: ['./aniversarios.component.css']
})
export class AniversariosComponent implements OnInit {

  dadosPessoais: DadosPessoais[];
  dadosProfissionais: DadosProfissionais[];
  constructor(private siscrhService:SiscrhService) { }

  array:any=[]

  ngOnInit(): void {

    this.siscrhService.getColaboradorList().subscribe((data:any)=>{
      
      this.dadosPessoais = data

     

    })
    this.siscrhService.getDadosProfissionaisList().subscribe((data:any)=>{
      
      this.dadosProfissionais = data

      for(let i in data){

        if(data[i].setores != null){
          this.array.push({nome:data[i].dadosPessoais.nome_completo, data: data[i].dadosPessoais.data_nascimento, setor:data[i].setores.setor})
        }else{
          this.array.push({nome:data[i].dadosPessoais.nome_completo, data: data[i].dadosPessoais.data_nascimento, setor:""})
        }
        console.log(data[i])
       
      }
      

    })



  }

}
