package demo.sri.contribuyente.controller;

import demo.sri.common.dto.ContribuyenteDTO;
import demo.sri.contribuyente.service.ContribuyenteService;

import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/contribuyente")
public class ContribuyenteController {

    private final ContribuyenteService service;

    public ContribuyenteController(ContribuyenteService service) {
        this.service = service;
    }

    @GetMapping("/{ruc}")
    public Mono<ContribuyenteDTO> byRuc(@PathVariable String ruc) {
        return service.consultar(ruc);
    }
}
