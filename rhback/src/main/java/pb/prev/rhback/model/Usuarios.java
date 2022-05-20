package  pb.prev.rhback.model;


import javax.persistence.*;

import com.fasterxml.jackson.annotation.*;



@Entity
@Table(name="usuarios")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Usuarios {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

    private String nome_completo;
    private String usuario;
    private String senha;
    private String nivel;



    public Usuarios() {
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome_completo() {
        return this.nome_completo;
    }

    public void setNome_completo(String nome_completo) {
        this.nome_completo = nome_completo;
    }

    public String getUsuario() {
        return this.usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getSenha() {
        return this.senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getNivel() {
        return this.nivel;
    }

    public void setNivel(String nivel) {
        this.nivel = nivel;
    }
 

   /*  public List<DadosPessoais> getDadosPessoais() {
        return this.dadosPessoais;
    }

    public void setDadosPessoais(List<DadosPessoais> dadosPessoais) {
        this.dadosPessoais = dadosPessoais;
    }


    public Usuarios(String nome_completo, String usuario, String senha, String nivel, List<DadosPessoais> dadosPessoais) {
        this.nome_completo = nome_completo;
        this.usuario = usuario;
        this.senha = senha;
        this.nivel = nivel;
        this.dadosPessoais = dadosPessoais;
    } */
   
}
