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
import {
  DadosEstadoCivil,
  DadosPessoais,
  Dados,
  Dependentes,
  Setores,
  DadosProfissionais,
} from 'src/app/siscrh';
import { SiscrhService } from 'src/app/siscrh.service';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css'],
})
export class FichaComponent implements OnInit {
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
  setores: Setores[];

  Dependentes: Dependentes[];
  DadosPessoais: DadosPessoais[];
  DadosEstadoCivil: DadosEstadoCivil[];

  dados: Dados = new Dados();

  constructor(
    private _formBuilder: FormBuilder,
    private siscrhService: SiscrhService
  ) {}
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

    this._formBuilder.group({
      sub_products: [
        {
          lesson: '1',
        },
      ],
    });

    this.siscrhService.getSetoresList().subscribe((data: any) => {
      this.setores = data;
    });

    /*   console.log(this.dadosPessoais.dependentes) */
  }

  /* DNDP = Data de Nascimento Dados Pessoais */
  @ViewChild('DNDP', { static: true }) DNDP: ElementRef;
  /* CPFDP = CPF Dados Pessoais */
  @ViewChild('CPFDP', { static: true }) CPFDP: ElementRef;

  /* DNES = Data de Nascimento Estado Civil */
  @ViewChild('DNES') DNES: ElementRef;
  /* CPFES = CPF Estado Civil*/
  @ViewChild('CPFES') CPFES: ElementRef;

  /* DND = Data de Nascimento Dependentes */
  @ViewChild('DND', { static: true }) DND: ElementRef;
  /* CPFD = CPF Dependentes*/
  @ViewChild('CPFD', { static: true }) CPFD: ElementRef;

  /* DE = Data Exoneracao Dados Profissionais */
  @ViewChild('DE', { static: true }) DE: ElementRef;
  /* DA = Data Exoneracao Dados Profissionais */
  @ViewChild('DA', { static: true }) DA: ElementRef;

 
  Usuario: any;
  Email: any;
  IDEstado: any;
  IDColab: number;

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
    this.dadosPessoais.id =  this.IDColab
    this.dadosPessoais.nome_completo =
      this.dadosPessoais.nome_completo.toUpperCase();
    this.dadosPessoais.cpf = this.CPFDP.nativeElement.value;
    this.dadosPessoais.data_nascimento = this.DNDP.nativeElement.value;

    this.siscrhService
      .createColaborador(this.dadosPessoais)
      .subscribe((data: any) => {
        console.log(data);
        this.IDColab = data.id;
      });
  }



  salvarEstadoCivil() {
    this.dadosEstadoCivil.id = this.IDEstado;
    if (this.dadosEstadoCivil.cpf_conjuge != null) {
      this.dadosEstadoCivil.cpf_conjuge = this.CPFES.nativeElement.value;
   
    }

    if (this.dadosEstadoCivil.data_nascimento_conjuge != null) {
      this.dadosEstadoCivil.data_nascimento_conjuge =
        this.DNES.nativeElement.value;
    }

    if (this.dadosEstadoCivil.nome_completo_conjuge != null) {
      this.dadosEstadoCivil.nome_completo_conjuge =
        this.dadosEstadoCivil.nome_completo_conjuge.toUpperCase();
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
    this.dependentes.cpf_dependente = this.CPFD.nativeElement.value;
    this.dependentes.nome_completo_dependente =
      this.dependentes.nome_completo_dependente.toUpperCase();
    this.dependentes.dadosPessoais = { id: this.IDColab };
    this.dependentes.data_nascimento_dependente = this.DND.nativeElement.value;
    this.siscrhService
      .createDependentes(this.dependentes)
      .subscribe((data: any) => {
        console.log(data);
        /*  this.pegarDados(); */
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
  salvarDadosProfissionais() {
    this.dadosProfissionais.setores = { id: this.setor };
    this.dadosProfissionais.dadosPessoais = { id: this.IDColab };

    this.siscrhService
      .createDadosProfissionais(this.dadosProfissionais)
      .subscribe((data: any) => {
        console.log(data);
      });
  }
}
