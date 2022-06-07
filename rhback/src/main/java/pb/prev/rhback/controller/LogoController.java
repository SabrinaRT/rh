package pb.prev.rhback.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import pb.prev.rhback.model.Logo;
import pb.prev.rhback.exception.UploadResponse;
import pb.prev.rhback.model.FotoColaborador;
import pb.prev.rhback.repository.FotoColaboradorRepository;
import pb.prev.rhback.repository.LogoRepository;
import pb.prev.rhback.util.ImageUtility;
import pb.prev.rhback.util.ImageColaboradorUtility;
import java.io.IOException;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "${servidor-porta}")
/* @CrossOrigin()  */
public class LogoController {

    @Autowired
    LogoRepository logoRepository;

   

    @PostMapping("/upload/image")
    public ResponseEntity<UploadResponse> uplaodImage(@RequestParam("image") MultipartFile file)
            throws IOException {

        logoRepository.save(Logo.builder()
                .id(Long.valueOf(2))
                .name(file.getOriginalFilename())
                .type(file.getContentType())

                .image(ImageUtility.compressImage(file.getBytes())).build());
        return ResponseEntity.status(HttpStatus.OK)
                .body(new UploadResponse("Image uploaded successfully: " +
                        file.getOriginalFilename()));
    }

    @GetMapping(path = {"/get/image/info"})
    public Logo getImageDetails() throws IOException {

        final Optional<Logo> dbImage = logoRepository.findById(Long.valueOf(2));

        return Logo.builder()
                .name(dbImage.get().getName())
                .type(dbImage.get().getType())
                .image(ImageUtility.decompressImage(dbImage.get().getImage())).build();
    }

    @GetMapping(path = {"/get/image"})
    public ResponseEntity<byte[]> getImage() throws IOException {

        final Optional<Logo> dbImage = logoRepository.findById(Long.valueOf(2));

        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(dbImage.get().getType()))
                .body(ImageUtility.decompressImage(dbImage.get().getImage()));
    }

    
    @GetMapping(path = {"/get/semimage"})
    public ResponseEntity<byte[]> getSemImage() throws IOException {

        final Optional<Logo> dbImage = logoRepository.findById(Long.valueOf(1));

        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(dbImage.get().getType()))
                .body(ImageUtility.decompressImage(dbImage.get().getImage()));
    }

}