package  pb.prev.rhback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import  pb.prev.rhback.model.DadosEstadoCivil;

@Repository
public interface DadosEstadoCivilRepository  extends JpaRepository<DadosEstadoCivil, Long> {
    

    
}
