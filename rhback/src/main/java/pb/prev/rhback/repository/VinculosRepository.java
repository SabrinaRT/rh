package pb.prev.rhback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pb.prev.rhback.model.Vinculos;
 
@Repository
public interface VinculosRepository  extends JpaRepository<Vinculos, Long> {
    
} 
