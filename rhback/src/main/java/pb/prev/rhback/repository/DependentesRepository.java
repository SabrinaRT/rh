package  pb.prev.rhback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import  pb.prev.rhback.model.Dependentes;

@Repository
public interface DependentesRepository extends JpaRepository<Dependentes, Long> {
    
}
