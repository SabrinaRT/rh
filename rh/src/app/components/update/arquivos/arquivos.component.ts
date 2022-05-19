import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DadosPessoais, Documentos, DocumentosColaboradores } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';
import { FichaComponent } from '../../cadastro/ficha/ficha.component';

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
    });
    this.siscrhService.getDocumentosList().subscribe(
      (data: any) => {
        this.TiposDocumentos = data;

        for (let i in this.TiposDocumentos) {
          if (this.TiposDocumentos[i].id != 1) {
            this.ArrayDocumentos.push({
              id: null,
              nome_arquivo: null,
              id_documento: this.TiposDocumentos[i].id,
              tipo: this.TiposDocumentos[i].tipo,
            });
          }
        }
        console.log(data);
      },
      (error) => {
        console.log('error', error);
      }
    );
    this.atualizar()
  }

  ArrayDocumentos: any = [];
  ArrayDocumentosOpcionais: any = [];
  DocumentosColaboradores: DocumentosColaboradores[];
  atualizar() {
    this.siscrhService
      .getDocumentosColaboradorByForeignKey(this.IDColab)
      .subscribe((data: any) => {
        console.log(data);

        this.DocumentosColaboradores = data;

        this.ArrayDocumentosOpcionais = [];
        for (let i2 in this.DocumentosColaboradores) {
          if (this.DocumentosColaboradores[i2].tipo == 1) {
            this.ArrayDocumentosOpcionais.push({
              id: this.DocumentosColaboradores[i2].id,
              nome_arquivo:
                this.DocumentosColaboradores[i2].nome_documento_upload,
              id_documento: this.DocumentosColaboradores[i2].tipo,
            });
          }
        }

        for (let i in this.ArrayDocumentos) {
          this.ArrayDocumentos[i].id = null;
          this.ArrayDocumentos[i].nome_arquivo = null;

          for (let i2 in this.DocumentosColaboradores) {
            if (
              this.ArrayDocumentos[i].id_documento ==
              this.DocumentosColaboradores[i2].tipo
            ) {
              this.ArrayDocumentos[i].id = this.DocumentosColaboradores[i2].id;
              this.ArrayDocumentos[i].nome_arquivo =
                this.DocumentosColaboradores[i2].nome_documento_upload;
            }
          }
        }

      });
  }

  documentosColaboradores: DocumentosColaboradores =
    new DocumentosColaboradores();

  upload(event: any, tipo: any) {
    
    if (event.target.files && event.target.files[0]) {
      var nome_upload =
        Math.floor(Math.random() * 1000 + 1) +
        ' - ' +
        event.target.files[0].name;
      const foto = event.target.files[0];
      const formData = new FormData();
      formData.append('foto', foto, nome_upload);
      this.documentosColaboradores.nome_documento_upload = nome_upload;
      this.documentosColaboradores.tipo = tipo;

      this.documentosColaboradores.dadosPessoais = { id: this.IDColab };
      this.siscrhService.createArquivo(formData, this.IDColab).subscribe(
        (data: any) => {
          console.log(data);
          this.siscrhService
            .createDocumentosColaborador(this.documentosColaboradores)
            .subscribe(
              (data: any) => {
                this.atualizar();
              },
              (error) => {
                console.log('error', error);
                ;
              }
            );
        },
        (error) => {
          console.log('error', error);
          ;
        }
      );
    }
  }
  ExcluirDocumento = false;
  ExcluirDocumentoOpcionais = false;
  downloadArquivo(nome: any) {
    this.siscrhService.downloadArquivo(this.IDColab, nome);
  }

  deleteDocu(id: any, nome: any) {
    this.siscrhService.deleteDocumentoColaborador(id);
    this.siscrhService.deleteArquivo(this.IDColab, nome);
    this.atualizar();
    this.atualizar();
  }

  TiposDocumentos: Documentos[];
  
  dadosPessoais: DadosPessoais = new DadosPessoais();
  documentos:DocumentosColaboradores = new DocumentosColaboradores();
  IDColab: any;

  
}
