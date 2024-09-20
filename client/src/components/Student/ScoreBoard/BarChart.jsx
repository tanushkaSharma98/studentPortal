import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './BarChart.css'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:3000/api/students/marksPerformance', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                    },
                }); // Replace with your API endpoint
                const rawData = await response.json();

                // Transforming the data
                const subjects = {};
                rawData.forEach(item => {
                    const { subject_name, exam_name, percentage } = item;
                    if (!subjects[subject_name]) {
                        subjects[subject_name] = { Midterm1: null, Midterm2: null };
                    }
                    if (exam_name === "Midterm 1") {
                        subjects[subject_name].Midterm1 = parseFloat(percentage);
                    } else if (exam_name === "Midterm 2") {
                        subjects[subject_name].Midterm2 = parseFloat(percentage);
                    }
                });

                // Prepare labels and data
                const labels = Object.keys(subjects);
                const midterm1Data = labels.map(subject => subjects[subject].Midterm1 || 0);
                const midterm2Data = labels.map(subject => subjects[subject].Midterm2 || 0);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Midterm 1',
                            data: midterm1Data,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        },
                        {
                            label: 'Midterm 2',
                            data: midterm2Data,
                            backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        },
                    ],
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const options = {
        responsive: true,
        scales: {
            y: {
                min: 0,     // Minimum value of the y-axis
                max: 100,   // Maximum value of the y-axis
                ticks: {
                    stepSize: 10, // Optional: set the step size for ticks
                    callback: (value) => `${value}%`, // Format the ticks to display as percentages
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Marks per Subject',
            },
        },
    };

    return loading ? (
        <div>Loading...</div>
    ) : (
        <div className="chart-container">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default BarChart;
