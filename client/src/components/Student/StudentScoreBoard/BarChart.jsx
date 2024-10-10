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
                });
                const rawData = await response.json();

                // Transforming the data
                const subjects = {};
                rawData.forEach(item => {
                    const { sub_initials, exam_name, percentage } = item;
                    if (!subjects[sub_initials]) {
                        subjects[sub_initials] = { Midterm1: null, Midterm2: null };
                    }
                    if (exam_name === "Midterm 1") {
                        subjects[sub_initials].Midterm1 = parseFloat(percentage);
                    } else if (exam_name === "Midterm 2") {
                        subjects[sub_initials].Midterm2 = parseFloat(percentage);
                    }
                });

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
        maintainAspectRatio: false, // Allow chart to adjust height based on screen size
        scales: {
            y: {
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 10,
                    callback: (value) => `${value}%`, // Show percentages
                    font: {
                        size: window.innerWidth < 800 ? 10 : 14 // Adjust font size for mobile
                    }
                },
            },
            x: {
                ticks: {
                    font: {
                        size: window.innerWidth < 800 ? 10 : 14 // Adjust font size for mobile
                    }
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: window.innerWidth < 800 ? 10 : 14 // Adjust legend font size for mobile
                    }
                }
            },
            title: {
                display: true,
                text: 'Marks per Subject',
                font: {
                    size: window.innerWidth < 800 ? 14 : 18 // Adjust title font size for mobile
                }
            }
        }
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
