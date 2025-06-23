
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Eye, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RideCost {
  _id?: string;
  modelName: string;
  baseFare: number;
  minKmIncluded: number;
  extraPerKm: number;
  includedMinutes: number;
  extraPerMin: number;
  pickCharges: number;
  nightCharges: number;
  cancellationFee: number;
  insurance: number;
  extraChargesFromAdmin: number;
  discount: number;
  peakHoursChargePerKm: number;
  peakHoursChargePerMin: number;
  peakDateChargePerKm: number;
  peakDateChargePerMin: number;
}

interface PeakData {
  _id?: string;
  type: 'peak_hours' | 'peak_dates';
  name: string;
  startTime?: string;
  endTime?: string;
  startDate?: string;
  endDate?: string;
  price: number;
}

export const RideCostPage = () => {
  const [rideCosts, setRideCosts] = useState<RideCost[]>([]);
  const [rideCostForm, setRideCostForm] = useState<any>({});
  const [rideCostDialogOpen, setRideCostDialogOpen] = useState(false);
  const [editingRideCost, setEditingRideCost] = useState<RideCost | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewingRideCost, setViewingRideCost] = useState<RideCost | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Peak Hours/Dates state
  const [peakData, setPeakData] = useState<PeakData[]>([]);
  const [peakForm, setPeakForm] = useState<Partial<PeakData>>({});
  const [peakDialogOpen, setPeakDialogOpen] = useState(false);
  const [selectedPeakType, setSelectedPeakType] = useState<'peak_hours' | 'peak_dates'>('peak_hours');

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchRideCosts();
    fetchPeakData();
  }, []);

  const fetchRideCosts = async () => {
    const res = await axios.get(`${API_BASE_URL}/ride-costs`);
    setRideCosts(res.data);
  };

  const fetchPeakData = async () => {
    // Mock data for now - replace with actual API call
    setPeakData([]);
  };

  const handleRideCostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = Object.fromEntries(
      Object.entries(rideCostForm).map(([key, value]) => {
        return [
          key,
          key === 'modelName' ? String(value || '') : parseFloat(String(value || '0'))
        ];
      })
    );

    payload['modelName'] = String(rideCostForm.modelName || '');

    await axios.post(`${API_BASE_URL}/ride-costs`, payload);
    fetchRideCosts();
    setRideCostDialogOpen(false);
    setRideCostForm({});
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingRideCost?._id) return;
    const payload = Object.fromEntries(
      Object.entries(rideCostForm).map(([key, value]) => [
        key, 
        key === 'modelName' ? String(value || '') : parseFloat(String(value || '0'))
      ])
    );
    payload['modelName'] = String(rideCostForm.modelName || '');

    await axios.put(`${API_BASE_URL}/ride-costs/${editingRideCost._id}`, payload);
    fetchRideCosts();
    setEditDialogOpen(false);
    setEditingRideCost(null);
    setRideCostForm({});
  };

  const handleEdit = (rideCost: RideCost) => {
    setEditingRideCost(rideCost);
    const newForm: any = {};
    Object.entries(rideCost).forEach(([key, value]) => {
      if (typeof value !== 'undefined') newForm[key] = value.toString();
    });
    setRideCostForm(newForm);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await axios.delete(`${API_BASE_URL}/ride-costs/${id}`);
    fetchRideCosts();
  };

  const handlePeakSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPeakData: PeakData = {
      _id: Date.now().toString(), // Mock ID
      type: selectedPeakType,
      name: peakForm.name || '',
      price: parseFloat(peakForm.price?.toString() || '0'),
      ...(selectedPeakType === 'peak_hours' ? {
        startTime: peakForm.startTime,
        endTime: peakForm.endTime
      } : {
        startDate: peakForm.startDate,
        endDate: peakForm.endDate,
        startTime: peakForm.startTime,
        endTime: peakForm.endTime
      })
    };

    setPeakData([...peakData, newPeakData]);
    setPeakDialogOpen(false);
    setPeakForm({});
  };

  const handleDeletePeak = (id: string) => {
    setPeakData(peakData.filter(item => item._id !== id));
  };

  const formFields = [
    { key: 'modelName', label: 'Model Name', type: 'text' },
    { key: 'baseFare', label: 'Base Fare', type: 'number' },
    { key: 'minKmIncluded', label: 'Min Km Included', type: 'number' },
    { key: 'extraPerKm', label: 'Extra Per Km', type: 'number' },
    { key: 'includedMinutes', label: 'Included Minutes', type: 'number' },
    { key: 'extraPerMin', label: 'Extra Per Minute', type: 'number' },
    { key: 'pickCharges', label: 'Pick Charges', type: 'number' },
    { key: 'nightCharges', label: 'Night Charges', type: 'number' },
    { key: 'cancellationFee', label: 'Cancellation Fee', type: 'number' },
    { key: 'insurance', label: 'Insurance', type: 'number' },
    { key: 'extraChargesFromAdmin', label: 'Extra Charges from Admin', type: 'number' },
    { key: 'discount', label: 'Discount', type: 'number' },
    { key: 'peakHoursChargePerKm', label: 'Peak Hours Charge Per Km', type: 'number' },
    { key: 'peakHoursChargePerMin', label: 'Peak Hours Charge Per Minute', type: 'number' },
    { key: 'peakDateChargePerKm', label: 'Peak Date Charge Per Km', type: 'number' },
    { key: 'peakDateChargePerMin', label: 'Peak Date Charge Per Minute', type: 'number' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Ride Cost Management</h1>
      </div>

      {/* Ride Cost Models Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Ride Cost Models</h2>
          <Dialog open={rideCostDialogOpen} onOpenChange={setRideCostDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setRideCostForm({})}>
                <Plus className="w-4 h-4 mr-2" />
                Create Ride Cost Model
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Ride Cost Model</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleRideCostSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {formFields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm font-medium mb-1">{field.label}</label>
                      <Input
                        type={field.type}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        value={rideCostForm[field.key] || ''}
                        onChange={(e) =>
                          setRideCostForm((prev: any) => ({
                            ...prev,
                            [field.key]: e.target.value
                          }))
                        }
                        required
                      />
                    </div>
                  ))}
                </div>
                <Button type="submit" className="w-full">Submit</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Ride Cost Model</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {formFields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium mb-1">{field.label}</label>
                    <Input
                      type={field.type}
                      value={rideCostForm[field.key] || ''}
                      onChange={(e) =>
                        setRideCostForm((prev: any) => ({
                          ...prev,
                          [field.key]: e.target.value
                        }))
                      }
                      required
                    />
                  </div>
                ))}
              </div>
              <Button type="submit" className="w-full">Update</Button>
            </form>
          </DialogContent>
        </Dialog>

        <ScrollArea className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model Name</TableHead>
                <TableHead>Base Fare</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rideCosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                    No ride cost model found. Add your first one!
                  </TableCell>
                </TableRow>
              ) : (
                rideCosts.map((rideCost) => (
                  <TableRow key={rideCost._id}>
                    <TableCell>{rideCost.modelName}</TableCell>
                    <TableCell>{rideCost.baseFare}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => {
                          setViewingRideCost(rideCost);
                          setViewDialogOpen(true);
                        }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(rideCost)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will delete the ride cost permanently.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(rideCost._id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>

        {/* View Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>View Ride Cost Model</DialogTitle>
            </DialogHeader>
            {viewingRideCost && (
              <div className="grid grid-cols-2 gap-4">
                {formFields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium mb-1">{field.label}</label>
                    <Input value={viewingRideCost[field.key as keyof RideCost]?.toString()} readOnly />
                  </div>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </Card>

      {/* Peak Hours / Peak Dates Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Peak Hours / Peak Dates</h2>
          <Dialog open={peakDialogOpen} onOpenChange={setPeakDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setPeakForm({})}>
                <Plus className="w-4 h-4 mr-2" />
                Add Peak Hours / Peak Dates
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Peak Hours / Peak Dates</DialogTitle>
              </DialogHeader>
              <form onSubmit={handlePeakSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <Select value={selectedPeakType} onValueChange={(value: 'peak_hours' | 'peak_dates') => {
                    setSelectedPeakType(value);
                    setPeakForm({ type: value });
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="peak_hours">Peak Hours</SelectItem>
                      <SelectItem value="peak_dates">Peak Dates</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    placeholder={selectedPeakType === 'peak_hours' ? 'Peak Hour 1' : 'Peak Date Range 1'}
                    value={peakForm.name || ''}
                    onChange={(e) => setPeakForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                {selectedPeakType === 'peak_hours' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Start Time</label>
                        <Input
                          type="time"
                          value={peakForm.startTime || ''}
                          onChange={(e) => setPeakForm(prev => ({ ...prev, startTime: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">End Time</label>
                        <Input
                          type="time"
                          value={peakForm.endTime || ''}
                          onChange={(e) => setPeakForm(prev => ({ ...prev, endTime: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedPeakType === 'peak_dates' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Start Date</label>
                        <Input
                          type="date"
                          value={peakForm.startDate || ''}
                          onChange={(e) => setPeakForm(prev => ({ ...prev, startDate: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">End Date</label>
                        <Input
                          type="date"
                          value={peakForm.endDate || ''}
                          onChange={(e) => setPeakForm(prev => ({ ...prev, endDate: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Start Time</label>
                        <Input
                          type="time"
                          value={peakForm.startTime || ''}
                          onChange={(e) => setPeakForm(prev => ({ ...prev, startTime: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">End Time</label>
                        <Input
                          type="time"
                          value={peakForm.endTime || ''}
                          onChange={(e) => setPeakForm(prev => ({ ...prev, endTime: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1">Price (₹)</label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0"
                    value={peakForm.price || ''}
                    onChange={(e) => setPeakForm(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">Add</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <ScrollArea className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Time/Date Range</TableHead>
                <TableHead>Price (₹)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {peakData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No peak hours/dates configured. Add your first one!
                  </TableCell>
                </TableRow>
              ) : (
                peakData.map((peak) => (
                  <TableRow key={peak._id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {peak.type === 'peak_hours' ? <Clock className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                        {peak.type === 'peak_hours' ? 'Peak Hours' : 'Peak Dates'}
                      </div>
                    </TableCell>
                    <TableCell>{peak.name}</TableCell>
                    <TableCell>
                      {peak.type === 'peak_hours' 
                        ? `${peak.startTime} - ${peak.endTime}`
                        : `${peak.startDate} to ${peak.endDate} (${peak.startTime} - ${peak.endTime})`
                      }
                    </TableCell>
                    <TableCell>₹{peak.price}</TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will delete the peak configuration permanently.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeletePeak(peak._id!)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>
    </div>
  );
};
