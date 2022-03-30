import React, { Fragment } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


const Balance = ({ balanceData }) => {


    return (

        <div className="row-span-5 backdrop-blur-lg bg-violet-400/30 h-96 rounded-lg">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={400}
                    height={380}
                    data={balanceData}
                    margin={{
                        top: 10,
                        right: 50,
                        left: 0,
                        bottom: 0,
                    }}
                >

                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="balance" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </div>


    );
}

export default Balance;