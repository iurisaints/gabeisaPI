CREATE DATABASE atividadeTI03;
 
USE atividadeTI03;
 
CREATE TABLE usuario(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email varchar(100) NOT NULL
);

SELECT * FROM usuario;


CREATE TABLE cadastro(
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
sobrenome VARCHAR(100) NOT NULL,
email varchar(100) NOT NULL,
cpf VARCHAR(20) NOT NULL,
telefone INT(30) NOT NULL,
senha VARCHAR(30) NOT NULL
);
 
 SELECT * FROM cadastro;


INSERT INTO usuario (nome, email) VALUES 
('fulano', 'fulano@email.com'),
('beltrano', 'beltrado@email.com'),
('cicrano', 'cicrano@email.com');

INSERT INTO cadastro (nome, sobrenome, email, cpf, telefone, senha) VALUES
('fulano', 'da Silva', 'fulano@email.com', '123.456.789-10', '912345678', '12345678'),
('beltrano', 'Ferreira', 'beltrano@email.com', '222.333.444-55', '112233445', '66778899'),
('cicrano', 'de Oliveira', 'cicrano@email.com', '111.222.333-44', '987654321', '87654321');




