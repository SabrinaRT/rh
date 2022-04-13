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

    
    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "idDadosProfissionais")
    private DadosProfissionais dadosProfissionais;



    public Matriculas(String matricula) {
        this.matricula = matricula;
    
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


    public DadosProfissionais getDadosProfissionais() {
        return this.dadosProfissionais;
    }

    public void setDadosProfissionais(DadosProfissionais dadosProfissionais) {
        this.dadosProfissionais = dadosProfissionais;
    }

    public Matriculas(String matricula, DadosProfissionais dadosProfissionais) {
        this.matricula = matricula;
        this.dadosProfissionais = dadosProfissionais;
    }
    

    
}
