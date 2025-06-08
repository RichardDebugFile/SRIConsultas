package demo.sri.vehiculo.controller;
import demo.sri.common.dto.VehiculoDTO;
import demo.sri.vehiculo.service.VehiculoService;

import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
@RestController
@RequestMapping("/api/vehiculo")

public class VehiculoController {
    private final VehiculoService service;

    public VehiculoController(VehiculoService service) {
        this.service = service;
    }

    @GetMapping("/{placa}")
    public Mono<VehiculoDTO> byPlaca(@PathVariable String placa){
        return service.consultar(placa);
    }
}
