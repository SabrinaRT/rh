package  pb.prev.rhback.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import  pb.prev.rhback.model.DadosPessoais;
@Repository
public interface DadosPessoaisRepository extends JpaRepository<DadosPessoais, Long> {
    DadosPessoais findByCpf(String cpf);
 
    
   
   
}
   