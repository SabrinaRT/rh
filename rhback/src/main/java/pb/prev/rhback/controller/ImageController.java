package pb.prev.rhback.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import pb.prev.rhback.model.Image;
import pb.prev.rhback.model.ImageColaborador;
import pb.prev.rhback.repository.ImageColaboradorRepository;
import pb.prev.rhback.repository.ImageRepository;
import pb.prev.rhback.util.ImageUtility;
import pb.prev.rhback.util.ImageColaboradorUtility;
import java.io.IOException;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "${servidor-porta}")
/* @CrossOrigin()  */
public class ImageController {

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    ImageColaboradorRepository imageColaboradorRepository;

    @PostMapping("/upload/image")
    public ResponseEntity<ImageUploadResponse> uplaodImage(@RequestParam("image") MultipartFile file)
            throws IOException {

        imageRepository.save(Image.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .image(ImageUtility.compressImage(file.getBytes())).build());
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ImageUploadResponse("Image uploaded successfully: " +
                        file.getOriginalFilename()));
    }

    @GetMapping(path = {"/get/image/info/"})
    public Image getImageDetails() throws IOException {

        final Optional<Image> dbImage = imageRepository.findById(Long.valueOf(1));

        return Image.builder()
                .name(dbImage.get().getName())
                .type(dbImage.get().getType())
                .image(ImageUtility.decompressImage(dbImage.get().getImage())).build();
    }

    @GetMapping(path = {"/get/image/"})
    public ResponseEntity<byte[]> getImage() throws IOException {

        final Optional<Image> dbImage = imageRepository.findById(Long.valueOf(1));

        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(dbImage.get().getType()))
                .body(ImageUtility.decompressImage(dbImage.get().getImage()));
    }


}