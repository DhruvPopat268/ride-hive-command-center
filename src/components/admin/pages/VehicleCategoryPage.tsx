
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';

interface VehicleCategory {
  id: number;
  image: string;
  vehicleName: string;
  perKmCharge: number;
  perMinuteCharge: number;
}

export const VehicleCategoryPage = () => {
  const [vehicleCategories, setVehicleCategories] = useState<VehicleCategory[]>([
    { id: 1, image: '/placeholder.svg', vehicleName: 'Sedan', perKmCharge: 12, perMinuteCharge: 2 },
    { id: 2, image: '/placeholder.svg', vehicleName: 'SUV', perKmCharge: 18, perMinuteCharge: 3 },
  ]);
  
  const [vehicleCategoryForm, setVehicleCategoryForm] = useState({ 
    image: '', vehicleName: '', perKmCharge: '', perMinuteCharge: '' 
  });
  const [vehicleCategoryDialogOpen, setVehicleCategoryDialogOpen] = useState(false);

  const handleVehicleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vehicleCategoryForm.vehicleName.trim() && vehicleCategoryForm.perKmCharge && vehicleCategoryForm.perMinuteCharge) {
      const newVehicleCategory = {
        id: Date.now(),
        image: vehicleCategoryForm.image || '/placeholder.svg',
        vehicleName: vehicleCategoryForm.vehicleName.trim(),
        perKmCharge: parseFloat(vehicleCategoryForm.perKmCharge),
        perMinuteCharge: parseFloat(vehicleCategoryForm.perMinuteCharge)
      };
      setVehicleCategories([...vehicleCategories, newVehicleCategory]);
      setVehicleCategoryForm({ image: '', vehicleName: '', perKmCharge: '', perMinuteCharge: '' });
      setVehicleCategoryDialogOpen(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Vehicle Category Management</h1>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Vehicle Categories</h2>
          <Dialog open={vehicleCategoryDialogOpen} onOpenChange={setVehicleCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Vehicle Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Vehicle Category</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleVehicleCategorySubmit} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setVehicleCategoryForm({...vehicleCategoryForm, image: e.target.value})}
                  />
                </div>
                <Input
                  placeholder="Vehicle name"
                  value={vehicleCategoryForm.vehicleName}
                  onChange={(e) => setVehicleCategoryForm({...vehicleCategoryForm, vehicleName: e.target.value})}
                  required
                />
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Per km charge"
                  value={vehicleCategoryForm.perKmCharge}
                  onChange={(e) => setVehicleCategoryForm({...vehicleCategoryForm, perKmCharge: e.target.value})}
                  required
                />
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Per minute charge"
                  value={vehicleCategoryForm.perMinuteCharge}
                  onChange={(e) => setVehicleCategoryForm({...vehicleCategoryForm, perMinuteCharge: e.target.value})}
                  required
                />
                <Button type="submit" className="w-full">Submit</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Vehicle Name</TableHead>
              <TableHead>Per Km Charge</TableHead>
              <TableHead>Per Minute Charge</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicleCategories.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.id}</TableCell>
                <TableCell>
                  <img src={vehicle.image} alt={vehicle.vehicleName} className="w-10 h-10 rounded object-cover" />
                </TableCell>
                <TableCell>{vehicle.vehicleName}</TableCell>
                <TableCell>${vehicle.perKmCharge}</TableCell>
                <TableCell>${vehicle.perMinuteCharge}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
