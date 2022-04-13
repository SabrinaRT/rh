package pb.prev.rhback.model;

import javax.persistence.*;

@Entity
public class Vinculos {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String vinculo;
 
 
    public Vinculos() {
    }
  
    public String getVinculo() {
        return this.vinculo;
    }

    public void setVinculo(String vinculo) {
        this.vinculo = vinculo;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Vinculos(String vinculo) {
        this.vinculo = vinculo;
    }

    
}
