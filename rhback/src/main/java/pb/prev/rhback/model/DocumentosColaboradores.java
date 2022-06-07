package pb.prev.rhback.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class DocumentosColaboradores {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "dadosPessoaisId")
    @JsonBackReference
    
    private DadosPessoais dadosPessoais;
    private int tipo;
    private String nome_documento_upload;

    public DocumentosColaboradores() {
    }

    public DocumentosColaboradores(DadosPessoais dadosPessoais, int tipo, String nome_documento_upload) {
        this.dadosPessoais = dadosPessoais;
        this.tipo = tipo;
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

    public int getTipo() {
        return this.tipo;
    }

    public void setTipo(int tipo) {
        this.tipo = tipo;
    }

    public String getNome_documento_upload() {
        return this.nome_documento_upload;
    }

    public void setNome_documento_upload(String nome_documento_upload) {
        this.nome_documento_upload = nome_documento_upload;
    }

}
