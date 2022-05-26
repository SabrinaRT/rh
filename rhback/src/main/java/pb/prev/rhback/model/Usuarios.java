package  pb.prev.rhback.model;

import javax.persistence.*;
@Entity
@Table(name="usuarios")
public class Usuarios {

    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

    private String usuario;
    private String senha;
    private String nivel;

    public Usuarios( String usuario, String senha, String nivel) {
        this.usuario = usuario;
        this.senha = senha;
        this.nivel = nivel;
    }

    public Usuarios() {
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
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
}
