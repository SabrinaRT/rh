import { Component, OnInit } from '@angular/core';
import { Documentos, Setores, Vinculos } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';

@Component({
  selector: 'app-arquivos-config',
  templateUrl: './arquivos-config.component.html',
  styleUrls: ['./arquivos-config.component.css']
})
export class ArquivosConfigComponent implements OnInit {


  Documentos: Documentos[]
 
 
  constructor(private siscrhService:SiscrhService) { }

  ngOnInit(): void {
    this.siscrhService.getDocumentosList().subscribe((data)=>{
      this.Documentos =data;
    })
   
   
  }

}
