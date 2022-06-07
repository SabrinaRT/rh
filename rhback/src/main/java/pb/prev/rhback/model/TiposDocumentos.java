package pb.prev.rhback.model;


import javax.persistence.*;


@Entity
public class TiposDocumentos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipo;

      public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipo() {
        return this.tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
 
    public TiposDocumentos(String tipo) {
        this.tipo = tipo;
    }
    

    public TiposDocumentos() {
    }

}
