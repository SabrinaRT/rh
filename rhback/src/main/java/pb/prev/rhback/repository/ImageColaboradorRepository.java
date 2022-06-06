package pb.prev.rhback.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import pb.prev.rhback.model.ImageColaborador;



public interface ImageColaboradorRepository extends JpaRepository<ImageColaborador, Long> {
	/* Optional<ImageColaborador> findByName(String name); */
	Optional<ImageColaborador>  findByDadosPessoais_Id(Long id);
}
