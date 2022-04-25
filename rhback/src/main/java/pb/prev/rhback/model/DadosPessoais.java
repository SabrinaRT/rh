package  pb.prev.rhback.model;

import javax.persistence.*;
import java.util.*;

import com.fasterxml.jackson.annotation.*;


@Entity
/* @JsonIgnoreProperties(ignoreUnknown = true) */
@Table(name="dados_pessoais") 
public class DadosPessoais {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
	private long id;
    @Column(name="cpf",unique = true)
	private String cpf;
	private String nome_completo;


	private String identidade;
    private String uf_identidade;
    private String naturalidade;
    private String uf_naturalidade;
	private String nacionalidade;
    private String titulo_eleitor;
 
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date data_nascimento;
    private String pis_pasep;

    private String telefone;
    private String celular;
    private String email;
 
    private String endereco;
    private String cep;
    private String numero;
    private String bairro;
    private String cidade;
    private String uf_cidade;
    private String complemento;

    private String nome_mae;
    private String nome_pai;
 

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "dadosPessoais")
    @JsonManagedReference
    private Set<Dependentes> dependentes = new HashSet<Dependentes>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "dadosPessoais")
    @JsonManagedReference
    private Set<Matriculas> matriculas = new HashSet<Matriculas>();

    @OneToOne(mappedBy = "dadosPessoais")
    @JsonManagedReference
    private SituacaoColaborador situacaoColaborador;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "dadosPessoais")
    @JsonManagedReference
    public Set<DocumentosColaboradores> documentosColaboradores = new HashSet<DocumentosColaboradores>();

    public DadosPessoais() {
    }


    public Set<DocumentosColaboradores> getDocumentosColaboradores() {
        return this.documentosColaboradores;
    }

    public void setDocumentosColaboradores(Set<DocumentosColaboradores> documentosColaboradores) {
        this.documentosColaboradores = documentosColaboradores;
    }
 

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCpf() {
        return this.cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNome_completo() {
        return this.nome_completo;
    }

    public void setNome_completo(String nome_completo) {
        this.nome_completo = nome_completo;
    }

    public String getIdentidade() {
        return this.identidade;
    }

    public void setIdentidade(String identidade) {
        this.identidade = identidade;
    }

    public String getUf_identidade() {
        return this.uf_identidade;
    }

    public void setUf_identidade(String uf_identidade) {
        this.uf_identidade = uf_identidade;
    }

    public String getNaturalidade() {
        return this.naturalidade;
    }

    public void setNaturalidade(String naturalidade) {
        this.naturalidade = naturalidade;
    }

    public String getUf_naturalidade() {
        return this.uf_naturalidade;
    }

    public void setUf_naturalidade(String uf_naturalidade) {
        this.uf_naturalidade = uf_naturalidade;
    }

    public String getNacionalidade() {
        return this.nacionalidade;
    }

    public void setNacionalidade(String nacionalidade) {
        this.nacionalidade = nacionalidade;
    }

    public String getTitulo_eleitor() {
        return this.titulo_eleitor;
    }

    public void setTitulo_eleitor(String titulo_eleitor) {
        this.titulo_eleitor = titulo_eleitor;
    }

    public Date getData_nascimento() {
        return this.data_nascimento;
    }

    public void setData_nascimento(Date data_nascimento) {
        this.data_nascimento = data_nascimento;
    }

    public String getPis_pasep() {
        return this.pis_pasep;
    }

    public void setPis_pasep(String pis_pasep) {
        this.pis_pasep = pis_pasep;
    }

    public String getTelefone() {
        return this.telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCelular() {
        return this.celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEndereco() {
        return this.endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getCep() {
        return this.cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getNumero() {
        return this.numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getBairro() {
        return this.bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return this.cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getUf_cidade() {
        return this.uf_cidade;
    }

    public void setUf_cidade(String uf_cidade) {
        this.uf_cidade = uf_cidade;
    }

    public String getComplemento() {
        return this.complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getNome_mae() {
        return this.nome_mae;
    }

    public void setNome_mae(String nome_mae) {
        this.nome_mae = nome_mae;
    }

    public String getNome_pai() {
        return this.nome_pai;
    }

    public void setNome_pai(String nome_pai) {
        this.nome_pai = nome_pai;
    }

    public Set<Dependentes> getDependentes() {
        return this.dependentes;
    }

    public void setDependentes(Set<Dependentes> dependentes) {
        this.dependentes = dependentes;
    }

    public Set<Matriculas> getMatriculas() {
        return this.matriculas;
    }

    public void setMatriculas(Set<Matriculas> matriculas) {
        this.matriculas = matriculas;
    }

    public SituacaoColaborador getSituacaoColaborador() {
        return this.situacaoColaborador;
    }

    public void setSituacaoColaborador(SituacaoColaborador situacaoColaborador) {
        this.situacaoColaborador = situacaoColaborador;
    }


    public DadosPessoais(String cpf, String nome_completo, String identidade, String uf_identidade, String naturalidade, String uf_naturalidade, String nacionalidade, String titulo_eleitor, Date data_nascimento, String pis_pasep, String telefone, String celular, String email, String endereco, String cep, String numero, String bairro, String cidade, String uf_cidade, String complemento, String nome_mae, String nome_pai, Set<Dependentes> dependentes, Set<Matriculas> matriculas, SituacaoColaborador situacaoColaborador, Set<DocumentosColaboradores> documentosColaboradores) {
        this.cpf = cpf;
        this.nome_completo = nome_completo;
        this.identidade = identidade;
        this.uf_identidade = uf_identidade;
        this.naturalidade = naturalidade;
        this.uf_naturalidade = uf_naturalidade;
        this.nacionalidade = nacionalidade;
        this.titulo_eleitor = titulo_eleitor;
        this.data_nascimento = data_nascimento;
        this.pis_pasep = pis_pasep;
        this.telefone = telefone;
        this.celular = celular;
        this.email = email;
        this.endereco = endereco;
        this.cep = cep;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf_cidade = uf_cidade;
        this.complemento = complemento;
        this.nome_mae = nome_mae;
        this.nome_pai = nome_pai;
        this.dependentes = dependentes;
        this.matriculas = matriculas;
        this.situacaoColaborador = situacaoColaborador;
        this.documentosColaboradores = documentosColaboradores;
    }
   

}
