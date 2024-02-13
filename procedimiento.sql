USE venta_seguros;
-- ______________________________________________________________PROCEDIMIENTOS_________________________________________________________________________
DELIMITER //
DROP PROCEDURE IF EXISTS AgregarCliente//
CREATE PROCEDURE AgregarCliente(
	IN p_Usuario VARCHAR(30),
    IN p_pasword VARCHAR(30),
    IN p_Nombre VARCHAR(30),
	IN p_ApellidoP VARCHAR(20),
    IN p_ApellidoM VARCHAR(20),
    IN p_DNI INTEGER,
	IN p_Telefono INTEGER,
    IN p_Fecha_nacimiento DATE,
    IN p_Nacionalidad VARCHAR(30),
    IN p_Genero CHAR(1),
	IN p_Direccion VARCHAR(100),
    IN p_Email VARCHAR(200)
)
BEGIN
    DECLARE existePersona INT;
    
    -- Verificar si el cliente ya existe
    SELECT COUNT(*) INTO existePersona FROM persona WHERE persona.DNI = p_DNI;
    
    IF existePersona = 0 THEN
        
        INSERT INTO persona (DNI, Nombre, ApellidoP, ApellidoM, Fecha_nacimiento, Genero, Nacionalidad, Email) 
        VALUES (p_DNI, p_Nombre, p_ApellidoP, p_ApellidoM, p_Fecha_nacimiento, p_Genero, p_Nacionalidad, p_Email);

		INSERT INTO usuario (Usuario_ID, DNI, pasword) 
		VALUES (p_Usuario, p_DNI, p_pasword);

        INSERT INTO persona_telefono (DNI, Telefono) VALUES (p_DNI, p_Telefono);        
        INSERT INTO cliente (DNI_cliente, Direccion) VALUES (p_DNI, p_Direccion);
        
        SELECT 'Cliente agregado exitosamente' AS Resultado;
    ELSE
        SELECT 'Error: Cliente ya existe' AS Resultado;
    END IF;
END;
//
DROP PROCEDURE IF EXISTS MostrarCliente//
CREATE PROCEDURE MostrarCliente(
    IN p_usuario VARCHAR(30)
)
BEGIN
    DECLARE existeUsuario INT;
    -- Verificar si el usuario existe
    SELECT COUNT(*) INTO existeUsuario FROM usuario WHERE usuario.Usuario_ID = p_usuario;

    IF existeUsuario > 0 THEN
        SELECT p.*, GROUP_CONCAT(Telefono SEPARATOR ', ') AS Telefono, direccion 
        FROM persona p
        INNER JOIN usuario u ON u.DNI = p.DNI
        INNER JOIN cliente c ON c.DNI_cliente = p.DNI
        INNER JOIN persona_telefono pt ON pt.DNI = p.DNI
        WHERE p_usuario = u.Usuario_ID
        GROUP BY u.Usuario_ID, p.DNI; -- Include u.Usuario_ID in the GROUP BY clause
    END IF;    
END;
//

DROP PROCEDURE IF EXISTS Reclamos_por_usuario//
CREATE PROCEDURE Reclamos_por_usuario(IN usuario_id VARCHAR(30))
BEGIN
    DECLARE p_DNI INTEGER;
    DECLARE persona_existente INTEGER;
    
    SELECT DNI INTO p_DNI FROM usuario WHERE Usuario_ID = usuario_id LIMIT 1;
    
    SELECT COUNT(*) INTO persona_existente FROM persona WHERE DNI = p_DNI;
    
    IF persona_existente > 0 THEN
        SELECT Reclamo, Fecha, Hora FROM reclamos
        WHERE reclamos.DNI_cliente = p_DNI;
    END IF;
END;

//

DROP PROCEDURE IF EXISTS Accidentes_por_usuario//
CREATE PROCEDURE Accidentes_por_usuario(IN usuario_id VARCHAR(30))
BEGIN
    DECLARE p_DNI INTEGER;
    DECLARE persona_existente INTEGER;
    
    SELECT DNI INTO p_DNI FROM usuario WHERE Usuario_ID = usuario_id LIMIT 1;
    
    SELECT COUNT(*) INTO persona_existente FROM persona WHERE DNI = p_DNI;
    
    IF persona_existente > 0 THEN
        SELECT Registro, Fecha, Hora FROM accidente
        WHERE accidente.DNI_cliente = p_DNI;
    END IF;
END;

//
DROP PROCEDURE IF EXISTS Contrato_por_usuario//
CREATE PROCEDURE Contrato_por_usuario(IN usuario_id VARCHAR(30))
BEGIN
    SELECT c.Categoria, c.Monto, c.Inicio, c.Termino
    FROM contrato c
    JOIN usuario u ON c.DNI_cliente = u.DNI
    WHERE u.Usuario_ID = usuario_id;
END;

//

DROP PROCEDURE IF EXISTS EliminarCliente//
CREATE PROCEDURE EliminarCliente(
    IN p_DNI VARCHAR(30)
)
BEGIN
    DECLARE existePersona INT;

    -- Verificar si el cliente existe
    SELECT COUNT(*) INTO existePersona FROM persona WHERE persona.DNI = p_DNI;
    
    IF existePersona > 0 THEN

        DELETE FROM cliente WHERE DNI_cliente = p_DNI;
        
        DELETE FROM persona_telefono WHERE DNI = p_DNI;
        
        DELETE FROM usuario WHERE DNI = p_DNI;

        DELETE FROM persona WHERE persona.DNI = p_DNI;
        
        SELECT 'Cliente eliminado exitosamente' AS Resultado;
    ELSE
        SELECT 'Error: Cliente no encontrado' AS Resultado;
    END IF;
END;
//

DROP PROCEDURE IF EXISTS ActualizarCliente//
CREATE PROCEDURE ActualizarCliente(
	IN p_DNI INTEGER,
	IN p_Usuario VARCHAR(30),
    IN p_pasword VARCHAR(30),
    IN p_Nombre VARCHAR(30),
	IN p_ApellidoP VARCHAR(20),
    IN p_ApellidoM VARCHAR(20),
	IN p_Telefono INTEGER,
    IN p_Fecha_nacimiento DATE,
    IN p_Nacionalidad VARCHAR(30),
    IN p_Genero CHAR(1),
	IN p_Direccion VARCHAR(100),
    IN p_Email VARCHAR(200)
)
BEGIN
    DECLARE existePersona INT;

    -- Verificar si el cliente existe
    SELECT COUNT(*) INTO existePersona FROM persona WHERE persona.DNI = p_DNI;
    
    IF existePersona > 0 THEN
		START TRANSACTION;
			UPDATE persona
			SET Nombre = p_Nombre,
				ApellidoP = p_ApellidoP,
				ApellidoM = p_ApellidoM,
				Fecha_nacimiento = p_Fecha_nacimiento,
				Genero = p_Genero,
				Nacionalidad = p_Nacionalidad,
				Email = p_Email
			WHERE persona.DNI = p_DNI;
			
			UPDATE usuario
				SET Usuario_ID = p_Usuario,
					pasword = p_pasword
			WHERE usuario.DNI = p_DNI;
			
			UPDATE cliente
				SET Direccion = p_Direccion
			WHERE cliente.DNI_cliente = p_DNI;
			
			UPDATE persona_telefono
				SET Telefono = p_Telefono
			WHERE persona_telefono.DNI = p_DNI;
            
		COMMIT;
		SELECT 'Datos actualizados exitosamente' AS Resultado;
    ELSE
        SELECT 'Error: Cliente no encontrado' AS Resultado;
    END IF;
END;
//

DROP PROCEDURE IF EXISTS AgregarSeguroPoliza//
CREATE PROCEDURE AgregarSeguroPoliza(
    IN p_Precio DECIMAL(6,2),
    IN p_Terminos_condiciones MEDIUMTEXT,
    IN p_Nro_personas_aseguradas INTEGER,
    IN p_Coberturas VARCHAR(300)
)
BEGIN
    DECLARE last_inserted_id INT;
    DECLARE i INT DEFAULT 1;
    DECLARE num_coberturas INT DEFAULT 0;
    DECLARE current_cobertura VARCHAR(30);

    -- Insertar datos en la tabla seguro_poliza
    INSERT INTO seguro_poliza (Precio, Terminos_condiciones, Nro_personas_aseguradas)
    VALUES (p_Precio, p_Terminos_condiciones, p_Nro_personas_aseguradas);

    -- Obtener el ID de la póliza recién insertada
    SET last_inserted_id = LAST_INSERT_ID();

    -- Insertar múltiples coberturas
    START TRANSACTION;
    SET num_coberturas = (SELECT LENGTH(p_Coberturas) - LENGTH(REPLACE(p_Coberturas, ',', '')) + 1);

    WHILE i <= num_coberturas DO
        SET current_cobertura = TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(p_Coberturas, ',', i), ',', -1));

        INSERT INTO cobertura (Categoria, Cobertura) VALUES (last_inserted_id, current_cobertura);
        
        SET i = i + 1;
    END WHILE;
    COMMIT;
END;

//
DROP PROCEDURE IF EXISTS obtenerSeguros_poliza//
CREATE PROCEDURE obtenerSeguros_poliza(
)
BEGIN
	SELECT * FROM seguro_poliza;
END;
//

DROP PROCEDURE IF EXISTS verificarLogin//
CREATE PROCEDURE verificarLogin(
	IN p_Usuario VARCHAR(30),
    IN p_pasword VARCHAR(30)
)
BEGIN
	SELECT * FROM usuario WHERE Usuario_ID = p_Usuario AND pasword = p_pasword;
END;
//

DROP PROCEDURE IF EXISTS ContratoExitoso//
CREATE PROCEDURE ContratoExitoso(
	p_DNI_vendedor INTEGER,
    p_DNI_cliente INTEGER,
	p_Categoria INTEGER,
    p_Monto	DECIMAL(8,2),
    p_Inicio DATE,
    p_Termino DATE
)
BEGIN
	INSERT INTO contrato (DNI_cliente, Categoria, Monto, Inicio, Termino)
    VALUES (p_DNI_cliente, p_Categoria, p_Monto, p_Inicio, p_Termino);
    
	INSERT INTO vendedor_cliente (DNI_cliente, DNI_vendedor)
    VALUES (p_DNI_cliente, p_DNI_vendedor);
    
END;
//

DROP PROCEDURE IF EXISTS Agregar_Reclamo//
CREATE PROCEDURE Agregar_Reclamo(
    IN p_Reclamo TEXT,
    IN p_Fecha DATE,
    IN p_Hora TIME,
    IN p_DNI_cliente INTEGER
)
BEGIN
    INSERT INTO reclamos (Reclamo, Fecha, Hora, DNI_cliente)
    VALUES (p_Reclamo, p_Fecha, p_Hora, p_DNI_cliente);
END;
//

DROP PROCEDURE IF EXISTS Agregar_Accidente//
CREATE PROCEDURE Agregar_Accidente(
    IN p_Registro TEXT,
    IN p_Fecha DATE,
    IN p_Hora TIME,
    IN p_DNI_cliente INTEGER
)
BEGIN
    INSERT INTO accidente (Registro, Fecha, Hora, DNI_cliente)
    VALUES (p_Registro, p_Fecha, p_Hora, p_DNI_cliente);
END;
//


DROP PROCEDURE IF EXISTS Reporte_Reclamos//
CREATE PROCEDURE Reporte_Reclamos()
BEGIN
    SELECT reclamos.Reclamo_ID, reclamos.Reclamo, reclamos.Fecha, CONCAT(p.Nombre, ' ', p.ApellidoP, ' ', p.ApellidoM) AS Nombre_Cliente
    FROM reclamos
    INNER JOIN cliente ON reclamos.DNI_cliente = cliente.DNI_cliente
    INNER JOIN persona p ON cliente.DNI_cliente = p.DNI;
END;
//
DROP PROCEDURE IF EXISTS Reporte_Accidentes//
CREATE PROCEDURE Reporte_Accidentes()
BEGIN
    SELECT accidente.Incidente_ID, accidente.Registro, accidente.Fecha, accidente.Hora, CONCAT(p.Nombre, ' ', p.ApellidoP, ' ', p.ApellidoM) AS Nombre_Cliente
    FROM accidente
    INNER JOIN cliente ON accidente.DNI_cliente = cliente.DNI_cliente
    INNER JOIN persona p ON cliente.DNI_cliente = p.DNI;
END;
//
DROP PROCEDURE IF EXISTS Reporte_Contratos//
CREATE PROCEDURE Reporte_Contratos()
BEGIN

    SELECT c.Contrato_ID, CONCAT(p.Nombre, ' ', p.ApellidoP, ' ', p.ApellidoM) AS Nombre_Cliente, sp.Categoria, c.Monto, c.Inicio, c.Termino
    FROM contrato c
    INNER JOIN cliente ON c.DNI_cliente = cliente.DNI_cliente
    INNER JOIN persona p ON cliente.DNI_cliente = p.DNI
    INNER JOIN seguro_poliza sp ON c.Categoria = sp.Categoria;
END;
//

DROP PROCEDURE IF EXISTS Contrato_persona//
CREATE PROCEDURE Contrato_persona(p_DNI INT)
BEGIN

    SELECT Categoria, Monto, Inicio, Termino FROM contrato 
    WHERE DNI_cliente = p_DNI ;
END;

DROP PROCEDURE IF EXISTS Reporte_Contratos_Por_Vencer//
CREATE PROCEDURE Reporte_Contratos_Por_Vencer()
BEGIN
    DECLARE fecha_actual DATE;
    SET fecha_actual = CURDATE();

    SELECT c.Contrato_ID, CONCAT(p.Nombre, ' ', p.ApellidoP, ' ', p.ApellidoM) AS Nombre_Cliente, sp.Categoria, c.Monto, c.Inicio, c.Termino
    FROM contrato c
    INNER JOIN cliente ON c.DNI_cliente = cliente.DNI_cliente
    INNER JOIN persona p ON cliente.DNI_cliente = p.DNI
    INNER JOIN seguro_poliza sp ON c.Categoria = sp.Categoria
    WHERE c.Termino >= fecha_actual AND c.Termino <= fecha_actual + INTERVAL 15 DAY;
END;
//


-- ______________________________________________________________FUNCIONES_________________________________________________________________________

DROP FUNCTION IF EXISTS Edad//
CREATE FUNCTION Edad(fecha_nacimiento DATE)
RETURNS INT DETERMINISTIC
BEGIN
    DECLARE edad INT;
    SET edad = YEAR(CURRENT_DATE()) - YEAR(fecha_nacimiento);
    IF MONTH(CURRENT_DATE()) < MONTH(fecha_nacimiento) OR (MONTH(CURRENT_DATE()) = MONTH(fecha_nacimiento) AND DAY(CURRENT_DATE()) < DAY(fecha_nacimiento)) THEN
        SET edad = edad - 1;
    END IF;
    RETURN edad;
END;
//

DROP FUNCTION IF EXISTS Devolver_DNI//
CREATE FUNCTION Devolver_DNI (p_usuario VARCHAR(30)) 
RETURNS INT DETERMINISTIC
BEGIN
    DECLARE p_DNI INTEGER;
	SELECT DNI INTO p_DNI FROM usuario WHERE Usuario_ID = p_usuario;
    RETURN p_DNI;
END;
//

DROP FUNCTION IF EXISTS Cargo//
CREATE FUNCTION Cargo (p_usuario VARCHAR(30)) 
RETURNS INT DETERMINISTIC
BEGIN
    DECLARE tipo INTEGER;
    DECLARE p_DNI INTEGER;

    IF EXISTS (SELECT 1 FROM usuario WHERE Usuario_ID = p_usuario) THEN
		SET p_DNI = Devolver_DNI(p_usuario);

        IF EXISTS (SELECT 1 FROM vendedor WHERE DNI_vendedor = p_DNI) THEN
            SET tipo = -1; -- Vendedor
        ELSEIF EXISTS (SELECT 1 FROM atencion_cliente WHERE DNI_atencion_cliente = p_DNI) THEN
            SET tipo = 0; -- Atención al cliente
        ELSE
            SET tipo = 1; -- Cliente
        END IF;
    ELSE
        SET tipo = 2; -- No existe usuario
    END IF;

    RETURN tipo;
END;
//

DELIMITER ;

SELECT Usuario_ID, Cargo(Usuario_ID) as Cargo FROM usuario;
CALL Reporte_Reclamos();
CALL Reporte_Accidentes();
CALL Reporte_Contratos();
CALL Reporte_Contratos_Por_Vencer();
SELECT Devolver_DNI(Usuario_ID) FROM usuario;
CALL MostrarCliente('john_doe');
CALL Contrato_persona(1);
