package pb.prev.rhback.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import pb.prev.rhback.model.Logo;



public interface LogoRepository extends JpaRepository<Logo, Long> {
/* 	Optional<Image> findByName(String name); */
}
