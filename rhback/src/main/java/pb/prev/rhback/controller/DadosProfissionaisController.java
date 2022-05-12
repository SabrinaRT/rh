package pb.prev.rhback.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import  pb.prev.rhback.model.DadosProfissionais;
import  pb.prev.rhback.repository.DadosProfissionaisRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v6/")
public class DadosProfissionaisController {

	@Autowired
	private DadosProfissionaisRepository dadosProfissionaisRepository;
    
 
	@GetMapping("/dados")
	public List<DadosProfissionais> getAllDadosProfissionais() {
		return dadosProfissionaisRepository.findAll();
	}

	@PostMapping("/dados")
	public DadosProfissionais createDadosProfissionais(@RequestBody DadosProfissionais dadosProfissionais) {
		return dadosProfissionaisRepository.save(dadosProfissionais);
	}

	/* @GetMapping("/dados/{id}")
	public ResponseEntity<DadosProfissionais> getAllDadosProfissionais(@PathVariable Long id) {
		DadosProfissionais dadosProfissionais = dadosProfissionaisRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("DadosProfissionais not exist with id: " + id));

		return ResponseEntity.ok(dadosProfissionais);
	} */

	@GetMapping("/dados/{id}")
	public ResponseEntity<DadosProfissionais> getDadosProfissionaisByForeignKey(@PathVariable Long id) {
		DadosProfissionais dadosProfissionais = dadosProfissionaisRepository.findByDadosPessoais_Id(id);
		return ResponseEntity.ok(dadosProfissionais); 
	}

	
	

	@DeleteMapping("/dados/{id}")  
	private void deleteBook(@PathVariable("id") Long id)   
	{  
		dadosProfissionaisRepository.deleteById(id);
	} 
}
