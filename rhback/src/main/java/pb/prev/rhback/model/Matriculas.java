package pb.prev.rhback.model;

import javax.persistence.*;
import java.util.*;

import com.fasterxml.jackson.annotation.*;

@Entity
public class Matriculas {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String matricula;
    private String observacao;
    
     
  /*   @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "idDadosProfissionais")
    private DadosProfissionais dadosProfissionais; */

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
	@JoinColumn(name = "idDadosPessoais")
    @JsonBackReference
	private DadosPessoais dadosPessoais;

    public Matriculas() {
    }
  

    public Matriculas(String matricula, String observacao, DadosPessoais dadosPessoais) {
        this.matricula = matricula;
        this.observacao = observacao;
        this.dadosPessoais = dadosPessoais;
    }


    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMatricula() {
        return this.matricula;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public String getObservacao() {
        return this.observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public DadosPessoais getDadosPessoais() {
        return this.dadosPessoais;
    }

    public void setDadosPessoais(DadosPessoais dadosPessoais) {
        this.dadosPessoais = dadosPessoais;
    }

  
   
}