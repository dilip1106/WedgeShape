import { useEffect, useState } from 'react';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../ui/Table";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useAuthStore } from '../store/authStore'; // Adjust the import path
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function AdminPage() {
  const { fetchAllStudents, users = [], user, logout } = useAuthStore(); // Adjust to include current user
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchAllStudents(); // Fetch students data on component mount
  }, [fetchAllStudents]);

  const calculateTotalTime = (loginTime, logoutTime) => {
    const login = new Date(loginTime);
    const logout = new Date(logoutTime);
    const diff = logout.getTime() - login.getTime();
    
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    return {
      formatted: `${hours}h ${minutes}m ${seconds}s`,
      totalSeconds: Math.max(0, Math.floor(diff / 1000)), // Total seconds, prevent negative
    };
  };

  const sortData = (a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  };

  const filteredAndSortedStudents = users
    .filter(student => 
      Object.values(student).some(value => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort(sortData);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().slice(0, 10); // YYYY-MM-DD
    const formattedTime = date.toTimeString().slice(0, 8); // HH:MM:SS
    return `${formattedDate} ${formattedTime}`; // Combine date and time with space
  };

  // Handle logout
  const handleLogout = () => {
    logout(); // Call the logout function
  };

  // New function to handle navigation
  const handleExperimentPage = () => {
    navigate('/'); // Replace '/experiment' with your desired route
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <div className="flex items-center">
          {user && (
            <>
              <span className="mr-4">Welcome, {user.name}</span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm mr-2"
        />
        <Button variant="primary" onClick={handleExperimentPage}>
          Experiment
        </Button>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Button variant="ghost" onClick={() => handleSort('classroom')} className='flex'> 
                  Class
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('prn')} className='flex'>
                  PRN
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('name')} className='flex'>
                  Name
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('email')} className='flex'>
                  Email
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Login Time</TableHead>
              <TableHead>Logout Time</TableHead>
              <TableHead>Total Time</TableHead>
              <TableHead>Verified</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedStudents.map((student) => {
              const { formatted: totalTime, totalSeconds } = calculateTotalTime(student.lastLogin, student.lastLogout);
              const isOnline = totalSeconds <= 0; // Check if total time is negative
              return (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.classroom}</TableCell>
                  <TableCell>{student.prn}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{formatDateTime(student.lastLogin)}</TableCell>
                  <TableCell>{formatDateTime(student.lastLogout)}</TableCell>
                  <TableCell>
                    {isOnline ? (
                      <span className="flex items-center text-green-500">
                        <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                        Online
                      </span>
                    ) : (
                      totalTime
                    )}
                  </TableCell>
                  <TableCell>{student.isVerified ? "Yes" : "No"}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
