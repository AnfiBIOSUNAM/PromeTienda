create database Tienda;
use Tienda;

create user 'lab'@'localhost' identified by 'Developer123!';

grant all privileges on Tienda.* to 'lab'@'localhost'
with grant option;


DROP TABLE if exists Usuario;
CREATE TABLE Usuario(
	idUsuario int auto_increment,
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


drop table if exists Compra;
CREATE TABLE Compra (
    idCompra int auto_increment,
    idUsuario int,
    total Float,
    fecha Date,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
    primary key (idCompra)
);


drop table if exists Carrito;
CREATE TABLE Carrito (
    idCarrito INT auto_increment,
    primary key (idCarrito)
);

drop table if exists Producto;
CREATE TABLE Producto (
    idProducto int auto_increment,
    idUsuario INT,
    nombreProducto VARCHAR(50),
    descripcion text,
    foto varchar(255),
    precio DECIMAL(10,2),
    contacto text,
    cantidad INT,
    primary key (idProducto),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);


drop table if exists Almacenar;
CREATE TABLE Almacenar (
	idAlmacenar INT auto_increment,
    idCarrito INT,
    idProducto INT,
    cantidad INT,
    primary key (idAlmacenar),
    FOREIGN KEY (idCarrito) REFERENCES Tener(idCarrito),
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
);

drop table if exists Categoria;
CREATE TABLE Categoria (
	idCategoria int auto_increment,
    idProducto INT,
    categoria VARCHAR(255),
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto),
    primary key(idCategoria)
);

drop table if exists Contener;
CREATE TABLE Contener (
    idContener INT auto_increment,
    idCompra INT,
    idProducto INT,
    cantidad INT,
    importe Float,
    calificacion INT,
    comentario text,
    primary key(idContener),
    FOREIGN KEY (idCompra) REFERENCES Compra(idCompra),
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
);

drop table if exists Tener;
CREATE TABLE Tener (
    idCarrito INT auto_increment,
    idComprador INT,
    nombre VARCHAR(50),
    apPat VARCHAR(50),
    apMat VARCHAR(50),
    correo VARCHAR(100),
    telefono VARCHAR(15),
    contraseña VARCHAR(50),
    imagen varchar(50),
    vendedor tinyint not null,
    primary key (idCarrito),
    FOREIGN KEY (idComprador) REFERENCES Usuario(idUsuario)
);

DELIMITER //
CREATE TRIGGER after_insert_usuario
AFTER INSERT ON Usuario
FOR EACH ROW
BEGIN
    IF NEW.vendedor = 0 THEN
        INSERT INTO Tener (idComprador, nombre, apPat, apMat, correo, telefono, contraseña, imagen, vendedor)
        VALUES (NEW.idUsuario, NEW.nombre, NEW.apPat, NEW.apMat, NEW.correo, NEW.telefono, NEW.contraseña, NEW.imagen, NEW.vendedor);
    END IF;
END//
DELIMITER ;


select * from Usuario;