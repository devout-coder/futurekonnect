-- Insert dummy tenant data for the last 7 days
INSERT INTO tenants (name, data_usage, date) VALUES
('RUDRA', 22.4, CURRENT_DATE - 6),
('Vashi Office', 34.5, CURRENT_DATE - 6),
('Station Satcom', 64.2, CURRENT_DATE - 6),
('RUDRA', 25.1, CURRENT_DATE - 5),
('Vashi Office', 36.8, CURRENT_DATE - 5),
('Station Satcom', 68.9, CURRENT_DATE - 5),
('RUDRA', 23.7, CURRENT_DATE - 4),
('Vashi Office', 35.2, CURRENT_DATE - 4),
('Station Satcom', 65.8, CURRENT_DATE - 4),
('RUDRA', 24.3, CURRENT_DATE - 3),
('Vashi Office', 37.1, CURRENT_DATE - 3),
('Station Satcom', 67.5, CURRENT_DATE - 3),
('RUDRA', 26.8, CURRENT_DATE - 2),
('Vashi Office', 38.4, CURRENT_DATE - 2),
('Station Satcom', 69.2, CURRENT_DATE - 2),
('RUDRA', 25.5, CURRENT_DATE - 1),
('Vashi Office', 36.9, CURRENT_DATE - 1),
('Station Satcom', 66.7, CURRENT_DATE - 1),
('RUDRA', 27.2, CURRENT_DATE),
('Vashi Office', 39.1, CURRENT_DATE),
('Station Satcom', 70.3, CURRENT_DATE);

-- Insert dummy audit trail data
INSERT INTO audit_trail (time, description, event, category, performed_by) VALUES
('2024-02-11 14:33:00', 'Admin user Roshann Agarwal with the role Tenant Admin was created', 'create', 'Admin', 'Fletcher Fernandes'),
('2024-02-11 13:52:00', 'A firewall rule allowing traffic from IP addresses to be accepted was created.', 'create', 'Firewall Rule', 'Sachin Gowda'),
('2024-02-11 13:23:00', 'Certificate downloaded for router Tranquil Sea.', 'download', 'Router Certificate', 'Mukesh Sai Kumar'),
('2024-02-11 13:11:00', 'Hotspot user JohnDoe was deleted from router Mianzimu (HCQ083QNSNF).', 'delete', 'Hotspot User', 'Vishal Dubey'),
('2024-02-11 13:01:00', 'Firewall template Dualog was deleted', 'delete', 'Firewall Template', 'Vishal Dubey'),
('2024-02-11 12:58:00', 'New router RUDRA23 (FF044QNSNF) was created', 'create', 'Router', 'Karan Sajnani'),
('2024-02-11 12:58:00', 'New router RUDRA23 (FF044QNSNF) was created', 'create', 'Router', 'Karan Sajnani'),
('2024-02-11 12:58:00', 'New router RUDRA23 (FF044QNSNF) was created', 'create', 'Router', 'Karan Sajnani'),
('2024-02-11 12:58:00', 'New router RUDRA23 (FF044QNSNF) was created', 'create', 'Router', 'Karan Sajnani'),
('2024-02-11 12:58:00', 'New router RUDRA23 (FF044QNSNF) was created', 'create', 'Router', 'Karan Sajnani'),
('2024-02-11 12:58:00', 'New router RUDRA23 (FF044QNSNF) was created', 'create', 'Router', 'Karan Sajnani'); 