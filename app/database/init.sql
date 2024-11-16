CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
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

CREATE TABLE User_Sessions (
    session_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id), 
    session_token VARCHAR(255) NOT NULL, 
    ip_address VARCHAR(45), 
    user_agent TEXT, 
    is_active BOOLEAN DEFAULT TRUE, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expired_at TIMESTAMP,
    terminated_by INT REFERENCES Users(user_id),
    created_by INT REFERENCES Users(user_id),
    updated_by INT REFERENCES Users(user_id),
    deleted_at TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    archived_at TIMESTAMP,
    is_archived BOOLEAN DEFAULT FALSE,
    deleted_by INT REFERENCES Users(user_id),
    archived_by INT REFERENCES Users(user_id)
);

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

CREATE TABLE Shipping_Info (
    shipping_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES Orders(order_id),
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


INSERT INTO Coupons (code, description, discount_type, discount_value, min_order_value, max_discount, start_date, end_date, usage_limit)
VALUES 
('SAVE10', '10% off on your next order', 'percentage', 10, 20.00, 50.00, '2024-11-01', '2024-12-31', 100),
('FREESHIP', 'Free shipping on orders over $50', 'fixed', 10, 50.00, NULL, '2024-11-01', '2024-12-31', 200);


INSERT INTO users VALUES(first_name, last_name, email, password) VALUES
('Colton', 'Palfrey', 'colton.p@hotmail.com', 'password'),
('Tanner', 'Bjorgan', 'tannerbjorgan@gmail.com', 'password');
