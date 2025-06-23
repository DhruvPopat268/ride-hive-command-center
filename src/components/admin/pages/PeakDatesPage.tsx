
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PeakDate {
  _id?: string;
  name: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  chargePerKm: number;
  chargePerMin: number;
}

export const PeakDatesPage = () => {
  const [peakDates, setPeakDates] = useState<PeakDate[]>([]);
  const [peakDateForm, setPeakDateForm] = useState<Partial<PeakDate>>({});
  const [peakDateDialogOpen, setPeakDateDialogOpen] = useState(false);
  const [editingPeakDate, setEditingPeakDate] = useState<PeakDate | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchPeakDates();
  }, []);

  const fetchPeakDates = async () => {
    // Mock data for now - replace with actual API call
    setPeakDates([]);
  };

  const handlePeakDateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPeakDate: PeakDate = {
      _id: Date.now().toString(), // Mock ID
      name: peakDateForm.name || '',
      startDate: peakDateForm.startDate || '',
      endDate: peakDateForm.endDate || '',
      startTime: peakDateForm.startTime || '',
      endTime: peakDateForm.endTime || '',
      chargePerKm: parseFloat(peakDateForm.chargePerKm?.toString() || '0'),
      chargePerMin: parseFloat(peakDateForm.chargePerMin?.toString() || '0')
    };

    setPeakDates([...peakDates, newPeakDate]);
    setPeakDateDialogOpen(false);
    setPeakDateForm({});
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingPeakDate?._id) return;
    
    const updatedPeakDate: PeakDate = {
      ...editingPeakDate,
      name: peakDateForm.name || '',
      startDate: peakDateForm.startDate || '',
      endDate: peakDateForm.endDate || '',
      startTime: peakDateForm.startTime || '',
      endTime: peakDateForm.endTime || '',
      chargePerKm: parseFloat(peakDateForm.chargePerKm?.toString() || '0'),
      chargePerMin: parseFloat(peakDateForm.chargePerMin?.toString() || '0')
    };

    setPeakDates(peakDates.map(pd => pd._id === editingPeakDate._id ? updatedPeakDate : pd));
    setEditDialogOpen(false);
    setEditingPeakDate(null);
    setPeakDateForm({});
  };

  const handleEdit = (peakDate: PeakDate) => {
    setEditingPeakDate(peakDate);
    setPeakDateForm({
      name: peakDate.name,
      startDate: peakDate.startDate,
      endDate: peakDate.endDate,
      startTime: peakDate.startTime,
      endTime: peakDate.endTime,
      chargePerKm: peakDate.chargePerKm,
      chargePerMin: peakDate.chargePerMin
    });
    setEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setPeakDates(peakDates.filter(pd => pd._id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Peak Dates Management</h1>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Peak Dates Configuration</h2>
          <Dialog open={peakDateDialogOpen} onOpenChange={setPeakDateDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setPeakDateForm({})}>
                <Plus className="w-4 h-4 mr-2" />
                Add Peak Dates
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Peak Dates</DialogTitle>
              </DialogHeader>
              <form onSubmit={handlePeakDateSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    placeholder="e.g., Holiday Season"
                    value={peakDateForm.name || ''}
                    onChange={(e) => setPeakDateForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <Input
                      type="date"
                      value={peakDateForm.startDate || ''}
                      onChange={(e) => setPeakDateForm(prev => ({ ...prev, startDate: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <Input
                      type="date"
                      value={peakDateForm.endDate || ''}
                      onChange={(e) => setPeakDateForm(prev => ({ ...prev, endDate: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Time</label>
                    <Input
                      type="time"
                      value={peakDateForm.startTime || ''}
                      onChange={(e) => setPeakDateForm(prev => ({ ...prev, startTime: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Time</label>
                    <Input
                      type="time"
                      value={peakDateForm.endTime || ''}
                      onChange={(e) => setPeakDateForm(prev => ({ ...prev, endTime: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Charge Per Km (₹)</label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0"
                      value={peakDateForm.chargePerKm || ''}
                      onChange={(e) => setPeakDateForm(prev => ({ ...prev, chargePerKm: parseFloat(e.target.value) }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Charge Per Minute (₹)</label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0"
                      value={peakDateForm.chargePerMin || ''}
                      onChange={(e) => setPeakDateForm(prev => ({ ...prev, chargePerMin: parseFloat(e.target.value) }))}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">Add Peak Dates</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Peak Dates</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  value={peakDateForm.name || ''}
                  onChange={(e) => setPeakDateForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <Input
                    type="date"
                    value={peakDateForm.startDate || ''}
                    onChange={(e) => setPeakDateForm(prev => ({ ...prev, startDate: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <Input
                    type="date"
                    value={peakDateForm.endDate || ''}
                    onChange={(e) => setPeakDateForm(prev => ({ ...prev, endDate: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Time</label>
                  <Input
                    type="time"
                    value={peakDateForm.startTime || ''}
                    onChange={(e) => setPeakDateForm(prev => ({ ...prev, startTime: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Time</label>
                  <Input
                    type="time"
                    value={peakDateForm.endTime || ''}
                    onChange={(e) => setPeakDateForm(prev => ({ ...prev, endTime: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Charge Per Km (₹)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={peakDateForm.chargePerKm || ''}
                    onChange={(e) => setPeakDateForm(prev => ({ ...prev, chargePerKm: parseFloat(e.target.value) }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Charge Per Minute (₹)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={peakDateForm.chargePerMin || ''}
                    onChange={(e) => setPeakDateForm(prev => ({ ...prev, chargePerMin: parseFloat(e.target.value) }))}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">Update Peak Dates</Button>
            </form>
          </DialogContent>
        </Dialog>

        <ScrollArea className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date Range</TableHead>
                <TableHead>Time Range</TableHead>
                <TableHead>Charge Per Km</TableHead>
                <TableHead>Charge Per Minute</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {peakDates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No peak dates configured. Add your first one!
                  </TableCell>
                </TableRow>
              ) : (
                peakDates.map((peakDate) => (
                  <TableRow key={peakDate._id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {peakDate.name}
                      </div>
                    </TableCell>
                    <TableCell>{`${peakDate.startDate} to ${peakDate.endDate}`}</TableCell>
                    <TableCell>{`${peakDate.startTime} - ${peakDate.endTime}`}</TableCell>
                    <TableCell>₹{peakDate.chargePerKm}</TableCell>
                    <TableCell>₹{peakDate.chargePerMin}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(peakDate)}>
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
                                This will delete the peak dates configuration permanently.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(peakDate._id!)}>
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
      </Card>
    </div>
  );
};
