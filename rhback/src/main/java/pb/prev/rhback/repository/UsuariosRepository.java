package  pb.prev.rhback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import  pb.prev.rhback.model.Usuarios;
import java.util.*;

@Repository
public interface UsuariosRepository extends  JpaRepository<Usuarios, Long> {
    
   /*  Usuarios findByUsuario(String usuario); */

    Usuarios findByUsuarioAndSenha(String usuario, String senha);
}
