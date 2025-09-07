import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Eye, 
  BookOpen, 
  Clock,
  Calendar,
  GraduationCap,
  Users
} from 'lucide-react';

const ModulesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSemester, setFilterSemester] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingModule, setEditingModule] = useState(null);

  // Mock data - replace with actual data from API
  const modules = [
    {
      id: 1,
      name: 'Intelligence Artificielle',
      code: 'IA-S1',
      type: 'Cours',
      hours: 30,
      semester: 'S1',
      department: 'Informatique',
      level: 'Master',
      students: 45,
      status: 'Actif',
      description: 'Introduction aux concepts fondamentaux de l\'intelligence artificielle',
      prerequisites: 'Mathématiques appliquées',
      objectives: 'Comprendre les algorithmes d\'IA et leurs applications'
    },
    {
      id: 2,
      name: 'Machine Learning',
      code: 'ML-S1',
      type: 'TD',
      hours: 20,
      semester: 'S1',
      department: 'Informatique',
      level: 'Master',
      students: 30,
      status: 'Actif',
      description: 'Travaux dirigés sur les algorithmes de machine learning',
      prerequisites: 'Intelligence Artificielle',
      objectives: 'Implémenter des algorithmes de ML'
    },
    {
      id: 3,
      name: 'Deep Learning',
      code: 'DL-S2',
      type: 'TP',
      hours: 15,
      semester: 'S2',
      department: 'Informatique',
      level: 'Master',
      students: 25,
      status: 'Actif',
      description: 'Travaux pratiques sur les réseaux de neurones profonds',
      prerequisites: 'Machine Learning',
      objectives: 'Développer des modèles de deep learning'
    },
    {
      id: 4,
      name: 'Data Science',
      code: 'DS-S2',
      type: 'Cours',
      hours: 25,
      semester: 'S2',
      department: 'Informatique',
      level: 'Master',
      students: 40,
      status: 'En attente',
      description: 'Analyse et visualisation de données',
      prerequisites: 'Statistiques',
      objectives: 'Maîtriser les outils de data science'
    },
    {
      id: 5,
      name: 'Anglais Technique',
      code: 'ANG-S1',
      type: 'Cours',
      hours: 20,
      semester: 'S1',
      department: 'Langues',
      level: 'Master',
      students: 50,
      status: 'Actif',
      description: 'Anglais technique pour l\'informatique',
      prerequisites: 'Anglais niveau B2',
      objectives: 'Améliorer la communication technique en anglais'
    },
  ];

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || module.type === filterType;
    const matchesSemester = filterSemester === 'all' || module.semester === filterSemester;
    return matchesSearch && matchesType && matchesSemester;
  });

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

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Actif': { color: 'text-green-600', bg: 'bg-green-100' },
      'En attente': { color: 'text-yellow-600', bg: 'bg-yellow-100' },
      'Inactif': { color: 'text-gray-600', bg: 'bg-gray-100' },
    };
    
    const config = statusConfig[status] || { color: 'text-gray-600', bg: 'bg-gray-100' };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
        {status}
      </span>
    );
  };

  const ModuleForm = ({ module, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      name: module?.name || '',
      code: module?.code || '',
      type: module?.type || 'Cours',
      hours: module?.hours || '',
      semester: module?.semester || 'S1',
      department: module?.department || '',
      level: module?.level || 'Master',
      students: module?.students || '',
      status: module?.status || 'Actif',
      description: module?.description || '',
      prerequisites: module?.prerequisites || '',
      objectives: module?.objectives || '',
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

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {module ? 'Modifier le module' : 'Nouveau module'}
            </h3>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Nom du module</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <label className="form-label">Code du module</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="form-label">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="Cours">Cours</option>
                  <option value="TD">TD</option>
                  <option value="TP">TP</option>
                </select>
              </div>
              
              <div>
                <label className="form-label">Volume horaire</label>
                <input
                  type="number"
                  name="hours"
                  value={formData.hours}
                  onChange={handleChange}
                  className="form-input"
                  min="1"
                  required
                />
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
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Département</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div>
                <label className="form-label">Niveau</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="Master">Master</option>
                  <option value="Licence">Licence</option>
                  <option value="Doctorat">Doctorat</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Nombre d'étudiants</label>
                <input
                  type="number"
                  name="students"
                  value={formData.students}
                  onChange={handleChange}
                  className="form-input"
                  min="1"
                />
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
                  <option value="Actif">Actif</option>
                  <option value="En attente">En attente</option>
                  <option value="Inactif">Inactif</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
                rows="3"
              />
            </div>
            
            <div>
              <label className="form-label">Prérequis</label>
              <input
                type="text"
                name="prerequisites"
                value={formData.prerequisites}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            
            <div>
              <label className="form-label">Objectifs</label>
              <textarea
                name="objectives"
                value={formData.objectives}
                onChange={handleChange}
                className="form-textarea"
                rows="2"
              />
            </div>
            
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
                {module ? 'Modifier' : 'Créer'}
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
          <h1 className="text-2xl font-bold text-gray-900">Gestion des modules</h1>
          <p className="text-gray-600">Gérez les modules et leurs informations</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary"
        >
          <Plus className="h-4 w-4" />
          Nouveau module
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
                placeholder="Rechercher par nom ou code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tous les types</option>
              <option value="Cours">Cours</option>
              <option value="TD">TD</option>
              <option value="TP">TP</option>
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

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => (
          <div key={module.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{module.name}</h3>
                <p className="text-sm text-gray-500">{module.code}</p>
              </div>
              <div className="flex space-x-2">
                {getTypeBadge(module.type)}
                {getStatusBadge(module.status)}
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{module.hours}h</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{module.semester}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>{module.students} étudiants</span>
              </div>
              <div className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-2" />
                <span>{module.department}</span>
              </div>
            </div>
            
            {module.description && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {module.description}
              </p>
            )}
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setEditingModule(module)}
                className="flex-1 btn btn-secondary text-xs"
              >
                <Eye className="h-3 w-3" />
                Détails
              </button>
              <button 
                onClick={() => setEditingModule(module)}
                className="flex-1 btn btn-primary text-xs"
              >
                <Edit className="h-3 w-3" />
                Modifier
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total modules</p>
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
              <p className="text-sm font-medium text-gray-600">Heures totales</p>
              <p className="text-2xl font-bold text-gray-900">
                {modules.reduce((sum, m) => sum + m.hours, 0)}h
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Étudiants total</p>
              <p className="text-2xl font-bold text-gray-900">
                {modules.reduce((sum, m) => sum + m.students, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Modules actifs</p>
              <p className="text-2xl font-bold text-gray-900">
                {modules.filter(m => m.status === 'Actif').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <ModuleForm
          onClose={() => setShowAddModal(false)}
          onSave={(data) => {
            console.log('Saving module:', data);
            setShowAddModal(false);
          }}
        />
      )}

      {editingModule && (
        <ModuleForm
          module={editingModule}
          onClose={() => setEditingModule(null)}
          onSave={(data) => {
            console.log('Updating module:', data);
            setEditingModule(null);
          }}
        />
      )}
    </div>
  );
};

export default ModulesManagement;