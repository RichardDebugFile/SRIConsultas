package demo.sri.licencia.controller;
import demo.sri.common.dto.LicenciaDTO;
import demo.sri.licencia.service.LicenciaService;

import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
@RestController
@RequestMapping("/api/licencia")

public class LicenciaController {
    private final LicenciaService service;

    public LicenciaController(LicenciaService service) {
        this.service = service;
    }

    @GetMapping("/{cedula}")
    public Mono<LicenciaDTO> byCedula(@PathVariable String cedula){
        return service.consultar(cedula);
    }
}
