package demo.sri.vehiculo.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/debug")
public class DebugController {

    private final WebClient webClient;

    public DebugController(WebClient.Builder builder) {
        this.webClient = builder
                .baseUrl("https://srienlinea.sri.gob.ec/sri-matriculacion-vehicular-recaudacion-servicio-internet/rest")
                .build();
    }

    @GetMapping("/vehiculo/{placa}")
    public Mono<String> debugVehiculo(@PathVariable String placa) {
        return webClient.get()
                .uri("/BaseVehiculo/obtenerPorNumeroPlacaOPorNumeroCampvOPorNumeroCpn?numeroPlacaCampvCpn={placa}", placa)
                .retrieve()
                .bodyToMono(String.class)
                .doOnNext(response -> System.out.println("Respuesta cruda de la API: " + response));
    }
}