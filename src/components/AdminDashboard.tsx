import { useState } from 'react';
import { Shield, Users } from 'lucide-react';
import { DashboardHeader } from './DashboardHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { mockUsersForAdmin, getGroups, getProjects, getRequests } from '../services/mockData';
import { formatDate } from '../lib/utils';
import { User } from '../types';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const totalUsers = mockUsersForAdmin.length;
  const totalGroups = getGroups().length;
  const totalProjects = getProjects().length;
  const pendingRequests = getRequests().filter(r => r.status === 'PENDING').length;

  const filteredUsers = mockUsersForAdmin.filter((user: User) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader title="Admin Dashboard" icon={<Shield className="h-6 w-6 text-primary" />} />
      
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalUsers}</div>
                  <p className="text-sm text-gray-500 mt-2">Registered users</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Groups</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalGroups}</div>
                  <p className="text-sm text-gray-500 mt-2">Active groups</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{totalProjects}</div>
                  <p className="text-sm text-gray-500 mt-2">Ongoing projects</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pending Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{pendingRequests}</div>
                  <p className="text-sm text-gray-500 mt-2">Awaiting approval</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getGroups().slice(0, 3).map((group) => (
                    <div key={group.id} className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{group.name}</p>
                        <p className="text-xs text-gray-500">
                          Created {formatDate(group.createdAt)}
                        </p>
                      </div>
                      <Badge variant="success">{group.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage all platform users</CardDescription>
                  </div>
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Name</th>
                        <th className="text-left p-3">Email</th>
                        <th className="text-left p-3">Role</th>
                        <th className="text-left p-3">Status</th>
                        <th className="text-left p-3">Created</th>
                        <th className="text-left p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user: User) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">{user.name}</td>
                          <td className="p-3">{user.email}</td>
                          <td className="p-3">
                            <Badge variant="secondary">{user.role}</Badge>
                          </td>
                          <td className="p-3">
                            <Badge variant={user.status === 'ACTIVE' ? 'success' : 'secondary'}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-sm text-gray-500">
                            {formatDate(user.createdAt)}
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="destructive" size="sm">
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="groups" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Group Management</CardTitle>
                <CardDescription>View and manage all groups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getGroups().map((group) => (
                    <div key={group.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium">{group.name}</p>
                        <p className="text-sm text-gray-500">{group.description}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {group.members.length} members • Created {formatDate(group.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="success">{group.status}</Badge>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Supervision Requests</CardTitle>
                <CardDescription>Monitor all supervision requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getRequests().map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium">{request.projectTitle}</p>
                        <p className="text-sm text-gray-500">{request.projectDescription}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Requested {formatDate(request.requestedAt)}
                        </p>
                      </div>
                      <Badge
                        variant={
                          request.status === 'APPROVED'
                            ? 'success'
                            : request.status === 'REJECTED'
                            ? 'error'
                            : 'warning'
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure system-wide settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Default Milestones</h3>
                    <div className="space-y-2">
                      {['Project Proposal', 'Literature Review', 'System Design', 'Implementation', 'Final Report'].map((milestone) => (
                        <div key={milestone} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <span className="text-sm">{milestone}</span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="destructive" size="sm">
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminDashboard;

