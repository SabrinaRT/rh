package pb.prev.rhback.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import  pb.prev.rhback.exception.ResourceNotFoundException;

import  pb.prev.rhback.model.DadosBancarios;
import  pb.prev.rhback.repository.DadosBancariosRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v4/")
public class DadosBancariosController {

	@Autowired
	private DadosBancariosRepository dadosBancariosRepository;
    

	@GetMapping("/dados")
	public List<DadosBancarios> getAllDadosBancarios() {
		return dadosBancariosRepository.findAll();
	}

	@PostMapping("/dados")
	public DadosBancarios createDadosBancarios(@RequestBody DadosBancarios dadosBancarios) {
		return dadosBancariosRepository.save(dadosBancarios);
	}

	@GetMapping("/dados/{id}")
	public ResponseEntity<DadosBancarios> getAllDadosBancarios(@PathVariable Long id) {
		DadosBancarios dadosBancarios = dadosBancariosRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("DadosBancarios not exist with id: " + id));

		return ResponseEntity.ok(dadosBancarios);
	}

/* 	@GetMapping("/dados1/{cpf}")
	public ResponseEntity<DadosBancarios> getAllDadosBancarios(@PathVariable String cpf) {
		DadosBancarios dadosBancarios = dadosBancariosRepository.findByCpf(cpf);
		return ResponseEntity.ok(dadosBancarios);
	}
 */

	

	@DeleteMapping("/dados/{id}")  
	private void deleteBook(@PathVariable("id") Long id)   
	{  
		dadosBancariosRepository.deleteById(id);
	} 
}
