"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles, TrendingUp, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Synthetic trend data based on the model parameters (Score ≈ 10.74 * Hours - 2.76)
const trendData = [
  { hours: 1, score: 7.9 },
  { hours: 2, score: 18.7 },
  { hours: 3, score: 29.5 },
  { hours: 4, score: 40.2 },
  { hours: 5, score: 50.9 },
  { hours: 6, score: 61.7 },
  { hours: 7, score: 72.4 },
  { hours: 8, score: 83.2 },
  { hours: 9, score: 93.9 },
  { hours: 10, score: 100 },
];

export function StudentPredictor() {
  const [hours, setHours] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    const hoursNum = parseFloat(hours);
    
    if (isNaN(hoursNum) || hoursNum < 0 || hoursNum > 24) {
      setError("Please enter a valid study time (0-24 hours).");
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hours: hoursNum }),
      });

      if (!response.ok) {
        throw new Error('Backend server is not responding correctly.');
      }
      
      const data = await response.json();
      setPrediction(data.predicted_score);
    } catch (err) {
      setError("Unable to connect to the prediction engine. Please ensure the backend is running at http://localhost:8000");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
      {/* Input Section */}
      <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-xl shadow-2xl relative transition-all duration-500 hover:border-zinc-700">
        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2 text-zinc-100">
            <TrendingUp className="text-indigo-400 w-6 h-6" />
            Predictor Engine by Munna
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Input study hours to calculate prospective performance score.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePredict} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="hours" className="text-zinc-300 text-sm font-medium">Daily Study Hours</Label>
              <div className="relative">
                <Input
                  id="hours"
                  placeholder="Ex: 8.5"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="bg-zinc-950/60 border-zinc-800 focus:border-indigo-500/50 focus:ring-indigo-500/20 h-12 transition-all placeholder:text-zinc-700 text-lg text-zinc-100"
                  type="number"
                  step="0.1"
                  required
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">hrs</span>
              </div>
            </div>
            
            <Button 
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-md active:scale-[0.98] group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
              disabled={loading || !hours || parseFloat(hours) < 1 || parseFloat(hours) > 10}
            >
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-5 w-5 text-indigo-200 transition-transform group-hover:rotate-12" />
              )}
              {loading ? "Analyzing..." : (parseFloat(hours) > 10) ? "Max 10 Hours Allowed" : "Calculate Score"}
            </Button>

            {error && (
              <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/10 text-red-400 text-sm animate-in fade-in zoom-in-95 duration-300">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {error}
                </p>
              </div>
            )}

            {prediction !== null && (
              <div className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/20 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 shadow-inner">
                <span className="text-zinc-500 text-xs uppercase tracking-[0.2em] font-bold">Projected Performance</span>
                <div className="text-7xl font-black text-white mt-3 flex items-center justify-center gap-1">
                  {prediction}
                  <span className="text-2xl text-zinc-500 font-light translate-y-3">%</span>
                </div>
                <div className="mt-4 flex justify-center">
                  <div className="h-1 w-20 bg-indigo-500/30 rounded-full" />
                </div>
                <p className="text-zinc-600 text-[10px] mt-6 leading-relaxed italic">
                  * Based on Linear Regression analysis
                </p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Trend Analysis Section */}
      <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-xl shadow-2xl relative transition-all duration-500 hover:border-zinc-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2 text-zinc-100">
            <BarChart3 className="text-purple-400 w-6 h-6" />
            Trend Analysis
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Visualizing the correlation between study time and score.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis 
                dataKey="hours" 
                stroke="#71717a" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                label={{ value: 'Hours', position: 'insideBottom', offset: -5, fill: '#71717a' }}
              />
              <YAxis 
                stroke="#71717a" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                label={{ value: 'Score', angle: -90, position: 'insideLeft', fill: '#71717a' }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#6366f1" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorScore)" 
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 rounded-xl bg-zinc-950/50 border border-zinc-800">
            <h4 className="text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-2">Insight</h4>
            <p className="text-zinc-500 text-sm">
              The model shows a strong positive correlation. For every hour studied, the score increases by approximately <span className="text-indigo-400 font-bold">10.7 points</span>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
