import React, { useState, useEffect } from 'react';
import { leaveDetails } from '../asset/globalAPI';


interface LeaveType {
    name: string;
    remainingDays: number;
}

interface LeaveFormData {
    startDate: string;
    endDate: string;
    note: string;
    leaveCategory: string;
    leaveType: string;
    age: number;  // Added Age to the form data
}

const LeaveApplyMaterialUI: React.FC = () => {
    const leaveTypes: LeaveType[] = [
        { name: 'Sick Leave', remainingDays: 10 },
        { name: 'Casual Leave', remainingDays: 5 },
        { name: 'Paid Leave', remainingDays: 15 },
    ];
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [leaveCategory, setLeaveCategory] = useState<string>('');
    const [leaveType, setLeaveType] = useState<string>('');
    const [age, setAge] = useState<number>(0); // State for Age

    useEffect(() => {

        const getLeave = async () => {
            try {
                const response = await leaveDetails();
                if (response.status === 200) {
                    console.log("response data", response.data);

                }

            } catch (error) {
                console.error('Error fetching IP:', error);
            }
        };

        getLeave();
    }, []);

    const handleLeaveFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData: LeaveFormData = {
            startDate,
            endDate,
            note,
            leaveCategory,
            leaveType,
            age,  // Including age in form data
        };
        console.log('Leave Applied:', formData);
        alert('Leave applied successfully!');
    };

    return (
        <div style={materialUIStyles.container}>
            <h1 style={materialUIStyles.header}>Leave Application</h1>

            <div>
                <h2 style={materialUIStyles.sectionHeader}>Leave Balance</h2>
                <table style={materialUIStyles.table}>
                    <thead>
                        <tr>
                            <th style={materialUIStyles.tableHeader}>Leave Type</th>
                            <th style={materialUIStyles.tableHeader}>Remaining Days</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveTypes.map((leave) => (
                            <tr key={leave.name}>
                                <td style={materialUIStyles.tableCell}>{leave.name}</td>
                                <td style={materialUIStyles.tableCell}>{leave.remainingDays}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h2 style={materialUIStyles.sectionHeader}>Apply for Leave</h2>
                <form onSubmit={handleLeaveFormSubmit} style={materialUIStyles.form}>
                    <div style={materialUIStyles.formField}>
                        <label>Leave Type:</label>
                        <select
                            value={leaveType}
                            onChange={(e) => setLeaveType(e.target.value)}
                            required
                            style={materialUIStyles.input}
                        >
                            <option value="">Select Leave Type</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Paid Leave">Paid Leave</option>
                        </select>
                    </div>

                    <div style={materialUIStyles.formField}>
                        <label>Start Date:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                            style={materialUIStyles.input}
                        />
                    </div>

                    <div style={materialUIStyles.formField}>
                        <label>End Date:</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                            style={materialUIStyles.input}
                        />
                    </div>

                    <div style={materialUIStyles.formField}>
                        <label>Leave Category:</label>
                        <select
                            value={leaveCategory}
                            onChange={(e) => setLeaveCategory(e.target.value)}
                            required
                            style={materialUIStyles.input}
                        >
                            <option value="">Select Leave Category</option>
                            <option value="Medical">Medical</option>
                            <option value="Personal">Personal</option>
                            <option value="Holiday">Holiday</option>
                        </select>
                    </div>

                    <div style={materialUIStyles.formField}>
                        <label>Age:</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                            required
                            style={materialUIStyles.input}
                            placeholder="Enter your age"
                        />
                    </div>

                    <div style={materialUIStyles.formField}>
                        <label>Note:</label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            style={materialUIStyles.textarea}
                        ></textarea>
                    </div>

                    <button type="submit" style={materialUIStyles.button}>Apply Leave</button>
                </form>
            </div>
        </div>
    );
};

const materialUIStyles = {
    container: {
        fontFamily: 'Roboto, sans-serif',
        padding: '20px',
        backgroundColor: '#f4f4f4',
        maxWidth: '100vw',
        margin: '0 auto',
        borderRadius: '10px',
    },
    header: {
        fontSize: '2.2em',
        fontWeight: '500',
        textAlign: 'center',
        color: '#1976d2',
    },
    sectionHeader: {
        fontSize: '1.4em',
        fontWeight: '400',
        marginBottom: '15px',
        color: '#333',
    },
    table: {
        width: '100%',
        marginBottom: '20px',
    },
    tableHeader: {
        padding: '12px',
        backgroundColor: '#1976d2',
        color: 'white',
        fontSize: '1em',
    },
    tableCell: {
        padding: '12px',
        borderBottom: '1px solid #ddd',
    },
    form: {
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: 'white',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    formField: {
        marginBottom: '15px',
    },
    input: {
        padding: '12px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        width: '100%',
    },
    textarea: {
        width: '100%',
        padding: '12px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        height: '100px',
    },
    button: {
        padding: '12px 30px',
        backgroundColor: '#1976d2',
        color: 'white',
        border: 'none',
        borderRadius: '50px',
        width: '100%',
        cursor: 'pointer',
        fontSize: '1em',
    },
};

export default LeaveApplyMaterialUI;
