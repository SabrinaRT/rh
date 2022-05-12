package pb.prev.rhback.controller;

import java.util.List;

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
	private MatriculasRepository matriculasRepository;
    

	@GetMapping("/dados")
	public List<Matriculas> getAllMatriculas() {
		return matriculasRepository.findAll();
	}

	@PostMapping("/dados")
	public Matriculas createMatriculas(@RequestBody Matriculas matriculas) {
		return matriculasRepository.save(matriculas);
	}

	@GetMapping("/dados/{id}")
	public ResponseEntity<Matriculas> getAllMatriculas(@PathVariable Long id) {
		Matriculas matriculas = matriculasRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Matriculas not exist with id: " + id));

		return ResponseEntity.ok(matriculas);
	}

	@DeleteMapping("/dados/{id}")  
	private void deleteBook(@PathVariable("id") Long id)   
	{  
		matriculasRepository.deleteById(id);
	} 

	
}
