/**
 * User Management Admin Page
 * Comprehensive user administration and role management system
 */

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Shield, 
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Lock,
  Unlock
} from 'lucide-react';

interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: 'admin' | 'investor' | 'coach' | 'partner' | 'suspended';
  status: 'active' | 'pending' | 'suspended' | 'banned';
  registrationDate: string;
  lastLogin: string;
  totalInvested: number;
  totalProfit: number;
  investmentCount: number;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  twoFactorEnabled: boolean;
  country: string;
  phone?: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    username: 'john_investor',
    email: 'john@example.com',
    fullName: 'John Smith',
    role: 'investor',
    status: 'active',
    registrationDate: '2024-01-15',
    lastLogin: '2024-07-09',
    totalInvested: 25000,
    totalProfit: 3750,
    investmentCount: 8,
    verificationStatus: 'verified',
    twoFactorEnabled: true,
    country: 'United States',
    phone: '+1-555-0123'
  },
  {
    id: 2,
    username: 'sarah_coach',
    email: 'sarah@example.com',
    fullName: 'Sarah Johnson',
    role: 'coach',
    status: 'active',
    registrationDate: '2023-11-20',
    lastLogin: '2024-07-08',
    totalInvested: 50000,
    totalProfit: 9200,
    investmentCount: 15,
    verificationStatus: 'verified',
    twoFactorEnabled: true,
    country: 'Canada'
  },
  {
    id: 3,
    username: 'mike_partner',
    email: 'mike@example.com',
    fullName: 'Michael Chen',
    role: 'partner',
    status: 'active',
    registrationDate: '2023-08-10',
    lastLogin: '2024-07-07',
    totalInvested: 125000,
    totalProfit: 22500,
    investmentCount: 32,
    verificationStatus: 'verified',
    twoFactorEnabled: false,
    country: 'Singapore'
  },
  {
    id: 4,
    username: 'new_user',
    email: 'newuser@example.com',
    fullName: 'Alex Rodriguez',
    role: 'investor',
    status: 'pending',
    registrationDate: '2024-07-08',
    lastLogin: '2024-07-08',
    totalInvested: 0,
    totalProfit: 0,
    investmentCount: 0,
    verificationStatus: 'pending',
    twoFactorEnabled: false,
    country: 'Mexico'
  }
];

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'coach': return 'bg-blue-500';
      case 'partner': return 'bg-purple-500';
      case 'investor': return 'bg-green-500';
      case 'suspended': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'pending': return 'text-yellow-500';
      case 'suspended': return 'text-orange-500';
      case 'banned': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'rejected': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const updateUserStatus = (userId: number, newStatus: User['status']) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const updateUserRole = (userId: number, newRole: User['role']) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const deleteUser = (userId: number) => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        border: '1px solid rgba(59, 130, 246, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Users size={28} style={{ color: '#3b82f6' }} />
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            User Management
          </h1>
        </div>
        <p style={{ color: '#94a3b8', margin: 0 }}>
          Manage user accounts, roles, permissions, and platform access
        </p>
      </div>

      {/* Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <Card style={{
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid #334155',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Users size={20} style={{ color: '#3b82f6' }} />
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: 'white' }}>
                {users.length}
              </h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Total Users</p>
            </div>
          </div>
        </Card>

        <Card style={{
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid #334155',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CheckCircle size={20} style={{ color: '#10b981' }} />
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: 'white' }}>
                {users.filter(u => u.status === 'active').length}
              </h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Active Users</p>
            </div>
          </div>
        </Card>

        <Card style={{
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid #334155',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Shield size={20} style={{ color: '#f59e0b' }} />
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: 'white' }}>
                {users.filter(u => u.twoFactorEnabled).length}
              </h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>2FA Enabled</p>
            </div>
          </div>
        </Card>

        <Card style={{
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid #334155',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <DollarSign size={20} style={{ color: '#10b981' }} />
            <div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: 'white' }}>
                ${users.reduce((sum, u) => sum + u.totalInvested, 0).toLocaleString()}
              </h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Total Invested</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card style={{
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        border: '1px solid #334155',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', minWidth: '250px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: 'white',
                padding: '8px 12px 8px 36px',
                width: '100%'
              }}
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            style={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: 'white',
              padding: '8px 12px'
            }}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="coach">Coach</option>
            <option value="partner">Partner</option>
            <option value="investor">Investor</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: 'white',
              padding: '8px 12px'
            }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
            <option value="banned">Banned</option>
          </select>

          <Button style={{
            backgroundColor: '#3b82f6',
            border: 'none',
            color: 'white',
            padding: '8px 16px'
          }}>
            <Filter size={16} style={{ marginRight: '8px' }} />
            Advanced Filters
          </Button>
        </div>
      </Card>

      {/* Users Table */}
      <Card style={{
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        border: '1px solid #334155',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)' }}>
                <th style={{ padding: '16px', textAlign: 'left', color: '#94a3b8', fontWeight: '500' }}>User</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#94a3b8', fontWeight: '500' }}>Role</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#94a3b8', fontWeight: '500' }}>Status</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#94a3b8', fontWeight: '500' }}>Verification</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#94a3b8', fontWeight: '500' }}>Investment</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#94a3b8', fontWeight: '500' }}>Last Login</th>
                <th style={{ padding: '16px', textAlign: 'left', color: '#94a3b8', fontWeight: '500' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} style={{ borderTop: '1px solid #334155' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#3b82f6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}>
                        {user.fullName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ color: 'white', fontWeight: '500' }}>{user.fullName}</div>
                        <div style={{ color: '#94a3b8', fontSize: '12px' }}>@{user.username}</div>
                        <div style={{ color: '#94a3b8', fontSize: '12px' }}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <Badge style={{
                      backgroundColor: getRoleColor(user.role),
                      color: 'white',
                      textTransform: 'capitalize'
                    }}>
                      {user.role}
                    </Badge>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span className={getStatusColor(user.status)} style={{ textTransform: 'capitalize', fontWeight: '500' }}>
                      {user.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {getVerificationIcon(user.verificationStatus)}
                      <span style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'capitalize' }}>
                        {user.verificationStatus}
                      </span>
                      {user.twoFactorEnabled && (
                        <Shield size={14} style={{ color: '#10b981' }} />
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontSize: '14px' }}>
                      <div style={{ color: 'white', fontWeight: '500' }}>${user.totalInvested.toLocaleString()}</div>
                      <div style={{ color: '#94a3b8', fontSize: '12px' }}>{user.investmentCount} investments</div>
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </div>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserModal(true);
                        }}
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid #334155',
                          color: '#94a3b8',
                          padding: '6px'
                        }}
                      >
                        <Edit size={14} />
                      </Button>
                      {user.status === 'active' ? (
                        <Button
                          onClick={() => updateUserStatus(user.id, 'suspended')}
                          style={{
                            backgroundColor: 'transparent',
                            border: '1px solid #f59e0b',
                            color: '#f59e0b',
                            padding: '6px'
                          }}
                        >
                          <Lock size={14} />
                        </Button>
                      ) : (
                        <Button
                          onClick={() => updateUserStatus(user.id, 'active')}
                          style={{
                            backgroundColor: 'transparent',
                            border: '1px solid #10b981',
                            color: '#10b981',
                            padding: '6px'
                          }}
                        >
                          <Unlock size={14} />
                        </Button>
                      )}
                      <Button
                        onClick={() => deleteUser(user.id)}
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid #ef4444',
                          color: '#ef4444',
                          padding: '6px'
                        }}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredUsers.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#94a3b8'
        }}>
          No users found matching your search criteria.
        </div>
      )}
    </div>
  );
}