
import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';

interface Category {
  id: number;
  name: string;
}

export const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Standard Rides' },
    { id: 2, name: 'Premium Rides' },
  ]);
  
  const [categoryForm, setCategoryForm] = useState({ name: '' });
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

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

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory && categoryForm.name.trim()) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, name: categoryForm.name.trim() }
          : cat
      ));
      setCategoryForm({ name: '' });
      setEditDialogOpen(false);
      setEditingCategory(null);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setCategoryForm({ name: category.name });
    setEditDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Category Management</h1>
      </div>

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

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <Input
                placeholder="Enter category"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ name: e.target.value })}
                required
              />
              <Button type="submit" className="w-full">Update</Button>
            </form>
          </DialogContent>
        </Dialog>

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
                    <Button variant="outline" size="sm" onClick={() => handleEdit(category)}>
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
                            This action cannot be undone. This will permanently delete the category.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(category.id)}>
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
      </Card>
    </div>
  );
};
