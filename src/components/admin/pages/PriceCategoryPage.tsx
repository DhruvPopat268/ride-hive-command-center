
import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';

interface PriceCategory {
  id: number;
  priceCategoryName: string;
  chargePerKm: number;
  chargePerMinute: number;
}

export const PriceCategoryPage = () => {
  const [priceCategories, setPriceCategories] = useState<PriceCategory[]>([
    { id: 1, priceCategoryName: 'Regular', chargePerKm: 10, chargePerMinute: 1.5 },
    { id: 2, priceCategoryName: 'Peak Hours', chargePerKm: 15, chargePerMinute: 2.5 },
  ]);
  
  const [priceCategoryForm, setPriceCategoryForm] = useState({ 
    priceCategoryName: '', chargePerKm: '', chargePerMinute: '' 
  });
  const [priceCategoryDialogOpen, setPriceCategoryDialogOpen] = useState(false);

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
        <h1 className="text-3xl font-bold">Price Category Management</h1>
      </div>

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
