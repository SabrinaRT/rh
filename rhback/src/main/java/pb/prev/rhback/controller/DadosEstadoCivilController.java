package pb.prev.rhback.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import pb.prev.rhback.model.DadosEstadoCivil;
import  pb.prev.rhback.repository.DadosEstadoCivilRepository;

@CrossOrigin(origins = "${servidor-porta}")
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
	public ResponseEntity<DadosEstadoCivil> getEstadoCivilByForeignKey(@PathVariable Long id) {
		DadosEstadoCivil estadoCivil = estadoCivilRepository.findByDadosPessoais_Id(id);
		return ResponseEntity.ok(estadoCivil); 
	}
 

	

	@DeleteMapping("/dados/{id}")  
	private void deleteBook(@PathVariable("id") Long id)   
	{  
		estadoCivilRepository.deleteById(id);
	} 
}
