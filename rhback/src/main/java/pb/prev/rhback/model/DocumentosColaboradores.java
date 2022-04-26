package pb.prev.rhback.model;

import java.util.List;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class DocumentosColaboradores {

    @Id
    @GeneratedValue(strategy  = GenerationType.AUTO)
    private Long id;
    
    @ManyToOne/* (fetch = FetchType.EAGER, cascade = CascadeType.DETACH) */
	@JoinColumn(name = "dadosPessoaisId")
    @JsonBackReference
    private DadosPessoais dadosPessoais;

    private String nome;
    private int tipo;

    private Boolean status;
    private String nome_documento_upload;
    

    public DocumentosColaboradores() {
    }



    public DocumentosColaboradores(DadosPessoais dadosPessoais, String nome, int tipo, Boolean status, String nome_documento_upload) {
        this.dadosPessoais = dadosPessoais;
        this.nome = nome;
        this.tipo = tipo;
        this.status = status;
        this.nome_documento_upload = nome_documento_upload;
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

    public String getNome() {
        return this.nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getTipo() {
        return this.tipo;
    }

    public void setTipo(int tipo) {
        this.tipo = tipo;
    }

    public Boolean isStatus() {
        return this.status;
    }

    public Boolean getStatus() {
        return this.status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getNome_documento_upload() {
        return this.nome_documento_upload;
    }

    public void setNome_documento_upload(String nome_documento_upload) {
        this.nome_documento_upload = nome_documento_upload;
    }


}
