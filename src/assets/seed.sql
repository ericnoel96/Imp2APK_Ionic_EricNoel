CREATE TABLE IF NOT EXISTS departamento(id INTEGER PRIMARY KEY AUTOINCREMENT,nombre TEXT);
INSERT or IGNORE INTO departamento VALUES (1, 'Producción');
INSERT or IGNORE INTO departamento VALUES (2, 'Recursos Humanos');
INSERT or IGNORE INTO departamento VALUES (3, 'Contabilidad');
 
CREATE TABLE IF NOT EXISTS empleado(id INTEGER PRIMARY KEY AUTOINCREMENT,nombre TEXT, sueldo DECIMAL(18, 5), deparID INTEGER);
INSERT or IGNORE INTO empleado(id, nombre, sueldo, deparID) VALUES (1, 'José Enriquez', 50, 1);
INSERT or IGNORE INTO empleado(id, nombre, sueldo, deparID) VALUES (2, 'Juan Vargas', 123, 1);
INSERT or IGNORE INTO empleado(id, nombre, sueldo, deparID) VALUES (3, 'Sofía Vargas', 54, 2);
INSERT or IGNORE INTO empleado(id, nombre, sueldo, deparID) VALUES (4, 'Ana Vargas', 125, 2);
INSERT or IGNORE INTO empleado(id, nombre, sueldo, deparID) VALUES (5, 'Cris Salazar', 350, 3);
INSERT or IGNORE INTO empleado(id, nombre, sueldo, deparID) VALUES (6, 'Roberto Vásquez', 234, 3);