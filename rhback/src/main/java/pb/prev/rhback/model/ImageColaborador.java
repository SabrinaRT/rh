package pb.prev.rhback.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "image_colaborador")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageColaborador {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "type")
	private String type;

	@Column(name = "image", unique = false, nullable = false, length = 100000)
	private byte[] image;

	@OneToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name="dadosPessoaisId", referencedColumnName = "id")
    private DadosPessoais dadosPessoais;

	
}