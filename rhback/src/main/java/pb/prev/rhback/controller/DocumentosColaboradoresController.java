package pb.prev.rhback.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import  pb.prev.rhback.model.DocumentosColaboradores;
import  pb.prev.rhback.repository.DocumentosColaboradoresRepository;

@CrossOrigin(origins = "${servidor-porta}")
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

	@GetMapping("/dados/{id}")
	public List<DocumentosColaboradores> getDocumentosColaboradoresByForeignKey(@PathVariable Long id) {
		return documentosColaboradoresRepository.findByDadosPessoais_Id(id);
	}

	
}
