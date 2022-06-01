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
  constructor(  private toastr: ToastrService,private siscrhService: SiscrhService) {
    this.siscrhService.getConfiguracaoSistema().subscribe((data: any) => {
      console.log(data);
      this.configuracao = data;
      this.configuracao2 = data;
    });
  }

  salvarConfiguracao(){
    this.siscrhService.salvarConfiguracaoSistema(this.configuracao).subscribe((data:any)=>{
      console.log(data)
      this.toastr.success('Dados foram atualizados com sucesso!', 'Atenção!');
    },
    (error) => {
      console.log('error', error);
      this.toastr.error('Houve algum erro!', 'Erro!');
    })
  }
  downloadLogo(){

  }
  deletarLogo(){

    this.configuracao2.logo_instituicao = null
    this.siscrhService.salvarConfiguracaoSistema(this.configuracao2).subscribe((data:any)=>{
      console.log(data)
      this.toastr.success('Dados foram atualizados com sucesso!', 'Atenção!');
    },
    (error) => {
      console.log('error', error);
      this.toastr.error('Houve algum erro!', 'Erro!');
    })

  }
  uploadLogo(){
    this.configuracao2.logo_instituicao = this.configuracao.logo_instituicao
    this.siscrhService.salvarConfiguracaoSistema(this.configuracao2).subscribe((data:any)=>{
      console.log(data)
      this.toastr.success('Dados foram atualizados com sucesso!', 'Atenção!');
    },
    (error) => {
      console.log('error', error);
      this.toastr.error('Houve algum erro!', 'Erro!');
    })

  }

  ngOnInit(): void {}
}
