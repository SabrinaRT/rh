package  pb.prev.rhback.model;

import javax.persistence.*;
import java.util.*;

import com.fasterxml.jackson.annotation.*;



@Entity
@Table(name="dados_estado_civil")
public class DadosEstadoCivil {
    

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

    private String nome_completo_conjuge;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date data_nascimento_conjuge;

    private String identidade_conjuge;
    private String uf_identidade_conjuge;
    private String cpf_conjuge;
    private String profissao_atividade;
    private String estado_civil;

    @OneToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name="dadosPessoaisId" )
    private DadosPessoais dadosPessoais;
   
    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome_completo_conjuge() {
        return this.nome_completo_conjuge;
    }

    public void setNome_completo_conjuge(String nome_completo_conjuge) {
        this.nome_completo_conjuge = nome_completo_conjuge;
    }

    public Date getData_nascimento_conjuge() {
        return this.data_nascimento_conjuge;
    }

    public void setData_nascimento_conjuge(Date data_nascimento_conjuge) {
        this.data_nascimento_conjuge = data_nascimento_conjuge;
    }

    public String getEstado_civil() {
        return this.estado_civil;
    }

    public void setEstado_civil(String estado_civil) {
        this.estado_civil = estado_civil;
    }

    public String getIdentidade_conjuge() {
        return this.identidade_conjuge;
    }

    public void setIdentidade_conjuge(String identidade_conjuge) {
        this.identidade_conjuge = identidade_conjuge;
    }

    public String getUf_identidade_conjuge() {
        return this.uf_identidade_conjuge;
    }

    public void setUf_identidade_conjuge(String uf_identidade_conjuge) {
        this.uf_identidade_conjuge = uf_identidade_conjuge;
    }

    public String getCpf_conjuge() {
        return this.cpf_conjuge;
    }

    public void setCpf_conjuge(String cpf_conjuge) {
        this.cpf_conjuge = cpf_conjuge;
    }

    public String getProfissao_atividade() {
        return this.profissao_atividade;
    }

    public void setProfissao_atividade(String profissao_atividade) {
        this.profissao_atividade = profissao_atividade;
    }
 

    public DadosEstadoCivil() {
    }

    public DadosPessoais getDadosPessoais() {
        return this.dadosPessoais;
    }

    public void setDadosPessoais(DadosPessoais dadosPessoais) {
        this.dadosPessoais = dadosPessoais;
    }

    public DadosEstadoCivil(String nome_completo_conjuge, Date data_nascimento_conjuge, String identidade_conjuge, String uf_identidade_conjuge, String cpf_conjuge, String profissao_atividade, String estado_civil, DadosPessoais dadosPessoais) {
        this.nome_completo_conjuge = nome_completo_conjuge;
        this.data_nascimento_conjuge = data_nascimento_conjuge;
        this.identidade_conjuge = identidade_conjuge;
        this.uf_identidade_conjuge = uf_identidade_conjuge;
        this.cpf_conjuge = cpf_conjuge;
        this.profissao_atividade = profissao_atividade;
        this.estado_civil = estado_civil;
        this.dadosPessoais = dadosPessoais;
    }




}
