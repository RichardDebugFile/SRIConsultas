package demo.sri.vehiculo.service;

import demo.sri.common.dto.VehiculoDTO;
import demo.sri.vehiculo.client.SriVehiculoClient;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class VehiculoService {
    private final SriVehiculoClient client;

    public VehiculoService(SriVehiculoClient client) {
        this.client = client;
    }

    @Cacheable(value="vehiculo", key="#placa")
    public Mono<VehiculoDTO> consultar(String placa) {
        return client.obtener(placa);
    }
}