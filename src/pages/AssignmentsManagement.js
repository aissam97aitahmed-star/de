import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  UserCheck, 
  Clock,
  Calendar,
  BookOpen,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';

const AssignmentsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSemester, setFilterSemester] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);

  // Mock data - replace with actual data from API
  const assignments = [
    {
      id: 1,
      professor: 'Dr. Ahmed Benali',
      professorId: 1,
      module: 'Intelligence Artificielle',
      moduleId: 1,
      semester: 'S1',
      hours: 30,
      type: 'Cours',
      status: 'Confirmé',
      assignedDate: '2024-01-10',
      confirmedDate: '2024-01-12',
      remarks: 'Module bien adapté au profil'
    },
    {
      id: 2,
      professor: 'Dr. Fatima Alami',
      professorId: 2,
      module: 'Machine Learning',
      moduleId: 2,
      semester: 'S1',
      hours: 20,
      type: 'TD',
      status: 'En attente',
      assignedDate: '2024-01-15',
      confirmedDate: null,
      remarks: 'En attente de confirmation'
    },
    {
      id: 3,
      professor: 'Dr. Youssef Idrissi',
      professorId: 3,
      module: 'Deep Learning',
      moduleId: 3,
      semester: 'S2',
      hours: 15,
      type: 'TP',
      status: 'Confirmé',
      assignedDate: '2024-01-08',
      confirmedDate: '2024-01-09',
      remarks: 'Professeur expérimenté en deep learning'
    },
    {
      id: 4,
      professor: 'Dr. Aicha Tazi',
      professorId: 4,
      module: 'Data Science',
      moduleId: 4,
      semester: 'S2',
      hours: 25,
      type: 'Cours',
      status: 'Refusé',
      assignedDate: '2024-01-12',
      confirmedDate: null,
      remarks: 'Charge horaire trop élevée'
    },
  ];

  const professors = [
    { id: 1, name: 'Dr. Ahmed Benali', grade: 'MC', department: 'Informatique', workload: 280 },
    { id: 2, name: 'Dr. Fatima Alami', grade: 'PES', department: 'Informatique', workload: 240 },
    { id: 3, name: 'Dr. Youssef Idrissi', grade: 'MCH', department: 'Mathématiques', workload: 300 },
    { id: 4, name: 'Dr. Aicha Tazi', grade: 'PES', department: 'Informatique', workload: 180 },
  ];

  const modules = [
    { id: 1, name: 'Intelligence Artificielle', type: 'Cours', hours: 30, semester: 'S1' },
    { id: 2, name: 'Machine Learning', type: 'TD', hours: 20, semester: 'S1' },
    { id: 3, name: 'Deep Learning', type: 'TP', hours: 15, semester: 'S2' },
    { id: 4, name: 'Data Science', type: 'Cours', hours: 25, semester: 'S2' },
  ];

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.professor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.module.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || assignment.status === filterStatus;
    const matchesSemester = filterSemester === 'all' || assignment.semester === filterSemester;
    return matchesSearch && matchesStatus && matchesSemester;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Confirmé': { color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle },
      'En attente': { color: 'text-yellow-600', bg: 'bg-yellow-100', icon: AlertCircle },
      'Refusé': { color: 'text-red-600', bg: 'bg-red-100', icon: XCircle },
    };
    
    const config = statusConfig[status] || { color: 'text-gray-600', bg: 'bg-gray-100', icon: AlertCircle };
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
        <Icon className="h-3 w-3 mr-1" />
        {status}
      </span>
    );
  };

  const getTypeBadge = (type) => {
    const typeConfig = {
      'Cours': { color: 'text-blue-600', bg: 'bg-blue-100' },
      'TD': { color: 'text-green-600', bg: 'bg-green-100' },
      'TP': { color: 'text-purple-600', bg: 'bg-purple-100' },
    };
    
    const config = typeConfig[type] || { color: 'text-gray-600', bg: 'bg-gray-100' };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
        {type}
      </span>
    );
  };

  const AssignmentForm = ({ assignment, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      professorId: assignment?.professorId || '',
      moduleId: assignment?.moduleId || '',
      semester: assignment?.semester || 'S1',
      status: assignment?.status || 'En attente',
      remarks: assignment?.remarks || '',
    });

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
      onClose();
    };

    const selectedProfessor = professors.find(p => p.id === parseInt(formData.professorId));
    const selectedModule = modules.find(m => m.id === parseInt(formData.moduleId));

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {assignment ? 'Modifier l\'affectation' : 'Nouvelle affectation'}
            </h3>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="form-label">Professeur</label>
              <select
                name="professorId"
                value={formData.professorId}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Sélectionner un professeur</option>
                {professors.map(prof => (
                  <option key={prof.id} value={prof.id}>
                    {prof.name} - {prof.grade} ({prof.workload}h)
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="form-label">Module</label>
              <select
                name="moduleId"
                value={formData.moduleId}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Sélectionner un module</option>
                {modules.map(module => (
                  <option key={module.id} value={module.id}>
                    {module.name} - {module.type} ({module.hours}h)
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="form-label">Semestre</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
                <option value="S4">S4</option>
                <option value="S5">S5</option>
                <option value="S6">S6</option>
              </select>
            </div>
            
            <div>
              <label className="form-label">Statut</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="En attente">En attente</option>
                <option value="Confirmé">Confirmé</option>
                <option value="Refusé">Refusé</option>
              </select>
            </div>
            
            <div>
              <label className="form-label">Remarques</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="form-textarea"
                rows="3"
              />
            </div>
            
            {selectedProfessor && selectedModule && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Résumé de l'affectation</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Professeur:</strong> {selectedProfessor.name}</p>
                  <p><strong>Module:</strong> {selectedModule.name}</p>
                  <p><strong>Type:</strong> {selectedModule.type}</p>
                  <p><strong>Heures:</strong> {selectedModule.hours}h</p>
                  <p><strong>Charge actuelle:</strong> {selectedProfessor.workload}h</p>
                  <p><strong>Nouvelle charge:</strong> {selectedProfessor.workload + selectedModule.hours}h</p>
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                {assignment ? 'Modifier' : 'Créer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des affectations</h1>
          <p className="text-gray-600">Répartissez les modules entre les enseignants</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
        >
          <Plus className="h-4 w-4" />
          Nouvelle affectation
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par professeur ou module..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="Confirmé">Confirmé</option>
              <option value="En attente">En attente</option>
              <option value="Refusé">Refusé</option>
            </select>
          </div>
          <div>
            <select
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tous les semestres</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
              <option value="S4">S4</option>
              <option value="S5">S5</option>
              <option value="S6">S6</option>
            </select>
          </div>
        </div>
      </div>

      {/* Assignments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Professeur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Module
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Semestre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Heures
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssignments.map((assignment) => (
                <tr key={assignment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <UserCheck className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{assignment.professor}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">{assignment.module}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTypeBadge(assignment.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="h-4 w-4 mr-1" />
                      {assignment.semester}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Clock className="h-4 w-4 mr-1" />
                      {assignment.hours}h
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(assignment.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {assignment.assignedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setEditingAssignment(assignment)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Voir détails"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => setEditingAssignment(assignment)}
                        className="text-green-600 hover:text-green-900"
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <UserCheck className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total affectations</p>
              <p className="text-2xl font-bold text-gray-900">{assignments.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Confirmées</p>
              <p className="text-2xl font-bold text-gray-900">
                {assignments.filter(a => a.status === 'Confirmé').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-gray-900">
                {assignments.filter(a => a.status === 'En attente').length}
              </p>
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
                {assignments.reduce((sum, a) => sum + a.hours, 0)}h
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AssignmentForm
          onClose={() => setShowAddModal(false)}
          onSave={(data) => {
            console.log('Saving assignment:', data);
            setShowAddModal(false);
          }}
        />
      )}

      {editingAssignment && (
        <AssignmentForm
          assignment={editingAssignment}
          onClose={() => setEditingAssignment(null)}
          onSave={(data) => {
            console.log('Updating assignment:', data);
            setEditingAssignment(null);
          }}
        />
      )}
    </div>
  );
};

export default AssignmentsManagement;