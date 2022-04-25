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
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
	@JoinColumn(name = "dadosPessoaisId")
    @JsonBackReference
    public DadosPessoais dadosPessoais;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
	@JoinColumn(name = "documentos_id")
    @JsonBackReference
    public Documentos documentos;

    private Boolean status;
    private String nome_documento_upload;
    


    


    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome_documento_upload() {
        return this.nome_documento_upload;
    }

    public void setNome_documento_upload(String nome_documento_upload) {
        this.nome_documento_upload = nome_documento_upload;
    }

    public DadosPessoais getDadosPessoais() {
        return this.dadosPessoais;
    }

    public void setDadosPessoais(DadosPessoais dadosPessoais) {
        this.dadosPessoais = dadosPessoais;
    }

    public Documentos getDocumentos() {
        return this.documentos;
    }

    public void setDocumentos(Documentos documentos) {
        this.documentos = documentos;
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

    public DocumentosColaboradores(DadosPessoais dadosPessoais, Documentos documentos, Boolean status, String nome_documento_upload) {
        this.dadosPessoais = dadosPessoais;
        this.documentos = documentos;
        this.status = status;
        this.nome_documento_upload = nome_documento_upload;
    }
    

    public DocumentosColaboradores() {
    }


}
