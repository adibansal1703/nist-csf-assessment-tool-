import React from 'react';
import {
  Radar, RadarChart as RechartsRadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';

interface RadarChartProps {
  data: {
    subject: string;
    A: number; // Current
    fullMark: number;
  }[];
}

const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Current State"
            dataKey="A"
            stroke="#2563eb"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChart;
