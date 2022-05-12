package pb.prev.rhback.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import   pb.prev.rhback.exception.ResourceNotFoundException;

import  pb.prev.rhback.model.Documentos;
import  pb.prev.rhback.repository.DocumentosRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v26/")
public class  DocumentosController {

	@Autowired
	private DocumentosRepository documentosRepository;
    

	@GetMapping("/dados")
	public List<Documentos> getAllDocumentos() {
		return documentosRepository.findAll();
	}

	@PostMapping("/dados")
	public Documentos createDocumentos(@RequestBody Documentos documentos) {
		return documentosRepository.save(documentos);
	}
  
	@GetMapping("/dados/{id}")
	public ResponseEntity<Documentos> getAllDocumentos(@PathVariable Long id) {
		Documentos documentos = documentosRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Documentos not exist with id: " + id));

		return ResponseEntity.ok(documentos);
	}

	@DeleteMapping("/dados/{id}")  
	private void deleteBook(@PathVariable("id") Long id)   
	{  
		documentosRepository.deleteById(id);
	} 
}
