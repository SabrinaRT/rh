package pb.prev.rhback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pb.prev.rhback.model.RegistroAtividade;

@Repository
public interface RegistroAtividadesRepository extends JpaRepository<RegistroAtividade, Long> {
    
}
