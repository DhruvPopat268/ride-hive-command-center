
import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
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

export const SubCategoryPage = () => {
  const [categories] = useState<Category[]>([
    { id: 1, name: 'Standard Rides' },
    { id: 2, name: 'Premium Rides' },
  ]);
  
  const [subCategories, setSubCategories] = useState<SubCategory[]>([
    { id: 1, categoryId: 1, categoryName: 'Standard Rides', name: 'Economy' },
    { id: 2, categoryId: 1, categoryName: 'Standard Rides', name: 'Comfort' },
  ]);
  
  const [subCategoryForm, setSubCategoryForm] = useState({ categoryId: '', name: '' });
  const [subCategoryDialogOpen, setSubCategoryDialogOpen] = useState(false);

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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Sub Category Management</h1>
      </div>

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
    </div>
  );
};
