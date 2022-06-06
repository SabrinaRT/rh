import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfiguracaoSistema } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';

@Component({
  selector: 'app-configuracao-sistema',
  templateUrl: './configuracao-sistema.component.html',
  styleUrls: ['./configuracao-sistema.component.css'],
})
export class ConfiguracaoSistemaComponent implements OnInit {
  configuracao: ConfiguracaoSistema = new ConfiguracaoSistema();
  configuracao2: ConfiguracaoSistema = new ConfiguracaoSistema();
  constructor(
    private toastr: ToastrService,
    private siscrhService: SiscrhService
  ) {
    this.siscrhService.getConfiguracaoSistema().subscribe((data: any) => {
      console.log(data);
      this.configuracao = data;
      this.configuracao2 = data;
      

     
    });
  }


  salvarConfiguracao() {
    this.siscrhService.salvarConfiguracaoSistema(this.configuracao).subscribe(
      (data: any) => {
        console.log(data);
        this.toastr.success('Dados foram atualizados com sucesso!', 'Atenção!');
      },
      (error) => {
        console.log('error', error);
        this.toastr.error('Houve algum erro!', 'Erro!');
      }
    );
  }
  downloadLogo() {
    this.siscrhService.downloadLogo();
  }
  deletarLogo() {
    this.siscrhService.deleteLogo().subscribe((data:any)=>
    this.configuracao = data
    );
    
    
  }
  uploadLogo() {
    this.configuracao2.logo_instituicao = this.configuracao.logo_instituicao;
    this.siscrhService.salvarConfiguracaoSistema(this.configuracao2).subscribe(
      (data: any) => {
        console.log(data);
        this.toastr.success('Dados foram atualizados com sucesso!', 'Atenção!');
      },
      (error) => {
        console.log('error', error);
        this.toastr.error('Houve algum erro!', 'Erro!');
      }
    );
  }

  upload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.configuracao.logo_instituicao = event.target.files[0].name;
      var nome_upload = event.target.files[0].name;
      const foto = event.target.files[0];
      const formData = new FormData();
      formData.append('foto', foto, nome_upload);

      this.siscrhService.uploadLogo(formData).subscribe(
        (data: any) => {
          console.log(data);
          this.uploadLogo();
          
        },
        (error) => {
          console.log('error', error);
        }
      );
    }
  }

  ngOnInit(): void {
    
  }
  //url; //Angular 8
	url: any; //Angular 11, for stricter type
	msg = "";
	
	selectFile(event: any) {
    var MyBlob = new Blob(['test text'], {type : "image/jpeg"},);
    console.log(MyBlob instanceof Blob) // true

   
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		reader.onload = (_event) => {
			this.url = reader.result;
      console.log(this.url) 
		}
	}
 

}
