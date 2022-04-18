package  pb.prev.rhback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import  pb.prev.rhback.model.DadosBancarios;

@Repository
public interface DadosBancariosRepository extends JpaRepository<DadosBancarios,Long> {
    DadosBancarios findByDadosPessoais_Id(Long id);
}
 