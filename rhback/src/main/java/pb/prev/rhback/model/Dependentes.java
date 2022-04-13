package  pb.prev.rhback.model;

import javax.persistence.*;
import java.util.*;

import com.fasterxml.jackson.annotation.*;


@Entity
@Table(name = "dependentes")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Dependentes {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
    private String nome_completo_dependente;
    private String cpf_dependente;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date data_nascimento_dependente;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
	@JoinColumn(name = "id_colaborador")
    @JsonBackReference
	private DadosPessoais dadosPessoais;

     
 

    public Dependentes() {
    }

    public Dependentes(String nome_completo_dependente, String cpf_dependente, Date data_nascimento_dependente, DadosPessoais dadosPessoais) {
        this.nome_completo_dependente = nome_completo_dependente;
        this.cpf_dependente = cpf_dependente;
        this.data_nascimento_dependente = data_nascimento_dependente;
        this.dadosPessoais = dadosPessoais;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome_completo_dependente() {
        return this.nome_completo_dependente;
    }

    public void setNome_completo_dependente(String nome_completo_dependente) {
        this.nome_completo_dependente = nome_completo_dependente;
    }

    public String getCpf_dependente() {
        return this.cpf_dependente;
    }

    public void setCpf_dependente(String cpf_dependente) {
        this.cpf_dependente = cpf_dependente;
    }

    public Date getData_nascimento_dependente() {
        return this.data_nascimento_dependente;
    }

    public void setData_nascimento_dependente(Date data_nascimento_dependente) {
        this.data_nascimento_dependente = data_nascimento_dependente;
    }

    public DadosPessoais getDadosPessoais() {
        return this.dadosPessoais;
    }

    public void setDadosPessoais(DadosPessoais dadosPessoais) {
        this.dadosPessoais = dadosPessoais;
    }

}
