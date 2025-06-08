package demo.sri.vehiculo.client;

import demo.sri.common.dto.VehiculoDTO;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
public class SriVehiculoClient {
    private static final String BASE_URL = "https://srienlinea.sri.gob.ec/sri-matriculacion-vehicular-recaudacion-servicio-internet/rest";
    private final WebClient webClient;

    public SriVehiculoClient(WebClient.Builder builder) {
        this.webClient = builder.baseUrl(BASE_URL).build();
    }

    public Mono<VehiculoDTO> obtener(String placa) {
        return webClient.get()
                .uri("/BaseVehiculo/obtenerPorNumeroPlacaOPorNumeroCampvOPorNumeroCpn?numeroPlacaCampvCpn={placa}", placa)
                .retrieve()
                .bodyToMono(VehiculoDTO.class)
                .doOnNext(vehiculo -> System.out.println("Vehículo obtenido: " + vehiculo))
                .doOnError(error -> System.err.println("Error obteniendo vehículo: " + error.getMessage()));
    }
}