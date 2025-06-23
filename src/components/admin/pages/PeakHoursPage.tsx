
import React, { useState } from 'react';
import { Plus, Trash2, Clock, Calendar } from 'lucide-react';
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

interface PeakHour {
  _id: string;
  name: string;
  type: 'peak_hours' | 'peak_dates';
  startTime: string;
  endTime: string;
  startDate?: string;
  endDate?: string;
  price: number;
}

export const PeakHoursPage = () => {
  const [peakHours, setPeakHours] = useState<PeakHour[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'peak_hours' | 'peak_dates'>('peak_hours');
  const [formData, setFormData] = useState({
    name: '',
    startTime: '',
    endTime: '',
    startDate: '',
    endDate: '',
    price: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPeakHour: PeakHour = {
      _id: Date.now().toString(),
      name: formData.name,
      type: selectedType,
      startTime: formData.startTime,
      endTime: formData.endTime,
      startDate: selectedType === 'peak_dates' ? formData.startDate : undefined,
      endDate: selectedType === 'peak_dates' ? formData.endDate : undefined,
      price: parseFloat(formData.price)
    };
    
    setPeakHours([...peakHours, newPeakHour]);
    setDialogOpen(false);
    setFormData({
      name: '',
      startTime: '',
      endTime: '',
      startDate: '',
      endDate: '',
      price: ''
    });
  };

  const handleDelete = (id: string) => {
    setPeakHours(peakHours.filter(hour => hour._id !== id));
  };

  const handleTypeChange = (value: 'peak_hours' | 'peak_dates') => {
    setSelectedType(value);
    // Reset form data when type changes
    setFormData({
      name: '',
      startTime: '',
      endTime: '',
      startDate: '',
      endDate: '',
      price: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Peak Hours / Peak Dates Management</h1>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Peak Hours / Peak Dates</h2>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Peak Hours / Peak Dates
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Peak Hours / Peak Dates</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <Select value={selectedType} onValueChange={handleTypeChange}>
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
                  <label className="block text-sm font-medium mb-1">
                    {selectedType === 'peak_hours' ? 'Peak Hour 1' : 'Peak Date Range 1'}
                  </label>
                  <Input
                    placeholder={selectedType === 'peak_hours' ? 'Peak Hour 1' : 'Peak Date Range 1'}
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                {selectedType === 'peak_dates' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Start Date</label>
                      <Input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">End Date</label>
                      <Input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Time</label>
                    <Input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Time</label>
                    <Input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Price (₹)</label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">Add</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date Range</TableHead>
              <TableHead>Time Range</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {peakHours.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No peak hours/dates configured. Add your first one!
                </TableCell>
              </TableRow>
            ) : (
              peakHours.map((hour) => (
                <TableRow key={hour._id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {hour.type === 'peak_hours' ? <Clock className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                      {hour.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="capitalize">{hour.type.replace('_', ' ')}</span>
                  </TableCell>
                  <TableCell>
                    {hour.type === 'peak_dates' ? `${hour.startDate} to ${hour.endDate}` : '-'}
                  </TableCell>
                  <TableCell>{hour.startTime} - {hour.endTime}</TableCell>
                  <TableCell>₹{hour.price}</TableCell>
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
                            This will delete the peak {hour.type.replace('_', ' ')} configuration permanently.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(hour._id)}>
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
      </Card>
    </div>
  );
};
