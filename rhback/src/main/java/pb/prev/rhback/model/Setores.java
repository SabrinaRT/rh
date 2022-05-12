package pb.prev.rhback.model;


import javax.persistence.*;


@Entity
public class Setores {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String setor;



    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSetor() {
        return this.setor;
    }

    public void setSetor(String setor) {
        this.setor = setor;
    }


    public Setores() {
    }


    public Setores(String setor) {
        this.setor = setor;
    }




    
}
