package  pb.prev.rhback.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.*;

@Entity
@Table(name="dados_bancarios")
public class DadosBancarios {

    @Id  
	private long id;
    private String banco;
    private String codigo;
    private String agencia;
    private String conta_corrente;


@OneToOne(cascade = CascadeType.MERGE)
@JoinColumn(name="dadosPessoaisId", referencedColumnName = "id")
private DadosPessoais dadosPessoais;

    

 
    public DadosBancarios() {
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getBanco() {
        return this.banco;
    }

    public void setBanco(String banco) {
        this.banco = banco;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getAgencia() {
        return this.agencia;
    }

    public void setAgencia(String agencia) {
        this.agencia = agencia;
    }

    public String getConta_corrente() {
        return this.conta_corrente;
    }

    public void setConta_corrente(String conta_corrente) {
        this.conta_corrente = conta_corrente;
    }

    public DadosPessoais getDadosPessoais() {
        return this.dadosPessoais;
    }

    public void setDadosPessoais(DadosPessoais dadosPessoais) {
        this.dadosPessoais = dadosPessoais;
    }

    public DadosBancarios(String banco, String codigo, String agencia, String conta_corrente, DadosPessoais dadosPessoais) {
        this.banco = banco;
        this.codigo = codigo;
        this.agencia = agencia;
        this.conta_corrente = conta_corrente;
        this.dadosPessoais = dadosPessoais;
    }
 
}
