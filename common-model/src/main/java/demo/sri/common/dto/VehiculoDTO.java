package demo.sri.common.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public record VehiculoDTO(
        @JsonProperty("numeroPlaca")
        String placa,

        @JsonProperty("descripcionMarca")
        String marca,

        @JsonProperty("descripcionModelo")
        String modelo,

        @JsonProperty("nombreClase")
        String clase,

        @JsonProperty("anioAuto")
        String anio,

        @JsonProperty("estadoExoneracion")
        String estado
) implements Serializable {}