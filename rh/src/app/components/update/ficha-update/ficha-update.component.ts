import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DatePipe, formatDate } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatStepperIntl } from '@angular/material/stepper';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { cpf } from 'cpf-cnpj-validator';
import {
  DadosEstadoCivil,
  DadosPessoais,
  Dados,
  Dependentes,
  Setores,
  DadosProfissionais,
  DadosBancarios,
  Vinculos,
  Matriculas,
  Documentos,
  CEP,
} from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';

@Component({
  selector: 'app-ficha-update',
  templateUrl: './ficha-update.component.html',
  styleUrls: ['./ficha-update.component.css'],
})
export class FichaUpdateComponent implements OnInit {
  displayedColumns = ['Nome', 'CPF', 'DataNascimento'];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  firthFormGroup: FormGroup;

  dadosPessoais: DadosPessoais = new DadosPessoais();
  dadosProfissionais: DadosProfissionais = new DadosProfissionais();
  dadosEstadoCivil: DadosEstadoCivil = new DadosEstadoCivil();
  dependentes: Dependentes = new Dependentes();
  dadosBancarios: DadosBancarios = new DadosBancarios();
  matriculas:Matriculas = new Matriculas();
  setores: Setores[];
  vinculos: Vinculos[];

  Dependentes: Dependentes[];
  DadosPessoais: DadosPessoais[];
  DadosEstadoCivil: DadosEstadoCivil[];

  dados: Dados = new Dados();

  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  cpfmask = [/\d/, /\d/,/\d/ ,'.', /\d/, /\d/,/\d/ ,'.',/\d/, /\d/,/\d/ ,'-', /\d/, /\d/];
  telefonemask = ['(',/\d/, /\d/, ')', " ",  /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  celularmask =['(',/\d/, /\d/, ')', /\d/, " ",  /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    private _formBuilder: FormBuilder,
    private siscrhService: SiscrhService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.IDColab = this.route.snapshot.params['id'];
  }
  DadosAtualizados: any;
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nomeCompleto: ['', Validators.required],
      cpf: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

    this._formBuilder.group({
      secondCtrl: [''],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: [''],
    });

    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required],
    });
    this.firthFormGroup = this._formBuilder.group({
      firthCtrl: ['', Validators.required],
    });

    this.siscrhService.getSetoresList().subscribe((data: any) => {
      this.setores = data;
    },
    (error) => {
      console.log('error', error);
      this.toastr.error('Houve algum erro!', 'Erro!');
    });

    this.siscrhService.getVinculosList().subscribe((data: any) => {
      this.vinculos = data;
    },
    (error) => {
      console.log('error', error);
      this.toastr.error('Houve algum erro!', 'Erro!');
    });

    this.siscrhService
      .getColaboradorById(this.IDColab)
      .subscribe((data: any) => {
        if (data != null) {
          this.dadosPessoais = data;
          
        }
      },
      (error) => {
        console.log('error', error);
        this.toastr.error('Houve algum erro!', 'Erro!');
      });

    this.siscrhService
      .getDadosBancariosByForeignKey(this.IDColab)
      .subscribe((data: any) => {
        if (data != null) {
          this.dadosBancarios = data;
          this.IDBanco = data.id;
          
        }
      },
      (error) => {
        console.log('error', error);
        this.toastr.error('Houve algum erro!', 'Erro!');
      });

    this.siscrhService
      .getEstadoCivilByForeignKey(this.IDColab)
      .subscribe((data: any) => {
        if (data != null) {
          this.dadosEstadoCivil = data;
          this.IDEstado = data.id;

          
        }
      });

    this.siscrhService
      .getDadosProfissionaisByForeignKey(this.IDColab)
      .subscribe((data: any) => {
        
        if (data != null) {
          this.dadosProfissionais = data;
          this.IDProfi = data.id;

          if( this.dadosProfissionais.setores != null){
            this.setor = this.dadosProfissionais.setores.id;
          }
      
          if(this.dadosProfissionais.vinculos != null){
            this.vinculo = this.dadosProfissionais.vinculos.id;
          }
         /*  this.setor = this.dadosProfissionais.setores.id;
          this.vinculo = this.dadosProfissionais.vinculos.id; */
        }
      },
      (error) => {
        console.log('error', error);
        this.toastr.error('Houve algum erro!', 'Erro!');
      });

    this.pegarDados();
  }

  showSuccess() {
    this.toastr.success(
      'Dados foram atualizados com sucesso no sistema!',
      'Dados Atualizados'
    );
  }
  Usuario: any;
  Email: any;
  IDEstado: number;
  IDColab: number;
  IDProfi: number;
  IDBanco: number;

  gerarMensagemFinal() {
    let NomeEsplitado = this.dadosPessoais.nome_completo.split(' ');
    let UltimoNome = NomeEsplitado[NomeEsplitado.length - 1];
    let PrimeiroNome = NomeEsplitado[0];
    this.Usuario = PrimeiroNome + ' ' + UltimoNome;
    this.Email = PrimeiroNome + '.' + UltimoNome + '@pbprev.pb.gov.br';
    this.Usuario = this.Usuario.toLowerCase();
    this.Email = this.Email.toLowerCase();
  }

  salvarDadosPessoais() {
    this.dadosPessoais.id = this.IDColab;

    this.siscrhService
      .createColaborador(this.dadosPessoais)
      .subscribe((data: any) => {
        
        this.IDColab = data.id;
        this.showSuccess()
      },
      (error) => {
        console.log('error', error);
        this.toastr.error('Houve algum erro!', 'Erro!');
      });
  }

  salvarEstadoCivil() {
    this.dadosEstadoCivil.id = this.IDEstado;

    if ((this.dadosEstadoCivil.estado_civil = 'Solteiro(a)')) {
      this.dadosEstadoCivil.cpf_conjuge = null;
      this.dadosEstadoCivil.nome_completo_conjuge = null;
      this.dadosEstadoCivil.data_nascimento_conjuge = null;
      this.dadosEstadoCivil.identidade_conjuge = null;
      this.dadosEstadoCivil.profissao_atividade = null;
      this.dadosEstadoCivil.uf_identidade_conjuge = null;
    }

    this.dadosEstadoCivil.dadosPessoais = { id: this.IDColab };
    this.siscrhService
      .createEstadoCivil(this.dadosEstadoCivil)
      .subscribe((data: any) => {
        
        this.IDEstado = data.id;
        this.showSuccess()
      },
      (error) => {
        console.log('error', error);
        this.toastr.error('Houve algum erro!', 'Erro!');
      });
  }
  editarDependente(idDependente: any) {
    console.log(idDependente);
  }

  nomeDependente: any;
  dataDependente: any;
  cpfDependente: any;

  salvarDependente() {
    this.dependentes.dadosPessoais = { id: this.IDColab };

    this.siscrhService
      .createDependentes(this.dependentes)
      .subscribe((data: any) => {
        this.pegarDados();
        this.showSuccess()
      },
      (error) => {
        console.log('error', error);
        this.toastr.error('Houve algum erro!', 'Erro!');
      });
  }
  salvarMatricula() {
    this.matriculas.dadosPessoais = { id: this.IDColab };

    this.siscrhService.createMatricula(this.matriculas)
      .subscribe((data: any) => {
         this.pegarDados();
         this.showSuccess()
      },
      (error) => {
        console.log('error', error);
        this.toastr.error('Houve algum erro!', 'Erro!');
      });
  }

  pegarDados() {
    this.siscrhService
      .getColaboradorById(this.IDColab)
      .subscribe((data: any) => {
        this.DadosPessoais = data;
        this.DadosAtualizados = Array.of(data);
      },
      (error) => {
        console.log('error', error);
        this.toastr.error('Houve algum erro!', 'Erro!');
      });
  }

  validandoCEP(searchValue: string): void {
    if(searchValue.length == 8 || searchValue.length == 9){
      const num = searchValue;
      this.siscrhService.getCEP(num).subscribe((data:any)=>{
        this.cep =data 
        this.dadosPessoais.cep = this.cep.cep
        this.dadosPessoais.endereco = this.cep.logradouro;
        this.dadosPessoais.bairro = this.cep.bairro
        this.dadosPessoais.cidade = this.cep.localidade
        this.dadosPessoais.uf_cidade = this.cep.uf
  
      },
      (error) => {
        console.log('error', error);
        this.toastr.error('Houve algum erro!', 'Erro!');
      })
    }
   
  }
  cep:CEP = new CEP();
  botaoValido: any;
  botaoValidoCon: any;
  CPFValidoConjuge: any;
  botaoValidoDep: any;
  CPFValidoDep: any;
  CPFValido: any;
  EncontraCPF: any;
  MatriculasLista: any;
  ValidandoCPF(searchValue: string, tipo: string): void {
    const num = searchValue;
    if (tipo == 'con') {
      if (cpf.isValid(num) == true) {
        this.CPFValidoConjuge = true;
        this.botaoValidoCon = false;
      } else {
        this.CPFValidoConjuge = false;
        this.botaoValidoCon = true;
      }
    }

    if (tipo == 'dep') {
      if (cpf.isValid(num) == true) {
        this.CPFValidoDep = true;
        this.botaoValidoDep = false;
      } else {
        this.CPFValidoDep = false;
        this.botaoValidoDep = true;
      }
    }

    if (tipo == 'colab') {
      if (cpf.isValid(num) == true) {
        this.CPFValido = true;
        this.siscrhService
          .getColaboradorByCPF(this.dadosPessoais.cpf)
          .subscribe((b) => {
            if (b == null) {
              this.EncontraCPF = true;
              this.botaoValido = false;
            } else {
              
              this.EncontraCPF = false;
              this.botaoValido = true;
            }
          },
          (error) => {
            console.log('error', error);
            this.toastr.error('Houve algum erro!', 'Erro!');
          }
          );
      } else {
        this.CPFValido = false;
        this.botaoValido = true;
        
      }
    }
  }

  EditarApagarDep = false;
  EditarApagarMat = false;
  setor: any;
  vinculo: any;
  salvarDadosProfissionais() {
    this.dadosProfissionais.id = this.IDProfi;
    
    this.dadosProfissionais.setores = { id: this.setor };
    this.dadosProfissionais.vinculos = { id: this.vinculo };
    this.dadosProfissionais.dadosPessoais = { id: this.IDColab };

    this.siscrhService
      .createDadosProfissionais(this.dadosProfissionais)
      .subscribe((data: any) => {
        this.IDProfi = data.id;
        this.showSuccess()
      },
      (error) => {
        console.log('error', error);
        this.toastr.error('Houve algum erro!', 'Erro!');
      });
  }

  salvarDadosBancarios() {
    this.dadosBancarios.id = this.IDBanco;
    this.dadosBancarios.dadosPessoais = { id: this.IDColab };
    this.siscrhService
      .createDadosBancarios(this.dadosBancarios)
      .subscribe((data: any) => {
        this.IDBanco = data.id;
        this.showSuccess()
      },
      (error) => {
        console.log('error', error);
        this.toastr.error('Houve algum erro!', 'Erro!');
      });
  }
}
