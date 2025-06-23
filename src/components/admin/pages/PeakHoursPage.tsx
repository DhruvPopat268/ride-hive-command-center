
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Clock } from 'lucide-react';
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

interface PeakHour {
  _id?: string;
  name: string;
  startTime: string;
  endTime: string;
  chargePerKm: number;
  chargePerMin: number;
}

export const PeakHoursPage = () => {
  const [peakHours, setPeakHours] = useState<PeakHour[]>([]);
  const [peakHourForm, setPeakHourForm] = useState<Partial<PeakHour>>({});
  const [peakHourDialogOpen, setPeakHourDialogOpen] = useState(false);
  const [editingPeakHour, setEditingPeakHour] = useState<PeakHour | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchPeakHours();
  }, []);

  const fetchPeakHours = async () => {
    // Mock data for now - replace with actual API call
    setPeakHours([]);
  };

  const handlePeakHourSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPeakHour: PeakHour = {
      _id: Date.now().toString(), // Mock ID
      name: peakHourForm.name || '',
      startTime: peakHourForm.startTime || '',
      endTime: peakHourForm.endTime || '',
      chargePerKm: parseFloat(peakHourForm.chargePerKm?.toString() || '0'),
      chargePerMin: parseFloat(peakHourForm.chargePerMin?.toString() || '0')
    };

    setPeakHours([...peakHours, newPeakHour]);
    setPeakHourDialogOpen(false);
    setPeakHourForm({});
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingPeakHour?._id) return;
    
    const updatedPeakHour: PeakHour = {
      ...editingPeakHour,
      name: peakHourForm.name || '',
      startTime: peakHourForm.startTime || '',
      endTime: peakHourForm.endTime || '',
      chargePerKm: parseFloat(peakHourForm.chargePerKm?.toString() || '0'),
      chargePerMin: parseFloat(peakHourForm.chargePerMin?.toString() || '0')
    };

    setPeakHours(peakHours.map(ph => ph._id === editingPeakHour._id ? updatedPeakHour : ph));
    setEditDialogOpen(false);
    setEditingPeakHour(null);
    setPeakHourForm({});
  };

  const handleEdit = (peakHour: PeakHour) => {
    setEditingPeakHour(peakHour);
    setPeakHourForm({
      name: peakHour.name,
      startTime: peakHour.startTime,
      endTime: peakHour.endTime,
      chargePerKm: peakHour.chargePerKm,
      chargePerMin: peakHour.chargePerMin
    });
    setEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setPeakHours(peakHours.filter(ph => ph._id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Peak Hours Management</h1>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Peak Hours Configuration</h2>
          <Dialog open={peakHourDialogOpen} onOpenChange={setPeakHourDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setPeakHourForm({})}>
                <Plus className="w-4 h-4 mr-2" />
                Add Peak Hours
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Peak Hours</DialogTitle>
              </DialogHeader>
              <form onSubmit={handlePeakHourSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    placeholder="e.g., Morning Rush"
                    value={peakHourForm.name || ''}
                    onChange={(e) => setPeakHourForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Time</label>
                    <Input
                      type="time"
                      value={peakHourForm.startTime || ''}
                      onChange={(e) => setPeakHourForm(prev => ({ ...prev, startTime: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Time</label>
                    <Input
                      type="time"
                      value={peakHourForm.endTime || ''}
                      onChange={(e) => setPeakHourForm(prev => ({ ...prev, endTime: e.target.value }))}
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
                      value={peakHourForm.chargePerKm || ''}
                      onChange={(e) => setPeakHourForm(prev => ({ ...prev, chargePerKm: parseFloat(e.target.value) }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Charge Per Minute (₹)</label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0"
                      value={peakHourForm.chargePerMin || ''}
                      onChange={(e) => setPeakHourForm(prev => ({ ...prev, chargePerMin: parseFloat(e.target.value) }))}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">Add Peak Hours</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Peak Hours</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  value={peakHourForm.name || ''}
                  onChange={(e) => setPeakHourForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Time</label>
                  <Input
                    type="time"
                    value={peakHourForm.startTime || ''}
                    onChange={(e) => setPeakHourForm(prev => ({ ...prev, startTime: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Time</label>
                  <Input
                    type="time"
                    value={peakHourForm.endTime || ''}
                    onChange={(e) => setPeakHourForm(prev => ({ ...prev, endTime: e.target.value }))}
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
                    value={peakHourForm.chargePerKm || ''}
                    onChange={(e) => setPeakHourForm(prev => ({ ...prev, chargePerKm: parseFloat(e.target.value) }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Charge Per Minute (₹)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={peakHourForm.chargePerMin || ''}
                    onChange={(e) => setPeakHourForm(prev => ({ ...prev, chargePerMin: parseFloat(e.target.value) }))}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">Update Peak Hours</Button>
            </form>
          </DialogContent>
        </Dialog>

        <ScrollArea className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Time Range</TableHead>
                <TableHead>Charge Per Km</TableHead>
                <TableHead>Charge Per Minute</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {peakHours.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No peak hours configured. Add your first one!
                  </TableCell>
                </TableRow>
              ) : (
                peakHours.map((peakHour) => (
                  <TableRow key={peakHour._id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {peakHour.name}
                      </div>
                    </TableCell>
                    <TableCell>{`${peakHour.startTime} - ${peakHour.endTime}`}</TableCell>
                    <TableCell>₹{peakHour.chargePerKm}</TableCell>
                    <TableCell>₹{peakHour.chargePerMin}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(peakHour)}>
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
                                This will delete the peak hours configuration permanently.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(peakHour._id!)}>
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
