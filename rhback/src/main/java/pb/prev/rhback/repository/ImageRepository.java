package pb.prev.rhback.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import pb.prev.rhback.model.Image;



public interface ImageRepository extends JpaRepository<Image, Long> {
/* 	Optional<Image> findByName(String name); */
}
