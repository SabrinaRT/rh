package pb.prev.rhback.model;

import javax.persistence.*;
import java.util.*;

import com.fasterxml.jackson.annotation.*;

@Entity
@Table(name = "dados_profissionais")
public class DadosProfissionais {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String cargo;
    private String escolaridade;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date data_admissao;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date data_exoneracao;
    private String qualificacao_profissional;
    private String funcao;

    /*
     * @OneToOne
     * 
     * @MapsId
     * 
     * @JoinColumn(name = "id")
     * 
     * @JsonBackReference
     * private DadosPessoais dadosPessoais;
     */
    /*
     * @OneToOne
     * 
     * @JoinColumn(updatable=false)
     * private DadosPessoais dadosPessoais;
     */

    /*
     * @OneToOne(cascade = CascadeType.ALL)
     * 
     * @MapsId
     * 
     * @JoinColumn(name = "id")
     * 
     * @JsonBackReference
     * private DadosPessoais dadosPessoais;
     */

    @OneToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "dadosPessoaisId", referencedColumnName = "id")
    private DadosPessoais dadosPessoais;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "idSetor")
    private Setores setores;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "idVinculo")
    private Vinculos vinculos;

    
  
    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCargo() {
        return this.cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getEscolaridade() {
        return this.escolaridade;
    }

    public void setEscolaridade(String escolaridade) {
        this.escolaridade = escolaridade;
    }

    public Date getData_admissao() {
        return this.data_admissao;
    }

    public void setData_admissao(Date data_admissao) {
        this.data_admissao = data_admissao;
    }

    public Date getData_exoneracao() {
        return this.data_exoneracao;
    }

    public void setData_exoneracao(Date data_exoneracao) {
        this.data_exoneracao = data_exoneracao;
    }

    public String getQualificacao_profissional() {
        return this.qualificacao_profissional;
    }

    public void setQualificacao_profissional(String qualificacao_profissional) {
        this.qualificacao_profissional = qualificacao_profissional;
    }

    public String getFuncao() {
        return this.funcao;
    }

    public void setFuncao(String funcao) {
        this.funcao = funcao;
    }

    public DadosPessoais getDadosPessoais() {
        return this.dadosPessoais;
    }

    public void setDadosPessoais(DadosPessoais dadosPessoais) {
        this.dadosPessoais = dadosPessoais;
    }

    public Vinculos getVinculos() {
        return this.vinculos;
    }

    public void setVinculos(Vinculos vinculos) {
        this.vinculos = vinculos;
    }

    public Setores getSetores() {
        return this.setores;
    }

    public void setSetores(Setores setores) {
        this.setores = setores;
    }


    
    

    public DadosProfissionais(String cargo, String escolaridade, Date data_admissao, Date data_exoneracao, String qualificacao_profissional, String funcao, DadosPessoais dadosPessoais, Setores setores, Vinculos vinculos) {
        this.cargo = cargo;
        this.escolaridade = escolaridade;
        this.data_admissao = data_admissao;
        this.data_exoneracao = data_exoneracao;
        this.qualificacao_profissional = qualificacao_profissional;
        this.funcao = funcao;
        this.dadosPessoais = dadosPessoais;
        this.setores = setores;
        this.vinculos = vinculos;
        
    }

    

    public DadosProfissionais() {
    }

}
