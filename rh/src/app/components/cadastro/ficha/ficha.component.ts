import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DatePipe, formatDate } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatStepperIntl } from '@angular/material/stepper';
import { ToastrService } from 'ngx-toastr';
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
  SituacaoColaborador,
  Documentos,
  DocumentosColaboradores,
} from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';
import { cpf } from 'cpf-cnpj-validator';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css'],
})
export class FichaComponent implements OnInit {
  displayedColumns = ['Nome', 'CPF', 'DataNascimento'];
  panelOpenState = true;
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
  matriculas: Matriculas = new Matriculas();
  situacaoColaborador: SituacaoColaborador = new SituacaoColaborador();
  dados: Dados = new Dados();
  documentos: DocumentosColaboradores = new DocumentosColaboradores();

  setores: Setores[];
  vinculos: Vinculos[];
  Dependentes: Dependentes[];
  DadosPessoais: DadosPessoais[];
  DadosEstadoCivil: DadosEstadoCivil[];
  TiposDocumentos: Documentos[];

  CPFValido: any;
  EncontraCPF: any;
  DadosAtualizados: any;
  MatriculasLista: any;


  constructor(
    private _formBuilder: FormBuilder,
    private siscrhService: SiscrhService,
    private toastr: ToastrService
  ) {
  }

  CPFValidoColab(searchValue: string): void {
    const num = searchValue;
    
  }
  botaoValido:any
  botaoValidoCon:any
  CPFValidoConjuge: any;
  botaoValidoDep:any
  CPFValidoDep: any;
  ValidandoCPF(searchValue: string, tipo:string): void {
    const num = searchValue;
    if(tipo == "con"){
     
      if (cpf.isValid(num) == true) {
        this.CPFValidoConjuge = true;
        this.botaoValidoCon = false;
      } else {
        this.CPFValidoConjuge = false;
        this.botaoValidoCon = true;
      }
    }

    if(tipo == "dep"){
      if (cpf.isValid(num) == true) {
        this.CPFValidoDep = true;
        this.botaoValidoDep = false;
      } else {
        this.CPFValidoDep = false;
        this.botaoValidoDep = true;
      }
    }

    if(tipo== "colab"){
      if (cpf.isValid(num) == true) {
        this.CPFValido = true;
        this.siscrhService
          .getColaboradorByCPF(this.dadosPessoais.cpf)
          .subscribe((b) => {
            if (b == null) {
              this.EncontraCPF = true;
              this.botaoValido = false
            } else {
              this.EncontraCPF = false;
              this.botaoValido = true;
            }
          });
      } else {
        this.CPFValido = false;
        this.botaoValido = true;
      }

    }
    
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nomeCompleto: ['', Validators.required],
      cpf: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
    });

    this.thirdFormGroup = this._formBuilder.group({
    });

    this.fourthFormGroup = this._formBuilder.group({
    });
    this.firthFormGroup = this._formBuilder.group({
    });

    this._formBuilder.group({
      sub_products: [
        {
          lesson: '1',
        },
      ],
    });

    this.siscrhService.getSetoresList().subscribe(
      (data: any) => {
        this.setores = data;
      },
      (error) => {
        console.log('error', error);
        this.showWarn();
      }
    );

    this.siscrhService.getVinculosList().subscribe(
      (data: any) => {
        this.vinculos = data;
      },
      (error) => {
        console.log('error', error);
        this.showWarn();
      }
    );

    this.siscrhService.getDocumentosList().subscribe(
      (data: any) => {
        this.TiposDocumentos = data;
      },
      (error) => {
        console.log('error', error);
        this.showWarn();
      }
    );
  }
  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  cpfmask = [
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/
  ];
  telefonemask = [
    '(',
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
  celularmask = [
    '(',
    /\d/,
    /\d/,
    ')',
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
  Usuario: any;
  Email: any;
  IDEstado: number;
  IDColab: number;
  IDProfi: number;
  IDBanco: number;
  EditarApagarDep = false;
  EditarApagarMat = false;

  mensagemFinal: any;
  gerarMensagemFinal() {
    let NomeEsplitado = this.dadosPessoais.nome_completo.split(' ');
    let UltimoNome = NomeEsplitado[NomeEsplitado.length - 1];
    let PrimeiroNome = NomeEsplitado[0];
    this.Usuario = PrimeiroNome + ' ' + UltimoNome;
    this.Email = PrimeiroNome + '.' + UltimoNome + '@pbprev.pb.gov.br';
    this.Usuario = this.Usuario.toLowerCase();
    this.Email = this.Email.toLowerCase();
    let setorDefinido;
    for (let index in this.setores) {
      if (this.setores[index].id == this.setor) {
        setorDefinido = this.setores[index].setor;
        console.log(setorDefinido);
      }
    }
    this.mensagemFinal =
      'Por gentileza, criar um E-Mail institucional para: \nNome Completo: ' +
      this.dadosPessoais.nome_completo +
      ' \nCPF: ' +
      this.dadosPessoais.cpf +
      ' \nSetor: ' +
      setorDefinido;
  }

  DocumentosObrigatorios: any = [];
  DocumentosOpcionais: any = [];
  resgatarDocumentos() {
    this.DocumentosObrigatorios = [];
    this.DocumentosOpcionais = [];
    this.siscrhService.getColaboradorById(this.IDColab).subscribe(
      (data: any) => {
        this.dadosPessoais = data;
        this.dadosPessoais.documentosColaboradores.sort((a, b) => a.id - b.id);
        for (let i in this.dadosPessoais.documentosColaboradores) {
          if (this.dadosPessoais.documentosColaboradores[i].tipo != 1) {
            this.DocumentosObrigatorios.push({
              id: this.dadosPessoais.documentosColaboradores[i].id,
              status: this.dadosPessoais.documentosColaboradores[i].status,
              nome_documento_upload:
                this.dadosPessoais.documentosColaboradores[i]
                  .nome_documento_upload,
              tipo: this.TiposDocumentos.find(
                (b) =>
                  b.id == this.dadosPessoais.documentosColaboradores[i].tipo
              )?.tipo,
              tipo_id: this.dadosPessoais.documentosColaboradores[i].tipo,
            });
          } else {
            this.DocumentosOpcionais.push({
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
      },
      (error) => {
        console.log('error', error);
        this.showWarn();
      }
    );
  }

  IDSitu: any;
  salvarDadosPessoais() {
    this.dadosPessoais.id = this.IDColab;
    this.dadosPessoais.nome_completo =
      this.dadosPessoais.nome_completo.toUpperCase();
    if (
      this.dadosPessoais.nome_mae != null ||
      this.dadosPessoais.nome_mae != undefined
    ) {
      this.dadosPessoais.nome_mae = this.dadosPessoais.nome_mae.toUpperCase();
    }

    if (
      this.dadosPessoais.nome_pai != null ||
      this.dadosPessoais.nome_pai != undefined
    ) {
      this.dadosPessoais.nome_pai = this.dadosPessoais.nome_pai.toUpperCase();
    }

    this.siscrhService.createColaborador(this.dadosPessoais).subscribe(
      (data: any) => {
        this.IDColab = data.id;

        this.situacaoColaborador.acessoRede = false;
        this.situacaoColaborador.status = false;
        this.situacaoColaborador.dadosPessoais = { id: this.IDColab };
        this.situacaoColaborador.id = this.IDSitu;
        this.siscrhService
          .createSituacaoColaborador(this.situacaoColaborador)
          .subscribe(
            (data: any) => {
              this.IDSitu = data.id;
            },
            (error) => {
              console.log('error', error);
              this.showWarn();
            }
          );

        for (let i in this.TiposDocumentos) {
          if (this.TiposDocumentos[i].id != 1) {
            this.documentos.tipo = this.TiposDocumentos[i].id;
            this.documentos.status = false;
            this.documentos.dadosPessoais = { id: this.IDColab };
            this.siscrhService
              .createDocumentosColaborador(this.documentos)
              .subscribe(
                (data: any) => {},
                (error) => {
                  console.log('error', error);
                  this.showWarn();
                }
              );
          }
        }

        this.dadosProfissionais.dadosPessoais = { id: this.IDColab };
        this.dadosProfissionais.id = this.IDProfi;
        this.siscrhService
          .createDadosProfissionais(this.dadosProfissionais)
          .subscribe(
            (data: any) => {
              this.IDProfi = data.id;
            },
            (error) => {
              console.log('error', error);
              this.showWarn();
            }
          );
        this.resgatarDocumentos();
        this.gerarMensagemFinal();
        this.showSuccess();
      },
      (error) => {
        console.log('error', error);
        this.showWarn();
      }
    );
  }

  showSuccess() {
    this.toastr.success(
      'Dados foram cadastrados com sucesso no sistema!',
      'Dados Registrados'
    );
  }
  showWarn() {
    this.toastr.error('Dados não foram cadastrados no sistema! ', 'Erro!');
  }

  upload(tipo_id: any, id: any, status: any) {
    this.documentos.id = id;
    this.documentos.tipo = tipo_id;
    this.documentos.status = !status;
    this.documentos.dadosPessoais = { id: this.IDColab };
    this.siscrhService.createDocumentosColaborador(this.documentos).subscribe(
      (data: any) => {
        /* console.log(data); */
        this.resgatarDocumentos();
      },
      (error) => {
        console.log('error', error);
        this.showWarn();
      }
    );
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

    if (
      this.dadosEstadoCivil.nome_completo_conjuge != null ||
      this.dadosEstadoCivil.nome_completo_conjuge != undefined
    ) {
      this.dadosEstadoCivil.nome_completo_conjuge =
        this.dadosEstadoCivil.nome_completo_conjuge.toUpperCase();
    }

    this.siscrhService.createEstadoCivil(this.dadosEstadoCivil).subscribe(
      (data: any) => {
        /* console.log(data); */
        this.IDEstado = data.id;
        this.showSuccess();
      },
      (error) => {
        console.log('error', error);
        this.showWarn();
      }
    );
  }
  editarDependente(idDependente: any) {
    console.log(idDependente);
  }

  nomeDependente: any;
  dataDependente: any;
  cpfDependente: any;

  salvarDependente() {
    this.dependentes.dadosPessoais = { id: this.IDColab };

    this.siscrhService.createDependentes(this.dependentes).subscribe(
      (data: any) => {
        /* console.log(data); */
        this.pegarDados();
        this.showSuccess();
      },
      (error) => {
        console.log('error', error);
        this.showWarn();
      }
    );
  }

  salvarMatricula() {
    this.matriculas.dadosPessoais = { id: this.IDColab };

    this.siscrhService.createMatricula(this.matriculas).subscribe(
      (data: any) => {
        /* console.log(data); */
        this.pegarDados();
        this.showSuccess();
      },
      (error) => {
        console.log('error', error);
        this.showWarn();
      }
    );
  }

  pegarDados() {
    this.siscrhService.getColaboradorById(this.IDColab).subscribe(
      (data: any) => {
        this.DadosPessoais = data;
        this.DadosAtualizados = Array.of(data);
        /*  console.log(this.DadosPessoais); */
      },
      (error) => {
        console.log('error', error);
        this.showWarn();
      }
    );
  }

  setor: any;
  vinculo: any;
  salvarDadosProfissionais() {
    this.dadosProfissionais.id = this.IDProfi;

    if (this.setor != undefined) {
      this.dadosProfissionais.setores = { id: this.setor };
    }

    if (this.vinculo != undefined) {
      this.dadosProfissionais.vinculos = { id: this.vinculo };
    }

    this.dadosProfissionais.dadosPessoais = { id: this.IDColab };

    this.siscrhService
      .createDadosProfissionais(this.dadosProfissionais)
      .subscribe(
        (data: any) => {
          this.IDProfi = data.id;
          /*   console.log(data); */
          this.showSuccess();
          this.gerarMensagemFinal();
        },
        (error) => {
          console.log('error', error);
          this.showWarn();
        }
      );
  }

  salvarDadosBancarios() {
    this.dadosBancarios.id = this.IDBanco;
    this.dadosBancarios.dadosPessoais = { id: this.IDColab };
    this.siscrhService.createDadosBancarios(this.dadosBancarios).subscribe(
      (data: any) => {
        this.IDBanco = data.id;
        /*  console.log(data); */
        this.showSuccess();
      },
      (error) => {
        console.log('error', error);
        this.showWarn();
      }
    );
  }
}
