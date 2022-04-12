package pb.prev.rhback.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import   pb.prev.rhback.exception.ResourceNotFoundException;

import  pb.prev.rhback.model.Setores;
import  pb.prev.rhback.repository.SetoresRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v10/")
public class SetoresController {

	@Autowired
	private SetoresRepository setoresRepository;
    

	@GetMapping("/dados")
	public List<Setores> getAllSetores() {
		return setoresRepository.findAll();
	}

	@PostMapping("/dados")
	public Setores createSetores(@RequestBody Setores setores) {
		return setoresRepository.save(setores);
	}

	@GetMapping("/dados/{id}")
	public ResponseEntity<Setores> getAllSetores(@PathVariable Long id) {
		Setores setores = setoresRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Setores not exist with id: " + id));

		return ResponseEntity.ok(setores);
	}

	@DeleteMapping("/dados/{id}")  
	private void deleteBook(@PathVariable("id") Long id)   
	{  
		setoresRepository.deleteById(id);
	} 
}
