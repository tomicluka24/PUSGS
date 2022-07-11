-- SQLite
INSERT INTO Menu (
    Name,
    Price,
    Ingredients
)
VALUES
    (
        'MARGHERITA',
        800,
        'peeled tomato, cheese, cherry tomatoes, rocket, mozzarella'
    ),
    (
        'CAPRICCIOSA',
        890,
        'peeled tomato, cheese, ham, mushrooms, kalamata olives'
    ),
    (
        'SEAFOOD PIZZA',
        1450,
        'peeled tomato, cheese, marinated seafood, vongole, anchovies, smoked salmon, spinach, rocket, lemon, lime, olive mix, oregano'
    ),
    (
        'MEXICANA',
        1150,
        'peeled tomato, cheese, mushrooms, kulen, bacon, chili peppers, jalapeno, corn, red beans, melted cheese, fresh parsley'
    ),
    (
        'AL TONNO',
        910,
        'peeled tomato, mushrooms, tuna, cheese, olives, cherry tomatoes, red onion, capers, corn, lemon'
    ),
    (
        'GRILLED BEEF STEAK',
        2150,
        'served with parisienne potatoes, fresh salad mix and homemade bread'
    ),
    (
        'ĆEVAPI',
        1150,
        'homemade 100% beef ćevapi, bun, kajmak, roasted hot pepper'
    ),
    (
        'STUFFED-CRUMBED CHICKEN BREAST',
        1100,
        'chicken filet, roasted paprika, spinach, feta cheese, hard cow cheese, lettuce mix, French fries, tartar sauce, homemade bread'
    ),
    (
        'GRILLED CHICKEN FILET WITH HERB BUTTER',
        1050,
        'Grilled chicken filet with herb butter, french fries, fresh salad mix, homemade bread'
    ),
    (
        'PULLED LAMB',
        1750,
        'lamb roasted for more than 12 hours, with homemade potatoes topped with kajmak sauce, green salad mix, avocado and sun-dried tomatoes'
    ),
    (
        'SALMON STEAK',
        1850,
        'grilled salmon with fennel and apple salsa, creamy risotto with corn'
    ),
    (
        'HOT AND SOUR CHICKEN SOUP',
        390,
        'chicken filet, egg, carrot, leek, three kinds of mushrooms, soy sauce'
    ),
    (
        'CAESAR SALAD',
        850,
        'iceberg and roman salad, breaded chicken breasts, crispy pancetta, cherry tomato, caesar dressing, grana padano, pinoli, croutons'
    ),
    (
        'CHILI BEEF SALAD',
        1150,
        'fresh salad mix, beef filet strips, mushrooms, baby corn, cucumber, avocado, jalapeno peppers'
    ),
    (
        'CRISPY SQUID SALAD',
        950,
        'resh salad mix, crispy squid, cucumber, chicory, fennel, sun-dried tomatoes, lemon dressing, tartar sauc'
    ),
    (
        'CHEFS SPECIAL',
        1100,
        'fresh salad mix, pork, chicken and beef filet, cheddar cheese, red beans, peppers, cherry tomatoes, marinated zucchini, tortilla chips'
    ),
    (
        'RAFFAELLO',
        630,
        'white chocolate cream with coconut and crispy cream'
    ),
    (
        'FERRERO',
        630,
        'milk chocolate and hazelnut cream with crispy biscuits, chocolate ice cream'
    ),
    (
        'CHEESECAKE',
        440,
        'with banana filling and berry sauce'
    ),
    (
        'CHOCOLATE LAVA CAKE WITH RASPBERRY SAUCE',
        460,
        'creamy soft cake made from the finest dark chocolate served with vanilla ice cream'
    ),
    (
        'NOISETTE CAKE',
        510,
        'white cream filling with hazelnut, coconut, Pina Colada Liqueur and dark crunch filling with the finest Belgian chocolate'
    );



DROP TABLE Menu;

CREATE TABLE Menu(
   Id integer PRIMARY KEY AUTOINCREMENT,
   Name text,
   Price integer,
   Ingredients text
);