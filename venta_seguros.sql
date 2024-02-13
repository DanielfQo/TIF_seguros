
DROP DATABASE IF EXISTS venta_seguros;
CREATE SCHEMA `venta_seguros`;
USE venta_seguros;

CREATE TABLE usuario (
	Usuario_ID VARCHAR(30) UNIQUE,
    DNI INTEGER,
    pasword VARCHAR(30),
    PRIMARY KEY (Usuario_ID, DNI)
);

CREATE TABLE persona (
	DNI INTEGER PRIMARY KEY,
    Nombre VARCHAR(30),
    ApellidoP VARCHAR(30),
    ApellidoM VARCHAR(30),
    Fecha_nacimiento DATE,
    Genero CHAR(1),
    Nacionalidad VARCHAR(30),
    Email VARCHAR(200)
);

CREATE TABLE persona_telefono (
	Telefono INTEGER,
    DNI INTEGER,
    PRIMARY KEY (Telefono, DNI)
);

CREATE TABLE personal (
	DNI_personal INTEGER PRIMARY KEY,
	Años_experiencia INTEGER,
    Salario INTEGER,
    Sede_ID INTEGER
);

CREATE TABLE turno (
	Turno_ID INTEGER AUTO_INCREMENT,
    DNI_personal INTEGER,
    Fecha DATE,
    Entrada TIME,
    Salida TIME,
    PRIMARY KEY (Turno_ID, DNI_personal)
);

CREATE TABLE sede (
	Sede_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    Direccion VARCHAR(200),
    Departamento VARCHAR(100)
);

CREATE TABLE vendedor (
	DNI_vendedor INTEGER PRIMARY KEY,
    Comision DECIMAL(3,2)
);

CREATE TABLE vendedor_cliente (
DNI_cliente INTEGER,
DNI_vendedor INTEGER,
PRIMARY KEY (DNI_cliente, DNI_vendedor)
);

CREATE TABLE atencion_cliente (
	DNI_atencion_cliente INTEGER PRIMARY KEY
);

CREATE TABLE atencion_idioma (
	DNI_atencion_cliente INTEGER,
    Idioma VARCHAR(30),
    PRIMARY KEY (DNI_atencion_cliente, Idioma)
);

CREATE TABLE cliente (
	DNI_cliente INTEGER PRIMARY KEY,
    Direccion VARCHAR(100)
);

CREATE TABLE reclamos(
	Reclamo_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
    Reclamo TEXT,
    Fecha DATE,
    Hora TIME,
    DNI_cliente INTEGER
);

CREATE TABLE reclamo_atendido (
	DNI_atencion_cliente INTEGER,
    Reclamo_ID INTEGER,
    PRIMARY KEY(DNI_atencion_cliente, Reclamo_ID)
);

CREATE TABLE cliente_atendido (
	DNI_atencion_cliente INTEGER,
    DNI_cliente INTEGER,
    PRIMARY KEY(DNI_atencion_cliente, DNI_cliente)
);


CREATE TABLE seguro_poliza (
	Categoria INTEGER AUTO_INCREMENT PRIMARY KEY,
    Precio DECIMAL(6,2),
    Terminos_condiciones MEDIUMTEXT,
    Nro_personas_aseguradas INTEGER
);

CREATE TABLE cobertura (
	Categoria INTEGER,
    Cobertura VARCHAR(30),
	PRIMARY KEY (Categoria, Cobertura)
);

CREATE TABLE contrato (
	Contrato_ID INTEGER AUTO_INCREMENT,
    DNI_cliente INTEGER,
    Categoria INTEGER,
	Monto DECIMAL(8,2),
    Inicio DATE,
    Termino DATE,
    PRIMARY KEY(Contrato_ID, DNI_cliente, Categoria)
);

CREATE TABLE accidente (
	Incidente_ID INTEGER AUTO_INCREMENT PRIMARY KEY,
	Registro TEXT,
    Fecha DATE,
    Hora TIME,
    DNI_cliente INTEGER
);
ALTER TABLE usuario ADD FOREIGN KEY (DNI) REFERENCES persona (DNI);
ALTER TABLE persona_telefono ADD FOREIGN KEY (DNI) REFERENCES persona (DNI);

ALTER TABLE cliente ADD FOREIGN KEY (DNI_cliente) REFERENCES persona (DNI);
ALTER TABLE personal ADD FOREIGN KEY (DNI_personal) REFERENCES persona (DNI);

ALTER TABLE accidente ADD FOREIGN KEY (DNI_cliente) REFERENCES cliente (DNI_cliente);
ALTER TABLE reclamos ADD FOREIGN KEY (DNI_cliente) REFERENCES cliente (DNI_cliente);

ALTER TABLE turno ADD FOREIGN KEY (DNI_personal) REFERENCES personal (DNI_personal);
ALTER TABLE personal ADD FOREIGN KEY (Sede_ID) REFERENCES sede (Sede_ID);

ALTER TABLE vendedor ADD FOREIGN KEY (DNI_vendedor) REFERENCES personal (DNI_personal);
ALTER TABLE atencion_cliente ADD FOREIGN KEY (DNI_atencion_cliente) REFERENCES personal (DNI_personal);
ALTER TABLE atencion_idioma ADD FOREIGN KEY (DNI_atencion_cliente) REFERENCES atencion_cliente (DNI_atencion_cliente);

ALTER TABLE cliente_atendido ADD FOREIGN KEY (DNI_atencion_cliente) REFERENCES atencion_cliente (DNI_atencion_cliente);
ALTER TABLE cliente_atendido ADD FOREIGN KEY (DNI_cliente) REFERENCES cliente (DNI_cliente);

ALTER TABLE reclamo_atendido ADD FOREIGN KEY (DNI_atencion_cliente) REFERENCES atencion_cliente (DNI_atencion_cliente);
ALTER TABLE reclamo_atendido ADD FOREIGN KEY (Reclamo_ID) REFERENCES reclamos (Reclamo_ID);

ALTER TABLE vendedor_cliente ADD FOREIGN KEY (DNI_vendedor) REFERENCES vendedor (DNI_vendedor);
ALTER TABLE vendedor_cliente ADD FOREIGN KEY (DNI_cliente) REFERENCES cliente (DNI_cliente);

ALTER TABLE contrato ADD FOREIGN KEY (DNI_cliente) REFERENCES cliente (DNI_cliente);
ALTER TABLE contrato ADD FOREIGN KEY (Categoria) REFERENCES seguro_poliza (Categoria);
ALTER TABLE cobertura ADD FOREIGN KEY (Categoria) REFERENCES seguro_poliza (Categoria);