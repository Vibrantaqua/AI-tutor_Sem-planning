import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Crown, Check } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.tsx';
import { Button } from '../components/Button';
import { SubscriptionPlan } from '../types';

export const AccountPage: React.FC = () => {
  const { user } = useAuth();

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      features: [
        'Basic calendar planning',
        'Limited AI chat sessions (10/month)',
        'Single device access',
        'Email support'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 9.99,
      isPopular: true,
      features: [
        'Advanced calendar features',
        'Unlimited AI chat sessions',
        'Multi-device sync',
        'Priority support',
        'Custom study plans',
        'Analytics dashboard'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 24.99,
      features: [
        'All Pro features',
        'Multi-teacher collaboration',
        'Class management tools',
        'Advanced analytics',
        'Custom integrations',
        'Dedicated support manager'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Link 
              to="/dashboard" 
              className="flex items-center text-gray-600 hover:text-gray-900 mr-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-900">{user?.fullName}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-900">{user?.email}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Plan
                  </label>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Crown className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-blue-900 font-medium capitalize">
                      {user?.subscriptionPlan} Plan
                    </span>
                  </div>
                </div>

                <Button className="w-full">
                  Update Profile
                </Button>
              </div>
            </div>
          </div>

          {/* Subscription Plans */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Subscription Plans</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {subscriptionPlans.map((plan) => {
                  const isCurrentPlan = user?.subscriptionPlan === plan.id;
                  
                  return (
                    <div
                      key={plan.id}
                      className={`relative rounded-lg border-2 p-6 ${
                        plan.isPopular
                          ? 'border-blue-600 bg-blue-50'
                          : isCurrentPlan
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200'
                      }`}
                    >
                      {plan.isPopular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-blue-600 text-white px-3 py-1 text-xs font-medium rounded-full">
                            Most Popular
                          </span>
                        </div>
                      )}
                      
                      {isCurrentPlan && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-green-500 text-white px-3 py-1 text-xs font-medium rounded-full">
                            Current Plan
                          </span>
                        </div>
                      )}

                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                        <div className="mt-2">
                          <span className="text-3xl font-bold text-gray-900">
                            ${plan.price}
                          </span>
                          <span className="text-gray-600">/month</span>
                        </div>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        variant={plan.isPopular ? 'primary' : isCurrentPlan ? 'outline' : 'outline'}
                        className="w-full"
                        disabled={isCurrentPlan}
                      >
                        {isCurrentPlan ? 'Current Plan' : `Upgrade to ${plan.name}`}
                      </Button>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Need help choosing a plan?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Our team can help you find the perfect plan for your academic needs.
                </p>
                <Button variant="outline" size="sm">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};