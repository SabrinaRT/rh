package pb.prev.rhback.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import   pb.prev.rhback.exception.ResourceNotFoundException;

import  pb.prev.rhback.model.ConfiguracaoSistema;
import  pb.prev.rhback.repository.ConfiguracaoSistemaRepository;

@CrossOrigin(origins = "${servidor-porta}")
@RestController
@RequestMapping("/api/v31/")
public class ConfiguracaoSistemaController {

	@Autowired
	private ConfiguracaoSistemaRepository configuracaoSistemaRepository;
    
	@PostMapping("/configuracao")
	public ConfiguracaoSistema createConfiguracaoSistema(@RequestBody ConfiguracaoSistema configuracaoSistema) {
		return configuracaoSistemaRepository.save(configuracaoSistema);
	}

	@GetMapping("/configuracao")
	public ResponseEntity<ConfiguracaoSistema> getAllConfiguracaoSistema() {
		ConfiguracaoSistema configuracaoSistema = configuracaoSistemaRepository.findById(Long.valueOf(1))
				.orElseThrow(() -> new ResourceNotFoundException("ConfiguracaoSistema not exist with id: " + 1));
		return ResponseEntity.ok(configuracaoSistema);
	}

	
}
