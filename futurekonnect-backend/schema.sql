-- CREATE TABLE users (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     email VARCHAR(255) UNIQUE NOT NULL,
--     password VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE password_reset_tokens (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     user_id UUID REFERENCES users(id) ON DELETE CASCADE,
--     token VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--     expires_at TIMESTAMP WITH TIME ZONE NOT NULL
-- );

-- CREATE INDEX idx_password_reset_tokens_token ON password_reset_tokens(token);
-- CREATE INDEX idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);

CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    data_usage DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on date for better query performance
CREATE INDEX IF NOT EXISTS idx_tenants_date ON tenants(date);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_tenants_updated_at
    BEFORE UPDATE ON tenants
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create function for last_n_days computed field
CREATE OR REPLACE FUNCTION get_last_n_days(tenants tenants, days integer)
RETURNS boolean AS $$
BEGIN
    RETURN tenants.date >= (CURRENT_DATE - days);
END;
$$ LANGUAGE plpgsql STABLE;

CREATE TABLE IF NOT EXISTS audit_trail (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    time TIMESTAMP WITH TIME ZONE NOT NULL,
    description TEXT NOT NULL,
    event VARCHAR(50) NOT NULL CHECK (event IN ('create', 'delete', 'update', 'download')),
    category VARCHAR(50) NOT NULL CHECK (category IN ('Admin', 'Firewall Rule', 'Router Certificate', 'Hotspot User', 'Firewall Template', 'Router')),
    performed_by VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on time for better query performance
CREATE INDEX IF NOT EXISTS idx_audit_trail_time ON audit_trail(time);
CREATE INDEX IF NOT EXISTS idx_audit_trail_event ON audit_trail(event);
CREATE INDEX IF NOT EXISTS idx_audit_trail_category ON audit_trail(category);
CREATE INDEX IF NOT EXISTS idx_audit_trail_performed_by ON audit_trail(performed_by);

CREATE TABLE IF NOT EXISTS data_exchanged (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    total_data DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fleets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hotspot_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS routers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    is_online BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create triggers for updated_at on new tables
CREATE TRIGGER update_data_exchanged_updated_at
    BEFORE UPDATE ON data_exchanged
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fleets_updated_at
    BEFORE UPDATE ON fleets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hotspot_users_updated_at
    BEFORE UPDATE ON hotspot_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_routers_updated_at
    BEFORE UPDATE ON routers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 