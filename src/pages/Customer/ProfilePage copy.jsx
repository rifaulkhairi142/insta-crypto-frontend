import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, Shield, Camera, Edit3, Save, X, Eye, EyeOff, Bell, Smartphone, CreditCard } from 'lucide-react';
import Header from '../../component/V 2/Header';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+62 812-3456-7890',
    address: 'Jakarta, Indonesia',
    joinDate: '15 Januari 2024',
    verified: true,
    twoFactorEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    tradingNotifications: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveProfile = () => {
    // Handle save profile logic
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    // Handle change password logic
    setShowChangePassword(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const stats = [
    { label: 'Total Transaksi', value: '156', color: 'text-blue-400' },
    { label: 'Volume Trading', value: '$45,230', color: 'text-green-400' },
    { label: 'Profit/Loss', value: '+$2,340', color: 'text-green-400' },
    { label: 'Tingkat Keberhasilan', value: '94%', color: 'text-yellow-400' }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          
          <h1 className="text-3xl font-bold text-white mb-2">Profil Saya</h1>
          <p className="text-gray-300">Kelola informasi akun dan preferensi Anda</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-12 w-12 text-gray-900" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors duration-200">
                    <Camera className="h-4 w-4 text-gray-900" />
                  </button>
                </div>
                
                <h2 className="text-xl font-bold text-white mb-1">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-gray-400 mb-2">{profileData.email}</p>
                
                {profileData.verified && (
                  <div className="inline-flex items-center space-x-1 bg-green-400/10 text-green-400 px-3 py-1 rounded-full text-sm">
                    <Shield className="h-4 w-4" />
                    <span>Terverifikasi</span>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="space-y-3">
                {stats.map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">{stat.label}</span>
                    <span className={`font-semibold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Member Since */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Member sejak</p>
                  <p className="text-white font-semibold">{profileData.joinDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Informasi Pribadi</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 transition-colors duration-200"
                    >
                      <Save className="h-4 w-4" />
                      <span>Simpan</span>
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                      <span>Batal</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nama Depan</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 text-white">
                      <User className="h-5 w-5 text-gray-400" />
                      <span>{profileData.firstName}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nama Belakang</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 text-white">
                      <User className="h-5 w-5 text-gray-400" />
                      <span>{profileData.lastName}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 text-white">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <span>{profileData.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nomor Telepon</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 text-white">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span>{profileData.phone}</span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Alamat</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 text-white">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span>{profileData.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-6">Keamanan</h3>

              <div className="space-y-6">
                {/* Change Password */}
                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-yellow-400" />
                    <div>
                      <p className="text-white font-medium">Password</p>
                      <p className="text-gray-400 text-sm">Terakhir diubah 30 hari yang lalu</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChangePassword(true)}
                    className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-200"
                  >
                    Ubah
                  </button>
                </div>

                {/* Two Factor Authentication */}
                <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-white font-medium">Autentikasi Dua Faktor</p>
                      <p className="text-gray-400 text-sm">Keamanan tambahan untuk akun Anda</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400 text-sm">Aktif</span>
                    <button className="w-12 h-6 bg-green-500 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-6">Notifikasi</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">Email Notifications</p>
                      <p className="text-gray-400 text-sm">Terima notifikasi melalui email</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleInputChange('emailNotifications', !profileData.emailNotifications)}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                      profileData.emailNotifications ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
                      profileData.emailNotifications ? 'right-0.5' : 'left-0.5'
                    }`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-white font-medium">SMS Notifications</p>
                      <p className="text-gray-400 text-sm">Terima notifikasi melalui SMS</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleInputChange('smsNotifications', !profileData.smsNotifications)}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                      profileData.smsNotifications ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
                      profileData.smsNotifications ? 'right-0.5' : 'left-0.5'
                    }`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-yellow-400" />
                    <div>
                      <p className="text-white font-medium">Trading Notifications</p>
                      <p className="text-gray-400 text-sm">Notifikasi untuk aktivitas trading</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleInputChange('tradingNotifications', !profileData.tradingNotifications)}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                      profileData.tradingNotifications ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
                      profileData.tradingNotifications ? 'right-0.5' : 'left-0.5'
                    }`}></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Modal */}
        {showChangePassword && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Ubah Password</h3>
                <button
                  onClick={() => setShowChangePassword(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password Saat Ini</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password Baru</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Konfirmasi Password Baru</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleChangePassword}
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 py-3 rounded-lg font-semibold hover:from-yellow-300 hover:to-orange-400 transition-all duration-200"
                >
                  Ubah Password
                </button>
                <button
                  onClick={() => setShowChangePassword(false)}
                  className="flex-1 border border-gray-600 text-white py-3 rounded-lg font-semibold hover:border-gray-500 transition-all duration-200"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;