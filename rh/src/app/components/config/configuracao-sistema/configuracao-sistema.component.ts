import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfiguracaoSistema, Logo } from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';

@Component({
  selector: 'app-configuracao-sistema',
  templateUrl: './configuracao-sistema.component.html',
  styleUrls: ['./configuracao-sistema.component.css'],
})
export class ConfiguracaoSistemaComponent implements OnInit {
  configuracao: ConfiguracaoSistema = new ConfiguracaoSistema();
  configuracao2: ConfiguracaoSistema = new ConfiguracaoSistema();
  logo: Logo = new Logo();
  constructor(
    private toastr: ToastrService,
    private siscrhService: SiscrhService
  ) {
    this.siscrhService.getConfiguracaoSistema().subscribe((data: any) => {
      console.log(data);
      this.configuracao = data;
      this.configuracao2 = data;
    });
    this.siscrhService.getLogo().subscribe((data: any) => {
      console.log(data);
      if (data.image != null) {
        this.UrlLogo = 'http://localhost:8080/api/get/image';
        this.LogoShow = false;
      } else {
        this.UrlLogo = 'assets/sem foto.png';
        this.LogoShow = true;
      }
    });
    /*     */
  }
  LogoShow = false;
  UrlLogo = 'assets/sem foto.png';
  DisplayLogo: any;

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

  ngOnInit(): void {}

  delete() {
    this.siscrhService.deleteLogo().subscribe((data: any) => {
      console.log(data);
      this.UrlLogo = 'assets/sem foto.png';
      this.LogoShow = true;
    });
  }

  downloadFoto() {
    this.siscrhService.getLogoInfo().subscribe((data: any) => {
      console.log(data);
      var gh = 'data:image/png;base64,' + data.image;
      var a = document.createElement('a');
      a.href = gh;
      a.download = 'Logo.png';
      a.click();
    });
  }


  upload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append('image', image, event.target.files[0].name);
      this.logo.image = formData;

      this.siscrhService.uploadLogo(formData).subscribe(
        (data: any) => {
          this.UrlLogo = 'http://localhost:8080/api/get/image';
          this.LogoShow = false;
        },
        (error) => {
          console.log('error', error);
        }
      );
    }
  }
}
