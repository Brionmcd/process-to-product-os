"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import type {
  Organization,
  User,
  SystemConnection,
  AuditLogEntry,
} from "@/types";
import {
  Building2,
  Users,
  Plug,
  ScrollText,
  UserPlus,
  Save,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

// Placeholder data
const placeholderOrg: Organization = {
  id: "org-001",
  name: "",
  industry: "",
  team_size: null,
  created_at: "2026-03-14T00:00:00Z",
  updated_at: "2026-03-14T00:00:00Z",
};

const placeholderUsers: User[] = [
  {
    id: "usr-001",
    org_id: "org-001",
    email: "admin@example.com",
    role: "owner",
    created_at: "2026-03-14T00:00:00Z",
  },
];

const placeholderConnections: SystemConnection[] = [
  {
    id: "conn-001",
    org_id: "org-001",
    system_name: "QuickBooks Online",
    system_type: "accounting",
    auth_type: "oauth2",
    status: "disconnected",
    read_scope: "transactions, clients",
    write_scope: null,
    notes: null,
    created_at: "2026-03-14T00:00:00Z",
  },
  {
    id: "conn-002",
    org_id: "org-001",
    system_name: "Google Workspace",
    system_type: "productivity",
    auth_type: "oauth2",
    status: "disconnected",
    read_scope: "drive, calendar, gmail",
    write_scope: "drive",
    notes: null,
    created_at: "2026-03-14T00:00:00Z",
  },
  {
    id: "conn-003",
    org_id: "org-001",
    system_name: "Slack",
    system_type: "communication",
    auth_type: "oauth2",
    status: "disconnected",
    read_scope: "channels",
    write_scope: "messages",
    notes: null,
    created_at: "2026-03-14T00:00:00Z",
  },
];

const placeholderAuditLog: AuditLogEntry[] = [];

function getConnectionStatusBadge(status: SystemConnection["status"]) {
  switch (status) {
    case "connected":
      return (
        <Badge variant="default">
          <CheckCircle2 className="h-3 w-3" />
          Connected
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="secondary">
          <Clock className="h-3 w-3" />
          Pending
        </Badge>
      );
    case "disconnected":
      return (
        <Badge variant="outline">
          <XCircle className="h-3 w-3" />
          Disconnected
        </Badge>
      );
  }
}

function getRoleBadgeVariant(
  role: User["role"]
): "default" | "secondary" | "outline" {
  switch (role) {
    case "owner":
      return "default";
    case "operator":
      return "secondary";
    case "reviewer":
      return "outline";
  }
}

function OrganizationTab() {
  const [orgName, setOrgName] = useState(placeholderOrg.name);
  const [industry, setIndustry] = useState(placeholderOrg.industry ?? "");
  const [teamSize, setTeamSize] = useState(
    placeholderOrg.team_size?.toString() ?? ""
  );

  const handleSave = () => {
    toast.success("Organization settings saved");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Settings</CardTitle>
        <CardDescription>
          Manage your organization details and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="org-name">Organization Name</Label>
            <Input
              id="org-name"
              placeholder="Your organization name"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              placeholder="e.g., Accounting, Legal, Consulting"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="team-size">Team Size</Label>
            <Input
              id="team-size"
              type="number"
              placeholder="Number of team members"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
            />
          </div>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function UsersTab() {
  const handleInvite = () => {
    toast.success("Invite functionality coming soon");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Manage who has access to your organization.
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleInvite}>
            <UserPlus className="mr-2 h-3 w-3" />
            Invite User
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {placeholderUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(user.role)}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function IntegrationsTab() {
  const handleConnect = (name: string) => {
    toast.success(`${name} integration coming soon`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Integrations</CardTitle>
        <CardDescription>
          Connect your existing tools to enable workflow analysis and
          automation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {placeholderConnections.map((conn) => (
            <div
              key={conn.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                  <Plug className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{conn.system_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {conn.system_type}
                    {conn.read_scope && ` · Read: ${conn.read_scope}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getConnectionStatusBadge(conn.status)}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleConnect(conn.system_name)}
                >
                  {conn.status === "connected" ? (
                    <>
                      <ExternalLink className="mr-1.5 h-3 w-3" />
                      Manage
                    </>
                  ) : (
                    "Connect"
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AuditLogTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Log</CardTitle>
        <CardDescription>
          Track all changes and actions across your organization.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {placeholderAuditLog.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ScrollText className="h-8 w-8 text-muted-foreground/40 mb-2" />
            <p className="text-sm text-muted-foreground">
              No audit log entries yet. Actions will be recorded here as your
              team uses the platform.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entity</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {placeholderAuditLog.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">
                    {entry.entity_type}
                  </TableCell>
                  <TableCell>{entry.action}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {entry.user_id ?? "System"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(entry.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your organization, team, integrations, and audit trail.
        </p>
      </div>

      <Tabs defaultValue="organization">
        <TabsList>
          <TabsTrigger value="organization">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Organization</span>
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Plug className="h-4 w-4" />
            <span className="hidden sm:inline">Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="audit">
            <ScrollText className="h-4 w-4" />
            <span className="hidden sm:inline">Audit Log</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="organization">
          <OrganizationTab />
        </TabsContent>
        <TabsContent value="users">
          <UsersTab />
        </TabsContent>
        <TabsContent value="integrations">
          <IntegrationsTab />
        </TabsContent>
        <TabsContent value="audit">
          <AuditLogTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
