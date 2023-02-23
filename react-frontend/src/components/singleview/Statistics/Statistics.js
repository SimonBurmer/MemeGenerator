import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { Chart, registerables } from 'chart.js';
import "./Statistics.css"
Chart.register(...registerables, {
    id: 'category',
    isLinear: false,
    type: 'category'
});

function Statistics({votes}) {

    const d = new Date();
    const currentMonth = d.getMonth();
    const likesData = Array(currentMonth + 1).fill(0);
    const dislikesData = Array(currentMonth + 1).fill(0);

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Likes',
                data: likesData,
                fill: false,
                borderColor: 'green',
            },
            {
                label: 'Dislikes',
                data: dislikesData,
                fill: false,
                borderColor: 'red',
            },
        ],
    };

    const fillUpData = () => {
        votes.forEach(vote => {
            const date = new Date(vote.votingDate);
            const month = date.getMonth();

            if (date.getFullYear() === d.getFullYear() && month <= currentMonth) {
                if (vote.votingType === 'like') {
                    likesData[month]++;
                } else {
                    dislikesData[month]++;
                }
            }
        });
    }
    fillUpData();

    return (
        <div className={"statistics-container"}>
            <Line data={data}/>
        </div>
    );
}

export default Statistics;