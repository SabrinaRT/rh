package pb.prev.rhback.model;

import java.util.List;
import java.util.*;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Documentos {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nome_documento;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "documentos")
    @JsonManagedReference
    private Set<DocumentosColaboradores> documentosColaboradores  = new HashSet<DocumentosColaboradores>();


    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome_documento() {
        return this.nome_documento;
    }

    public void setNome_documento(String nome_documento) {
        this.nome_documento = nome_documento;
    }

    public Set<DocumentosColaboradores> getDocumentosColaboradores() {
        return this.documentosColaboradores;
    }

    public void setDocumentosColaboradores(Set<DocumentosColaboradores> documentosColaboradores) {
        this.documentosColaboradores = documentosColaboradores;
    }

    public Documentos(String nome_documento, Set<DocumentosColaboradores> documentosColaboradores) {
        this.nome_documento = nome_documento;
        this.documentosColaboradores = documentosColaboradores;
    }
 

    public Documentos() {
    }
    
}
