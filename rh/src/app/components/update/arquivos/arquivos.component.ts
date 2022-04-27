import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DadosPessoais, Documentos, DocumentosColaboradores } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';

@Component({
  selector: 'app-arquivos',
  templateUrl: './arquivos.component.html',
  styleUrls: ['./arquivos.component.css'],
})
export class ArquivosComponent implements OnInit {
  panelOpenState = true;
  constructor(private siscrhService: SiscrhService, private route:ActivatedRoute) {
    this.IDColab = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
  
    this.siscrhService.getDocumentosList().subscribe((data: any) => {
      this.TiposDocumentos = data;
      console.log(data)
    });
    this.resgatarDocumentos();
  }

  TiposDocumentos: Documentos[];
  
  dadosPessoais: DadosPessoais = new DadosPessoais();
  documentos:DocumentosColaboradores = new DocumentosColaboradores();
  IDColab: any;
  teste: any = [];
  teste2: any = [];

  upload(tipo_id:any, id:any){
    this.documentos.id = id
    this.documentos.tipo = tipo_id;
    this.documentos.status = true;
    this.documentos.dadosPessoais = { id: this.IDColab };
    this.siscrhService
      .createDocumentosColaborador(this.documentos)
      .subscribe((data: any) => {
        console.log(data);
        this.resgatarDocumentos()
      });
}

  resgatarDocumentos() {
    this.teste = [];
    this.teste2 = [];
    this.siscrhService
      .getColaboradorById(this.IDColab)
      .subscribe((data: any) => {
        this.dadosPessoais = data;
        this.dadosPessoais.documentosColaboradores.sort((a, b) => a.id - b.id);
        for (let i in this.dadosPessoais.documentosColaboradores) {
         
          if (this.dadosPessoais.documentosColaboradores[i].tipo != 1) {
            this.teste.push({
              id: this.dadosPessoais.documentosColaboradores[i].id,
              status: this.dadosPessoais.documentosColaboradores[i].status,
              nome_documento_upload:
                this.dadosPessoais.documentosColaboradores[i]
                  .nome_documento_upload,
              tipo: this.TiposDocumentos.find((b) => b.id == this.dadosPessoais.documentosColaboradores[i].tipo)?.tipo,
              tipo_id: this.dadosPessoais.documentosColaboradores[i].tipo,
            });
           
          } else {
            this.teste2.push({
              id: this.dadosPessoais.documentosColaboradores[i].id,
              nome: this.dadosPessoais.documentosColaboradores[i].nome,
              status: this.dadosPessoais.documentosColaboradores[i].status,
              nome_documento_upload:
                this.dadosPessoais.documentosColaboradores[i]
                  .nome_documento_upload,
              tipo: this.dadosPessoais.documentosColaboradores[i].nome,
              tipo_id: this.dadosPessoais.documentosColaboradores[i].tipo,
            });
          }
        }

        console.log(this.teste2);
      });
  }
}
