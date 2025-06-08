/* client/AntClient.java */
package demo.sri.licencia.client;

import demo.sri.common.dto.LicenciaDTO;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
public class AntClient {
    private static final String URL = "https://consultaweb.ant.gob.ec/PortalWEB/paginas/clientes/clp_grid_citaciones.jsp";
    private final WebClient web = WebClient.builder().build();

    public Mono<LicenciaDTO> obtener(String cedula){
        return web.get()
                .uri(uriBuilder -> uriBuilder
                        .path(URL)
                        .queryParam("ps_tipo_identificacion", "CED")
                        .queryParam("ps_identificacion", cedula)
                        .queryParam("ps_placa","")
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .map(this::parseHtml);
    }

    private LicenciaDTO parseHtml(String html){
        Document doc = Jsoup.parse(html);
        // Ejemplo: seleccionar con CSS el elemento que tiene los puntos
        String puntos  = doc.selectFirst("td:contains(Puntos disponibles)").nextElementSibling().text();
        String vence   = doc.selectFirst("td:contains(Fecha caducidad)").nextElementSibling().text();
        return new LicenciaDTO(doc.selectFirst("td:contains(Cédula)").nextElementSibling().text(),
                Integer.parseInt(puntos.trim()),
                vence);
    }
}
