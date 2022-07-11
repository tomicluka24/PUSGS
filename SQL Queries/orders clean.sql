-- SQLite
UPDATE Orders
SET Accepted = 'False';

UPDATE AspNetUsers
SET CurrentOrderId = 0; 

UPDATE Orders
SET DelivererId = 1;

DELETE FROM Orders
WHERE Id >= 1; 



