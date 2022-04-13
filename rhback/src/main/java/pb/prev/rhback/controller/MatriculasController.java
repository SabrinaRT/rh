package pb.prev.rhback.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import   pb.prev.rhback.exception.ResourceNotFoundException;

import  pb.prev.rhback.model.Matriculas;
import  pb.prev.rhback.repository.MatriculasRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v12/")
public class MatriculasController {

	@Autowired
	private MatriculasRepository setoresRepository;
    

	@GetMapping("/dados")
	public List<Matriculas> getAllMatriculas() {
		return setoresRepository.findAll();
	}

	@PostMapping("/dados")
	public Matriculas createMatriculas(@RequestBody Matriculas setores) {
		return setoresRepository.save(setores);
	}

	@GetMapping("/dados/{id}")
	public ResponseEntity<Matriculas> getAllMatriculas(@PathVariable Long id) {
		Matriculas setores = setoresRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Matriculas not exist with id: " + id));

		return ResponseEntity.ok(setores);
	}

	@DeleteMapping("/dados/{id}")  
	private void deleteBook(@PathVariable("id") Long id)   
	{  
		setoresRepository.deleteById(id);
	} 
}
