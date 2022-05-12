package pb.prev.rhback.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
import  pb.prev.rhback.exception.ResourceNotFoundException;

import  pb.prev.rhback.model.DadosPessoais;
import  pb.prev.rhback.repository.DadosPessoaisRepository;
      
@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping("/api/v1/")
public class DadosPessoaisController {

	@Autowired
	private DadosPessoaisRepository processoRepository;
    

	@GetMapping("/dados")
	public List<DadosPessoais> getAllDadosPessoais() {
		return processoRepository.findAll();
	}

	@PostMapping(value="/dados")
	public DadosPessoais createDadosPessoais(@RequestBody DadosPessoais processo) {
		return processoRepository.save(processo);
	}

	@GetMapping(value="/dados/{id}")
	public ResponseEntity<DadosPessoais> getAllDadosPessoais(@PathVariable Long id) {
		DadosPessoais processo = processoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("DadosPessoais not exist with id: " + id));

		return ResponseEntity.ok(processo);
	}
 
	@GetMapping("/dados1/{cpf}")
	public ResponseEntity<DadosPessoais> getAllDadosPessoais(@PathVariable String cpf) {
		DadosPessoais processo = processoRepository.findByCpf(cpf);
		return ResponseEntity.ok(processo);
	}

 
	

	@DeleteMapping("/dados/{id}")  
	private void deleteBook(@PathVariable("id") Long id)   
	{  
		processoRepository.deleteById(id);
	} 
}
