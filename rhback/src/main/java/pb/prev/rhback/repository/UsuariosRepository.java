package  pb.prev.rhback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import  pb.prev.rhback.model.Usuarios;

public interface UsuariosRepository extends  JpaRepository<Usuarios, Long> {
    
}
