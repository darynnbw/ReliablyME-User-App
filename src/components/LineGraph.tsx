import React from 'react';
import { Box } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  DotProps,
  Label,
} from 'recharts';

interface LineGraphProps {
  data: { name: string; value: number }[];
  title: string;
  yAxisLabel: string;
  color: string;
}

const CustomDot: React.FC<DotProps & { color: string }> = (props) => {
  const { cx, cy, color } = props;
  return (
    <svg x={cx ? +cx - 5 : 0} y={cy ? +cy - 5 : 0} width="10" height="10" viewBox="0 0 10 10" fill="none">
      <circle cx="5" cy="5" r="5" fill={color} />
    </svg>
  );
};

const LineGraph: React.FC<LineGraphProps> = ({ data, title, yAxisLabel, color }) => {
  return (
    <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 20, // Increased left margin for Y-axis label
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false}>
            <Label
              value={yAxisLabel}
              angle={-90}
              position="insideLeft"
              style={{ textAnchor: 'middle', fontSize: '14px', fill: '#666' }}
            />
          </YAxis>
          <Tooltip
            formatter={(value: number) => [`${value}`, title]}
            contentStyle={{
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '1px solid #e0e0e0',
            }}
            labelStyle={{ display: 'none' }}
            cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '3 3' }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={<CustomDot color={color} />}
            activeDot={{ r: 6, fill: color, stroke: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LineGraph;