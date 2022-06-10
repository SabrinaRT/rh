package pb.prev.rhback.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import pb.prev.rhback.model.FotoColaborador;
import pb.prev.rhback.exception.UploadResponse;
import pb.prev.rhback.repository.DadosPessoaisRepository;
import pb.prev.rhback.repository.FotoColaboradorRepository;
import pb.prev.rhback.util.ImageUtility;
import java.io.IOException;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "${servidor-porta}")
@RequestMapping("/api/v305/")
public class FotoColaboradorController {

    @Autowired
    FotoColaboradorRepository fotoColaboradorRepository;

    @Autowired
    DadosPessoaisRepository dadosPessoaisRepository;

    @PostMapping("/upload/image/{idColab}")
    public ResponseEntity<UploadResponse> uplaodImage(@RequestParam("image") MultipartFile file,@PathVariable Long idColab)
            throws IOException {

        fotoColaboradorRepository.save(FotoColaborador.builder()
                .dadosPessoais(dadosPessoaisRepository.getById(idColab))
                .name(file.getOriginalFilename())
                .type(file.getContentType())

                .image(ImageUtility.compressImage(file.getBytes())).build());
        return ResponseEntity.status(HttpStatus.OK)
                .body(new UploadResponse("Image uploaded successfully: " +
                        file.getOriginalFilename()));
    }

    @GetMapping(path = {"/get/image/info/{id}"})
    public FotoColaborador getImageDetails(@PathVariable Long id) throws IOException {

        final Optional<FotoColaborador> dbImage = fotoColaboradorRepository.findByDadosPessoais_Id(id);

        return FotoColaborador.builder()
                .id(dbImage.get().getId())
                .name(dbImage.get().getName())
                .type(dbImage.get().getType())
                .image(ImageUtility.decompressImage(dbImage.get().getImage())).build();
    }

    @GetMapping(path = {"/get/image/{id}"})
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) throws IOException {

        final Optional<FotoColaborador> dbImage = fotoColaboradorRepository.findByDadosPessoais_Id(id);

        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(dbImage.get().getType()))
                .body(ImageUtility.decompressImage(dbImage.get().getImage()));
    }

    @DeleteMapping("/delete/{id}")  
	private void deleteBook(@PathVariable("id") Long id)   
	{ 
                final Optional<FotoColaborador> dbImage = fotoColaboradorRepository.findByDadosPessoais_Id(id);
		fotoColaboradorRepository.deleteById(dbImage.get().getId());
	} 

  



  


}