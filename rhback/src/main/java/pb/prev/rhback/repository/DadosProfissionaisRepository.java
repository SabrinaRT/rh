package  pb.prev.rhback.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import  pb.prev.rhback.model.DadosProfissionais;
@Repository
public interface DadosProfissionaisRepository extends JpaRepository <DadosProfissionais, Long> {
    DadosProfissionais findByDadosPessoais_Id(Long id);

   
}
