package demo.sri.contribuyente.client;

import demo.sri.common.dto.ContribuyenteDTO;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class SriClient {

    private static final String BASE_URL =
            "https://srienlinea.sri.gob.ec/sri-catastro-sujeto-servicio-internet/rest";

    private final WebClient webClient;


    public SriClient(WebClient.Builder builder) {
        this.webClient = builder.baseUrl(BASE_URL).build();
    }

    /* 1) ¿Existe el RUC? → boolean */
    public Mono<Boolean> existe(String ruc) {
        return webClient.get()
                .uri("/ConsolidadoContribuyente/obtenerPorNumerosRuc?ruc={ruc}", ruc)
                .exchangeToMono(resp -> Mono.just(resp.statusCode().equals(HttpStatus.OK)));
    }

    /* 2) Obtener datos → la API devuelve un ARRAY */
    public Mono<ContribuyenteDTO> obtener(String ruc) {
        return webClient.get()
                .uri("/ConsolidadoContribuyente/obtenerPorNumerosRuc?ruc={ruc}", ruc)
                .retrieve()
                .bodyToFlux(ContribuyenteDTO.class)
                .next();   // primer (y único) elemento
    }
}
