package pb.prev.rhback.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/fotos")
public class FotosResource {
	
	@Autowired
	private Disco disco;
	
	@PostMapping("/{id}")
	public void upload(@RequestParam MultipartFile foto, @PathVariable Long id) {
		disco.salvarFoto(foto, id);
	}

}
