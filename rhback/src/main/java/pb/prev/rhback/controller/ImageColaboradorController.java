package pb.prev.rhback.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import pb.prev.rhback.model.ImageColaborador;
import pb.prev.rhback.repository.ImageColaboradorRepository;
import pb.prev.rhback.util.ImageColaboradorUtility;
import java.io.IOException;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "${servidor-porta}")
@RequestMapping("/api/v305/")
public class ImageColaboradorController {

    @Autowired
    ImageColaboradorRepository imageColaboradorRepository;



    @PostMapping("/upload/image")
    public ResponseEntity<ImageUploadResponse> uplaodImageColaborador(@RequestParam("image") MultipartFile file)
            throws IOException {

        imageColaboradorRepository.save(ImageColaborador.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .image(ImageColaboradorUtility.decompressImage(file.getBytes())).build());
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ImageUploadResponse("ImageColaborador uploaded successfully: " +
                        file.getOriginalFilename()));
    }

    @GetMapping(path = {"/get/foto3x4/info/{id}"})
    public ImageColaborador getImageColaboradorDetails(@PathVariable Long id) throws IOException {

        final Optional<ImageColaborador> dbImageColaborador = imageColaboradorRepository.findById(id);

        return ImageColaborador.builder()
                .name(dbImageColaborador.get().getName())
                .type(dbImageColaborador.get().getType())
                .image(ImageColaboradorUtility.decompressImage(dbImageColaborador.get().getImage())).build();
    }
  
    @GetMapping(path = {"/get/foto3x4/{id}"})
    public ResponseEntity<byte[]> getImageColaborador(@PathVariable Long id) throws IOException {

        final Optional<ImageColaborador> dbImageColaborador = imageColaboradorRepository.findById(id);

        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(dbImageColaborador.get().getType()))
                .body(ImageColaboradorUtility.decompressImage(dbImageColaborador.get().getImage()));
    }



  



}