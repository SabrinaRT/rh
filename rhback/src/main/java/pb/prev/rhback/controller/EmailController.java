package pb.prev.rhback.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pb.prev.rhback.Service.EmailSenderService;
import pb.prev.rhback.exception.ResourceNotFoundException;
import pb.prev.rhback.model.*;
import pb.prev.rhback.repository.*;

@CrossOrigin(origins = "${servidor-porta}")
@RestController
@RequestMapping("/api/v30/")
public class EmailController {

    @Autowired
    private EmailSenderService senderService;

    @Autowired
    private DadosProfissionaisRepository dadosProfissionaisRepository;

    @Autowired
    private ConfiguracaoSistemaRepository configuracaoSistemaRepository;

    @Autowired
    private DadosPessoaisRepository dadosPessoaisRepository;

    @GetMapping("/rhAtivar/{id}")
    public ResponseEntity<DadosProfissionais> triggerMail(@PathVariable Long id) {
        DadosProfissionais dadosProfissionais = dadosProfissionaisRepository.findByDadosPessoais_Id(id);

        String cargo;
        String setor;

        if (dadosProfissionais.getCargo() == null) {
            cargo = "Não Definido";
            System.out.print("null");
        } else {
            cargo = dadosProfissionais.getCargo();
        }
        if (dadosProfissionais.getSetores() == null) {
            setor = "Não Definido";
            System.out.print("null");
        } else {
            setor = dadosProfissionais.getSetores().getSetor().toString();
        }

        ConfiguracaoSistema processo = configuracaoSistemaRepository.findById(Long.valueOf(1))
                .orElseThrow(() -> new ResourceNotFoundException("Configuracao Sistema not exist with id: " + 1));
        senderService.sendSimpleEmail(processo.getEmail_informatica(),
                "Atenção! SISCOGEP Informa!",
                "Por gentileza, criar conta no nosso sistema com as seguintes informações: \n" +
                        "Nome Completo: " + dadosProfissionais.getDadosPessoais().getNome_completo().toString() + "\n" +
                        "Cargo: " + cargo + "\n" +
                        "Setor: " + setor);
        return ResponseEntity.ok(dadosProfissionais);
    }

    @GetMapping("/rhDesativar/{id}")
    public ResponseEntity<DadosProfissionais> triggerMail2(@PathVariable Long id) {
        DadosProfissionais dadosProfissionais = dadosProfissionaisRepository.findByDadosPessoais_Id(id);
        String cargo;
        String setor;
        if (dadosProfissionais.getCargo() == null) {
            cargo = "Não Definido";
            System.out.print("null");
        } else {
            cargo = dadosProfissionais.getCargo();
        }
        if (dadosProfissionais.getSetores() == null) {
            setor = "Não Definido";
            System.out.print("null");
        } else {
            setor = dadosProfissionais.getSetores().getSetor().toString();
        }

        ConfiguracaoSistema processo = configuracaoSistemaRepository.findById(Long.valueOf(1))
                .orElseThrow(() -> new ResourceNotFoundException("Configuracao Sistema not exist with id: " + 1));
        senderService.sendSimpleEmail(processo.getEmail_informatica(),
                "Atenção! SISCOGEP Informa!",
                "Por gentileza, desativar a conta do(a) colaborador(a) no nosso sistema : \n" +
                        "Nome Completo: " + dadosProfissionais.getDadosPessoais().getNome_completo().toString()
                        + "\n" +
                        "Cargo: " + cargo + "\n" +
                        "Setor: " + setor);

        return ResponseEntity.ok(dadosProfissionais);

    }

    @GetMapping("/informaticaAtivo/{id}")
    public ResponseEntity<DadosPessoais> triggerMail3(@PathVariable Long id) {
        DadosPessoais dadosPessoais = dadosPessoaisRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("DadosPessoais not exist with id: " + id));
        if (dadosPessoais.getNome_completo().toString() != null) {
            ConfiguracaoSistema processo = configuracaoSistemaRepository.findById(Long.valueOf(1))
                    .orElseThrow(() -> new ResourceNotFoundException("Configuracao Sistema not exist with id: " + 1));
            senderService.sendSimpleEmail(processo.getEmail_rh(),
                    "Atenção! SISCOGEP Informa!",
                    "O usuário do(a) colaborador(a), "
                            + dadosPessoais.getNome_completo().toString()
                            + ", está disponível no sistema!");
        }
        return ResponseEntity.ok(dadosPessoais);
    }

    @GetMapping("/informaticaDesativo/{id}")
    public ResponseEntity<DadosPessoais> triggerMail4(@PathVariable Long id) {
        DadosPessoais dadosPessoais = dadosPessoaisRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("DadosPessoais not exist with id: " + id));
        if (dadosPessoais.getNome_completo().toString() != null) {
            ConfiguracaoSistema processo = configuracaoSistemaRepository.findById(Long.valueOf(1))
                    .orElseThrow(() -> new ResourceNotFoundException("Configuracao Sistema not exist with id: " + 1));
            senderService.sendSimpleEmail(processo.getEmail_rh(),
                    "Atenção! SISCOGEP Informa!",
                    "O usuário do(a) colaborador(a), "
                            + dadosPessoais.getNome_completo().toString()
                            + ", foi desativado!");
        }
        return ResponseEntity.ok(dadosPessoais);
    }

}
