package pb.prev.rhback.controller;

import java.io.*;
import java.io.IOException;

import org.springframework.beans.factory.annotation.*;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "${servidor-porta}")
@RestController
@RequestMapping("/configuracao")
public class FotosResourceConfiguracao {

	@Autowired
	private DiscoConfiguracao disco;

	@Value("${contato.disco.raiz.logo}/${contato.disco.diretorio.logo}/")
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
