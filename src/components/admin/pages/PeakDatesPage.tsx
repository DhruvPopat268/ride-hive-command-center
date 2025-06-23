
import React, { useState } from 'react';
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
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';

interface PeakDate {
  _id: string;
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'peak_hours' | 'peak_dates'>('peak_dates');
  const [formData, setFormData] = useState({
    name: '',
    startTime: '',
    endTime: '',
    startDate: '',
    endDate: '',
    chargePerKm: '',
    chargePerMin: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedType === 'peak_dates') {
      const newPeakDate: PeakDate = {
        _id: Date.now().toString(),
        name: formData.name,
        startDate: formData.startDate,
        endDate: formData.endDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        chargePerKm: parseFloat(formData.chargePerKm),
        chargePerMin: parseFloat(formData.chargePerMin)
      };
      setPeakDates([...peakDates, newPeakDate]);
    }
    
    setDialogOpen(false);
    setFormData({
      name: '',
      startTime: '',
      endTime: '',
      startDate: '',
      endDate: '',
      chargePerKm: '',
      chargePerMin: ''
    });
  };

  const handleDelete = (id: string) => {
    setPeakDates(peakDates.filter(date => date._id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Peak Dates Management</h1>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Peak Dates</h2>
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
                  <Select value={selectedType} onValueChange={(value: 'peak_hours' | 'peak_dates') => setSelectedType(value)}>
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
                    placeholder={selectedType === 'peak_hours' ? 'Morning Rush' : 'Holiday Period'}
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                {selectedType === 'peak_hours' && (
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
                )}

                {selectedType === 'peak_dates' && (
                  <>
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
                  </>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Charge Per Km (₹)</label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0"
                      value={formData.chargePerKm}
                      onChange={(e) => setFormData(prev => ({ ...prev, chargePerKm: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Charge Per Minute (₹)</label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0"
                      value={formData.chargePerMin}
                      onChange={(e) => setFormData(prev => ({ ...prev, chargePerMin: e.target.value }))}
                      required
                    />
                  </div>
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
              <TableHead>Date Range</TableHead>
              <TableHead>Time Range</TableHead>
              <TableHead>Charge Per Km</TableHead>
              <TableHead>Charge Per Min</TableHead>
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
              peakDates.map((date) => (
                <TableRow key={date._id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {date.name}
                    </div>
                  </TableCell>
                  <TableCell>{date.startDate} to {date.endDate}</TableCell>
                  <TableCell>{date.startTime} - {date.endTime}</TableCell>
                  <TableCell>₹{date.chargePerKm}</TableCell>
                  <TableCell>₹{date.chargePerMin}</TableCell>
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
                            This will delete the peak date configuration permanently.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(date._id)}>
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
