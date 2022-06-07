package pb.prev.rhback.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import pb.prev.rhback.model.FotoColaborador;



public interface FotoColaboradorRepository extends JpaRepository<FotoColaborador, Long> {
	Optional<FotoColaborador>  findByDadosPessoais_Id(Long id);
}
