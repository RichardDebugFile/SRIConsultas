/* service/ContribuyenteService.java */
package demo.sri.contribuyente.service;

import demo.sri.common.dto.ContribuyenteDTO;
import demo.sri.contribuyente.client.SriClient;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

@Service
public class ContribuyenteService {
    private final SriClient client;
    public ContribuyenteService(SriClient c){ this.client=c; }

    @Cacheable(value="contribuyente", key="#ruc")
    public Mono<ContribuyenteDTO> consultar(String ruc){
        return client.existe(ruc)
                .flatMap(ok -> ok ? client.obtener(ruc)
                        : Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND,"No es contribuyente")));
    }
}
