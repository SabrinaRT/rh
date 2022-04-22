package pb.prev.rhback.model;
import javax.persistence.*;
import java.util.*;

import com.fasterxml.jackson.annotation.*;
@Entity
public class SituacaoColaborador {
   
    @Id
    @GeneratedValue(strategy =GenerationType.AUTO)
    private Long id;
 
    private boolean status;
    private boolean acessoRede;

    @OneToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "dadosPessoaisId", referencedColumnName = "id")
    @JsonBackReference
    private DadosPessoais dadosPessoais;


    public SituacaoColaborador() {
    }
 

    public SituacaoColaborador(boolean status, boolean acessoRede, DadosPessoais dadosPessoais) {
        this.status = status;
        this.acessoRede = acessoRede;
        this.dadosPessoais = dadosPessoais;
    }
   

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isStatus() {
        return this.status;
    }

    public boolean getStatus() {
        return this.status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public boolean isAcessoRede() {
        return this.acessoRede;
    }

    public boolean getAcessoRede() {
        return this.acessoRede;
    }

    public void setAcessoRede(boolean acessoRede) {
        this.acessoRede = acessoRede;
    }

    public DadosPessoais getDadosPessoais() {
        return this.dadosPessoais;
    }

    public void setDadosPessoais(DadosPessoais dadosPessoais) {
        this.dadosPessoais = dadosPessoais;
    }
    
}
