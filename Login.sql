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
    contraseÃ±a varchar(50) not null,
    imagen varchar(50),
    vendedor tinyint not null,
    primary key (idUsuario)
);


drop table if exists Compra;
CREATE TABLE Compra (
    idCompra int auto_increment,
    idUsuario int,
    total Float,
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
    idCarrito INT,
    idProducto INT,
    cantidad INT,
    FOREIGN KEY (idCarrito) REFERENCES Carrito(idCarrito),
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
    idCompra INT,
    idProducto INT,
    cantidad INT,
    calificacion INT,
    comentario text,
    FOREIGN KEY (idCompra) REFERENCES Compra(idCompra),
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
);

drop table if exists Tener;
CREATE TABLE Tener (
    idCarrito INT,
    idComprador INT,
    nombre VARCHAR(50),
    apPat VARCHAR(50),
    apMat VARCHAR(50),
    correo VARCHAR(100),
    telefono VARCHAR(15),
    contraseÃ±a VARCHAR(50),
    FOREIGN KEY (idCarrito) REFERENCES Carrito(idCarrito),
    FOREIGN KEY (idComprador) REFERENCES Usuario(idUsuario)
);


select * from Usuario;