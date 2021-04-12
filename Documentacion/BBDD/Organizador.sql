CREATE DATABASE Organizador;
USE Organizador;


CREATE TABLE Categorias (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    id_padre INT NOT NULL,
    id_users INT NOT NULL,
    CONSTRAINT PK_Categoria PRIMARY KEY (id),
    CONSTRAINT FK_PadreCategoria FOREIGN KEY (id_padre) REFERENCES Categorias (id),
    CONSTRAINT FK_UsuarioCategoria FOREIGN KEY (id_users) REFERENCES users (id)
);

CREATE TABLE Archivos (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    tipo VARCHAR(100) NOT NULL,
    fecha_archivo DATE NOT NULL,
    fecha_subida DATE NOT NULL,
    id_users INT NOT NULL,
    CONSTRAINT PK_Archivo PRIMARY KEY (id),
    CONSTRAINT FK_UsuarioArchivo FOREIGN KEY (id_users) REFERENCES users (id)
);

CREATE TABLE Archivos_Categorias (
    id_archivo INT NOT NULL,
    id_categoria INT NOT NULL,
    CONSTRAINT PK_ArchivoCategoria PRIMARY KEY (id_archivo, id_categoria),
    CONSTRAINT FK_Archivo_ArchivoCategoria FOREIGN KEY (id_archivo) REFERENCES Archivos (id),
    CONSTRAINT FK_Categoria_ArchivoCategoria FOREIGN KEY (id_categoria) REFERENCES Categorias (id)
);