package pb.prev.rhback.controller;

import java.io.*;
import java.io.IOException;

import org.springframework.beans.factory.annotation.*;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import pb.prev.rhback.exception.ResourceNotFoundException;
import pb.prev.rhback.model.ConfiguracaoSistema;
import pb.prev.rhback.repository.ConfiguracaoSistemaRepository;

@CrossOrigin(origins = "${servidor-porta}")
@RestController
@RequestMapping("/configuracao")
public class FotosResourceConfiguracao {

	@Autowired
	private DiscoConfiguracao disco;

	@Value("${contato.disco.raiz.logo}/${contato.disco.diretorio.logo}/")
	private String diretorioFotos;

	@Autowired
	private ConfiguracaoSistemaRepository configuracaoSistemaRepository;

	@PostMapping("/upload")
	public void upload(@RequestParam MultipartFile foto) {

		disco.salvarFoto(foto);
	}

	@GetMapping("/download")
	public ResponseEntity<Object> downloadFile() throws IOException {

		ConfiguracaoSistema configuracaoSistema = configuracaoSistemaRepository.findById(Long.valueOf(1))
				.orElseThrow(() -> new ResourceNotFoundException("ConfiguracaoSistema not exist with id: " + 1));

		String filename = diretorioFotos + "/"
				+ configuracaoSistema.getLogo_instituicao();
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

	@GetMapping("/delete")
	private ResponseEntity<ConfiguracaoSistema> deleteBook() {

		ConfiguracaoSistema configuracaoSistema = configuracaoSistemaRepository.findById(Long.valueOf(1))
				.orElseThrow(() -> new ResourceNotFoundException("ConfiguracaoSistema not exist with id: " + 1));

		String filename = diretorioFotos + "/"
				+ configuracaoSistema.getLogo_instituicao();
		File file = new File(filename);
		file.delete();
		configuracaoSistema.setLogo_instituicao(null);
		 configuracaoSistemaRepository.save(configuracaoSistema);
		return ResponseEntity.ok(configuracaoSistema);
		
	}

	

}
