import React, { useState, useEffect } from 'react';
import { Package, Car, Truck, Plane, Ship, MapPin, Clock, Star, ArrowRight, Check, Phone, Mail, Calendar, Loader, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ServiceSelectionPage = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Fetch services from API
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      // Replace with your API endpoint
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/services`);
      const result = await response.json();
      setServices(result.data || []);
    } catch (err) {
      setError('Failed to load services. Please try again.');
      console.error('Fetch services error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedPlan(null);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleBookService = async () => {
    if (!selectedService || !selectedPlan) return;
    
    try {
      setLoading(true);
      // Replace with your booking API endpoint
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: selectedService.id,
          planId: selectedPlan.id,
          // Add other booking details
        })
      });
      // Handle booking response
    } catch (err) {
      setError('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Choose Your Service</h1>
              <p className="mt-2 text-gray-600">Select the service that best fits your needs</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <Badge variant="outline" className="px-3 py-1">
                <Clock className="w-4 h-4 mr-1" />
                24/7 Support
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Star className="w-4 h-4 mr-1" />
                Trusted Service
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {/* Categories will be populated from API */}
            </select>
          </div>
        </div>

        {loading && services.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="w-8 h-8 animate-spin mr-3" />
            <span className="text-lg">Loading services...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Services List */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Services Available</h3>
                    <p className="text-gray-500">Services will appear here once loaded from your API.</p>
                  </div>
                ) : (
                  services.map((service) => (
                    <Card 
                      key={service.id}
                      className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                        selectedService?.id === service.id 
                          ? 'border-blue-500 bg-blue-50 shadow-lg' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleServiceSelect(service)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-full ${service.lightColor || 'bg-gray-100'}`}>
                          {/* Icon will be dynamically set based on service type */}
                          <Package className={`w-6 h-6 ${service.color || 'text-gray-600'}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {service.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {service.description}
                          </p>
                          <div className="space-y-1">
                            {service.features?.map((feature, index) => (
                              <div key={index} className="flex items-center text-sm text-gray-500">
                                <Check className="w-3 h-3 text-green-500 mr-2" />
                                {feature}
                              </div>
                            ))}
                          </div>
                          {service.rating && (
                            <div className="flex items-center mt-3">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium ml-1">{service.rating}</span>
                              <span className="text-sm text-gray-500 ml-1">({service.reviewCount} reviews)</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* Service Details & Pricing */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                {selectedService ? (
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      {selectedService.name} Plans
                    </h3>
                    <div className="space-y-4">
                      {selectedService.plans?.length === 0 ? (
                        <p className="text-gray-500">No pricing plans available</p>
                      ) : (
                        selectedService.plans?.map((plan) => (
                          <div
                            key={plan.id}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                              selectedPlan?.id === plan.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => handlePlanSelect(plan)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{plan.name}</h4>
                              {plan.popular && (
                                <Badge className="bg-blue-100 text-blue-800">Popular</Badge>
                              )}
                            </div>
                            <p className="text-2xl font-bold text-gray-900 mb-1">
                              {plan.price}
                            </p>
                            <p className="text-sm text-gray-600 mb-3">{plan.duration}</p>
                            <ul className="space-y-1">
                              {plan.features?.map((feature, index) => (
                                <li key={index} className="flex items-center text-sm">
                                  <Check className="w-3 h-3 text-green-500 mr-2" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))
                      )}
                    </div>

                    {selectedPlan && (
                      <div className="mt-6 space-y-4">
                        <Button 
                          onClick={handleBookService}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <Loader className="w-4 h-4 mr-2 animate-spin" />
                              Booking...
                            </>
                          ) : (
                            <>
                              Book Now
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                        
                        <div className="text-center text-sm text-gray-500">
                          <div className="flex items-center justify-center space-x-4">
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-1" />
                              Support
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Flexible
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                ) : (
                  <Card className="p-6 text-center">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Select a Service
                    </h3>
                    <p className="text-gray-500">
                      Choose a service from the left to see pricing plans and details.
                    </p>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">Wide Coverage</h4>
              <p className="text-sm text-gray-600">Available in multiple locations</p>
            </div>
            <div>
              <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">24/7 Service</h4>
              <p className="text-sm text-gray-600">Round the clock support</p>
            </div>
            <div>
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">Trusted Platform</h4>
              <p className="text-sm text-gray-600">Thousands of satisfied customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSelectionPage;