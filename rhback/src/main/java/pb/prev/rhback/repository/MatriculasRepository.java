package pb.prev.rhback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pb.prev.rhback.model.Matriculas;
 
@Repository
public interface MatriculasRepository extends JpaRepository<Matriculas, Long>{

    
}
