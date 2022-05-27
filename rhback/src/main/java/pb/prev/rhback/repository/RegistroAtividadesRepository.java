package pb.prev.rhback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pb.prev.rhback.model.RegistroAtividade;
import java.util.*;

@Repository
public interface RegistroAtividadesRepository extends JpaRepository<RegistroAtividade, Long> {
    RegistroAtividade findByDadosPessoais_Id(Long id);


   List<RegistroAtividade> findByUsuarioU_IdOrUsuarioC_Id(Long usuariocId, Long usuariouId); 


}
