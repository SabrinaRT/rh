package pb.prev.rhback.model;

import javax.persistence.*;

@Entity
@Table(name = "configuracao_sistema")
public class ConfiguracaoSistema {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String email_informatica;
    private String email_rh;
    private String nome_instituicao;
    private String logo_instituicao;

    public String getEmail_informatica() {
        return this.email_informatica;
    }

    public void setEmail_informatica(String email_informatica) {
        this.email_informatica = email_informatica;
    }

    public String getEmail_rh() {
        return this.email_rh;
    }

    public void setEmail_rh(String email_rh) {
        this.email_rh = email_rh;
    }

    public String getNome_instituicao() {
        return this.nome_instituicao;
    }

    public void setNome_instituicao(String nome_instituicao) {
        this.nome_instituicao = nome_instituicao;
    }

    public String getLogo_instituicao() {
        return this.logo_instituicao;
    }

    public void setLogo_instituicao(String logo_instituicao) {
        this.logo_instituicao = logo_instituicao;
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public ConfiguracaoSistema(String email_informatica, String email_rh, String nome_instituicao,
            String logo_instituicao) {
        this.email_informatica = email_informatica;
        this.email_rh = email_rh;
        this.nome_instituicao = nome_instituicao;
        this.logo_instituicao = logo_instituicao;
    }

    public ConfiguracaoSistema() {
    }

}
