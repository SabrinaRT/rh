import { Component, OnInit } from '@angular/core';
import { DadosPessoais, DadosProfissionais } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';

@Component({
  selector: 'app-tabela-colaboradores',
  templateUrl: './tabela-colaboradores.component.html',
  styleUrls: ['./tabela-colaboradores.component.css']
})
export class TabelaColaboradoresComponent implements OnInit {

  constructor(private siscrhService: SiscrhService) { }
  DadosAtualizados:DadosPessoais[];
  DadosProfissionais:DadosProfissionais[];
  ngOnInit(): void {
    this.siscrhService.getColaboradorList().subscribe((data:any)=>
    {
      this.DadosAtualizados =data
      console.log(data)
    }
    //  JUNTAR OS DOIS DADOS EM UM ARRAY
   
    
    )
    this.siscrhService.getColaboradorList().subscribe((data:any)=>{
      this.DadosProfissionais = data
    } 
    ) 
  }

}
