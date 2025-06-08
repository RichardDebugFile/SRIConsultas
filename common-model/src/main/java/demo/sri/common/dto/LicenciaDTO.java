package demo.sri.common.dto;

import java.io.Serializable;

public record LicenciaDTO(String cedula,
                          int    puntosDisponibles,
                          String fechaVencimiento) implements Serializable {}
