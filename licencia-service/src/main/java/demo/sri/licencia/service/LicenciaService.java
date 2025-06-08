package demo.sri.licencia.service;
import demo.sri.common.dto.LicenciaDTO;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import java.io.IOException;
import java.time.LocalDate;
import java.time.Duration;
@Service

public class LicenciaService {
    private final CacheManager cacheManager;

    public LicenciaService(CacheManager cacheManager) {
        this.cacheManager = cacheManager;
    }

    @Cacheable(value="licencia", key="#cedula")
    public Mono<LicenciaDTO> consultar(String cedula){
        return Mono.fromCallable(() -> scrape(cedula))
                .timeout(Duration.ofSeconds(5))
                .onErrorResume(ex -> {
                    LicenciaDTO cached = cacheManager.getCache("licencia").get(cedula, LicenciaDTO.class);
                    return cached != null ? Mono.just(cached) : Mono.error(ex);
                });
    }
    private LicenciaDTO scrape(String cedula) throws IOException {
        String url = "https://consultaweb.ant.gob.ec/PortalWEB/paginas/clientes/clp_grid_citaciones.jsp" +
                "?ps_tipo_identificacion=CED&ps_identificacion="+cedula+"&ps_placa=";
        Document doc = Jsoup.connect(url).get();
        // FIXME: parse HTML to extract real points
        int puntos = 30;
        return new LicenciaDTO(cedula, puntos, LocalDate.now().toString());
    }
}
