package pb.prev.rhback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pb.prev.rhback.model.TiposDocumentos;

@Repository
public interface TiposDocumentosRepository extends JpaRepository<TiposDocumentos,Long> {
    
}
