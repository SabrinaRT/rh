package pb.prev.rhback.model;

import java.util.*;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "registro_atividade")
public class RegistroAtividade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_c")
    private Usuarios usuarioC;

    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_u")
    private Usuarios usuarioU;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date data_c;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date data_u;

    @ManyToOne(optional = false)
    @JoinColumn(name = "dados_pessoais_id")
    private DadosPessoais dadosPessoais;

    
    public RegistroAtividade() {
    }



    public Usuarios getUsuarioC() {
        return this.usuarioC;
    }

    public void setUsuarioC(Usuarios usuarioC) {
        this.usuarioC = usuarioC;
    }

    public Usuarios getUsuarioU() {
        return this.usuarioU;
    }

    public void setUsuarioU(Usuarios usuarioU) {
        this.usuarioU = usuarioU;
    }

    public Date getData_c() {
        return this.data_c;
    }

    public void setData_c(Date data_c) {
        this.data_c = data_c;
    }

    public Date getData_u() {
        return this.data_u;
    }

    public void setData_u(Date data_u) {
        this.data_u = data_u;
    }
    

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DadosPessoais getDadosPessoais() {
        return this.dadosPessoais;
    }

    public void setDadosPessoais(DadosPessoais dadosPessoais) {
        this.dadosPessoais = dadosPessoais;
    }


    public RegistroAtividade(Usuarios usuarioC, Usuarios usuarioU, Date data_c, Date data_u, DadosPessoais dadosPessoais) {
        this.usuarioC = usuarioC;
        this.usuarioU = usuarioU;
        this.data_c = data_c;
        this.data_u = data_u;
        this.dadosPessoais = dadosPessoais;
    }

}
