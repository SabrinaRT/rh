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
    private Usuarios usuario_c;

    @ManyToOne(optional = false)
    @JoinColumn(name = "usuario_u")
    private Usuarios usuario_u;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date data_c;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date data_u;

    @ManyToOne(optional = false)
    @JoinColumn(name = "dados_pessoais_id")
    private DadosPessoais dadosPessoais;

    
    public RegistroAtividade() {
    }


    public Usuarios getUsuario_c() {
        return this.usuario_c;
    }

    public void setUsuario_c(Usuarios usuario_c) {
        this.usuario_c = usuario_c;
    }

    public Usuarios getUsuario_u() {
        return this.usuario_u;
    }

    public void setUsuario_u(Usuarios usuario_u) {
        this.usuario_u = usuario_u;
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


    public RegistroAtividade(Usuarios usuario_c, Usuarios usuario_u, Date data_c, Date data_u, DadosPessoais dadosPessoais) {
        this.usuario_c = usuario_c;
        this.usuario_u = usuario_u;
        this.data_c = data_c;
        this.data_u = data_u;
        this.dadosPessoais = dadosPessoais;
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


}
