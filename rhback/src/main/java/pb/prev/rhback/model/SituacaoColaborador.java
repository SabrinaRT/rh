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
    @JoinColumn(name = "dadosProfissionaisId", referencedColumnName = "id")
    @JsonBackReference
    private DadosProfissionais dadosProfissionais;


    public SituacaoColaborador() {
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

    public DadosProfissionais getDadosProfissionais() {
        return this.dadosProfissionais;
    }

    public void setDadosProfissionais(DadosProfissionais dadosProfissionais) {
        this.dadosProfissionais = dadosProfissionais;
    }

    public SituacaoColaborador(boolean status, boolean acessoRede, DadosProfissionais dadosProfissionais) {
        this.status = status;
        this.acessoRede = acessoRede;
        this.dadosProfissionais = dadosProfissionais;
    }
    
}
