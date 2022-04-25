package pb.prev.rhback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pb.prev.rhback.model.SituacaoColaborador;
import pb.prev.rhback.model.SituacaoColaborador;
 
@Repository
public interface SituacaoColaboradorRepository extends JpaRepository<SituacaoColaborador, Long>{
 /*    SituacaoColaborador findByDadosPessoais_Id(Long id); */
}
  