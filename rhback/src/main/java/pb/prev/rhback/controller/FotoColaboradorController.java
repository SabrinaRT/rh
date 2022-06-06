package pb.prev.rhback.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import pb.prev.rhback.exception.UploadResponse;
import pb.prev.rhback.model.DadosPessoais;
import pb.prev.rhback.model.FotoColaborador;
import pb.prev.rhback.repository.DadosPessoaisRepository;
import pb.prev.rhback.repository.FotoColaboradorRepository;
import pb.prev.rhback.util.ImageColaboradorUtility;
import java.io.IOException;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "${servidor-porta}")
@RequestMapping("/api/v305/")
public class FotoColaboradorController {

    @Autowired
    FotoColaboradorRepository fotoColaboradorRepository;

 /*    @Autowired
    DadosPessoaisRepository dadosPessoaisColaboradorRepository; */

    @PostMapping("/upload/image")
    public ResponseEntity<UploadResponse> uplaodImageColaborador(@RequestParam("image") MultipartFile file)
            throws IOException {

        fotoColaboradorRepository.save(FotoColaborador.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .image(ImageColaboradorUtility.decompressImage(file.getBytes())).build());
        return ResponseEntity.status(HttpStatus.OK)
                .body(new UploadResponse("ImageColaborador uploaded successfully: " +
                        file.getOriginalFilename()));
    }

    @GetMapping(path = {"/get/foto/info/{id}"})
    public FotoColaborador getImageColaboradorDetails(@PathVariable Long id) throws IOException {

        final Optional<FotoColaborador> dbImageColaborador = fotoColaboradorRepository.findById(id);

        return FotoColaborador.builder()
                .name(dbImageColaborador.get().getName())
                .type(dbImageColaborador.get().getType())
                .image(ImageColaboradorUtility.decompressImage(dbImageColaborador.get().getImage())).build();
    }
  
    @GetMapping(path = {"/get/foto/{id}"})
    public ResponseEntity<byte[]> getImageColaborador(@PathVariable Long id) throws IOException {

        final Optional<FotoColaborador> dbImageColaborador = fotoColaboradorRepository.findById(id);

        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(dbImageColaborador.get().getType()))
                .body(ImageColaboradorUtility.decompressImage(dbImageColaborador.get().getImage()));
    }



  



}