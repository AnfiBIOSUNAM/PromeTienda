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

drop table if exists Reseña;
CREATE TABLE Reseña (
    idReseña int auto_increment,
    comentario VARCHAR(255),
    calificacion INT,
    primary key (idReseña)
);

drop table if exists Compra;
CREATE TABLE Compra (
    idCompra int auto_increment,
    idUsuario int,
    total Float,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
    primary key (idCompra)
);

drop table if exists Incluir;
CREATE TABLE Incluir (
    idReseña INT auto_increment,
    idCompra INT,
    FOREIGN KEY (idCompra) REFERENCES Compra(idCompra),
    FOREIGN KEY (idReseña) REFERENCES Reseña(idReseña)
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
    descripcion VARCHAR(255),
    foto BLOB,
    precio DECIMAL(10,2),
    contacto VARCHAR(50),
    cantidad INT,
    primary key (idProducto),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

drop table if exists Almacenar;
CREATE TABLE Almacenar (
    idCarrito INT auto_increment,
    idProducto INT,
    cantidad INT,
    FOREIGN KEY (idCarrito) REFERENCES Carrito(idCarrito),
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
);

drop table if exists Categoria;
CREATE TABLE Categoria (
    idProducto INT auto_increment,
    categoria VARCHAR(255),
    FOREIGN KEY (idProducto) REFERENCES Producto(idProducto)
);

drop table if exists Contener;
CREATE TABLE Contener (
    idCompra INT auto_increment,
    idProducto INT,
    cantidad INT,
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
    FOREIGN KEY (idCarrito) REFERENCES Carrito(idCarrito),
    FOREIGN KEY (idComprador) REFERENCES Usuario(idUsuario)
);


select * from Usuario;