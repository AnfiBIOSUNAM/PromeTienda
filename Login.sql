create database Tienda;
use Tienda;

create user 'lab'@'localhost' identified by 'Developer123!';

grant all privileges on Tienda.* to 'lab'@'localhost'
with grant option;

DROP TABLE IF EXISTS Usuario;
CREATE TABLE Usuario(
	idUsuario serial,
    nombre varchar(50) not null,
    apPat varchar (50) not null,
    apMat varchar (50) not null,
    correo varchar (50) not null,
    telefono varchar(10) not null,
    contraseña varchar(50) not null,
    imagen varchar(50),
    vendedor tinyint not null,
    primary key (idUsuario)
);


INSERT INTO Usuario (nombre, apPat, apMat, correo, telefono, contraseña, imagen, vendedor)
VALUES ('Juan', 'Pérez', 'Gómez', 'juan@example.com', '1234567890', 'contraseña123', 'imagen.jpg', 0),
    ('María', 'López', 'Martínez', 'maria@example.com', '9876543210', 'password123', 'imagen.jpg', 1),
    ('Pedro', 'Sánchez', 'García', 'pedro@example.com', '5551234567', 'securepass', 'imagen.jpg', 0),
    ('Ana', 'González', 'Hernández', 'ana@example.com', '9998887776', 'mypassword', 'imagen.jpg', 1),
    ('Carlos', 'Martínez', 'Díaz', 'carlos@example.com', '1231231234', '123456', 'imagen.jpg', 0),
    ('Laura', 'Hernández', 'Rodríguez', 'laura@example.com', '9879879876', 'test123', 'imagen.jpg', 1),
    ('José', 'Torres', 'Fernández', 'jose@example.com', '1112223333', 'pass1234', 'imagen.jpg', 0),
    ('Sofía', 'Díaz', 'Ruiz', 'sofia@example.com', '4445556666', 'password', 'imagen.jpg', 1),
    ('Miguel', 'Ruiz', 'López', 'miguel@example.com', '7778889999', 'secure123', 'imagen.jpg', 0),
    ('Lucía', 'Fernández', 'Gutiérrez', 'lucia@example.com', '3334445555', 'mypass', 'imagen.jpg', 1),
    ('Alejandro', 'Gutiérrez', 'Sánchez', 'alejandro@example.com', '6667778888', 'hello123', 'imagen.jpg', 0);

select * from Usuario
