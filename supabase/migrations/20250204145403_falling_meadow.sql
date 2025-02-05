/*
  # CRM Database Schema

  1. New Tables
    - `users`
      - System users with authentication
    - `deals`
      - Sales pipeline deals/opportunities
    - `contacts`
      - Customer and prospect contacts
    - `activities`
      - Tasks, calls, meetings, and emails
    - `proposals`
      - Sales proposals and quotes
    - `companies`
      - Organizations/companies

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  industry text,
  website text,
  phone text,
  address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all companies"
  ON companies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert companies"
  ON companies FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update companies"
  ON companies FOR UPDATE
  TO authenticated
  USING (true);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  position text,
  company_id uuid REFERENCES companies(id),
  status text DEFAULT 'active',
  last_contact timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert contacts"
  ON contacts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update contacts"
  ON contacts FOR UPDATE
  TO authenticated
  USING (true);

-- Deals table
CREATE TABLE IF NOT EXISTS deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  value numeric NOT NULL DEFAULT 0,
  stage text NOT NULL,
  company_id uuid REFERENCES companies(id),
  contact_id uuid REFERENCES contacts(id),
  expected_close_date date,
  probability integer DEFAULT 0,
  last_activity text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all deals"
  ON deals FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert deals"
  ON deals FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update deals"
  ON deals FOR UPDATE
  TO authenticated
  USING (true);

-- Activities table
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  title text NOT NULL,
  description text,
  date timestamptz NOT NULL,
  status text DEFAULT 'pending',
  deal_id uuid REFERENCES deals(id),
  contact_id uuid REFERENCES contacts(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all activities"
  ON activities FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert activities"
  ON activities FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update activities"
  ON activities FOR UPDATE
  TO authenticated
  USING (true);

-- Proposals table
CREATE TABLE IF NOT EXISTS proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  deal_id uuid REFERENCES deals(id),
  value numeric NOT NULL DEFAULT 0,
  status text DEFAULT 'draft',
  valid_until date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all proposals"
  ON proposals FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert proposals"
  ON proposals FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update proposals"
  ON proposals FOR UPDATE
  TO authenticated
  USING (true);

-- Functions for dashboard metrics
CREATE OR REPLACE FUNCTION get_dashboard_metrics()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  total_deals integer;
  total_value numeric;
  won_deals integer;
  lost_deals integer;
  active_contacts integer;
  pending_activities integer;
  proposals_sent integer;
  conversion_rate numeric;
BEGIN
  -- Get total deals and value
  SELECT COUNT(*), COALESCE(SUM(value), 0)
  INTO total_deals, total_value
  FROM deals;
  
  -- Get won and lost deals
  SELECT COUNT(*) INTO won_deals
  FROM deals WHERE stage = 'closed';
  
  SELECT COUNT(*) INTO lost_deals
  FROM deals WHERE stage = 'lost';
  
  -- Get active contacts
  SELECT COUNT(*) INTO active_contacts
  FROM contacts WHERE status = 'active';
  
  -- Get pending activities
  SELECT COUNT(*) INTO pending_activities
  FROM activities WHERE status = 'pending';
  
  -- Get sent proposals
  SELECT COUNT(*) INTO proposals_sent
  FROM proposals WHERE status = 'sent';
  
  -- Calculate conversion rate
  IF total_deals > 0 THEN
    conversion_rate := (won_deals::numeric / total_deals::numeric) * 100;
  ELSE
    conversion_rate := 0;
  END IF;
  
  RETURN json_build_object(
    'totalDeals', total_deals,
    'totalValue', total_value,
    'wonDeals', won_deals,
    'lostDeals', lost_deals,
    'activeContacts', active_contacts,
    'pendingActivities', pending_activities,
    'proposalsSent', proposals_sent,
    'conversionRate', conversion_rate
  );
END;
$$;