package pb.prev.rhback.controller;

import java.io.*;
import java.io.IOException;
import java.net.http.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/fotos")
public class FotosResource {

	@Autowired
	private Disco disco;

	@Value("${contato.disco.raiz}/${contato.disco.diretorio-fotos}/")
	private String diretorioFotos;

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

	@GetMapping("/delete/{id}/{nome}")
	private void deleteBook(@PathVariable Long id, @PathVariable String nome) {
		String filename = diretorioFotos + id + "/" + nome;
		File file = new File(filename);
		file.delete();
	}
	

}
