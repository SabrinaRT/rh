package pb.prev.rhback.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import   pb.prev.rhback.exception.ResourceNotFoundException;

import  pb.prev.rhback.model.Dependentes;
import  pb.prev.rhback.repository.DependentesRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v3/")
public class DependentesController {

	@Autowired
	private DependentesRepository dependentesRepository;
    

	@GetMapping("/dados")
	public List<Dependentes> getAllDependentes() {
		return dependentesRepository.findAll();
	}

	@PostMapping("/dados")
	public Dependentes createDependentes(@RequestBody Dependentes dependentes) {
		return dependentesRepository.save(dependentes);
	}

	@GetMapping("/dados/{id}")
	public ResponseEntity<Dependentes> getAllDependentes(@PathVariable Long id) {
		Dependentes dependentes = dependentesRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Dependentes not exist with id: " + id));

		return ResponseEntity.ok(dependentes);
	}

/* 	@GetMapping("/dados1/{cpf}")
	public ResponseEntity<Dependentes> getAllDependentes(@PathVariable String cpf) {
		Dependentes dependentes = dependentesRepository.findByCpf(cpf);
		return ResponseEntity.ok(dependentes);
	}
 */

	

	@DeleteMapping("/dados/{id}")  
	private void deleteBook(@PathVariable("id") Long id)   
	{  
		dependentesRepository.deleteById(id);
	} 
}
