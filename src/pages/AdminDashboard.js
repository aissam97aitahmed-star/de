import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  UserCheck, 
  Clock, 
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  AlertTriangle
} from 'lucide-react';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual data from API
  const professors = [
    { id: 1, name: 'Dr. Ahmed Benali', email: 'ahmed.benali@uiz.ac.ma', grade: 'MC', status: 'Permanent', workload: 280, department: 'Informatique' },
    { id: 2, name: 'Dr. Fatima Alami', email: 'fatima.alami@uiz.ac.ma', grade: 'PES', status: 'Permanent', workload: 240, department: 'Informatique' },
    { id: 3, name: 'Dr. Youssef Idrissi', email: 'youssef.idrissi@uiz.ac.ma', grade: 'MCH', status: 'Permanent', workload: 300, department: 'Mathématiques' },
    { id: 4, name: 'Dr. Aicha Tazi', email: 'aicha.tazi@uiz.ac.ma', grade: 'PES', status: 'Vacataire', workload: 180, department: 'Informatique' },
  ];

  const modules = [
    { id: 1, name: 'Intelligence Artificielle', type: 'Cours', hours: 30, semester: 'S1', status: 'Actif' },
    { id: 2, name: 'Machine Learning', type: 'TD', hours: 20, semester: 'S1', status: 'Actif' },
    { id: 3, name: 'Deep Learning', type: 'TP', hours: 15, semester: 'S2', status: 'Actif' },
    { id: 4, name: 'Data Science', type: 'Cours', hours: 25, semester: 'S2', status: 'En attente' },
  ];

  const assignments = [
    { id: 1, professor: 'Dr. Ahmed Benali', module: 'Intelligence Artificielle', semester: 'S1', hours: 30, status: 'Confirmé' },
    { id: 2, professor: 'Dr. Fatima Alami', module: 'Machine Learning', semester: 'S1', hours: 20, status: 'En attente' },
    { id: 3, professor: 'Dr. Youssef Idrissi', module: 'Deep Learning', semester: 'S2', hours: 15, status: 'Confirmé' },
    { id: 4, professor: 'Dr. Aicha Tazi', module: 'Data Science', semester: 'S2', hours: 25, status: 'En attente' },
  ];

  const filteredProfessors = professors.filter(prof => 
    prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prof.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getWorkloadStatus = (workload, grade) => {
    const maxHours = grade === 'PES' ? 240 : 300;
    const percentage = (workload / maxHours) * 100;
    
    if (percentage >= 90) return { status: 'danger', color: 'text-red-600', bg: 'bg-red-100' };
    if (percentage >= 75) return { status: 'warning', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { status: 'good', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Confirmé': { color: 'text-green-600', bg: 'bg-green-100' },
      'En attente': { color: 'text-yellow-600', bg: 'bg-yellow-100' },
      'Annulé': { color: 'text-red-600', bg: 'bg-red-100' },
      'Actif': { color: 'text-green-600', bg: 'bg-green-100' },
      'Permanent': { color: 'text-blue-600', bg: 'bg-blue-100' },
      'Vacataire': { color: 'text-purple-600', bg: 'bg-purple-100' },
    };
    
    const config = statusConfig[status] || { color: 'text-gray-600', bg: 'bg-gray-100' };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
          <p className="text-gray-600">Gérez les utilisateurs, modules et affectations</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn btn-secondary">
            <Download className="h-4 w-4" />
            Exporter
          </button>
          <button className="btn btn-primary">
            <Plus className="h-4 w-4" />
            Nouveau
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Enseignants</p>
              <p className="text-2xl font-bold text-gray-900">{professors.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Modules</p>
              <p className="text-2xl font-bold text-gray-900">{modules.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <UserCheck className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Affectations</p>
              <p className="text-2xl font-bold text-gray-900">{assignments.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Heures totales</p>
              <p className="text-2xl font-bold text-gray-900">
                {professors.reduce((sum, prof) => sum + prof.workload, 0)}h
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Professors Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Enseignants</h2>
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="btn btn-secondary">
                <Filter className="h-4 w-4" />
                Filtrer
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enseignant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Charge horaire
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Département
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProfessors.map((professor) => {
                const workloadStatus = getWorkloadStatus(professor.workload, professor.grade);
                return (
                  <tr key={professor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{professor.name}</div>
                        <div className="text-sm text-gray-500">{professor.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{professor.grade}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(professor.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${workloadStatus.color}`}>
                          {professor.workload}h
                        </span>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${workloadStatus.bg.replace('bg-', 'bg-').replace('-100', '-500')}`}
                            style={{ 
                              width: `${Math.min((professor.workload / (professor.grade === 'PES' ? 240 : 300)) * 100, 100)}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {professor.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/users" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Gestion des utilisateurs</h3>
              <p className="text-sm text-gray-600">Ajouter, modifier ou supprimer des utilisateurs</p>
            </div>
          </div>
        </Link>

        <Link to="/modules" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Gestion des modules</h3>
              <p className="text-sm text-gray-600">Gérer les modules et leurs volumes horaires</p>
            </div>
          </div>
        </Link>

        <Link to="/assignments" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <UserCheck className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Affectations</h3>
              <p className="text-sm text-gray-600">Répartir les modules entre enseignants</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Alerts */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Attention</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>Certains enseignants approchent de leur limite de charge horaire. Vérifiez les affectations en cours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;