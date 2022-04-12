package pb.prev.rhback.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import  pb.prev.rhback.exception.ResourceNotFoundException;

import pb.prev.rhback.model.DadosEstadoCivil;
import  pb.prev.rhback.repository.DadosEstadoCivilRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v2/")
public class DadosEstadoCivilController {

	@Autowired
	private DadosEstadoCivilRepository estadoCivilRepository;
    

	@GetMapping("/dados")
	public List<DadosEstadoCivil> getAllEstadoCivil() {
		return estadoCivilRepository.findAll();
	}
  
	@PostMapping("/dados")
	public DadosEstadoCivil createEstadoCivil(@RequestBody DadosEstadoCivil estadoCivil) {
		return estadoCivilRepository.save(estadoCivil);
	}

	@GetMapping("/dados/{id}")
	public ResponseEntity<DadosEstadoCivil> getAllEstadoCivil(@PathVariable Long id) {
		DadosEstadoCivil estadoCivil = estadoCivilRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("EstadoCivil not exist with id: " + id));

		return ResponseEntity.ok(estadoCivil);
	}

/* 	@GetMapping("/dados1/{cpf}")
	public ResponseEntity<DadosEstadoCivil> getAllEstadoCivil2(@PathVariable Long cpf) {
		DadosEstadoCivil estadoCivil = estadoCivilRepository.getDadosPessoaisByIdColaborador (cpf);
		return ResponseEntity.ok(estadoCivil);
	}
 */

	

	@DeleteMapping("/dados/{id}")  
	private void deleteBook(@PathVariable("id") Long id)   
	{  
		estadoCivilRepository.deleteById(id);
	} 
}
