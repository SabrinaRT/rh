import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { formatDate } from '@angular/common';

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatStepper, MatStepperIntl } from '@angular/material/stepper';
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
  CEP,
  RegistroAtividade,
  Usuarios,
  RegistroAtividadeCadastro,
} from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';
import { cpf } from 'cpf-cnpj-validator';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

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
  documentosColaboradores: DocumentosColaboradores =
    new DocumentosColaboradores();

  registroAtividades: RegistroAtividadeCadastro =
    new RegistroAtividadeCadastro();
  usuario: Usuarios = new Usuarios();

  setores: Setores[];
  vinculos: Vinculos[];
  Dependentes: Dependentes[];
  DadosPessoais: DadosPessoais[];
  DadosEstadoCivil: DadosEstadoCivil[];
  TiposDocumentos: Documentos[];

  cep: CEP = new CEP();
  CPFValido: any;
  EncontraCPF: any;
  DadosAtualizados: any;
  MatriculasLista: any;

  constructor(
    private _formBuilder: FormBuilder,
    private siscrhService: SiscrhService,
    private toastr: ToastrService,
    private http: HttpClient,
    private route: Router,
    private router: ActivatedRoute

  ) {  this.idUser= this.router.snapshot.params["idUser"];
}
idUser:any
  acessoRede: any;
  status: any;
  status2: any;
  status3: any;
  salvarStatus() {
    this.situacaoColaborador.id = this.IDSitu;
    this.situacaoColaborador.acessoRede = false;
    this.situacaoColaborador.status = this.status;
    this.situacaoColaborador.dadosPessoais = { id: this.IDColab };
    this.siscrhService
      .createSituacaoColaborador(this.situacaoColaborador)
      .subscribe(
        (data: any) => {
          this.toastr.success('Status Atualizado!');
        },
        (error) => {
          console.log('error', error);
          this.toastr.error('Houve alguma falha de conexão!', 'Erro!');
        }
      );
  }

  validandoCEP(searchValue: string): void {
    if (searchValue.length == 8 || searchValue.length == 9) {
      const num = searchValue;
      this.siscrhService.getCEP(num).subscribe(
        (data: any) => {
          this.cep = data;
          this.dadosPessoais.cep = this.cep.cep;
          this.dadosPessoais.endereco = this.cep.logradouro;
          this.dadosPessoais.bairro = this.cep.bairro;
          this.dadosPessoais.cidade = this.cep.localidade;
          this.dadosPessoais.uf_cidade = this.cep.uf;
        },
        (error) => {
          console.log('error', error);
          this.toastr.error('Houve algum erro!', 'Erro!');
        }
      );
    }
  }

  botaoValido: any;
  botaoValidoCon: any;
  CPFValidoConjuge: any;
  botaoValidoDep: any;
  CPFValidoDep: any;
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
          .subscribe(
            (b) => {
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
  ArrayDocumentos: any = [];
  ArrayDocumentosOpcionais: any = [];

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nomeCompleto: ['', Validators.required],
      cpf: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({});

    this.thirdFormGroup = this._formBuilder.group({});

    this.fourthFormGroup = this._formBuilder.group({});
    this.firthFormGroup = this._formBuilder.group({});

    this._formBuilder.group({
      sub_products: [
        {
          lesson: '1',
        },
      ],
    });

    if (this.IDColab != undefined) {
      this.siscrhService
        .getDocumentosColaboradorByForeignKey(this.IDColab)
        .subscribe((data: any) => {
          console.log(data);
        });
    }

    this.siscrhService.getSetoresList().subscribe(
      (data: any) => {
        this.setores = data;
      },
      (error) => {
        console.log('error', error);
        this.showWarn();
      }
    );

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
        this.countDocu = 0;

        this.ArrayDocumentos.sort(function (a: any, b: any) {
          if (a.tipo > b.tipo) {
            return 1;
          }
          if (a.tipo < b.tipo) {
            return -1;
          }
          return 0;
        });
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
  }

  countDocu: any;
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
        var count = 0;
        for (let i in this.ArrayDocumentos) {
          this.ArrayDocumentos[i].id = null;
          this.ArrayDocumentos[i].nome_arquivo = null;

          for (let i2 in this.DocumentosColaboradores) {
            if (
              this.ArrayDocumentos[i].id_documento ==
              this.DocumentosColaboradores[i2].tipo
            ) {
              count++;
              this.ArrayDocumentos[i].id = this.DocumentosColaboradores[i2].id;
              this.ArrayDocumentos[i].nome_arquivo =
                this.DocumentosColaboradores[i2].nome_documento_upload;
            }
          }
        }
        this.countDocu = count;
      });
  }

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
                this.showWarn();
              }
            );
        },
        (error) => {
          console.log('error', error);
          this.showWarn();
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
    this.atualizar();
  }

  delete(idDocumento: any) {
    this.siscrhService.deleteDocumentoColaborador(idDocumento);
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
    /\d/,
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
      'Por gentileza, criar um E-Mail Institucional PBprev para: \nNome Completo: ' +
      this.dadosPessoais.nome_completo +
      ' \nCPF: ' +
      this.dadosPessoais.cpf +
      ' \nSetor: ' +
      setorDefinido;
  }

  IDSitu: any;
  salvarDadosPessoais(stepper: MatStepper) {
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
        this.registroAtividade(data.id);

        this.situacaoColaborador.acessoRede = false;
        this.situacaoColaborador.status = true;
        this.status = this.situacaoColaborador.status;
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

        this.gerarMensagemFinal();
        this.showSuccess();
        stepper.next();
      },
      (error) => {
        console.log('error', error);
        this.showWarn();
      }
    );
  }
  registroAtividade(id: any) {
    this.registroAtividades.dadosPessoais = { id: id };
    this.registroAtividades.usuario_c = { id: 1 };
    this.registroAtividades.usuario_u = { id: 1 };
    this.registroAtividades.data_c = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    this.registroAtividades.data_u = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    this.siscrhService
      .createRegistroAtividade(this.registroAtividades)
      .subscribe(
        (data: any) => {},
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

  salvarEstadoCivil(stepper: MatStepper) {
    this.dadosEstadoCivil.id = this.IDEstado;
    if (this.dadosEstadoCivil.estado_civil == 'Solteiro(a)') {
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
        this.IDEstado = data.id;
        this.showSuccess();
      },
      (error) => {
        console.log('error', error);
        this.showWarn();
      }
    );
    stepper.next();
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
      },
      (error) => {
        console.log('error', error);
        this.showWarn();
      }
    );
  }

  setor: any;
  vinculo: any;
  salvarDadosProfissionais(stepper: MatStepper) {
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
          this.showSuccess();
          this.gerarMensagemFinal();
          stepper.next();
        },
        (error) => {
          console.log('error', error);
          this.showWarn();
        }
      );
  }

  salvarDadosBancarios(stepper: MatStepper) {
    this.dadosBancarios.id = this.IDBanco;
    this.dadosBancarios.dadosPessoais = { id: this.IDColab };
    this.siscrhService.createDadosBancarios(this.dadosBancarios).subscribe(
      (data: any) => {
        this.IDBanco = data.id;
        this.showSuccess();
        stepper.next();
      },
      (error) => {
        console.log('error', error);
        this.showWarn();
      }
    );
  }
}
