package demo.sri.common.dto;

import java.io.Serializable;

public record ContribuyenteDTO(
        String ruc,
        String razonSocial,
        String tipoContribuyente,
        String estado) implements Serializable {}
