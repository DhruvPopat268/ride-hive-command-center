
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';

interface Category {
  id: number;
  name: string;
}

interface SubCategory {
  id: number;
  categoryId: number;
  categoryName: string;
  name: string;
}

interface VehicleCategory {
  id: number;
  image: string;
  vehicleName: string;
  perKmCharge: number;
  perMinuteCharge: number;
}

interface PriceCategory {
  id: number;
  priceCategoryName: string;
  chargePerKm: number;
  chargePerMinute: number;
}

export const CategoriesPage = () => {
  // State for all categories
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Standard Rides' },
    { id: 2, name: 'Premium Rides' },
  ]);
  
  const [subCategories, setSubCategories] = useState<SubCategory[]>([
    { id: 1, categoryId: 1, categoryName: 'Standard Rides', name: 'Economy' },
    { id: 2, categoryId: 1, categoryName: 'Standard Rides', name: 'Comfort' },
  ]);
  
  const [vehicleCategories, setVehicleCategories] = useState<VehicleCategory[]>([
    { id: 1, image: '/placeholder.svg', vehicleName: 'Sedan', perKmCharge: 12, perMinuteCharge: 2 },
    { id: 2, image: '/placeholder.svg', vehicleName: 'SUV', perKmCharge: 18, perMinuteCharge: 3 },
  ]);
  
  const [priceCategories, setPriceCategories] = useState<PriceCategory[]>([
    { id: 1, priceCategoryName: 'Regular', chargePerKm: 10, chargePerMinute: 1.5 },
    { id: 2, priceCategoryName: 'Peak Hours', chargePerKm: 15, chargePerMinute: 2.5 },
  ]);

  // Form states
  const [categoryForm, setCategoryForm] = useState({ name: '' });
  const [subCategoryForm, setSubCategoryForm] = useState({ categoryId: '', name: '' });
  const [vehicleCategoryForm, setVehicleCategoryForm] = useState({ 
    image: '', vehicleName: '', perKmCharge: '', perMinuteCharge: '' 
  });
  const [priceCategoryForm, setPriceCategoryForm] = useState({ 
    priceCategoryName: '', chargePerKm: '', chargePerMinute: '' 
  });

  // Dialog states
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [subCategoryDialogOpen, setSubCategoryDialogOpen] = useState(false);
  const [vehicleCategoryDialogOpen, setVehicleCategoryDialogOpen] = useState(false);
  const [priceCategoryDialogOpen, setPriceCategoryDialogOpen] = useState(false);

  // Submit handlers
  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryForm.name.trim()) {
      const newCategory = {
        id: Date.now(),
        name: categoryForm.name.trim()
      };
      setCategories([...categories, newCategory]);
      setCategoryForm({ name: '' });
      setCategoryDialogOpen(false);
    }
  };

  const handleSubCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subCategoryForm.categoryId && subCategoryForm.name.trim()) {
      const selectedCategory = categories.find(cat => cat.id.toString() === subCategoryForm.categoryId);
      const newSubCategory = {
        id: Date.now(),
        categoryId: parseInt(subCategoryForm.categoryId),
        categoryName: selectedCategory?.name || '',
        name: subCategoryForm.name.trim()
      };
      setSubCategories([...subCategories, newSubCategory]);
      setSubCategoryForm({ categoryId: '', name: '' });
      setSubCategoryDialogOpen(false);
    }
  };

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

  const handlePriceCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (priceCategoryForm.priceCategoryName.trim() && priceCategoryForm.chargePerKm && priceCategoryForm.chargePerMinute) {
      const newPriceCategory = {
        id: Date.now(),
        priceCategoryName: priceCategoryForm.priceCategoryName.trim(),
        chargePerKm: parseFloat(priceCategoryForm.chargePerKm),
        chargePerMinute: parseFloat(priceCategoryForm.chargePerMinute)
      };
      setPriceCategories([...priceCategories, newPriceCategory]);
      setPriceCategoryForm({ priceCategoryName: '', chargePerKm: '', chargePerMinute: '' });
      setPriceCategoryDialogOpen(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Categories Management</h1>
      </div>

      {/* Category Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Categories</h2>
          <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Category</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCategorySubmit} className="space-y-4">
                <Input
                  placeholder="Enter category"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ name: e.target.value })}
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
              <TableHead>Category Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
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

      {/* Sub Category Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Sub Categories</h2>
          <Dialog open={subCategoryDialogOpen} onOpenChange={setSubCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Subcategory
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Subcategory</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubCategorySubmit} className="space-y-4">
                <Select value={subCategoryForm.categoryId} onValueChange={(value) => setSubCategoryForm({...subCategoryForm, categoryId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Sub Category"
                  value={subCategoryForm.name}
                  onChange={(e) => setSubCategoryForm({...subCategoryForm, name: e.target.value})}
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
              <TableHead>Category</TableHead>
              <TableHead>Sub Category Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subCategories.map((subCategory) => (
              <TableRow key={subCategory.id}>
                <TableCell>{subCategory.id}</TableCell>
                <TableCell>{subCategory.categoryName}</TableCell>
                <TableCell>{subCategory.name}</TableCell>
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

      {/* Vehicle Category Section */}
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

      {/* Price Category Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Price Categories</h2>
          <Dialog open={priceCategoryDialogOpen} onOpenChange={setPriceCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Price Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Price Category</DialogTitle>
              </DialogHeader>
              <form onSubmit={handlePriceCategorySubmit} className="space-y-4">
                <Input
                  placeholder="Price category"
                  value={priceCategoryForm.priceCategoryName}
                  onChange={(e) => setPriceCategoryForm({...priceCategoryForm, priceCategoryName: e.target.value})}
                  required
                />
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Charge per km"
                  value={priceCategoryForm.chargePerKm}
                  onChange={(e) => setPriceCategoryForm({...priceCategoryForm, chargePerKm: e.target.value})}
                  required
                />
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Charge per minute"
                  value={priceCategoryForm.chargePerMinute}
                  onChange={(e) => setPriceCategoryForm({...priceCategoryForm, chargePerMinute: e.target.value})}
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
              <TableHead>Price Category Name</TableHead>
              <TableHead>Charge Per Km</TableHead>
              <TableHead>Charge Per Minute</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {priceCategories.map((priceCategory) => (
              <TableRow key={priceCategory.id}>
                <TableCell>{priceCategory.id}</TableCell>
                <TableCell>{priceCategory.priceCategoryName}</TableCell>
                <TableCell>${priceCategory.chargePerKm}</TableCell>
                <TableCell>${priceCategory.chargePerMinute}</TableCell>
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
