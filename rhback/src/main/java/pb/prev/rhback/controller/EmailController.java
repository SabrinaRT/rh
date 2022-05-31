package pb.prev.rhback.controller;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.web.bind.annotation.*;

import pb.prev.rhback.Service.EmailSenderService;
import pb.prev.rhback.model.DadosProfissionais;

@CrossOrigin(origins = "${servidor-porta}")
@RestController
@RequestMapping("/api/v30/")
public class EmailController {

    @Autowired
	private EmailSenderService senderService;

    @Value("${email.informatica}")
	private String email_informatica;
    @Value("${email.rh}")
	private String rh;

    @GetMapping("/rhAtivar")
	public DadosProfissionais triggerMail(@RequestBody DadosProfissionais documentos)  {
		senderService.sendSimpleEmail(email_informatica,
        "Atenção! SISCOGEP Informa!",
                "Por gentileza, criar conta no nosso sistema com as seguintes informações: \n"+
				"Nome Completo: " + documentos.getDadosPessoais().getNome_completo().toString() +"\n"+
                "Cargo: " + documentos.getCargo() +"\n"+
                "Setor: " + documentos.getSetores().getSetor().toString()
                );
                return documentos;

	}

     @GetMapping("/rhDesativar")
	public DadosProfissionais triggerMail2(@RequestBody DadosProfissionais documentos)  {
		senderService.sendSimpleEmail(email_informatica,
        "Atenção! SISCOGEP Informa!",
                "Por gentileza, desativar a conta no nosso sistema do(a) colaborador(a): \n"+
				"Nome Completo: " + documentos.getDadosPessoais().getNome_completo().toString() +"\n"+
                "Cargo: " + documentos.getCargo() +"\n"+
                "Setor: " + documentos.getSetores().getSetor().toString()
                );
                return documentos;

	}

    @GetMapping("/informaticaAtivo")
	public DadosProfissionais triggerMail3(@RequestBody DadosProfissionais documentos)  {
		senderService.sendSimpleEmail(rh,
        "Atenção! SISCOGEP Informa!",
                "O usuário do(a) colaborador(a), "+documentos.getDadosPessoais().getNome_completo().toString()+", está disponível no sistema!"
                );
                return documentos;

	}

    @GetMapping("/informaticaDesativo")
	public DadosProfissionais triggerMail4(@RequestBody DadosProfissionais documentos)  {
		senderService.sendSimpleEmail(rh,
        "Atenção! SISCOGEP Informa!",
                "O usuário do(a) colaborador(a), "+documentos.getDadosPessoais().getNome_completo().toString()+", foi desativado!"
                );
                return documentos;

	}




    
}
