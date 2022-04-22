package pb.prev.rhback.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import   pb.prev.rhback.exception.ResourceNotFoundException;

import  pb.prev.rhback.model.Usuarios;
import  pb.prev.rhback.repository.UsuariosRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v2/")
public class UsuariosController {

	@Autowired
	private UsuariosRepository usuariosRepository;
     
 
	@GetMapping("/usuarios")
	public List<Usuarios> getAllUsuarios() {
		return usuariosRepository.findAll();
	}

	@PostMapping("/usuarios")
	public Usuarios createUsuarios(@RequestBody Usuarios usuarios) {
		return usuariosRepository.save(usuarios);
	}

	@GetMapping("/usuarios/{id}")
	public ResponseEntity<Usuarios> getAllUsuarios(@PathVariable Long id) {
		Usuarios usuarios = usuariosRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Usuarios not exist with id: " + id));

		return ResponseEntity.ok(usuarios);
	}

	@DeleteMapping("/usuarios/{id}")  
	private void deleteBook(@PathVariable("id") Long id)   
	{  
		usuariosRepository.deleteById(id);
	} 
}
