package pb.prev.rhback.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import   pb.prev.rhback.exception.ResourceNotFoundException;

import  pb.prev.rhback.model.TiposDocumentos;
import  pb.prev.rhback.repository.TiposDocumentosRepository;

@CrossOrigin(origins = "${servidor-porta}")
@RestController
@RequestMapping("/api/v26/")
public class  TiposDocumentosController {

	@Autowired
	private TiposDocumentosRepository documentosRepository;
    

	@GetMapping("/dados")
	public List<TiposDocumentos> getAllDocumentos() {
		return documentosRepository.findAll();
	}

	@PostMapping("/dados")
	public TiposDocumentos createDocumentos(@RequestBody TiposDocumentos documentos) {
		return documentosRepository.save(documentos);
	}
  
	@GetMapping("/dados/{id}")
	public ResponseEntity<TiposDocumentos> getAllDocumentos(@PathVariable Long id) {
		TiposDocumentos documentos = documentosRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Documentos not exist with id: " + id));

		return ResponseEntity.ok(documentos);
	}

	@DeleteMapping("/dados/{id}")  
	private void deleteBook(@PathVariable("id") Long id)   
	{  
		documentosRepository.deleteById(id);
	} 
}
