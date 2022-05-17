export class Dados {
  TiposEstadoCivil = [
    'Solteiro(a)',
    'Casado(a)',
    'Viúvo(a)',
    'Separado(a) Júdicialmente',
    'Divorciado(a)',
    'União Estável',
    'Outros',
  ];
  SiglasEstados = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];
}

export class TabelaInicial{
  id: any
  nome: any
  setor:  any
  status: any
  acessoRede:  any
}

export class DadosPessoais {
  id: any;
  cpf: any;
  nome_completo: any;
  identidade: any;
  uf_identidade: any;
  naturalidade: any;
  uf_naturalidade: any;
  nacionalidade: any;
  titulo_eleitor: any;
  data_nascimento: any;
  pis_pasep: any;
  telefone: any;
  celular: any;
  email: any;
  endereco: any;
  cep: any;
  numero: any;
  bairro: any;
  cidade: any;
  uf_cidade: any;
  complemento: any;
  nome_mae: any;
  nome_pai: any;
  documentosColaboradores: [
    {
      id: any;
      nome:any;
      nome_documento_upload: any;
      tipo: any;
    }
  ];
  dependentes: [
    {
      id: any;
      nome_completo_dependente: any;
      cpf_dependente: any;
      data_nascimento_dependente: any;
    }
  ];

  matriculas: [
    {
      id: any;
      matricula: any;
      observacao: any;
    }
  ];

  situacaoColaborador: {
    acessoRede: any;
    status: any;
  };
}

export class Setores {
  id: any;
  setor: any;
}

export class Vinculos {
  id: any;
  vinculo: any;
}

export class DadosEstadoCivil {
  id: any;
  estado_civil: any;
  nome_completo_conjuge: any;
  data_nascimento_conjuge: any;
  identidade_conjuge: any;
  uf_identidade_conjuge: any;
  cpf_conjuge: any;
  profissao_atividade: any;
  dadosPessoais: {
    id: any;
  };
}

export class DadosProfissionais {
  id: any;
  cargo: any;
  escolaridade: any;
  data_admissao: any;
  data_exoneracao: any;
  qualificacao_profissional: any;
  email_institucional: any;
  funcao: any;
  dadosPessoais: {
    id: any;
  };
  setores: {
    id: any;
  };
  vinculos: {
    id: any;
  };
}

export class DocumentosColaboradores {
  id: any;
  nome:any;
  nome_documento_upload: any;
  dadosPessoais: {
    id: any;
  };
  tipo: any;
}
export class Documentos {
  id: any;
  tipo: any;
}
export class SituacaoColaborador {
  id: any;
  acessoRede: boolean;
  status: boolean;
  dadosPessoais: {
    id: any;
  };
}
export class DadosBancarios {
  id: any;
  banco: any;
  codigo: any;
  agencia: any;
  conta_corrente: any;
  dadosPessoais: {
    id: any;
  };
}

export class Matriculas {
  id: any;
  matricula: any;
  observacao: any;
  dadosPessoais: {
    id: any;
  };
}

export class Dependentes {
  id: any;
  nome_completo_dependente: any;
  cpf_dependente: any;
  data_nascimento_dependente: any;
  dadosPessoais: {
    id: any;
  };
  
}
export class CEP{
  cep: any;
  logradouro:any;
  complemento:any;
  bairro: any;
  localidade: any;
  uf:any;
  ibge: any;
  gia: any;
  ddd: any;
  siafi: any;
}