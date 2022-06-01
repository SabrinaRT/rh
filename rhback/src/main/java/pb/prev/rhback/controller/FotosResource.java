package pb.prev.rhback.controller;

import java.io.*;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.*;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import pb.prev.rhback.exception.ResourceNotFoundException;
import pb.prev.rhback.model.DocumentosColaboradores;
import pb.prev.rhback.repository.DocumentosColaboradoresRepository;

@CrossOrigin(origins = "${servidor-porta}")
@RestController
@RequestMapping("/fotos")
public class FotosResource {

	@Autowired
	private Disco disco;

	@Value("${contato.disco.raiz}/${contato.disco.diretorio-fotos}/")
	private String diretorioFotos;

	@Autowired
	private DocumentosColaboradoresRepository documentosColaboradoresRepository;

	@PostMapping("/{id}")
	public void upload(@RequestParam MultipartFile foto, @PathVariable Long id) {
		disco.salvarFoto(foto, id);
	}

	@GetMapping("/download/{id}/{nome}")
	public ResponseEntity<Object> downloadFile(@PathVariable Long id, @PathVariable String nome) throws IOException {
		String filename = diretorioFotos + id + "/" + nome;
		File file = new File(filename);
		InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition",
				String.format("attachment; filename=\"%s\"", file.getName()));
		headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
		headers.add("Pragma", "no-cache");
		headers.add("Expires", "0");

		ResponseEntity<Object> responseEntity = ResponseEntity.ok().headers(headers)
				.contentLength(file.length())
				.contentType(MediaType.parseMediaType("application/txt")).body(resource);

		return responseEntity;
	}

	@GetMapping("/delete/{id}/{idDocu}")
	private List<DocumentosColaboradores> deleteBook(@PathVariable Long id, @PathVariable Long idDocu) {

		DocumentosColaboradores configuracaoSistema = documentosColaboradoresRepository.findById(idDocu)
				.orElseThrow(() -> new ResourceNotFoundException("ConfiguracaoSistema not exist with id: " + idDocu));

		String filename = diretorioFotos + id + "/" + configuracaoSistema.getNome_documento_upload();
		File file = new File(filename);
		file.delete();
		documentosColaboradoresRepository.deleteById(idDocu);

		return documentosColaboradoresRepository.findByDadosPessoais_Id(id);
	}
	

}
