import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Clock, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  UserCheck
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data - replace with actual data from API
  const stats = {
    totalUsers: 45,
    totalModules: 28,
    totalAssignments: 156,
    totalWorkload: 1240,
    pendingAssignments: 12,
    completedAssignments: 144
  };

  const recentActivities = [
    { id: 1, type: 'assignment', message: 'Nouvelle affectation : Module IA pour Dr. Ahmed', time: 'Il y a 2 heures' },
    { id: 2, type: 'user', message: 'Nouvel utilisateur ajouté : Dr. Fatima', time: 'Il y a 4 heures' },
    { id: 3, type: 'module', message: 'Module "Machine Learning" mis à jour', time: 'Il y a 6 heures' },
    { id: 4, type: 'workload', message: 'Charge horaire calculée pour S1', time: 'Il y a 1 jour' },
  ];

  const quickActions = user?.role === 'admin' ? [
    { title: 'Gestion des utilisateurs', description: 'Ajouter, modifier ou supprimer des utilisateurs', icon: Users, link: '/users', color: 'blue' },
    { title: 'Gestion des modules', description: 'Gérer les modules et leurs volumes horaires', icon: BookOpen, link: '/modules', color: 'green' },
    { title: 'Affectations', description: 'Répartir les modules entre enseignants', icon: UserCheck, link: '/assignments', color: 'purple' },
    { title: 'Charges horaires', description: 'Visualiser et analyser les charges horaires', icon: Clock, link: '/workload', color: 'orange' },
  ] : [
    { title: 'Mes cours', description: 'Consulter mes modules affectés', icon: BookOpen, link: '/professor', color: 'blue' },
    { title: 'Ma charge horaire', description: 'Visualiser ma charge horaire', icon: Clock, link: '/workload', color: 'green' },
    { title: 'Mes remarques', description: 'Ajouter des remarques sur mes affectations', icon: AlertCircle, link: '/professor', color: 'purple' },
  ];

  const StatCard = ({ title, value, icon: Icon, color, change, changeType }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 flex items-center ${
              changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className="h-4 w-4 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const QuickActionCard = ({ title, description, icon: Icon, link, color }) => (
    <Link
      to={link}
      className="block bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start">
        <div className={`p-3 rounded-lg bg-${color}-100 mr-4`}>
          <Icon className={`h-6 w-6 text-${color}-600`} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Bienvenue, {user?.name} !
        </h1>
        <p className="text-blue-100">
          {user?.role === 'admin' 
            ? 'Gérez efficacement les charges horaires de votre département'
            : 'Consultez vos affectations et votre charge horaire'
          }
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Utilisateurs"
          value={stats.totalUsers}
          icon={Users}
          color="blue"
          change="+3 ce mois"
          changeType="positive"
        />
        <StatCard
          title="Modules"
          value={stats.totalModules}
          icon={BookOpen}
          color="green"
          change="+2 cette semaine"
          changeType="positive"
        />
        <StatCard
          title="Affectations"
          value={stats.totalAssignments}
          icon={UserCheck}
          color="purple"
          change="+8 aujourd'hui"
          changeType="positive"
        />
        <StatCard
          title="Heures totales"
          value={`${stats.totalWorkload}h`}
          icon={Clock}
          color="orange"
          change="+120h ce mois"
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <QuickActionCard key={index} {...action} />
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Activités récentes</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Dernières activités</h3>
                <span className="text-sm text-gray-500">{recentActivities.length} éléments</span>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {activity.type === 'assignment' && <UserCheck className="h-5 w-5 text-blue-600" />}
                      {activity.type === 'user' && <Users className="h-5 w-5 text-green-600" />}
                      {activity.type === 'module' && <BookOpen className="h-5 w-5 text-purple-600" />}
                      {activity.type === 'workload' && <Clock className="h-5 w-5 text-orange-600" />}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200">
              <Link
                to={user?.role === 'admin' ? '/admin' : '/professor'}
                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
              >
                Voir toutes les activités →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">État du système</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Affectations terminées</p>
              <p className="text-2xl font-bold text-green-600">{stats.completedAssignments}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">En attente</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingAssignments}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Taux de completion</p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round((stats.completedAssignments / (stats.completedAssignments + stats.pendingAssignments)) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;