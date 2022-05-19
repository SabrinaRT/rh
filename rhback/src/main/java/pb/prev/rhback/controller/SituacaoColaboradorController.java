package pb.prev.rhback.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import   pb.prev.rhback.exception.ResourceNotFoundException;

import  pb.prev.rhback.model.SituacaoColaborador;
import  pb.prev.rhback.repository.SituacaoColaboradorRepository;

@CrossOrigin(origins = "${servidor-porta}")
@RestController
@RequestMapping("/api/v20/")
public class SituacaoColaboradorController {

	@Autowired
	private SituacaoColaboradorRepository situacaoColaboradorRepository;
    

	@GetMapping("/dados")
	public List<SituacaoColaborador> getAllSituacaoColaborador() {
		return situacaoColaboradorRepository.findAll();
	}
 
	@PostMapping("/dados")
	public SituacaoColaborador createSituacaoColaborador(@RequestBody SituacaoColaborador situacaoColaborador) {
		return situacaoColaboradorRepository.save(situacaoColaborador);
	}
  
	@GetMapping("/dados/{id}")
	public ResponseEntity<SituacaoColaborador> getAllSituacaoColaborador(@PathVariable Long id) {
		SituacaoColaborador situacaoColaborador = situacaoColaboradorRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("SituacaoColaborador not exist with id: " + id));

		return ResponseEntity.ok(situacaoColaborador);
	}
  
   /*  @GetMapping("/dados/{id}")
	public ResponseEntity<SituacaoColaborador> getSituacaoColaboradorByForeignKey(@PathVariable Long id) {
		SituacaoColaborador situacaoColaborador = situacaoColaboradorRepository.findByDadosPessoais_Id(id);
		return ResponseEntity.ok(situacaoColaborador); 
	}
 */

	@DeleteMapping("/dados/{id}")  
	private void deleteBook(@PathVariable("id") Long id)   
	{  
		situacaoColaboradorRepository.deleteById(id);
	} 
}
