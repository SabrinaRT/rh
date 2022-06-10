package pb.prev.rhback.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import pb.prev.rhback.model.Logo;
import pb.prev.rhback.exception.ResourceNotFoundException;
import pb.prev.rhback.exception.UploadResponse;
import pb.prev.rhback.repository.LogoRepository;
import pb.prev.rhback.util.ImageUtility;
import java.io.IOException;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "${servidor-porta}")
public class LogoController {

    @Autowired
    LogoRepository logoRepository;

   

    @PostMapping("api/upload/image")
    public ResponseEntity<UploadResponse> uploadImage(@RequestParam("image") MultipartFile file)
            throws IOException {

        logoRepository.save(Logo.builder()
                .id(Long.valueOf(1))
                .name(file.getOriginalFilename())
                .type(file.getContentType())

                .image(ImageUtility.compressImage(file.getBytes())).build());
        return ResponseEntity.status(HttpStatus.OK)
                .body(new UploadResponse("Image uploaded successfully: " +
                        file.getOriginalFilename()));
    }

    

    @PostMapping(value="/delete/image")
	public Logo createLogo() { 
                Logo processo = logoRepository.findById(Long.valueOf(1))
				.orElseThrow(() -> new ResourceNotFoundException("Logo not exist with id: " + 1));
                                processo.setId(Long.valueOf(1));
                                processo.setImage(null);
                                processo.setType(null);
                                processo.setName(null);
                               
		return logoRepository.save(processo);
	}

   

    @GetMapping(path = {"api/get/image"})
    public ResponseEntity<byte[]> getImage() throws IOException {

        final Optional<Logo> dbImage = logoRepository.findById(Long.valueOf(1));

        return ResponseEntity
                .ok()
                .contentType(MediaType.valueOf(dbImage.get().getType()))
                .body(ImageUtility.decompressImage(dbImage.get().getImage()));
    }

    @GetMapping(path = {"api/get/image/info"})
    public Logo getImageDetails() throws IOException {

        final Optional<Logo> dbImage = logoRepository.findById(Long.valueOf(1));

        return Logo.builder()
                .name(dbImage.get().getName())
                .type(dbImage.get().getType())
                .image(ImageUtility.decompressImage(dbImage.get().getImage())).build();
    }

    
    @GetMapping(value="api/logo")
    public ResponseEntity<Logo> getAllLogo() {
            Logo processo = logoRepository.findById(Long.valueOf(1))
                            .orElseThrow(() -> new ResourceNotFoundException("Logo not exist with id: "));

            return ResponseEntity.ok(processo);
    }
    
   

}