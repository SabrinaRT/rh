package pb.prev.rhback.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import   pb.prev.rhback.exception.ResourceNotFoundException;

import  pb.prev.rhback.model.DocumentosColaboradores;
import  pb.prev.rhback.repository.DocumentosColaboradoresRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v27/")
public class DocumentosColaboradoresController {

	

	@Autowired
	private DocumentosColaboradoresRepository documentosColaboradoresRepository;
    

	@GetMapping("/dados")
	public List<DocumentosColaboradores> getAllDocumentosColaboradores() {
		return documentosColaboradoresRepository.findAll();
	}

	@PostMapping("/dados")
	public DocumentosColaboradores createDocumentosColaboradores(@RequestBody DocumentosColaboradores documentos) {
		
		return documentosColaboradoresRepository.save(documentos);
	}

	/* @GetMapping("/dados/{id}")
	public List<DocumentosColaboradores> getDocumentosColaboradoresByForeignKey(@PathVariable Long id) {
		DocumentosColaboradores documentosColaboradores = documentosColaboradoresRepository.findByDadosPessoais_Id(id);
		return documentosColaboradoresRepository.findByDadosPessoais_Id(id);
	} */

	/* @GetMapping("/dados/{id}")
	public ResponseEntity<DocumentosColaboradores> getAllDocumentosColaboradores(@PathVariable Long id) {
		DocumentosColaboradores documentos = documentosColaboradores.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("DocumentosColaboradores not exist with id: " + id));

		return ResponseEntity.ok(documentos);
	} */

	@DeleteMapping("/dados/{id}")  
	private void deleteBook(@PathVariable("id") Long id)   
	{  
		

		documentosColaboradoresRepository.deleteById(id);
	} 
}
