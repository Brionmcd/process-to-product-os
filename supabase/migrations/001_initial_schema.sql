-- Core entities
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  industry TEXT,
  team_size INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id),
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('owner', 'operator', 'reviewer')) DEFAULT 'operator',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id),
  name TEXT NOT NULL,
  description TEXT,
  frequency TEXT,
  owner_user_id UUID REFERENCES users(id),
  trigger_description TEXT,
  final_output TEXT,
  pain_score INTEGER CHECK (pain_score BETWEEN 1 AND 5),
  revenue_impact TEXT,
  status TEXT CHECK (status IN ('draft', 'mapped', 'scored', 'blueprint_generated', 'active')) DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE workflow_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID REFERENCES workflows(id) ON DELETE CASCADE,
  step_order INTEGER NOT NULL,
  action TEXT NOT NULL,
  system_name TEXT,
  step_type TEXT CHECK (step_type IN ('mechanical', 'judgment', 'hybrid')) DEFAULT 'mechanical',
  duration_minutes INTEGER,
  error_rate DECIMAL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE system_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id),
  system_name TEXT NOT NULL,
  system_type TEXT,
  auth_type TEXT,
  status TEXT CHECK (status IN ('connected', 'pending', 'disconnected')) DEFAULT 'pending',
  read_scope TEXT,
  write_scope TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID REFERENCES workflows(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  impact_score INTEGER CHECK (impact_score BETWEEN 1 AND 5),
  effort_score INTEGER CHECK (effort_score BETWEEN 1 AND 5),
  risk_score INTEGER CHECK (risk_score BETWEEN 1 AND 5),
  frequency_score INTEGER CHECK (frequency_score BETWEEN 1 AND 5),
  pain_score INTEGER CHECK (pain_score BETWEEN 1 AND 5),
  priority_score DECIMAL GENERATED ALWAYS AS (
    (impact_score * frequency_score * pain_score)::DECIMAL / NULLIF(effort_score + risk_score, 0)
  ) STORED,
  phase TEXT CHECK (phase IN ('now', 'next', 'later')) DEFAULT 'later',
  status TEXT CHECK (status IN ('identified', 'in_progress', 'completed', 'deferred')) DEFAULT 'identified',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE blueprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID REFERENCES workflows(id) ON DELETE CASCADE,
  recommended_automations JSONB,
  implementation_sequence TEXT[],
  expected_roi JSONB,
  generated_by TEXT DEFAULT 'ai',
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMPTZ,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID REFERENCES workflows(id),
  blueprint_id UUID REFERENCES blueprints(id),
  type TEXT CHECK (type IN ('sop', 'report', 'checklist', 'client_package', 'rollout_plan')),
  title TEXT NOT NULL,
  generated_content TEXT,
  version INTEGER DEFAULT 1,
  status TEXT CHECK (status IN ('draft', 'review', 'approved', 'published')) DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE metric_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID REFERENCES workflows(id) ON DELETE CASCADE,
  snapshot_date DATE DEFAULT CURRENT_DATE,
  cycle_time_hours DECIMAL,
  touch_count INTEGER,
  rework_rate DECIMAL,
  hours_saved DECIMAL,
  confidence TEXT CHECK (confidence IN ('measured', 'estimated', 'projected')) DEFAULT 'estimated',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id),
  user_id UUID REFERENCES users(id),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Row-Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE blueprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE metric_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies: org-scoped access via auth.uid() -> users.org_id
-- For V1/pilot: permissive policies that check org membership through the users table

CREATE POLICY "Users can access their own org" ON organizations
  FOR ALL USING (
    id IN (SELECT org_id FROM users WHERE id = auth.uid())
  );

CREATE POLICY "Users can access org members" ON users
  FOR ALL USING (
    org_id IN (SELECT org_id FROM users WHERE id = auth.uid())
  );

CREATE POLICY "Users can access org workflows" ON workflows
  FOR ALL USING (
    org_id IN (SELECT org_id FROM users WHERE id = auth.uid())
  );

CREATE POLICY "Users can access workflow steps" ON workflow_steps
  FOR ALL USING (
    workflow_id IN (
      SELECT id FROM workflows WHERE org_id IN (
        SELECT org_id FROM users WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can access org system connections" ON system_connections
  FOR ALL USING (
    org_id IN (SELECT org_id FROM users WHERE id = auth.uid())
  );

CREATE POLICY "Users can access workflow opportunities" ON opportunities
  FOR ALL USING (
    workflow_id IN (
      SELECT id FROM workflows WHERE org_id IN (
        SELECT org_id FROM users WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can access workflow blueprints" ON blueprints
  FOR ALL USING (
    workflow_id IN (
      SELECT id FROM workflows WHERE org_id IN (
        SELECT org_id FROM users WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can access org deliverables" ON deliverables
  FOR ALL USING (
    workflow_id IN (
      SELECT id FROM workflows WHERE org_id IN (
        SELECT org_id FROM users WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can access workflow metrics" ON metric_snapshots
  FOR ALL USING (
    workflow_id IN (
      SELECT id FROM workflows WHERE org_id IN (
        SELECT org_id FROM users WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can access org audit log" ON audit_log
  FOR ALL USING (
    org_id IN (SELECT org_id FROM users WHERE id = auth.uid())
  );

-- Indexes for common queries
CREATE INDEX idx_workflows_org_id ON workflows(org_id);
CREATE INDEX idx_workflows_status ON workflows(status);
CREATE INDEX idx_workflow_steps_workflow_id ON workflow_steps(workflow_id);
CREATE INDEX idx_workflow_steps_order ON workflow_steps(workflow_id, step_order);
CREATE INDEX idx_opportunities_workflow_id ON opportunities(workflow_id);
CREATE INDEX idx_opportunities_phase ON opportunities(phase);
CREATE INDEX idx_blueprints_workflow_id ON blueprints(workflow_id);
CREATE INDEX idx_deliverables_workflow_id ON deliverables(workflow_id);
CREATE INDEX idx_metric_snapshots_workflow_id ON metric_snapshots(workflow_id);
CREATE INDEX idx_audit_log_org_id ON audit_log(org_id);
CREATE INDEX idx_audit_log_entity ON audit_log(entity_type, entity_id);
