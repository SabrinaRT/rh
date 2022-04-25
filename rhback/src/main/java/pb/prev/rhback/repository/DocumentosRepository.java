package pb.prev.rhback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pb.prev.rhback.model.Documentos;

@Repository
public interface DocumentosRepository extends JpaRepository<Documentos,Long> {
    
}
