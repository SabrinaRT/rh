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
import {
  DadosEstadoCivil,
  DadosPessoais,
  Dados,
  Dependentes,
  Setores,
  DadosProfissionais,
  DadosBancarios,
  Vinculos,
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
  ) {
    this.IDColab = this.route.snapshot.params['id'];
  }
  DependentesLista: any;
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
    });

    this.siscrhService.getVinculosList().subscribe((data: any) => {
      this.vinculos = data;
    });

    this.siscrhService
      .getColaboradorById(this.IDColab)
      .subscribe((data: any) => {
        this.dadosPessoais = data;
        console.log(data);
      });

    this.siscrhService
      .getEstadoCivilByForeignKey(this.IDColab)
      .subscribe((data: any) => {
        this.dadosEstadoCivil = data;
        this.IDEstado = data.id;

        console.log(data);
      });
      this.pegarDados();
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
        console.log(data);
        this.IDColab = data.id;
      });
  }

  salvarEstadoCivil() {
    this.dadosEstadoCivil.id = this.IDEstado;

    if(this.dadosEstadoCivil.estado_civil = "Solteiro(a)"){
      this.dadosEstadoCivil.cpf_conjuge = null
      this.dadosEstadoCivil.nome_completo_conjuge = null
      this.dadosEstadoCivil.data_nascimento_conjuge = null
      this.dadosEstadoCivil.identidade_conjuge = null
      this.dadosEstadoCivil.profissao_atividade = null
      this.dadosEstadoCivil.uf_identidade_conjuge = null
    }

    this.dadosEstadoCivil.dadosPessoais = { id: this.IDColab };
    this.siscrhService
      .createEstadoCivil(this.dadosEstadoCivil)
      .subscribe((data: any) => {
        console.log(data);
        this.IDEstado = data.id;
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
        console.log(data);
         this.pegarDados();
      });
  }

  pegarDados() {
    this.siscrhService
      .getColaboradorById(this.IDColab)
      .subscribe((data: any) => {
        this.DadosPessoais = data;
        this.DependentesLista = Array.of(this.DadosPessoais);
        console.log(this.DadosPessoais);
      });
  }

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
        console.log(data);
      });
  }

  salvarDadosBancarios() {
    this.dadosBancarios.id = this.IDBanco;
    this.siscrhService
      .createDadosBancarios(this.dadosBancarios)
      .subscribe((data: any) => {
        this.dadosBancarios = data.id;
      });
  }
}
