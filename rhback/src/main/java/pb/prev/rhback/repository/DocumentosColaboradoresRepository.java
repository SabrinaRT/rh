package pb.prev.rhback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pb.prev.rhback.model.DocumentosColaboradores;

@Repository
public interface DocumentosColaboradoresRepository extends JpaRepository<DocumentosColaboradores,Long>{
    
}
