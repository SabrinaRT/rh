package pb.prev.rhback.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import   pb.prev.rhback.exception.ResourceNotFoundException;

import  pb.prev.rhback.model.Vinculos;
import  pb.prev.rhback.repository.VinculosRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v11/")
public class VinculosController {

	@Autowired
	private VinculosRepository vinculosRepository;
    

	@GetMapping("/dados")
	public List<Vinculos> getAllVinculos() {
		return vinculosRepository.findAll();
	}

	@PostMapping("/dados")
	public Vinculos createVinculos(@RequestBody Vinculos vinculos) {
		return vinculosRepository.save(vinculos);
	}

	@GetMapping("/dados/{id}")
	public ResponseEntity<Vinculos> getAllVinculos(@PathVariable Long id) {
		Vinculos vinculos = vinculosRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Vinculos not exist with id: " + id));

		return ResponseEntity.ok(vinculos);
	}

	@DeleteMapping("/dados/{id}")  
	private void deleteBook(@PathVariable("id") Long id)   
	{  
		vinculosRepository.deleteById(id);
	} 
}
