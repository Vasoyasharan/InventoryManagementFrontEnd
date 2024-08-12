import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Report = (props) => {
  // Example data
  const lineChartData = [
    { name: 'Jan', orders: 30, sales: 2400, amt: 2400 },
    { name: 'Feb', orders: 20, sales: 2210, amt: 2290 },
    { name: 'Mar', orders: 27, sales: 2290, amt: 2000 },
    { name: 'Apr', orders: 23, sales: 2000, amt: 2181 },
    { name: 'May', orders: 34, sales: 2780, amt: 2500 },
    { name: 'Jun', orders: 40, sales: 1890, amt: 2100 },
  ];

  const barChartData = [
    { name: 'Products A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Products B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Products C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Products D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Products E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Products F', uv: 2390, pv: 3800, amt: 2500 },
  ];

  const pieChartData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 border-bottom">
        <h3 className="m-0">{props.name}</h3>
      </div>
      
      <div className="row mt-4">
        <div className="col-lg-6">
          <h5>Sales Overview</h5>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="col-lg-6">
          <h5>Product Performance</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="uv" fill="#8884d8" />
              <Bar dataKey="pv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-6">
          <h5>Customer Distribution</h5>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default Report;
