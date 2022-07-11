-- SQLite
CREATE TABLE Orders (
    Id integer PRIMARY KEY,
    ConsumerId integer,
    DelivererId integer,
    ProductId integer,
    ProductName text,
    Quantity integer,
    DeliveryAddress text,
    Comment text,
    Price integer,
    Accepted text,
    FOREIGN KEY (ConsumerId) REFERENCES AspNetUsers(Id),
    FOREIGN KEY (ProductId) REFERENCES Menu(Id),
    FOREIGN KEY (DelivererId) REFERENCES AspNetUsers(Id)
);


DROP TABLE Orders;

SELECT * FROM pragma_foreign_key_list('Orders');