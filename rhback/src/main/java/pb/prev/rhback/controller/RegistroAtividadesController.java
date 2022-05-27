package pb.prev.rhback.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pb.prev.rhback.model.RegistroAtividade;
import pb.prev.rhback.repository.RegistroAtividadesRepository;

@CrossOrigin(origins = "${servidor-porta}")
@RestController
@RequestMapping("/api/v27/")
public class RegistroAtividadesController {

	@Autowired
	private RegistroAtividadesRepository registroAtividadeRepository;
     
 
	@GetMapping("/registros")
	public List<RegistroAtividade> getAllRegistroAtividade() {
		return registroAtividadeRepository.findAll();
	}

	@PostMapping("/registros")
	public RegistroAtividade createRegistroAtividade(@RequestBody RegistroAtividade registros) {
		return registroAtividadeRepository.save(registros);
	}

	/* @GetMapping("/registros/{id}")
	public ResponseEntity<RegistroAtividade> getAllRegistroAtividade(@PathVariable Long id) {
		RegistroAtividade registros = registroAtividadeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("RegistroAtividade not exist with id: " + id));

		return ResponseEntity.ok(registros);
	} */

    @GetMapping("/registros/{id}")
	public ResponseEntity<RegistroAtividade> getRegistroAtividadeByForeignKey(@PathVariable Long id) {
		RegistroAtividade registroAtividade = registroAtividadeRepository.findByDadosPessoais_Id(id);
		return ResponseEntity.ok(registroAtividade); 
	}


	@DeleteMapping("/registros/{id}")  
	private void deleteBook(@PathVariable("id") Long id)   
	{  
		registroAtividadeRepository.deleteById(id);
	} 


	@GetMapping("/registrosC/{id}")
	public List<RegistroAtividade> getUsuarioCByForeignKey(@PathVariable Long id) {
		return registroAtividadeRepository.findByUsuarioU_IdOrUsuarioC_Id(id,id);
	}
	/* @GetMapping("/registrosU/{id}")
	public List<RegistroAtividade> getUsuarioUByForeignKey(@PathVariable Long id) {
		return registroAtividadeRepository.findByUsuarioU_Id(id);
	} */

}
