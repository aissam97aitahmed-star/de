import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  MessageSquare, 
  Plus,
  Eye,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

const ProfessorDashboard = () => {
  const [activeTab, setActiveTab] = useState('modules');

  // Mock data - replace with actual data from API
  const professorData = {
    name: 'Dr. Ahmed Benali',
    grade: 'MC',
    department: 'Informatique',
    totalWorkload: 280,
    maxWorkload: 300,
    currentSemester: 'S1'
  };

  const modules = [
    { 
      id: 1, 
      name: 'Intelligence Artificielle', 
      type: 'Cours', 
      hours: 30, 
      semester: 'S1', 
      status: 'Confirmé',
      students: 45,
      room: 'A101',
      schedule: 'Lundi 8h-10h'
    },
    { 
      id: 2, 
      name: 'Machine Learning', 
      type: 'TD', 
      hours: 20, 
      semester: 'S1', 
      status: 'En attente',
      students: 30,
      room: 'B205',
      schedule: 'Mercredi 14h-16h'
    },
    { 
      id: 3, 
      name: 'Deep Learning', 
      type: 'TP', 
      hours: 15, 
      semester: 'S2', 
      status: 'Confirmé',
      students: 25,
      room: 'Lab Info',
      schedule: 'Vendredi 10h-12h'
    },
  ];

  const remarks = [
    { 
      id: 1, 
      module: 'Intelligence Artificielle', 
      content: 'Besoin de plus de matériel pour les TP', 
      date: '2024-01-15',
      status: 'En attente'
    },
    { 
      id: 2, 
      module: 'Machine Learning', 
      content: 'Salle trop petite pour le nombre d\'étudiants', 
      date: '2024-01-10',
      status: 'Traité'
    },
  ];

  const workloadHistory = [
    { month: 'Jan', hours: 45 },
    { month: 'Fév', hours: 52 },
    { month: 'Mar', hours: 38 },
    { month: 'Avr', hours: 48 },
    { month: 'Mai', hours: 42 },
    { month: 'Juin', hours: 35 },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Confirmé': { color: 'text-green-600', bg: 'bg-green-100' },
      'En attente': { color: 'text-yellow-600', bg: 'bg-yellow-100' },
      'Annulé': { color: 'text-red-600', bg: 'bg-red-100' },
      'Traité': { color: 'text-green-600', bg: 'bg-green-100' },
    };
    
    const config = statusConfig[status] || { color: 'text-gray-600', bg: 'bg-gray-100' };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
        {status}
      </span>
    );
  };

  const getWorkloadPercentage = () => {
    return (professorData.totalWorkload / professorData.maxWorkload) * 100;
  };

  const getWorkloadStatus = () => {
    const percentage = getWorkloadPercentage();
    if (percentage >= 90) return { status: 'danger', color: 'text-red-600', bg: 'bg-red-100' };
    if (percentage >= 75) return { status: 'warning', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { status: 'good', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const workloadStatus = getWorkloadStatus();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">Mes cours</h1>
            <p className="text-blue-100">
              {professorData.name} - {professorData.grade} - {professorData.department}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">Charge horaire actuelle</p>
            <p className="text-2xl font-bold">
              {professorData.totalWorkload}h / {professorData.maxWorkload}h
            </p>
            <div className="w-32 bg-blue-200 rounded-full h-2 mt-2">
              <div 
                className={`h-2 rounded-full ${workloadStatus.bg.replace('bg-', 'bg-').replace('-100', '-500')}`}
                style={{ width: `${Math.min(getWorkloadPercentage(), 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Modules</p>
              <p className="text-2xl font-bold text-gray-900">{modules.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Heures confirmées</p>
              <p className="text-2xl font-bold text-gray-900">
                {modules.filter(m => m.status === 'Confirmé').reduce((sum, m) => sum + m.hours, 0)}h
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Remarques</p>
              <p className="text-2xl font-bold text-gray-900">{remarks.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Étudiants</p>
              <p className="text-2xl font-bold text-gray-900">
                {modules.reduce((sum, m) => sum + m.students, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('modules')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'modules'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Mes modules
            </button>
            <button
              onClick={() => setActiveTab('remarks')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'remarks'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Mes remarques
            </button>
            <button
              onClick={() => setActiveTab('workload')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'workload'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Historique
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Modules Tab */}
          {activeTab === 'modules' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Mes modules affectés</h3>
                <button className="btn btn-primary">
                  <Plus className="h-4 w-4" />
                  Ajouter une remarque
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module) => (
                  <div key={module.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">{module.name}</h4>
                      {getStatusBadge(module.status)}
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium">{module.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Heures:</span>
                        <span className="font-medium">{module.hours}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Semestre:</span>
                        <span className="font-medium">{module.semester}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Étudiants:</span>
                        <span className="font-medium">{module.students}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Salle:</span>
                        <span className="font-medium">{module.room}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Horaire:</span>
                        <span className="font-medium">{module.schedule}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 btn btn-secondary text-xs">
                        <Eye className="h-3 w-3" />
                        Détails
                      </button>
                      <button className="flex-1 btn btn-primary text-xs">
                        <MessageSquare className="h-3 w-3" />
                        Remarque
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Remarks Tab */}
          {activeTab === 'remarks' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Mes remarques</h3>
                <button className="btn btn-primary">
                  <Plus className="h-4 w-4" />
                  Nouvelle remarque
                </button>
              </div>
              
              <div className="space-y-4">
                {remarks.map((remark) => (
                  <div key={remark.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{remark.module}</h4>
                      {getStatusBadge(remark.status)}
                    </div>
                    <p className="text-gray-600 mb-2">{remark.content}</p>
                    <p className="text-xs text-gray-500">Ajouté le {remark.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Workload Tab */}
          {activeTab === 'workload' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Historique de la charge horaire</h3>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-900">Évolution mensuelle</h4>
                  <span className="text-sm text-gray-500">Derniers 6 mois</span>
                </div>
                
                <div className="space-y-3">
                  {workloadHistory.map((month, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-12 text-sm text-gray-600">{month.month}</div>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(month.hours / 60) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-12 text-sm font-medium text-gray-900 text-right">
                        {month.hours}h
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Alerts */}
      {workloadStatus.status === 'warning' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Attention</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Vous approchez de votre limite de charge horaire ({Math.round(getWorkloadPercentage())}%).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {workloadStatus.status === 'danger' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Attention</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Vous avez dépassé votre limite de charge horaire ({Math.round(getWorkloadPercentage())}%).</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessorDashboard;