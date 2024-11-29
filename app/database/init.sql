-- Note for later: Look into using indexes for performance optimization in database queries

SET TIME ZONE 'America/Vancouver';

CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(120) UNIQUE NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE, -- Track if the email is verified
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    archived_at TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    created_by INT REFERENCES Users(user_id),
    updated_by INT REFERENCES Users(user_id),
    deleted_by INT REFERENCES Users(user_id),
    archived_by INT REFERENCES Users(user_id)
);

CREATE TABLE "User_Sessions" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "User_Sessions" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid");
CREATE INDEX "IDX_session_expire" ON "User_Sessions" ("expire");

CREATE TABLE AI_Generated_Images (
    image_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    image_url TEXT NOT NULL,
    prompt TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    archived_at TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    created_by INT REFERENCES Users(user_id),
    updated_by INT REFERENCES Users(user_id),
    deleted_by INT REFERENCES Users(user_id),
    archived_by INT REFERENCES Users(user_id)
);

CREATE TABLE Products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    product_type VARCHAR(50) NOT NULL,
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    sale_price DECIMAL(10, 2),
    stock_quantity INT DEFAULT 0,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    archived_at TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    created_by INT REFERENCES Users(user_id),
    updated_by INT REFERENCES Users(user_id),
    deleted_by INT REFERENCES Users(user_id),
    archived_by INT REFERENCES Users(user_id)
);

-- Track price changes
CREATE TABLE Product_Price_History (
    price_history_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES Products(product_id),
    old_price DECIMAL(10, 2) NOT NULL,
    new_price DECIMAL(10, 2) NOT NULL,
    change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    changed_by INT REFERENCES Users(user_id)
);

CREATE TABLE Shipping_Info (
    shipping_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    archived_at TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    created_by INT REFERENCES Users(user_id),
    updated_by INT REFERENCES Users(user_id),
    deleted_by INT REFERENCES Users(user_id),
    archived_by INT REFERENCES Users(user_id)
);

CREATE TABLE Coupons (
    coupon_id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    discount_type VARCHAR(20) NOT NULL, -- 'percentage' or 'fixed'
    discount_value DECIMAL(10, 2) NOT NULL, -- Percentage or fixed amount
    min_order_value DECIMAL(10, 2), -- Minimum order value to apply coupon
    max_discount DECIMAL(10, 2), -- Maximum discount (optional, for percentage discounts)
    start_date TIMESTAMP NOT NULL, -- Coupon start validity
    end_date TIMESTAMP NOT NULL, -- Coupon expiry date
    usage_limit INT DEFAULT 0, -- Maximum times the coupon can be used (0 = unlimited)
    used_count INT DEFAULT 0, -- Tracks how many times the coupon has been used
    is_active BOOLEAN DEFAULT TRUE, -- If the coupon is currently active
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES Users(user_id), -- Admin who created the coupon
    updated_by INT REFERENCES Users(user_id) -- Admin who last updated the coupon
);

CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    total_price DECIMAL(10, 2) NOT NULL,
    order_status VARCHAR(50) DEFAULT 'pending',
    shipping_id INT REFERENCES Shipping_Info(shipping_id),
    country VARCHAR(100), -- Tracks the country from the Shipping_Info table
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    archived_at TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    created_by INT REFERENCES Users(user_id),
    updated_by INT REFERENCES Users(user_id),
    deleted_by INT REFERENCES Users(user_id),
    archived_by INT REFERENCES Users(user_id),
    coupon_id INT REFERENCES Coupons(coupon_id),
    discount_applied DECIMAL(10, 2) DEFAULT 0.00
);


CREATE TABLE Order_Items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES Orders(order_id) ON DELETE CASCADE,
    product_id INT REFERENCES Products(product_id),
    quantity INT NOT NULL,
    price_per_item DECIMAL(10, 2) NOT NULL,
    sale_applied BOOLEAN DEFAULT FALSE, -- Tracks whether a sale price was applied
    image_id INT REFERENCES AI_Generated_Images(image_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    archived_at TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    created_by INT REFERENCES Users(user_id),
    updated_by INT REFERENCES Users(user_id),
    deleted_by INT REFERENCES Users(user_id),
    archived_by INT REFERENCES Users(user_id)
);

CREATE TABLE Cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    archived_at TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    created_by INT REFERENCES Users(user_id),
    updated_by INT REFERENCES Users(user_id),
    deleted_by INT REFERENCES Users(user_id),
    archived_by INT REFERENCES Users(user_id)
);

CREATE TABLE Cart_Items (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES Cart(cart_id) ON DELETE CASCADE,
    product_id INT REFERENCES Products(product_id),
    quantity INT NOT NULL,
    image_id INT REFERENCES AI_Generated_Images(image_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    archived_at TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    created_by INT REFERENCES Users(user_id),
    updated_by INT REFERENCES Users(user_id),
    deleted_by INT REFERENCES Users(user_id),
    archived_by INT REFERENCES Users(user_id)
);

CREATE TABLE Payment_Info (
    payment_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),
    order_id INT REFERENCES Orders(order_id),
    payment_method VARCHAR(50) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    archived_at TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    created_by INT REFERENCES Users(user_id),
    updated_by INT REFERENCES Users(user_id),
    deleted_by INT REFERENCES Users(user_id),
    archived_by INT REFERENCES Users(user_id)
);

-- Track sale trends
CREATE TABLE Sales_Analytics (
    analytics_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES Products(product_id),
    total_sales INT DEFAULT 0, 
    total_revenue DECIMAL(10, 2) DEFAULT 0.00,
    last_sale_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Email_Subscriptions (
    subscription_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    is_subscribed BOOLEAN DEFAULT TRUE,
    subscription_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT REFERENCES Users(user_id)
);

CREATE TABLE Example_Prompts (
    prompt_id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL, -- Category for grouping prompts (e.g., "Nature", "Abstract", "Digital Art", "Cartoon")
    prompt_text TEXT NOT NULL, -- The example prompt text
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Track coupon usage
CREATE TABLE Coupon_Usage_History (
    usage_id SERIAL PRIMARY KEY,
    coupon_id INT REFERENCES Coupons(coupon_id),
    order_id INT REFERENCES Orders(order_id),
    user_id INT REFERENCES Users(user_id),
    discount_applied DECIMAL(10, 2) NOT NULL, -- Discount applied for this order
    usage_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to increment the used_count in Coupons table when a coupon is used
CREATE OR REPLACE FUNCTION increment_coupon_usage()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE Coupons
    SET used_count = used_count + 1
    WHERE coupon_id = NEW.coupon_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to Coupon_Usage_History table
CREATE TRIGGER after_coupon_usage
AFTER INSERT ON Coupon_Usage_History
FOR EACH ROW
EXECUTE FUNCTION increment_coupon_usage();

ALTER TABLE Shipping_Info
ADD COLUMN order_id INT REFERENCES Orders(order_id);

INSERT INTO Users (email, firstName, lastName, password_hash, email_verified, created_at, updated_at) VALUES
('colton.p@hotmail.com', 'Colton', 'Palfrey', 'hashed_password_1', TRUE, '2024-01-01 10:00:00', '2024-01-01 10:00:00'),
('tannerbjorgan@gmail.com', 'Tanner', 'Bjorgan', 'hashed_password_2', TRUE, '2024-01-02 11:00:00', '2024-01-02 11:00:00'),
('jane.doe@example.com', 'Jane', 'Doe', 'hashed_password_3', TRUE, '2024-01-03 12:00:00', '2024-01-03 12:00:00'),
('john.smith@example.com', 'John', 'Smith', 'hashed_password_4', TRUE, '2024-01-04 13:00:00', '2024-01-04 13:00:00');


INSERT INTO Products (product_name, product_type, description, base_price, sale_price, stock_quantity, is_available, created_at, updated_at) VALUES
('Custom AI Mug', 'mug', 'A high-quality mug with AI-generated artwork.', 15.99, 12.99, 50, TRUE, '2024-01-01 10:00:00', '2024-01-01 10:00:00'),
('AI Poster', 'poster', 'A unique poster featuring AI art.', 25.99, 20.99, 30, TRUE, '2024-01-02 11:00:00', '2024-01-02 11:00:00'),
('T-Shirt', 'shirt', 'Comfortable t-shirt with AI-generated design.', 19.99, 15.99, 100, TRUE, '2024-01-03 12:00:00', '2024-01-03 12:00:00'),
('Puzzle', 'puzzle', 'A 500-piece puzzle with AI art.', 29.99, NULL, 25, TRUE, '2024-01-04 13:00:00', '2024-01-04 13:00:00');


INSERT INTO Product_Price_History (product_id, old_price, new_price, change_date, changed_by) VALUES
(1, 18.99, 15.99, '2024-01-05 14:00:00', 1),
(2, 30.99, 25.99, '2024-01-06 15:00:00', 1),
(3, 22.99, 19.99, '2024-01-07 16:00:00', 1);


INSERT INTO Coupons (code, description, discount_type, discount_value, min_order_value, max_discount, start_date, end_date, usage_limit, is_active, created_at, updated_at) VALUES
('SAVE20', '20% off your order', 'percentage', 20, 50.00, NULL, '2024-01-01', '2024-12-31', 100, TRUE, '2024-01-01 10:00:00', '2024-01-01 10:00:00'),
('FREESHIP', 'Free shipping for orders over $50', 'fixed', 10, 50.00, NULL, '2024-01-01', '2024-12-31', 200, TRUE, '2024-01-02 11:00:00', '2024-01-02 11:00:00');


INSERT INTO Orders (user_id, total_price, order_status, country, coupon_id, discount_applied, created_at, updated_at) VALUES
(1, 35.97, 'completed', 'Canada', 1, 7.19, '2024-01-05 14:00:00', '2024-01-05 14:00:00'),
(2, 50.00, 'pending', 'United States', 2, 10.00, '2024-01-06 15:00:00', '2024-01-06 15:00:00'),
(3, 29.99, 'completed', 'United Kingdom', NULL, 0.00, '2024-01-07 16:00:00', '2024-01-07 16:00:00');


INSERT INTO Order_Items (order_id, product_id, quantity, price_per_item, sale_applied, created_at, updated_at) VALUES
(1, 1, 2, 12.99, TRUE, '2024-01-05 14:00:00', '2024-01-05 14:00:00'),
(1, 3, 1, 15.99, FALSE, '2024-01-05 14:00:00', '2024-01-05 14:00:00'),
(2, 2, 2, 20.99, TRUE, '2024-01-06 15:00:00', '2024-01-06 15:00:00'),
(3, 4, 1, 29.99, FALSE, '2024-01-07 16:00:00', '2024-01-07 16:00:00');


INSERT INTO Coupon_Usage_History (coupon_id, order_id, user_id, discount_applied, usage_date) VALUES
(1, 1, 1, 7.19, '2024-01-05 14:00:00'),
(2, 2, 2, 10.00, '2024-01-06 15:00:00');


INSERT INTO AI_Generated_Images (user_id, image_url, prompt, created_at, updated_at) VALUES
(1, 'https://example.com/images/1.jpg', 'Abstract art of a forest', '2024-01-01 10:00:00', '2024-01-01 10:00:00'),
(2, 'https://example.com/images/2.jpg', 'Surreal landscape with mountains', '2024-01-02 11:00:00', '2024-01-02 11:00:00'),
(3, 'https://example.com/images/3.jpg', 'Futuristic cityscape at night', '2024-01-03 12:00:00', '2024-01-03 12:00:00'),
(4, 'https://example.com/images/4.jpg', 'Ocean view with sunset', '2024-01-04 13:00:00', '2024-01-04 13:00:00');


INSERT INTO Email_Subscriptions (user_id, is_subscribed, subscription_date, created_at, updated_at) VALUES
(1, TRUE, '2024-01-01 10:00:00', '2024-01-01 10:00:00', '2024-01-01 10:00:00'),
(2, TRUE, '2024-01-02 11:00:00', '2024-01-02 11:00:00', '2024-01-02 11:00:00'),
(3, FALSE, '2024-01-03 12:00:00', '2024-01-03 12:00:00', '2024-01-03 12:00:00'),
(4, TRUE, '2024-01-04 13:00:00', '2024-01-04 13:00:00', '2024-01-04 13:00:00');

INSERT INTO Example_Prompts (category, prompt_text, description, created_at, updated_at) VALUES
('Nature', 'A serene forest with sunlight filtering through the trees', 'Generates a peaceful and natural woodland scene', '2024-01-01 10:00:00', '2024-01-01 10:00:00'),
('Fantasy', 'A majestic dragon flying over a medieval castle at sunset', 'Perfect for fantasy-themed artwork', '2024-01-01 11:00:00', '2024-01-01 11:00:00'),
('Abstract', 'An explosion of vibrant colors in a geometric pattern', 'Creates a visually stunning abstract composition', '2024-01-01 12:00:00', '2024-01-01 12:00:00'),
('Sci-Fi', 'A futuristic cityscape with flying cars and neon lights', 'Ideal for science fiction and futuristic settings', '2024-01-01 13:00:00', '2024-01-01 13:00:00'),
('Animals', 'A playful kitten in a field of flowers during springtime', 'Captures a cute and charming animal moment', '2024-01-01 14:00:00', '2024-01-01 14:00:00'),
('Space', 'A distant galaxy with a vibrant nebula and scattered stars', 'For cosmic and interstellar-themed creations', '2024-01-01 15:00:00', '2024-01-01 15:00:00'),
('Portraits', 'A regal queen with a jeweled crown and flowing robes', 'For creating royal and elegant portraiture', '2024-01-01 16:00:00', '2024-01-01 16:00:00'),
('Minimalist', 'A single tree on a hill under a clear blue sky', 'Generates a clean and simple minimalist design', '2024-01-01 17:00:00', '2024-01-01 17:00:00'),
('Food', 'A stack of fluffy pancakes with syrup and berries', 'Perfect for food-related designs and themes', '2024-01-01 18:00:00', '2024-01-01 18:00:00'),
('Adventure', 'A lone hiker standing at the edge of a vast canyon', 'Captures a sense of exploration and adventure', '2024-01-01 19:00:00', '2024-01-01 19:00:00');