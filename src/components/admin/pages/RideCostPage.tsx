
import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';

interface RideCost {
  id: number;
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

export const RideCostPage = () => {
  const [rideCosts, setRideCosts] = useState<RideCost[]>([]);
  
  const [rideCostForm, setRideCostForm] = useState({
    baseFare: '',
    minKmIncluded: '',
    extraPerKm: '',
    includedMinutes: '',
    extraPerMin: '',
    pickCharges: '',
    nightCharges: '',
    cancellationFee: '',
    insurance: '',
    extraChargesFromAdmin: '',
    discount: '',
    peakHoursChargePerKm: '',
    peakHoursChargePerMin: '',
    peakDateChargePerKm: '',
    peakDateChargePerMin: ''
  });
  
  const [rideCostDialogOpen, setRideCostDialogOpen] = useState(false);
  const [editingRideCost, setEditingRideCost] = useState<RideCost | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleRideCostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRideCost: RideCost = {
      id: Date.now(),
      baseFare: Number(rideCostForm.baseFare),
      minKmIncluded: Number(rideCostForm.minKmIncluded),
      extraPerKm: Number(rideCostForm.extraPerKm),
      includedMinutes: Number(rideCostForm.includedMinutes),
      extraPerMin: Number(rideCostForm.extraPerMin),
      pickCharges: Number(rideCostForm.pickCharges),
      nightCharges: Number(rideCostForm.nightCharges),
      cancellationFee: Number(rideCostForm.cancellationFee),
      insurance: Number(rideCostForm.insurance),
      extraChargesFromAdmin: Number(rideCostForm.extraChargesFromAdmin),
      discount: Number(rideCostForm.discount),
      peakHoursChargePerKm: Number(rideCostForm.peakHoursChargePerKm),
      peakHoursChargePerMin: Number(rideCostForm.peakHoursChargePerMin),
      peakDateChargePerKm: Number(rideCostForm.peakDateChargePerKm),
      peakDateChargePerMin: Number(rideCostForm.peakDateChargePerMin)
    };
    
    setRideCosts([...rideCosts, newRideCost]);
    setRideCostForm({
      baseFare: '',
      minKmIncluded: '',
      extraPerKm: '',
      includedMinutes: '',
      extraPerMin: '',
      pickCharges: '',
      nightCharges: '',
      cancellationFee: '',
      insurance: '',
      extraChargesFromAdmin: '',
      discount: '',
      peakHoursChargePerKm: '',
      peakHoursChargePerMin: '',
      peakDateChargePerKm: '',
      peakDateChargePerMin: ''
    });
    setRideCostDialogOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRideCost) {
      const updatedRideCost: RideCost = {
        ...editingRideCost,
        baseFare: Number(rideCostForm.baseFare),
        minKmIncluded: Number(rideCostForm.minKmIncluded),
        extraPerKm: Number(rideCostForm.extraPerKm),
        includedMinutes: Number(rideCostForm.includedMinutes),
        extraPerMin: Number(rideCostForm.extraPerMin),
        pickCharges: Number(rideCostForm.pickCharges),
        nightCharges: Number(rideCostForm.nightCharges),
        cancellationFee: Number(rideCostForm.cancellationFee),
        insurance: Number(rideCostForm.insurance),
        extraChargesFromAdmin: Number(rideCostForm.extraChargesFromAdmin),
        discount: Number(rideCostForm.discount),
        peakHoursChargePerKm: Number(rideCostForm.peakHoursChargePerKm),
        peakHoursChargePerMin: Number(rideCostForm.peakHoursChargePerMin),
        peakDateChargePerKm: Number(rideCostForm.peakDateChargePerKm),
        peakDateChargePerMin: Number(rideCostForm.peakDateChargePerMin)
      };
      
      setRideCosts(rideCosts.map(cost => 
        cost.id === editingRideCost.id ? updatedRideCost : cost
      ));
      setRideCostForm({
        baseFare: '',
        minKmIncluded: '',
        extraPerKm: '',
        includedMinutes: '',
        extraPerMin: '',
        pickCharges: '',
        nightCharges: '',
        cancellationFee: '',
        insurance: '',
        extraChargesFromAdmin: '',
        discount: '',
        peakHoursChargePerKm: '',
        peakHoursChargePerMin: '',
        peakDateChargePerKm: '',
        peakDateChargePerMin: ''
      });
      setEditDialogOpen(false);
      setEditingRideCost(null);
    }
  };

  const handleEdit = (rideCost: RideCost) => {
    setEditingRideCost(rideCost);
    setRideCostForm({
      baseFare: rideCost.baseFare.toString(),
      minKmIncluded: rideCost.minKmIncluded.toString(),
      extraPerKm: rideCost.extraPerKm.toString(),
      includedMinutes: rideCost.includedMinutes.toString(),
      extraPerMin: rideCost.extraPerMin.toString(),
      pickCharges: rideCost.pickCharges.toString(),
      nightCharges: rideCost.nightCharges.toString(),
      cancellationFee: rideCost.cancellationFee.toString(),
      insurance: rideCost.insurance.toString(),
      extraChargesFromAdmin: rideCost.extraChargesFromAdmin.toString(),
      discount: rideCost.discount.toString(),
      peakHoursChargePerKm: rideCost.peakHoursChargePerKm.toString(),
      peakHoursChargePerMin: rideCost.peakHoursChargePerMin.toString(),
      peakDateChargePerKm: rideCost.peakDateChargePerKm.toString(),
      peakDateChargePerMin: rideCost.peakDateChargePerMin.toString()
    });
    setEditDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setRideCosts(rideCosts.filter(cost => cost.id !== id));
  };

  const formFields = [
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

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Ride Costs</h2>
          <Dialog open={rideCostDialogOpen} onOpenChange={setRideCostDialogOpen}>
            <DialogTrigger asChild>
              <Button>
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
                        value={rideCostForm[field.key as keyof typeof rideCostForm]}
                        onChange={(e) => setRideCostForm(prev => ({ 
                          ...prev, 
                          [field.key]: e.target.value 
                        }))}
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
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      value={rideCostForm[field.key as keyof typeof rideCostForm]}
                      onChange={(e) => setRideCostForm(prev => ({ 
                        ...prev, 
                        [field.key]: e.target.value 
                      }))}
                      required
                    />
                  </div>
                ))}
              </div>
              <Button type="submit" className="w-full">Update</Button>
            </form>
          </DialogContent>
        </Dialog>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Base Fare</TableHead>
                <TableHead>Min Km</TableHead>
                <TableHead>Extra/Km</TableHead>
                <TableHead>Inc. Minutes</TableHead>
                <TableHead>Extra/Min</TableHead>
                <TableHead>Pick Charges</TableHead>
                <TableHead>Night Charges</TableHead>
                <TableHead>Cancel Fee</TableHead>
                <TableHead>Insurance</TableHead>
                <TableHead>Admin Extra</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Peak Hr/Km</TableHead>
                <TableHead>Peak Hr/Min</TableHead>
                <TableHead>Peak Date/Km</TableHead>
                <TableHead>Peak Date/Min</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rideCosts.map((rideCost) => (
                <TableRow key={rideCost.id}>
                  <TableCell>{rideCost.id}</TableCell>
                  <TableCell>₹{rideCost.baseFare}</TableCell>
                  <TableCell>{rideCost.minKmIncluded}</TableCell>
                  <TableCell>₹{rideCost.extraPerKm}</TableCell>
                  <TableCell>{rideCost.includedMinutes}</TableCell>
                  <TableCell>₹{rideCost.extraPerMin}</TableCell>
                  <TableCell>₹{rideCost.pickCharges}</TableCell>
                  <TableCell>₹{rideCost.nightCharges}</TableCell>
                  <TableCell>₹{rideCost.cancellationFee}</TableCell>
                  <TableCell>₹{rideCost.insurance}</TableCell>
                  <TableCell>₹{rideCost.extraChargesFromAdmin}</TableCell>
                  <TableCell>₹{rideCost.discount}</TableCell>
                  <TableCell>₹{rideCost.peakHoursChargePerKm}</TableCell>
                  <TableCell>₹{rideCost.peakHoursChargePerMin}</TableCell>
                  <TableCell>₹{rideCost.peakDateChargePerKm}</TableCell>
                  <TableCell>₹{rideCost.peakDateChargePerMin}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
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
                              This action cannot be undone. This will permanently delete the ride cost model.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(rideCost.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};
