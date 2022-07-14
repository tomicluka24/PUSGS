UPDATE Users
SET Address = 'Desanke maksimovic 24'
WHERE id=1;

UPDATE Users
SET DateOfBirth = '1998-15-4'
WHERE id=2;

UPDATE Users
SET Email = 'akulas98@gmail.com'
WHERE id=1;

UPDATE Users
SET FirstName = 'Luka'
WHERE id=1;

UPDATE AspNetUsers
SET CurrentOrderId = 0
WHERE Username = 'teodora98';

UPDATE Users
SET LastName = 'Tomic'
WHERE id=1;

UPDATE AspNetUsers
SET photoUrl = 'C:\\fakepath\\2.jpg'
WHERE id=10;

UPDATE Users
SET Verified = 'True'
WHERE id=1;

UPDATE AspNetUsers
SET Verified = 'False'
WHERE UserType = "Deliverer";

UPDATE Users
SET Verified = 'True'
WHERE UserType != "Deliverer";


UPDATE Users
SET Address = 'Desanke maksimovic 24'
WHERE id=2;

UPDATE Users
SET DateOfBirth = '1964-12-12'
WHERE id=2;

UPDATE Users
SET Email = 'vito.tomic@gmail.com'
WHERE id=2;

UPDATE Users
SET FirstName = 'Vitomir'
WHERE id=2;

UPDATE Users
SET LastName = 'Tomic'
WHERE id=2;

UPDATE Users
SET photoUrl = 'https://randomuser.me/portraits/men/2.jpg'
WHERE id=2;

UPDATE Users
SET photoUrl = "http://127.0.0.1:8887/Slike/4.png"
WHERE id=36;