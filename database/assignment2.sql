
--  Agregar un nuevo usuario a la tabla 'account'
INSERT INTO account
(account_firstname, account_lastname, account_email, account_password)
VALUES
('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- Actualizar el tipo de cuenta a 'Admin' para el usuario con account_id = 1
UPDATE account
SET account_typeen = 'Admin'
WHERE account_id = 1;

-- Eliminar el usuario con account_id = 1 de la tabla 'account'
DELETE FROM account
WHERE account_id = 1;

-- Actualizar la descripción del inventario para el vehículo GM Hummer
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM'
AND inv_model = 'Hummer';

-- Seleccionar todos los vehículos de la clasificación 'Sport' junto con sus nombres de clasificación
SELECT inv.inv_make, inv.inv_model, c.classification_name
FROM inventory inv
INNER JOIN classification c
ON inv.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- Actualizar las rutas de las imágenes y miniaturas en la tabla de inventario
UPDATE inventory
SET
  inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
  inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
