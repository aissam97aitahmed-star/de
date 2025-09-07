import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Mail, 
  Building, 
  Edit,
  Save,
  X,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+212 6 12 34 56 78',
    department: user?.department || '',
    grade: user?.grade || '',
    status: user?.status || '',
    hireDate: '2020-09-01',
    lastLogin: '2024-01-15 14:30',
    totalWorkload: 280,
    maxWorkload: user?.role === 'professor' ? (user?.grade === 'PES' ? 240 : 300) : 0,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSave = () => {
    // Simulate API call
    console.log('Saving profile:', profileData);
    setIsEditing(false);
    // Show success message
  };

  const handlePasswordSave = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    // Simulate API call
    console.log('Changing password');
    setShowPasswordForm(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    // Show success message
  };

  const getWorkloadPercentage = () => {
    if (profileData.maxWorkload === 0) return 0;
    return (profileData.totalWorkload / profileData.maxWorkload) * 100;
  };

  const getWorkloadStatus = () => {
    const percentage = getWorkloadPercentage();
    if (percentage >= 100) return { status: 'danger', color: 'text-red-600', bg: 'bg-red-100' };
    if (percentage >= 90) return { status: 'warning', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { status: 'good', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const workloadStatus = getWorkloadStatus();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mon profil</h1>
          <p className="text-gray-600">Gérez vos informations personnelles et paramètres</p>
        </div>
        <div className="flex space-x-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary"
            >
              <Edit className="h-4 w-4" />
              Modifier
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-secondary"
              >
                <X className="h-4 w-4" />
                Annuler
              </button>
              <button
                onClick={handleProfileSave}
                className="btn btn-success"
              >
                <Save className="h-4 w-4" />
                Sauvegarder
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Informations personnelles</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Nom complet</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className={`form-input ${!isEditing ? 'bg-gray-50' : ''}`}
                  />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className={`form-input ${!isEditing ? 'bg-gray-50' : ''}`}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className={`form-input ${!isEditing ? 'bg-gray-50' : ''}`}
                  />
                </div>
                <div>
                  <label className="form-label">Département</label>
                  <input
                    type="text"
                    name="department"
                    value={profileData.department}
                    onChange={handleProfileChange}
                    disabled={!isEditing}
                    className={`form-input ${!isEditing ? 'bg-gray-50' : ''}`}
                  />
                </div>
              </div>

              {user?.role === 'professor' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Grade</label>
                    <input
                      type="text"
                      name="grade"
                      value={profileData.grade}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className={`form-input ${!isEditing ? 'bg-gray-50' : ''}`}
                    />
                  </div>
                  <div>
                    <label className="form-label">Statut</label>
                    <input
                      type="text"
                      name="status"
                      value={profileData.status}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className={`form-input ${!isEditing ? 'bg-gray-50' : ''}`}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Workload Information (for professors) */}
          {user?.role === 'professor' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Charge horaire actuelle</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Charge actuelle</p>
                    <p className="text-2xl font-bold text-gray-900">{profileData.totalWorkload}h</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600">Limite autorisée</p>
                    <p className="text-2xl font-bold text-gray-900">{profileData.maxWorkload}h</p>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className={`h-3 rounded-full ${workloadStatus.bg.replace('bg-', 'bg-').replace('-100', '-500')}`}
                    style={{ width: `${Math.min(getWorkloadPercentage(), 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600">
                  <span>0h</span>
                  <span className={`font-medium ${workloadStatus.color}`}>
                    {Math.round(getWorkloadPercentage())}% utilisée
                  </span>
                  <span>{profileData.maxWorkload}h</span>
                </div>
              </div>
            </div>
          )}

          {/* Account Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Informations du compte</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Rôle</label>
                  <input
                    type="text"
                    value={user?.role === 'admin' ? 'Administrateur' : 'Professeur'}
                    disabled
                    className="form-input bg-gray-50"
                  />
                </div>
                <div>
                  <label className="form-label">Date d'embauche</label>
                  <input
                    type="text"
                    value={profileData.hireDate}
                    disabled
                    className="form-input bg-gray-50"
                  />
                </div>
              </div>
              
              <div>
                <label className="form-label">Dernière connexion</label>
                <input
                  type="text"
                  value={profileData.lastLogin}
                  disabled
                  className="form-input bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{profileData.name}</h3>
            <p className="text-sm text-gray-600">{profileData.department}</p>
            {user?.role === 'professor' && (
              <p className="text-sm text-gray-500">{profileData.grade}</p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Actions rapides</h3>
            </div>
            <div className="p-6 space-y-3">
              <button
                onClick={() => setShowPasswordForm(true)}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
              >
                <Lock className="h-4 w-4 mr-3" />
                Changer le mot de passe
              </button>
              <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                <Mail className="h-4 w-4 mr-3" />
                Notifications
              </button>
              <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                <Building className="h-4 w-4 mr-3" />
                Préférences
              </button>
            </div>
          </div>

          {/* Statistics */}
          {user?.role === 'professor' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Statistiques</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Modules assignés</span>
                  <span className="text-sm font-medium text-gray-900">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Étudiants</span>
                  <span className="text-sm font-medium text-gray-900">120</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Années d'expérience</span>
                  <span className="text-sm font-medium text-gray-900">4</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Changer le mot de passe</h3>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handlePasswordSave(); }} className="p-6 space-y-4">
              <div>
                <label className="form-label">Mot de passe actuel</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="form-input pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="form-label">Nouveau mot de passe</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="form-input pr-10"
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="form-label">Confirmer le nouveau mot de passe</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="form-input pr-10"
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  }}
                  className="btn btn-secondary"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Changer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;