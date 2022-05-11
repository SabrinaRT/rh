package  pb.prev.rhback.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import  pb.prev.rhback.model.DadosProfissionais;
import java.util.*;
@Repository
public interface DadosProfissionaisRepository extends JpaRepository <DadosProfissionais, Long> {
    DadosProfissionais findByDadosPessoais_Id(Long id);
    
    long countByVinculos(Long id);
  
  
}
