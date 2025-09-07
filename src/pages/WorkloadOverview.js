import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Clock, 
  Users, 
  BookOpen, 
  TrendingUp,
  Download,
  Filter,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const WorkloadOverview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('semester');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Mock data - replace with actual data from API
  const workloadData = [
    { name: 'Dr. Ahmed Benali', department: 'Informatique', grade: 'MC', workload: 280, maxWorkload: 300, percentage: 93 },
    { name: 'Dr. Fatima Alami', department: 'Informatique', grade: 'PES', workload: 240, maxWorkload: 240, percentage: 100 },
    { name: 'Dr. Youssef Idrissi', department: 'Mathématiques', grade: 'MCH', workload: 300, maxWorkload: 300, percentage: 100 },
    { name: 'Dr. Aicha Tazi', department: 'Informatique', grade: 'PES', workload: 180, maxWorkload: 240, percentage: 75 },
    { name: 'Dr. Mohamed El Fassi', department: 'Informatique', grade: 'MC', workload: 250, maxWorkload: 300, percentage: 83 },
    { name: 'Dr. Khadija Benjelloun', department: 'Mathématiques', grade: 'PES', workload: 200, maxWorkload: 240, percentage: 83 },
  ];

  const departmentData = [
    { name: 'Informatique', value: 950, color: '#3b82f6' },
    { name: 'Mathématiques', value: 500, color: '#10b981' },
    { name: 'Physique', value: 300, color: '#f59e0b' },
  ];

  const monthlyTrend = [
    { month: 'Jan', hours: 1200 },
    { month: 'Fév', hours: 1350 },
    { month: 'Mar', hours: 1100 },
    { month: 'Avr', hours: 1400 },
    { month: 'Mai', hours: 1300 },
    { month: 'Juin', hours: 1250 },
  ];

  const semesterComparison = [
    { semester: 'S1', cours: 800, td: 400, tp: 200 },
    { semester: 'S2', cours: 750, td: 350, tp: 180 },
    { semester: 'S3', cours: 700, td: 300, tp: 150 },
    { semester: 'S4', cours: 650, td: 250, tp: 120 },
  ];

  const filteredData = selectedDepartment === 'all' 
    ? workloadData 
    : workloadData.filter(item => item.department === selectedDepartment);

  const getWorkloadStatus = (percentage) => {
    if (percentage >= 100) return { status: 'danger', color: 'text-red-600', bg: 'bg-red-100' };
    if (percentage >= 90) return { status: 'warning', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { status: 'good', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const getStatusIcon = (percentage) => {
    if (percentage >= 100) return <AlertTriangle className="h-4 w-4 text-red-600" />;
    if (percentage >= 90) return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    return <CheckCircle className="h-4 w-4 text-green-600" />;
  };

  // const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vue d'ensemble des charges horaires</h1>
          <p className="text-gray-600">Analysez et suivez la répartition des charges horaires</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn btn-secondary">
            <Download className="h-4 w-4" />
            Exporter
          </button>
          <button className="btn btn-primary">
            <Filter className="h-4 w-4" />
            Filtrer
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">Période</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="form-select"
            >
              <option value="semester">Semestre actuel</option>
              <option value="year">Année académique</option>
              <option value="month">Mois actuel</option>
            </select>
          </div>
          <div>
            <label className="form-label">Département</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="form-select"
            >
              <option value="all">Tous les départements</option>
              <option value="Informatique">Informatique</option>
              <option value="Mathématiques">Mathématiques</option>
              <option value="Physique">Physique</option>
            </select>
          </div>
          <div>
            <label className="form-label">Année académique</label>
            <select className="form-select">
              <option value="2024-2025">2024-2025</option>
              <option value="2023-2024">2023-2024</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Heures totales</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredData.reduce((sum, item) => sum + item.workload, 0)}h
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Enseignants</p>
              <p className="text-2xl font-bold text-gray-900">{filteredData.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Charge moyenne</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(filteredData.reduce((sum, item) => sum + item.workload, 0) / filteredData.length)}h
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Taux d'occupation</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(filteredData.reduce((sum, item) => sum + item.percentage, 0) / filteredData.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workload by Professor */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Charge horaire par enseignant</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [`${value}h`, 'Charge horaire']}
                  labelFormatter={(label) => `Enseignant: ${label}`}
                />
                <Bar dataKey="workload" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Workload by Department */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition par département</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}h`, 'Heures']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Évolution mensuelle des charges</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}h`, 'Heures totales']} />
              <Line 
                type="monotone" 
                dataKey="hours" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Détail des charges horaires</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enseignant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Département
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Charge actuelle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Limite
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pourcentage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item, index) => {
                const status = getWorkloadStatus(item.percentage);
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.grade}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.workload}h</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.maxWorkload}h</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${status.bg.replace('bg-', 'bg-').replace('-100', '-500')}`}
                            style={{ width: `${Math.min(item.percentage, 100)}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-medium ${status.color}`}>
                          {item.percentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(item.percentage)}
                        <span className={`ml-2 text-sm ${status.color}`}>
                          {status.status === 'danger' ? 'Dépassé' : 
                           status.status === 'warning' ? 'Attention' : 'Normal'}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Semester Comparison */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparaison par semestre</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={semesterComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semester" />
              <YAxis />
              <Tooltip formatter={(value, name) => [`${value}h`, name]} />
              <Bar dataKey="cours" stackId="a" fill="#3b82f6" name="Cours" />
              <Bar dataKey="td" stackId="a" fill="#10b981" name="TD" />
              <Bar dataKey="tp" stackId="a" fill="#f59e0b" name="TP" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts */}
      <div className="space-y-4">
        {filteredData.filter(item => item.percentage >= 100).length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Attention - Dépassement de charge</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    {filteredData.filter(item => item.percentage >= 100).length} enseignant(s) 
                    ont dépassé leur limite de charge horaire.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {filteredData.filter(item => item.percentage >= 90 && item.percentage < 100).length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Attention - Charge élevée</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    {filteredData.filter(item => item.percentage >= 90 && item.percentage < 100).length} enseignant(s) 
                    approchent de leur limite de charge horaire.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkloadOverview;